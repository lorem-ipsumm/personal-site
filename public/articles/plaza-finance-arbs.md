Roughly twice a year I am blessed by the on-chain gods with a profitable arbitrage opportunity. This past May I received my first blessing of the year that involves a protocol named [Plaza Finance](https://plaza.finance/) and was able to make just under 2 ETH within a week executing on these opportunities. It started with me coming across Plaza, looking throug the docs and immediately feeling in my balls that there may be something worth exploring here.

## Plaza Finance

Plaza Finance is a derivatives platform on Base that offers two core products, bondETH and levETH. They both are programmable derivatives of a pool of ETH liquid staking tokens (wstETH, weETH, ezETH, cbETH, etc.). levETH is essentially a leverage token that allows you to leverage your exposure to ETH by holding the token. They have their own pool that lets you swap between ETH derivatives and levETH, and at the same time levETH is a standard ERC20 token which means that there are public pools on-chain where users can swap in and out of the token.

Because Plaza has a pricing mechanism that works differently than what traditional AMMs use for pricing, price discrepancies arise between Plaza's pool and the public market AMM pool.

The arbitrage works in one of two ways:
- Open market -> Plaza pool
	- Swap ETH -> levETH on open market
	- Swap levETH -> ETH on Plaza for profit
- Plaza pool -> Open market
	- Swap ETH -> levETH on Plaza
	- Swap levETH -> ETH on open market


Here is an example of one of the early arbs that I executed on:

###  Swap 0.5 ETH -> 0.4744 levETH on open market
![](/images/plaza-finance/1.png)

### Swap 0.4744 levETH -> 0.5063 ETH on Plaza
![](/images/plaza-finance/2.png)

With this in mind I started manually checking exchange rates between the open market and Plaza. I immediately noticed that at least a 5 - 6 times a day there were some price discrepancies that were large enough to care about. The example above resulted in a 1.26% profit, which at the time was ~$13. Nothing crazy at this point, but enough profit to warrant trying to see how far I could take this.

After manually executing on this a few more times to verify that it works, I decided to start automating the detection part. Eventually I would automate the execution as well, but that takes a lot more effort, so I would hold off on that until I was certain this was repeatable.

## Arbitrage Detection

![](/images/plaza-finance/3.png)

I won't go into too much detail on the nitty gritty of how exactly the detection works, but from a broad point of view I'm simply checking the price on the open market (using one of many public aggregator APIs), and then stringing together multiple on-chain calls to get the execution price on Plaza. In the picture above you can see that I am looking at `plazaToMarket` as well as `marketToPlaza`. This represents the two different directions the arbitrage could be possible in (as stated earlier). After running these checks I could then compare the input and output amounts and determine whether or not an arbitrage would be possible.

I let this code run for a bit while still manually executing on the larger ones that appeared. At the time it was fun to execute them, but I wasn't particularly excited about it. I was getting $5 - $10 per arbitrage, which isn't nothing, but I didn't feel as though it was worth creating a smart contract to fully automate it. That was until some of the arbs started to get taken before I could execute on them, and if I'm being honest it was annoying me, so largely out of spite I decided to automate the entire process to try and push the others out.

## Smart Contract Logic

- Depending on the direction there are two paths
	- The direction will be passed into the contract upon execution
	- MarketToPlaza:
		1. Swap ETH to levETH on the open market
		2. Call Plaza's withdraw method
	- PlazaToMarket
		1. Swap ETH to levETH on Plaza using the deposit method
		2. Swap levETH to ETH on the open market

This was the initial plan for the smart contract. As far as arbitrage contracts that I've written, this was actually one of the easier ones to write. I wouldn't have to spend much time coming up with any fancy techniques to execute on the opportunities. I was initially going to use flashloans for this, but it's been at least a year since I last implemented them, so I decided to just hold some ETH in the contract as funds for the executions.

## Running The Contract

Once the contract was up and running it was surprisingly going fairly smooth and I was doing well competing with the other people executing on them. I wasn't getting every single arb, but I'd say I was getting about 7/10 of them. Every 10 minutes or so I'd get about $5. It felt like I was just pulling money out of thin air. There were some ideas I had for improving it but I was fairly busy at the time and was pretty happy with the results.

At this point I started to realize how profitable this could be. While each arb was only about $5 - $10, I was landing them roughly 20 - 25 times a day. At the peak the bot was making roughly $20/hr. Not ground breaking, but all of this took at most 12 hours to setup so I think it really paid off.

## The 5/8 event

![](/images/plaza-finance/5.png)

On May 8th, I had just finished up working out at the gym and my phone was blowing up with numbers that made no sense. The vast majority of the arbs were somewhere between 1% and 5% profit, but someone had aped ~$10k (???) into the public pool. The pool only had about $50k in it at the time, so this caused a massive spike in the price compared to the Plaza pool. I looked at my phone and I was seeing insane profit amounts, +145%, +133%, +225%, etc.

Had I not created the contract, I would not have been able to take advantage of this opportunity. I've always seen massive spikes in prices get arbitraged down before, but this is the first time I've been part of the force that brings it down to equilibrium. I have to say, it felt pretty cool.

![](/images/plaza-finance/4.png)

levETH had always been a few thousand dollars above the price of ETH. That's just how the Plaza pool priced the asset, but because of that large buy, the price of levETH on the public market shot up to around $12k which was significantly higher than what Plaza was quoting it at. Within seconds my bot along with the other bots executing arbs had brought the price back down to where it should be, and by the end of it I was up nearly 1.5 ETH just from that minute long spike.

## Getting Outplayed

After this point I started to get fewer and fewer successful arbitrages. It got to a point where I was getting beaten 9/10 opportunities. I tried a few different strategies to get back into the competition, but nothing really stuck long term. I could have kept trying new strategies, or gone deeper into the logic of Balancer pools, but ultimately I decided to call it quits.

![](/images/plaza-finance/6.png)

At this point I decided I was happy with my relative success here. I've somewhat resigned myself to not fully competing for these after a certain point. Maybe in the future when I have more time I'll commit to really competing, but after a while you end up competing with people who are doing this full time and have way more experience, resources, and time. I'm okay with my "minor" wins here and there and at the moment I'm not interested in optimizing for milliseconds of efficiency. Aside from that, broadly speaking, sometimes I execute these arbs just for the fun of it. I get a decent amount of satisfaction knowing that I'm able to find and execute on them.


## Conclusion

Overall this only lasted for about a week before I decided to call it quits. While it would have been nice to continue competing, all things considered, it was a good experience. Like I said before, I really just like being able to find and execute on these. My personal white whale is to find and execute on an arbitrage that will set me up for life. It's an extremely lofty goal, but I like to think that in order to ever come close to finding it, I need to be able to find the small and relatively inconsequential opportunities.

If you made it to the end, thank you for reading! I hope you enjoyed the article and got some motivation, enjoyment, or inspiration from it. If you want to keep up with what I'm doing, follow me on X/Twitter [@lorem___](https://twitter.com/lorem___). You can find my more short-form thoughts on there.
