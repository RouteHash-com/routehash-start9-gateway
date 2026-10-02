import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMeta } from './configMeta'

const { InputSpec, Value } = sdk

const spec = InputSpec.of({
  listen_port: Value.number({
    name: i18n('Listen Port'),
    description: i18n('Listening port for Datum Gateway Dashboard.'),
    required: true,
    default: 7152,
    integer: true,
    min: 0,
    max: 65535,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  admin_password: Value.text({
    name: i18n('Admin Password'),
    description: i18n(
      'Admin password for dashboard login and API config writes (username admin).',
    ),
    required: false,
    default: '',
    masked: true,
  }),
  modify_conf: Value.toggle({
    name: i18n('Allow API Config Writes'),
    description: i18n(
      'When on, the dashboard Config page can save settings. RouteHash does not POST this gateway.',
    ),
    default: true,
  }),
  allow_insecure_auth: Value.toggle({
    name: i18n('Allow Insecure Authentication'),
    description: i18n('Allow insecure authentication (required for Safari).'),
    warning: i18n(
      'This lowers security of the dashboard login. Use it only on trusted networks.',
    ),
    default: false,
  }),
})

export const api = sdk.Action.withInput(
  'api',
  configMeta('API', 'Settings for the Datum Gateway Dashboard'),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    return {
      listen_port: cfg?.api.listen_port ?? 7152,
      admin_password: cfg?.api.admin_password ?? '',
      modify_conf: cfg?.api.modify_conf ?? true,
      allow_insecure_auth: cfg?.api.allow_insecure_auth ?? false,
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      api: {
        listen_port: input.listen_port,
        admin_password: input.admin_password ?? '',
        modify_conf: input.modify_conf,
        allow_insecure_auth: input.allow_insecure_auth,
      },
    })
  },
)
