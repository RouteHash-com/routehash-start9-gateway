import { sdk } from '../sdk'
import { api } from './api'
import { bitcoinRpc } from './bitcoinRpc'
import { datum } from './datum'
import { logger } from './logger'
import { mining } from './mining'
import { resetPassword } from './resetPassword'
import { stratum } from './stratum'

export const actions = sdk.Actions.of()
  .addAction(api)
  .addAction(bitcoinRpc)
  .addAction(datum)
  .addAction(logger)
  .addAction(mining)
  .addAction(resetPassword)
  .addAction(stratum)
