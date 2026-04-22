# tradcast-celo-sdk

TypeScript SDK for interacting with the Tradcast contracts on Celo.

## Installation

```bash
npm install tradcast-celo-sdk
```

## Usage

```ts
import { TradcastClient } from "tradcast-celo-sdk";

const client = new TradcastClient({
  gameContractAddress: "0x2AF88995303B5e02b705A904e478729CD9ABc319",
  tokenContractAddress: "0x346528259cdF48fa1e5B23194828B477362B80f0",
  rpcUrl: "https://forno.celo.org"
});

const paused = await client.getPaused();
const session = await client.getGameSession("1");
const balance = await client.getTokenBalance("0xYourWalletAddress");
```

## Development

```bash
npm install
npm run build
```

## License
MIT
