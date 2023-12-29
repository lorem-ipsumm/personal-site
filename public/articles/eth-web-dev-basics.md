This article will cover the basics of what you need to know in order to become a skilled Web3 developer. I won't be going too deep into writing Solidity and will focus more on the Javascript side of things. You'll want to learn Solidity eventually but Javascript alone can take you very far in Web3. By the end of this article you should have basic understanding of how to:
 - Connect to a wallet using a Web3 library
 - Read a wallet native token balance
 - Read/Write smart contract data
 - And More

## Environment Setup

To view all the code in this tutorial, clone the [tutorial repo](https://www.npmjs.com/package/ethers) to your machine and install the npm project dependencies. Like most web3 projects, this repo is using Javascript and Ethers to connect and interact with the blockchain. To do this, open a command line type the following three commands:

> git clone git@github.com:lorem-ipsumm/web3-basics-guide.git
> cd web3-basics-guide
> npm install

## Connecting to a Wallet

Before doing anything we need to connect to an Ethereum wallet. This is done by setting up a provider using an RPC address and a wallet private key. The RPC address can be obtained by setting up an account with a service like Infura that provides a free tier. Since we won't be doing anything intensive we can use a public RPC address.

```javascript
// setup a connection to an Ethereum wallet
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_ADDRESS = process.env.RPC_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
```

## Getting a Wallet's Ether balance

Now that we are connected to the chain we can read and write data. The first thing we'll do is get the token balance for a wallet. This can easily be done by using the `getBalance` method provided by the provider variable we setup and print out the result. All we need to do is pass in the address of the wallet that we want to query. For now we'll use the wallet we setup, but we can pass any wallet address that we want

```javascript
const ethBalance = await provider.getBalance(wallet.address);
console.log(ethBalance);
// prints: BigNumber { _hex: '0xc8dcdc94b308', _isBigNumber: true }
```

The output of the `console.log` may be surprising. This is because most number values returned from the blockchain are represented in Javascript using the BigNumber library. Fortunately the Ethers library has methods to easily convert these values into a more human redable format. When you want to convert a number from BigNumber to human redable format, you use the `formatEther` or `formatUnits` methods. When using `formatUnits` you need to pass in how many decimals will be used to convert the BigNumber. Ether tokens have 18 decimals so we'll use that. 

> Note: `formatEther(rawEthBalance)` is the same as `formatUnits(rawEthBalance,18)`

```javascript
// get Ether balance represented as a BigNumber
const rawEthBalance = await provider.getBalance(wallet.address);

// convert balance into human readable format
const ethBalance = ethers.utils.formatUnits(rawEthBalance, 18);

console.log(ethBalance);
// prints: 0.00935872491046612
```

Here we can see that my wallet is currently holding 0.00935 ETH. It's important to note that this can't be used to get other token balances. The `getBalance` method only refers to the native token on the chain, which in this case is Ether. In the next section we'll go over getting individual token balances.

## Reading Smart Contract Data (Reading Token Balance)

Being able to read smart contract data is one of the most important skills you'll need as a Web3 dev. For this tutorial we'll be looking at the ERC20 token smart contract. ERC20 is the standard implementation for tokens on the Ethereum blockchain. These are the methods that each ERC20 token must implement:

```
totalSupply() // Returns the amount of tokens in existence.

balanceOf(account) // Returns the amount of tokens owned by account

transfer(recipient, amount) // Moves amount tokens from the caller’s account to recipient

allowance(owner, spender) // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom

approve(spender, amount) // Sets amount as the allowance of spender over the caller’s tokens

transferFrom(sender, recipient, amount) // Moves amount tokens from sender to recipient using the allowance mechanism. amount is then deducted from the caller’s allowance
```

You don't have to completely understand each of these methods but it'll be helpful to get familiar with them. There are more methods that ERC20 tokens can have but they aren't relevant to this tutorial. For a complete explanation of the ERC20 implementation and its methods check out [OpenZeppelin's documentation](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20).

For now, the only method we care about is the `balanceOf()` method. This will allow us to get the token balance of any address we pass in as a paremeter. First we need to setup a reference to an ERC20 token. To make this easy I've created a method that does this for us. I recommend using this snippet for your own projects as it will allow you to easily setup references to any ERC20 token and allow you to call its methods.

```javascript
// setup and return an ERC20 token based on address
const getToken = (address, wallet) => {
  return new ethers.Contract(
    address,
    [
        "function symbol() public view returns (string memory)",
        "function name() public view returns (string memory)",
        "function decimals() public view returns (uint8)",
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function transfer(address recipient, uint256 amount) public returns (bool)",
        "function balanceOf(address account) public view returns (uint256)"
    ],
    wallet
  );
}
```

This snippet uses the `Contract` class from the Ethers library to setup a reference to an ERC20 token given a token address and a wallet. The first argument in the call is the address of the token we are setting the reference up for. You may notice that the second argument in the `ethers.Contract` call is an array that contains a few of the same ERC20 methods from the list shown above. This is the human readable version of what is called the ABI (Application Binary Interface) and lets Ethers know what methods are available to be called. The third argument is the wallet the methods will be called from.

With that out of the way, we can now setup a reference and call the `balanceOf` method.


```javascript
// setup USDC token reference
const tokenContract = await getToken(
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
  wallet
);

// get token decimals
const tokenDecimals = await tokenContract.decimals();

// call balanceOf method on address to get balance as a BigNumber
const rawTokenBalance = await tokenContract.balanceOf("0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3");

// convert token balance into human readable format and pass in token decimals
const tokenBalance = ethers.utils.formatUnits(
  rawTokenBalance,
  tokenDecimals
);

console.log(tokenBalance);
// prints: 100.0
```

After calling `getToken` with the address of the ERC20 token USDC, we can get the USDC balance of the address `0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3`. As we saw when getting the Ether balance the balance is returned in BigNumber format. We'll have to use the `formatUnits` method again, but we won't be passing in 18 like we did for Ether. I happen to know that USDC has 6 decimals, but what if I didn't know. Fortunately one of the ERC20 methods that is in the `getToken` ABI was the `decimals` method. This method can be used to get the number of decimals an ERC20 token has.

So before calling the `balanceOf` method we use the `decimals` method to get the number of decimals USDC has (it has 6), then we use `formatUnits` to convert the BigNumber into a human readable format. After running this code we can see that the wallet address `0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3` has 100.0 USDC tokens. Now we should be able to get the token balance of any address that is holding an ERC20 token.

Here is all the code we've written so far

```javascript
require("dotenv").config();
const { ethers } = require("ethers");

// setup and return an ERC20 token based on address
const getToken = async (address, wallet) => {
  return new ethers.Contract(
    address,
    [
      "function symbol() public view returns (string memory)",
      "function name() public view returns (string memory)",
      "function decimals() public view returns (uint8)",
      "function allowance(address owner, address spender) public view returns (uint256)",
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function transfer(address recipient, uint256 amount) public returns (bool)",
      "function balanceOf(address account) public view returns (uint256)"
    ],
    wallet
  );
}

const main = async () => {

  // setup a connection to an Ethereum wallet
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const RPC_ADDRESS = process.env.RPC_ADDRESS;
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS);
  const wallet = await new ethers.Wallet(PRIVATE_KEY, provider);

  const rawEthBalance = await provider.getBalance("0xe0650bd7a053e30a579491811c8fe56f493ee7ef");
  const ethBalance = ethers.utils.formatUnits(rawEthBalance, 18);

  // setup reference
  const tokenContract = await getToken(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
    wallet
  );
  // get token decimals
  const tokenDecimals = await tokenContract.decimals();
  console.log(tokenDecimals);
  // prints: 6
  
  // get token balance represented as a BigNumber
  const rawTokenBalance = await tokenContract.balanceOf("0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3");
  const tokenBalance = ethers.utils.formatUnits(
    rawTokenBalance,
    tokenDecimals
  );
    
  console.log(tokenBalance);
  // prints: 100.0

}

main();

```


## Writing Smart Contract Data (Sending Tokens)

Being able to write smart contract data is the next important skill you'll need as a Web3 dev. This is necessary for executing transactions on a blockchain and is what allows for complex interactions in Web3. Fortunately most of the code we used before is reusable.

We are going to be sending ERC20 tokens from one wallet into another wallet. If we look back at the list of ERC20 methods there are two methods that will be useful for us, `balanceOf` and `transfer`:

```
balanceOf(account) // Returns the amount of tokens owned by account

transfer(recipient, amount) // Moves amount tokens from the caller’s account to recipient
```

These methods will let us send ERC20 tokens and we'll also be able to check our balance before and after executing the transaction.


```javascript
  // setup reference
  const tokenContract = await getToken(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
    wallet
  );
  // get token decimals
  const tokenDecimals = await tokenContract.decimals();
  console.log(tokenDecimals);
  // prints: 6
  // get token balance represented as a BigNumber
  const rawTokenBalance = await tokenContract.balanceOf("0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3");
  const tokenBalance = ethers.utils.formatUnits(
    rawTokenBalance,
    tokenDecimals
  );
  console.log(tokenBalance);
  // prints: 100.0

  // how many tokens to send
  const sendAmount = 50;

  // convert the send amount to BigNumber before using the transfer method
  const rawSendAmount = ethers.utils.parseUnits(
    sendAmount.toString(),
    tokenDecimals
  );

  // get wallet token balance before transaction
  const rawPreBalance = await provider.getBalance(wallet.address);
  const preBalance = ethers.utils.formatUnits(rawPreBalance, tokenDecimals);

  // execute transfer to specific address with sendAmount
  const tx = await tokenContract.transfer(
    "0x480e4f02df07a736e53baf5ba2c453c47bc2e1e3",
    rawSendAmount,
    {gas: 20 * 1e9, gasLimit: 200000}
  );

  await tx.wait();

  // get wallet token balance after transaction
  const rawPostBalance = await provider.getBalance(wallet.address);
  const postBalance = ethers.utils.formatUnits(rawPostBalance, tokenDecimals);
```

Up until line 17 everything is the same as before. We then setup a variable to decide how much of the token we want to send. In this case I went with 50, but any number can be used here as long as the wallet being used has enough tokens. Similar to how we needed to convert numbers from BigNumber to a human readable format, we'll need to do the same thing in the opposite direction in order to send our tokens. This will be done using the `parseUnits` method and it works very similarly to the `formatUnits` method we used before. We input the number of tokens we want to send in human readable format as well as input the number of decimals the ERC20 token we're using has. 

Once we have that setup we then use the `balanceOf` method to get our USDC balance before the transaction. Then we call the `transfer` method to execute our transaction. The first argument we pass in is the address we want to send the tokens to, and the second argument is the amount we want to send in BigNumber format. When executing transactions on Ethereum every transaction must have a gas price and a gas limit. Put simply, the gas price refers to `the unit of measuring the computational work of running transactions or smart contracts in the Ethereum network`. Gas limit refers to `maximum amount of gas you’re willing to spend on a particular transaction`. You can read about this concept more in [this article](https://masterthecrypto.com/ethereum-what-is-gas-gas-limit-gas-price/), but the gist is that the higher the gas price that you submit, the quicker your transaction will be submitted to the network, but at the same time, higher gas prices relate to higher transaction costs. The gas limit essentially serves as a safety mechanism to prevent your wallet from being drained if you have some kind of logic bug in your code. 

After submitting our transaction the `transferMethod` will first return an object that contains the transaction data of the `transfer` along with a `wait` method that we can use to wait until the transaction has been executed. Then we get our wallet's current USDC balance after executing the transfer, which is less than what we started with.

## Conclusion

If you've made it this far you've succefully been exposed to the core principles of being a Web3 developer. Even if you don't have a full understanding of everything covered here, you have now seen a large portion of what is needed to build complex apps. With this knowledge you should now understand the basics of reading and writing contract data on a blockchain. Your next steps should be to start learning how to write your own smart contracts which will allow you to create more complex transactions on-chain.