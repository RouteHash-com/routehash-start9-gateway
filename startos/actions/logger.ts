import { configYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMeta } from './configMeta'

const { InputSpec, Value } = sdk

const spec = InputSpec.of({
  log_level_console: Value.number({
    name: i18n('Log Level Console'),
    description: i18n(
      'Minimum log level for console messages (0=All, 1=Debug, 2=Info, 3=Warn, 4=Error, 5=Fatal).',
    ),
    required: true,
    default: 2,
    integer: true,
    min: 0,
    max: 4,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
  log_to_file: Value.toggle({
    name: i18n('Log to File'),
    description: i18n('Enable logging of messages to a file.'),
    default: false,
  }),
  log_file: Value.text({
    name: i18n('Log File'),
    description: i18n('Path to file to write log messages, when enabled.'),
    required: false,
    default: '/data/datum.log',
  }),
  log_level_file: Value.number({
    name: i18n('File Log Level'),
    description: i18n('Minimum log level for log file messages.'),
    required: true,
    default: 1,
    integer: true,
    min: 0,
    max: 4,
    step: 1,
    units: null,
    placeholder: null,
    warning: null,
  }),
})

export const logger = sdk.Action.withInput(
  'logger',
  configMeta('Logger', 'Log Settings'),
  spec,
  async ({ effects }) => {
    const cfg = await configYaml.read().once()
    return {
      log_level_console: cfg?.logger.log_level_console ?? 2,
      log_to_file: cfg?.logger.log_to_file ?? false,
      log_file: cfg?.logger.log_file ?? '/data/datum.log',
      log_level_file: cfg?.logger.log_level_file ?? 1,
    }
  },
  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      logger: {
        log_level_console: input.log_level_console,
        log_to_file: input.log_to_file,
        log_file: input.log_file ?? '/data/datum.log',
        log_level_file: input.log_level_file,
      },
    })
  },
)
