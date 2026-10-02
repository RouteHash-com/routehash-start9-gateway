import { i18n } from './i18n'
import { sdk } from './sdk'
import { stratumPort, uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const web = sdk.MultiHost.of(effects, 'ui')
  const webOrigin = await web.bindPort(uiPort, {
    protocol: 'http',
    preferredExternalPort: uiPort,
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web Interface'),
    id: 'ui',
    description: i18n('The web interface is ready'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const mining = sdk.MultiHost.of(effects, 'stratum')
  const miningOrigin = await mining.bindPort(stratumPort, {
    protocol: null,
    addSsl: null,
    preferredExternalPort: stratumPort,
    secure: { ssl: false },
  })
  const stratum = sdk.createInterface(effects, {
    name: i18n('Stratum'),
    id: 'stratum',
    description: i18n('Stratum is accepting miners'),
    type: 'p2p',
    masked: false,
    schemeOverride: { ssl: 'stratum+tcp', noSsl: 'stratum+tcp' },
    username: null,
    path: '',
    query: {},
  })

  return [
    await webOrigin.export([ui]),
    await miningOrigin.export([stratum]),
  ]
})
