import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.1:1',
  releaseNotes: {
    en_US:
      'RouteHash mark as the service icon. Customer DATUM gateway for Knots with no DATUM yet. Prefills pool.routehash.com:28915. Package id routehash-gateway — does not replace datum. If you already run DATUM, paste Pool Host on that gateway. RouteHash does not POST this gateway.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
