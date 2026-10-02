import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.1:0',
  releaseNotes: {
    en_US:
      'Customer DATUM gateway for people who already run Knots and do not already run DATUM. Prefills RouteHash RATUM (pool.routehash.com:28915, prefer, Pool Pass User On). Package id routehash-gateway — does not replace an existing datum package. If you already run DATUM, paste Pool Host on that gateway. Independent operators leave Pool Host blank. RouteHash does not POST this gateway.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
