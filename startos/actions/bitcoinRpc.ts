import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { rpcHostId, rpcPort } from '../utils'
import { configMeta } from './configMeta'

const { InputSpec, Value } = sdk

const spec = InputSpec.of({
  rpcurl: Value.text({
    name: i18n('RPC URL'),
    description: i18n(
      'On StartOS 4, Datum and Knots are separate containers. Use http://10.0.3.1:<Knots RPC port> — usually http://10.0.3.1:8332 if Knots kept the preferred RPC port. Never 127.0.0.1, never bitcoind.embassy, never .local. Auth is the Knots cookie mounted at /mnt/bitcoind/.cookie.',
    ),
    required: false,
    default: 'http://10.0.3.1:8332',
    placeholder: 'http://10.0.3.1:8332',
  }),
  work_update_seconds: Value.number({
    name: i18n('Work Update (Seconds)'),
    description: i18n('How frequently Bitcoind should send updated templates.'),
    required: true,
    default: 40,
    integer: true,
    min: 5,
    max: 119,
    step: 1,
    units: 'seconds',
    placeholder: null,
    warning: null,
  }),
  blocknotify: Value.text({
    name: i18n('Block Notify'),
    description: i18n(
      "In Knots bitcoin.conf, blocknotify must reach this Datum container on the StartOS bridge, e.g. curl -fsS -o /dev/null http://10.0.3.1:7152/NOTIFY (use Datum's assigned API port if not 7152). 127.0.0.1 only works inside the Datum container itself.",
    ),
    required: false,
    default: 'curl -fsS -o /dev/null http://10.0.3.1:7152/NOTIFY',
  }),
})

export const bitcoinRpc = sdk.Action.withInput(
  'bitcoin-rpc',
  configMeta('Bitcoin RPC settings', 'RPC settings for bitcoind'),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    const bridge = await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'bitcoind',
        hostId: rpcHostId,
        internalPort: rpcPort,
        ssl: false,
      })
      .once()
    const autoRpc = bridge ? `http://${bridge}` : 'http://10.0.3.1:8332'
    const stored = cfg?.bitcoind.rpcurl ?? ''
    const stale =
      !stored ||
      stored.includes('.embassy') ||
      stored.includes('127.0.0.1') ||
      stored.includes('localhost')
    return {
      rpcurl: stale ? autoRpc : stored,
      work_update_seconds: cfg?.bitcoind.work_update_seconds ?? 40,
      blocknotify:
        cfg?.bitcoind.blocknotify ??
        'curl -fsS -o /dev/null http://10.0.3.1:7152/NOTIFY',
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      bitcoind: {
        rpcurl: input.rpcurl ?? '',
        work_update_seconds: input.work_update_seconds,
        blocknotify: input.blocknotify ?? '',
      },
    })
  },
)
