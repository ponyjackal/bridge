# Bridge contract project

# Link

- __[Link to the bridgeETH](https://rinkeby.etherscan.io/address/0x840B001F3f1246100c1F87FEC1ea793BBBcAD2B7)__ (Rinkeby testnet)
- __[Link to the tokenERC20](https://rinkeby.etherscan.io/address/0xc463db1df83634731981fb260afdb3768167f1b9)__ (Rinkeby testnet)
- __[Link to the bridgeBSC](https://testnet.bscscan.com/address/0xa2C7F45044838333e593447734202CaE6a6dDED8)__ (BSC testnet)
- __[Link to the tokenERC20](https://testnet.bscscan.com/address/0x3cf57c9c0fed223ea5ca72b2eec5a54b6a8e57c2)__ (BSC testnet)


# Basic commands

## Use it to compile the contract

```TypeScript
npx hardhat clean && npx hardhat compile
// or
npm run compile
```

## Use it to deploy the contract locally

- __Deploy bridge contract__

```TypeScript
npx hardhat run scripts/deploy.ts --network localhost
// or
npm run local
```

- __Deploy tokenERC20__

```TypeScript
npx hardhat run scripts/deployToken.ts --network localhost
```

## Use it to deploy the contract in the rinkeby test network

- __Deploy bridge contract__

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
npm run rinkeby
```

- __Deploy tokenERC20__

```TypeScript
npx hardhat run scripts/deployToken.ts --network rinkeby
```

## Use it to test

```TypeScript
npx hardhat test
// or
npm run test
```

## Use it to view the test coverage

```TypeScript
npx hardhat coverage
// or
npm run coverage
```

## Use it to view global options and available tasks

```TypeScript
npx hardhat help
// or
npm run help
```

# Basic task

## Swap

**Use to initiate a token swap to another network**

```TypeScript
npx hardhat swap --token-from [TOKEN_ADDRESS] --token-to [TOKEN_ADDRESS] --amount [AMOUNT_OF_TOKENS] --chain [CHAIN_ID] 
```

## Reedem

**Use to redeem tokens on the current network**

```TypeScript
npx hardhat swap --token-from [TOKEN_ADDRESS] --to [WALLET_ADDRESS] --amount [AMOUNT_OF_TOKENS] --nonce [NONCE_NUMBER] 
```