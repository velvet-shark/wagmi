# connect

Action for connecting accounts with [connectors](/core/connectors).

## Import

```ts
import { connect } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(
  config,
  { connector: injected() },
)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ConnectParameters } from '@wagmi/core'
```

### chainId

`number | undefined`

Chain ID to connect to.

Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider is connected to.

::: code-group
```ts [index.ts]
import { mainnet } from 'viem/chains'
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(
  config,
  {
    chainId: mainnet.id, // [!code focus]
    connector: injected(), 
  },
)
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`CreateConnectorFn | Connector`

[Connector](/core/connectors) to connect with.

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(
  config,
  {
    connector: injected(), // [!code focus]
  },
)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type ConnectReturnType } from '@wagmi/core'
```

### accounts

`readonly Address[]`

Connected accounts from connector.

### chainId

`number`

Connected chain ID from connector.

## Error

```ts
import { type ConnectError } from '@wagmi/core'
```

## TanStack Query

```ts
import {
  type ConnectData,
  type ConnectVariables,
  type ConnectMutate,
  type ConnectMutateAsync,
  connectMutationOptions,
} from '@wagmi/core/query'
```