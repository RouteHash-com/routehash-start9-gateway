import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMeta } from './configMeta'

const { InputSpec, Value, List } = sdk

const spec = InputSpec.of({
  listen_port: Value.number({
    name: i18n('Listen Port'),
    description: i18n('Listening port for Stratum Gateway.'),
    required: true,
    default: 23334,
    integer: true,
    min: 0,
    max: 65535,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  max_clients_per_thread: Value.number({
    name: i18n('Maximum Clients Per Thread'),
    description: i18n('Maximum clients per Stratum server thread.'),
    required: true,
    default: 1000,
    integer: true,
    min: 0,
    max: 100000,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  max_threads: Value.number({
    name: i18n('Max Threads'),
    description: i18n('Maximum Stratum server threads.'),
    required: true,
    default: 8,
    integer: true,
    min: 0,
    max: 256,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  max_clients: Value.number({
    name: i18n('Max Clients'),
    description: i18n('Maximum total Stratum clients before rejecting connections.'),
    required: true,
    default: 2048,
    integer: true,
    min: 0,
    max: 100000,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  vardiff_min: Value.number({
    name: i18n('Minimum Difficulty'),
    description: i18n('Work difficulty floor.'),
    required: true,
    default: 4096,
    integer: true,
    min: 0,
    max: 2147483647,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  vardiff_target_shares_min: Value.number({
    name: i18n('Target Shares per Minute'),
    description: i18n('Adjust work difficulty to target this many shares per minute.'),
    required: true,
    default: 8,
    integer: true,
    min: 0,
    max: 1000,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  vardiff_quickdiff_count: Value.number({
    name: i18n('Difficulty Update Speed'),
    description: i18n('How many shares before considering a quick diff update.'),
    required: true,
    default: 8,
    integer: true,
    min: 0,
    max: 1000,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  vardiff_quickdiff_delta: Value.number({
    name: i18n('Difficulty Delta'),
    description: i18n('How many times faster than target before a quick diff bump.'),
    required: true,
    default: 8,
    integer: true,
    min: 0,
    max: 1000,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  share_stale_seconds: Value.number({
    name: i18n('Seconds Until Shares Considered Stale'),
    description: i18n(
      'How many seconds after a job is generated before a share is stale.',
    ),
    required: true,
    default: 120,
    integer: true,
    min: 0,
    max: 3600,
    step: 1,
    units: 'seconds',
    placeholder: null,
    warning: null,
  }),
  fingerprint_miners: Value.toggle({
    name: i18n('Fingerprint Miners'),
    description: i18n('Attempt to fingerprint miners for better use of coinbase space.'),
    default: true,
  }),
  username_modifiers: Value.list(
    List.obj(
      {
        name: i18n('Username Modifiers'),
        description: i18n(
          'Named dest splits you type on this gateway. Leave empty unless you add dests yourself. RouteHash does not write this table.',
        ),
        default: [],
        minLength: 0,
        maxLength: null,
      },
      {
        spec: InputSpec.of({
          name: Value.text({
            name: i18n('Modifier name'),
            description: i18n('The name of this modifier (miner username prefix).'),
            required: true,
            default: '',
          }),
          addresses: Value.list(
            List.obj(
              {
                name: i18n('Modifier addresses'),
                description: i18n(
                  'Bitcoin addresses and the designated split amount (0–1).',
                ),
                default: [],
                minLength: 0,
                maxLength: null,
              },
              {
                spec: InputSpec.of({
                  address: Value.text({
                    name: i18n('Bitcoin Address'),
                    description: i18n('The bitcoin address to send to.'),
                    required: false,
                    default: '',
                  }),
                  split: Value.number({
                    name: i18n('Address split'),
                    description: i18n('Fraction of the modifier for this address (0–1).'),
                    required: true,
                    default: 0.9,
                    integer: false,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    units: null,
                    placeholder: null,
                    warning: null,
                  }),
                }),
                displayAs: null,
                uniqueBy: null,
              },
            ),
          ),
        }),
        displayAs: '{{name}}',
        uniqueBy: 'name',
      },
    ),
  ),
})

export const stratum = sdk.Action.withInput(
  'stratum',
  configMeta('Stratum Server Settings', "Configure the Datum gateway's stratum server."),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    const s = cfg?.stratum
    return {
      listen_port: s?.listen_port ?? 23334,
      max_clients_per_thread: s?.max_clients_per_thread ?? 1000,
      max_threads: s?.max_threads ?? 8,
      max_clients: s?.max_clients ?? 2048,
      vardiff_min: s?.vardiff_min ?? 16384,
      vardiff_target_shares_min: s?.vardiff_target_shares_min ?? 8,
      vardiff_quickdiff_count: s?.vardiff_quickdiff_count ?? 8,
      vardiff_quickdiff_delta: s?.vardiff_quickdiff_delta ?? 8,
      share_stale_seconds: s?.share_stale_seconds ?? 120,
      fingerprint_miners: s?.fingerprint_miners ?? true,
      username_modifiers: s?.username_modifiers ?? [],
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      stratum: {
        ...input,
        username_modifiers: input.username_modifiers.map((mod) => ({
          name: mod.name,
          addresses: mod.addresses.map((row) => ({
            address: row.address ?? undefined,
            split: row.split,
          })),
        })),
      },
    })
  },
)
