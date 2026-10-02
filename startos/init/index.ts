import { actions } from '../actions'
import { restoreInit } from '../backups'
import { setDependencies } from '../dependencies'
import { configYaml } from '../fileModels/config.yaml'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'

const seedConfig = sdk.setupOnInit(async (effects) => {
  await configYaml.merge(effects, {})
})

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  seedConfig,
)

export const uninit = sdk.setupUninit(versionGraph)
