import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMeta } from './configMeta'

const { InputSpec, Value } = sdk

const spec = InputSpec.of({
  pool_host: Value.text({
    name: i18n('Pool Host'),
    description: i18n(
      'RouteHash RATUM coordinator. Prefill is pool.routehash.com. Blank = solo (independent, not a RouteHash segment).',
    ),
    required: false,
    default: 'pool.routehash.com',
  }),
  pool_port: Value.number({
    name: i18n('Pool Port'),
    description: i18n('Remote DATUM server port.'),
    required: false,
    default: 28915,
    integer: true,
    min: 0,
    max: 65535,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  pool_pubkey: Value.text({
    name: i18n('Pool Pubkey'),
    description: i18n(
      '128 hex coordinator pubkey from https://app.routehash.com/pool/connect. Prefill matches RouteHash RATUM. Solo: blank Pool Host and blank pubkey.',
    ),
    required: false,
    default:
      'b1ccb80129763858d52249e4fef4f9d6aff97921543abf0559e03819a03aab1093872ef7b8f0481635d0221485379948a812c3d2ffcec3fe7cbc4f8ccec1d735',
  }),
  protocol_v3: Value.toggle({
    name: i18n('DATUM protocol v3 (DRS / RATUM)'),
    description: i18n(
      'Send a version-3 hello with the DRS anti-block-withholding extension. Required when the pool refuses protocol v1. The v0.4.1-beta label alone does not mean v3. Honored by ratum-gateway; the C iohzrd binary ignores unknown JSON keys.',
    ),
    default: true,
  }),
  pool_pass_workers: Value.toggle({
    name: i18n('Pool Pass Workers'),
    description: i18n('Pass stratum miner usernames as sub-worker names to the pool.'),
    default: false,
  }),
  pool_pass_full_users: Value.toggle({
    name: i18n('Pool Pass Full Users'),
    description: i18n('Pass stratum miner usernames as raw usernames to the pool.'),
    default: true,
  }),
  always_pay_self: Value.toggle({
    name: i18n('Always Pay Self'),
    description: i18n(
      "Include this gateway's payout address in the coinbase when possible. Pool Host blank is solo. Preferred + this coordinator = RouteHash segment.",
    ),
    default: true,
  }),
  reward_sharing: Value.select({
    name: i18n('Collaborative reward sharing (pooled mining)'),
    description: i18n(
      'prefer = join the coordinator, solo if it drops. never = independent solo. require = pooled only.',
    ),
    warning: null,
    default: 'prefer',
    values: {
      require: i18n('require (pooled mining only)'),
      prefer: i18n('prefer (failover to non-pooled)'),
      never: i18n('never (non-pooled only)'),
    },
  }),
})

export const datum = sdk.Action.withInput(
  'datum',
  configMeta(
    'Datum',
    'Pool Host pool.routehash.com:28915 = RouteHash segment. Blank = solo (independent). ASICs use this package’s Stratum, never 28915.',
  ),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    return {
      pool_host: cfg?.datum.pool_host ?? 'pool.routehash.com',
      pool_port: cfg?.datum.pool_port ?? 28915,
      pool_pubkey: cfg?.datum.pool_pubkey ?? 'b1ccb80129763858d52249e4fef4f9d6aff97921543abf0559e03819a03aab1093872ef7b8f0481635d0221485379948a812c3d2ffcec3fe7cbc4f8ccec1d735',
      protocol_v3: cfg?.datum.protocol_v3 ?? true,
      pool_pass_workers: cfg?.datum.pool_pass_workers ?? false,
      pool_pass_full_users: cfg?.datum.pool_pass_full_users ?? true,
      always_pay_self: cfg?.datum.always_pay_self ?? true,
      reward_sharing: cfg?.datum.reward_sharing ?? 'prefer',
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      datum: {
        pool_host: input.pool_host ?? 'pool.routehash.com',
        pool_port: input.pool_port ?? 28915,
        pool_pubkey: input.pool_pubkey ?? '',
        protocol_v3: input.protocol_v3 ?? true,
        pool_pass_workers: input.pool_pass_workers,
        pool_pass_full_users: input.pool_pass_full_users,
        always_pay_self: input.always_pay_self,
        reward_sharing: input.reward_sharing,
      },
    })
  },
)
