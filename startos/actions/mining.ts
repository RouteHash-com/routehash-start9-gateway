import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMeta } from './configMeta'

const { InputSpec, Value } = sdk

const spec = InputSpec.of({
  pool_address: Value.text({
    name: i18n('Bitcoin Address'),
    description: i18n(
      'Bitcoin address used for mining on DATUM Pool, and for solo mining rewards.',
    ),
    required: true,
    default: '',
    patterns: [
      {
        regex: '[0-9a-zA-Z]{20,88}',
        description: i18n('Bitcoin Address'),
      },
    ],
  }),
  coinbase_tag_primary: Value.text({
    name: i18n('Primary Coinbase Tag'),
    description: i18n(
      'While pooled, the DATUM pool overwrites this with its own tag. Leave blank for RouteHash collaborative mining. Used only for solo blocks.',
    ),
    required: false,
    default: '',
  }),
  coinbase_tag_secondary: Value.text({
    name: i18n('Secondary Coinbase Tag'),
    description: i18n(
      'Your label on pooled blocks (explorers / pool stats). Use your own name, or an anonymous handle so non-KYC coins are less trivially clustered. A common name like Satoshi is a fine theme. Do not copy a public-gateway tag if the pool charges extra for that tag.',
    ),
    required: false,
    default: 'Satoshi',
  }),
  coinbase_unique_id: Value.number({
    name: i18n('Coinbase Unique ID'),
    description: i18n(
      'A unique ID between 1 and 65535. Make unique per instance with the same coinbase tags.',
    ),
    required: true,
    default: 120,
    integer: true,
    min: 1,
    max: 65535,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  allow_hasher_time_rolling: Value.toggle({
    name: i18n('Allow Hasher Time Rolling'),
    description: i18n(
      'Blake2b ASICs rolling nTime fail header-v2 checks on Convoy/AlphaPool. Leave OFF on this XBT gateway.',
    ),
    default: false,
  }),
})

export const mining = sdk.Action.withInput(
  'mining',
  configMeta(
    'Mining Settings',
    'Bitcoin address used for mining on DATUM Pool, and for solo mining rewards.',
  ),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    return {
      pool_address: cfg?.mining.pool_address ?? '',
      coinbase_tag_primary: cfg?.mining.coinbase_tag_primary ?? '',
      coinbase_tag_secondary: cfg?.mining.coinbase_tag_secondary ?? 'Satoshi',
      coinbase_unique_id: cfg?.mining.coinbase_unique_id ?? 120,
      allow_hasher_time_rolling: cfg?.mining.allow_hasher_time_rolling ?? false,
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      mining: {
        pool_address: input.pool_address,
        coinbase_tag_primary: input.coinbase_tag_primary ?? '',
        coinbase_tag_secondary: input.coinbase_tag_secondary ?? 'Satoshi',
        coinbase_unique_id: input.coinbase_unique_id,
        allow_hasher_time_rolling: input.allow_hasher_time_rolling,
      },
    })
  },
)
