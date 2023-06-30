import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../config.js'
import { getTransaction } from './getTransaction.js'
import { http } from 'viem'
import { celo } from 'viem/chains'

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo],
    transports: { [celo.id]: http() },
  })
  const result = await getTransaction(config, { hash: '0x123' })
  expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
  expectTypeOf(result.gatewayFee).toEqualTypeOf<bigint | null>()
  expectTypeOf(result.gatewayFeeRecipient).toEqualTypeOf<`0x${string}` | null>()
})