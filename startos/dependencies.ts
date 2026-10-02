import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async () => ({
  bitcoind: {
    healthChecks: [],
    kind: 'running',
    // StartOS 4 exver is `#flavor:upstream:revision`. Marketplace
    // #knots:29.4.1:5 is flavor knots, 29.4.1, revision 5. `>=29.4.1`
    // (no colon, no flavor) is parsed as 29.4.1:0 and does not match.
    versionRange: '>=#knots:29.4.1:0 || >=29.4.1:0',
  },
}))
