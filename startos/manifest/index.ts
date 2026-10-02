import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'routehash-gateway',
  title: 'RouteHash Gateway',
  license: 'MIT',
  packageRepo: 'https://github.com/RouteHash-com/routehash-start9-gateway',
  upstreamRepo: 'https://github.com/iohzrd/datum_gateway',
  marketingUrl: 'https://app.routehash.com/pool/connect',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerBuild: {
          dockerfile: 'Dockerfile',
          workdir: '.',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    bitcoind: {
      description: {
        en_US:
          'Bitcoin Knots (Blake2b) node used for GBT templates. Package id bitcoind, e.g. #knots:29.4.2:3.',
      },
      optional: false,
      metadata: {
        title: 'Bitcoin Knots',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/refs/heads/30.x/dep-icon.svg',
      },
    },
  },
})
