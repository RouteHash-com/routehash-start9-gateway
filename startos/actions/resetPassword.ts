import { utils } from '@start9labs/start-sdk'
import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configGroup } from './configMeta'

export const resetPassword = sdk.Action.withoutInput(
  'reset-password',
  async () => ({
    name: i18n('Reset Password'),
    description: i18n('Reset your admin password'),
    warning: null,
    allowedStatuses: 'any',
    group: configGroup,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const adminPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    })
    await configYaml.merge(effects, { api: { admin_password: adminPassword } })
    return {
      version: '1',
      title: i18n('Login Credentials'),
      message: i18n(
        'A new admin password was generated. Use it to sign in to the DATUM dashboard.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: 'admin',
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
