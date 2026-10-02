import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const modifierAddress = z.object({
  address: z.string().optional(),
  split: z.number(),
})

const modifier = z.object({
  name: z.string(),
  addresses: z.array(modifierAddress),
})

export const shape = z.object({
  mining: z
    .object({
      pool_address: z.string().catch(''),
      coinbase_tag_primary: z.string().catch(''),
      coinbase_tag_secondary: z.string().catch('Satoshi'),
      coinbase_unique_id: z.number().catch(120),
      allow_hasher_time_rolling: z.boolean().catch(false),
    })
    .catch({
      pool_address: '',
      coinbase_tag_primary: '',
      coinbase_tag_secondary: 'Satoshi',
      coinbase_unique_id: 120,
      allow_hasher_time_rolling: false,
    }),
  api: z
    .object({
      listen_port: z.number().catch(7152),
      admin_password: z.string().catch(''),
      modify_conf: z.boolean().catch(true),
      allow_insecure_auth: z.boolean().catch(false),
    })
    .catch({
      listen_port: 7152,
      admin_password: '',
      modify_conf: true,
      allow_insecure_auth: false,
    }),
  stratum: z
    .object({
      listen_port: z.number().catch(23334),
      max_clients_per_thread: z.number().catch(1000),
      max_threads: z.number().catch(8),
      max_clients: z.number().catch(2048),
      vardiff_min: z.number().catch(4096),
      vardiff_target_shares_min: z.number().catch(8),
      vardiff_quickdiff_count: z.number().catch(8),
      vardiff_quickdiff_delta: z.number().catch(8),
      share_stale_seconds: z.number().catch(120),
      fingerprint_miners: z.boolean().catch(true),
      username_modifiers: z.array(modifier).catch([]),
    })
    .catch({
      listen_port: 23334,
      max_clients_per_thread: 1000,
      max_threads: 8,
      max_clients: 2048,
      vardiff_min: 4096,
      vardiff_target_shares_min: 8,
      vardiff_quickdiff_count: 8,
      vardiff_quickdiff_delta: 8,
      share_stale_seconds: 120,
      fingerprint_miners: true,
      username_modifiers: [],
    }),
  datum: z
    .object({
      pool_host: z.string().catch('pool.routehash.com'),
      pool_port: z.number().catch(28915),
      pool_pubkey: z.string().catch(
        'b1ccb80129763858d52249e4fef4f9d6aff97921543abf0559e03819a03aab1093872ef7b8f0481635d0221485379948a812c3d2ffcec3fe7cbc4f8ccec1d735',
      ),
      pool_pass_workers: z.boolean().catch(false),
      pool_pass_full_users: z.boolean().catch(true),
      always_pay_self: z.boolean().catch(true),
      reward_sharing: z.enum(['require', 'prefer', 'never']).catch('prefer'),
      protocol_v3: z.boolean().catch(true),
    })
    .catch({
      pool_host: 'pool.routehash.com',
      pool_port: 28915,
      pool_pubkey:
        'b1ccb80129763858d52249e4fef4f9d6aff97921543abf0559e03819a03aab1093872ef7b8f0481635d0221485379948a812c3d2ffcec3fe7cbc4f8ccec1d735',
      pool_pass_workers: false,
      pool_pass_full_users: true,
      always_pay_self: true,
      reward_sharing: 'prefer',
      protocol_v3: true,
    }),
  logger: z
    .object({
      log_level_console: z.number().catch(2),
      log_to_file: z.boolean().catch(false),
      log_file: z.string().catch('/data/datum.log'),
      log_level_file: z.number().catch(1),
    })
    .catch({
      log_level_console: 2,
      log_to_file: false,
      log_file: '/data/datum.log',
      log_level_file: 1,
    }),
  bitcoind: z
    .object({
      rpcurl: z.string().catch('http://10.0.3.1:8332'),
      rpcuser: z.string().catch('__cookie__'),
      rpcpassword: z.string().catch(''),
      work_update_seconds: z.number().catch(40),
      blocknotify: z
        .string()
        .catch('curl -fsS -o /dev/null http://127.0.0.1:7152/NOTIFY'),
    })
    .catch({
      rpcurl: 'http://10.0.3.1:8332',
      rpcuser: '__cookie__',
      rpcpassword: '',
      work_update_seconds: 40,
      blocknotify: 'curl -fsS -o /dev/null http://10.0.3.1:7152/NOTIFY',
    }),
})

export const configYaml = FileHelper.yaml(
  {
    base: sdk.volumes.main,
    subpath: 'config.yaml',
  },
  shape,
)
