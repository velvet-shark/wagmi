import { type SendTransactionError } from '@wagmi/core'
import { abi } from '@wagmi/test'
import { type Abi, type Address, type Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useContractSimulate } from './useContractSimulate.js'
import { useContractWrite } from './useContractWrite.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, write, variables } = useContractWrite({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
    },
  })

  expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  write(
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
      chainId: 1,
    },
    {
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'approve' | 'transfer' | 'transferFrom' // TODO: Should narrow to `'transferFrom'`
          args: readonly [Address, Address, bigint]
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'approve' | 'transfer' | 'transferFrom' // TODO: Should narrow to `'transferFrom'`
          args: readonly [Address, Address, bigint]
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'approve' | 'transfer' | 'transferFrom' // TODO: Should narrow to `'transferFrom'`
          args: readonly [Address, Address, bigint]
        }>()
      },
    },
  )
})

test('useContractSimulate', () => {
  const { data } = useContractSimulate({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
  const { write } = useContractWrite()

  const request = data?.request
  if (request) write(request)
})