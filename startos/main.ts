import { configYaml } from './fileModels/config.yaml'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { rpcHostId, rpcPort, stratumPort, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting {{name}}!'))

  const rpc = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'bitcoind',
      hostId: rpcHostId,
      internalPort: rpcPort,
      ssl: false,
    })
    .const()

  await configYaml.merge(effects, {
    bitcoind: {
      rpcurl: rpc ? `http://${rpc}` : '',
      rpcuser: '__cookie__',
      blocknotify: 'curl -fsS -o /dev/null http://127.0.0.1:7152/NOTIFY',
    },
    api: { modify_conf: true, listen_port: uiPort },
    mining: { allow_hasher_time_rolling: false },
    stratum: { listen_port: stratumPort },
  })

  const sub = sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      })
      .mountDependency({
        dependencyId: 'bitcoind',
        volumeId: 'main',
        subpath: null,
        mountpoint: '/mnt/bitcoind',
        readonly: true,
      }),
    'datum',
  )

  return sdk.Daemons.of(effects).addDaemon('datum', {
    subcontainer: sub,
    exec: { command: ['/usr/local/bin/docker_entrypoint.sh'] },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
