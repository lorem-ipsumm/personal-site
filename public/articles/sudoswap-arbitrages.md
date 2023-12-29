Sudoswap is an NFT marketplace similar to Opensea and LooksRare, but operates on a AMM model rather than relying on an orderbook-style model. Generally speaking this simplifies the buying/selling process. One of the big advantages is that when selling an NFT into a pool you immediately get paid in ETH if there is enough liquidity. As a seller you don't have to worry about matching someone's order, you can just immediately sell the NFT into a pool. Since Sudoswap uses its own pricing mechanism, it creates possibilities for price discrepancies between other markets, which lead to potential arbitrages. This article will go over how I made 7.8 ETH in ~1 month from executing flashloan arbitrages between these marketplaces.

![](https://i.imgur.com/nxbzdCB.png)

Here we can see the ForgottenRunesWizardsCult NFT collection on Sudoswap. It has a listed floor price of 1.75 ETH, a sell price of 1.520 ETH and an offer TVL of 7.83 ETH. The overall strategy for this arbitrage is to find NFTs on other marketplaces that can be bought for less than what the sell price is listed as on Sudoswap, and immediately sell the NFT into a Sudoswap pool.

From a broad point of view, this is how this kind of arbitrage would play out using the State of Mind NFT collection that is on Sudoswap as well as OpenSea:

### Step 1: Buy State of Mind NFT for 0.0135 ETH on OpenSea

![](https://i.imgur.com/5Lp3yxL.png)


### Step 2: Sell State of Mind NFT for 0.024 ETH on Sudoswap

![](https://i.imgur.com/h1qAmwz.png)

This resulted in 0.01091 (~12.13 USD) ETH in profit. After transaction fees this wasn't profitable, but it's a proof of concept.

To find these opportunities I was manually sifting through all collections on Sudoswap and then comparing the floor/sell price against Opensea and Looksrare. This was working when Sudoswap first launched, but as more arbitragoooors got involed, it wasn't viable. Eventually I came across the NFT aggregator Genie.xyz which allowed me to view NFT prices across multiple different exchanges (OpenSea, LooksRare, X2Y2, etc.).

Here is an example of another arb I found which was worth ~$40 after fees:

### Step 1: Buy PP NFT from Genie for 0.04 ETH

![](https://i.imgur.com/mFX3v1k.png)

### Step 2: Sell PP NFT to Sudoswap for 0.087 ETH

![](https://i.imgur.com/xywRtHf.png)

## Automation

After manually searching for these and getting small profits, I decided that it was time to automate as much of this as I could. The first step was to create an off-chain bot that would check for arbitrage opportunities. I did this by using the unnoficial Genie API. I got the endpoints by looking through the network calls on the site. On Genie.xyz, when you select a collection they make a request to their `assets` endpoint:


![](https://i.imgur.com/Tci2jQ5.png)

This endpoint returns a bunch of data about each NFT in the collection. This data includes the sell price in USD, owner, marketplace, and more. With this I could check would the cheapest NFT was. Once I had the cheapest NFT in a collection, I could then check the sell price on SudoSwap using a similar technique. At first I was using the unnoficial Sudoswap API to get price data, but they have a convenient subgraph URL that you can query to get data on a specific collection. With all of this put together, I could let the bot run and it would constantly check prices between Sudoswap and Genie against multiple NFT collections.

![](https://i.imgur.com/8whRDks.png)

With this out of the way I could start working on a smart contract that would allow me to execute these arbitrages atomically. This would eliminate the risk of me being caught holding the NFT while manually executing the arb. This also opens the door for using flashloans, which would allow me to take adcantage of arbitrages that I don't have enough capital to take advantage of. 

### Overall Strategy 

1. Use Genie API + Sudoswap API to find NFTs that are on sale across various marketplaces, and filter the ones that can be sold on Sudoswap for more
2. Call smart contract (w/ the necessary parameters to buy/sell) that will:
4. Buy the NFT for X amount of ETH that is for sale on any of the markets provided by Genie. The funds are either provided by the caller or they are flashloaned from Euler finance
5. Approve NFT to be transferred into the Sudoswap pool
6. Sell NFT into Sudoswap pool for X+Y amount of ETH
7. Repay flashloan if funds were borrowed. (Euler has no borrowing fee)
8. Transfer profit to caller


Once I had this setup I attempted to execute on an arb with less than $5 in profit. As soon as I submitted the transcation I was immediately front run by an MEV bot. The bot saw my transaction taking advantage of the arb. They then used the execution data for my call to execute the arbitrage before me, causing my transaction to fail. I suspected that this may happen but I figured if the profit was low the miners wouldn't bother, but I quickly learned that they are willing to take any profit if possible. To get around this I had to make use of flashbots which would allow me to submit private transactions. By using flashbots RPC relayer I could send my transactions directly to miners instead of having them sit in the public mempool.

![](https://i.imgur.com/B9Lt4Bh.png)

After running for about ~48 hours I had made about ~0.06 ETH ($93.45) in profit. Right off the bat I realized that this could turn into something much bigger. A few days later I managed to execute an arbitrage that netted me 2.70 ETH (~$3490) in profit. This was by far the most profit I've ever made in a single arbitrage. The NFT that I did this with was a ArtBlock NFT that cost 4.97 at the time. After purchasing it my smart-contact then immediately sold the NFT into a sudoswap pool for 7.97 ETH. I ended up sending 0.3 ETH as a bribe to the miner to get my transaction to get submitted on chain quicker, but I still walked away with a good amount of profit. 

![](https://i.imgur.com/DboHdVp.png)

After this first big win I managed to get a few more similar sized wins within the next few days. Below you can see where I was periodically recording my wallet balance as my bot continued to execute more arbitrages. Most of the profit came from 2 - 3 large arbitrages.

![](https://i.imgur.com/LTxCmSA.png)


## Conclusion

In total I made 7.38 ETH from this in just over a month. Unfortunately at this point the competition was starting to get very tough, and my bot was getting fewer and fewer arbitrages. There were a few bots that were getting every single one my bot attempted, and they managed to get their transactions submitted before mine every time. This meant that there was a lot of room for improvement, but I wasn't entirely sure what I needed to do. I tried making a few changes and optimizations to see if I could put myself back in the game but I had no luck. Eventually I decided that I was more than satisfied with the profit I'd made, so I called it quits. While I've been interested and searching for arbitrages for over a year now this was by far the most profitable strategy I've come up with, and quite frankly the strategy itself isn't that complex. Putting it together was a little tricky, but in total it took about two weeks. 

This is my first time writing a long-form article like this on a topic like this so I apologize if it's messy and chaotic, but I hope that you enjoyed reading through this. I tend to experiment with arbitrages and MEV-esque strategies quite a bit, so I will continue to record my findings. 
