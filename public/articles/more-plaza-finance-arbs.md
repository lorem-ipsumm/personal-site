Foreword: This is a continuation of the article [previous article on Plaza Finance arbitrages](/articles/plaza-finance-arbs) 

---

Shockingly I was able to make even more money from Plaza Finance with more arbitrage opportunities. On August 28th the Plaza team decided to wind down the protocol. While there was a lot of turmoil in regard to the pricing of levETH, I don't think anyone in the community expected the protocol to shut down so abruptly. Minutes before the announcement levETH was sitting at ~$2400 and after the announcement the price immediately dropped to $19.

![](/images/plaza-finance2/1.png)

 As part of the wind-down announcement they also announced that they would be letting people redeem levETH for ETH at a fixed price. I quickly realized that there might be an opportunity here, however I initially assumed that they would at least take a snapshot that would prevent me from just buying the token at that $19 price and redeeming it at the $2400 fixed price.
 
![](/images/plaza-finance2/2.png)

However just in case, I decided to buy about $100 worth of levETH at around $19 and was able to quickly accumulate 1.64 levETH. The way they did this was by deploying a custom redemption contract. They posted the address for the contract and when I checked it out I was shocked to see that there was no snapshot/merkle logic at all. Anyone with levETH could instantly redeem their levETH for ETH at a fixed price. As a result I was able to redeem that 1.64 levETH for ~0.88 ETH. Being that I spent at most $100 for that levETH I was left with ~$2k in profit.

I wasn't the only one to realize this. As soon as more people understood, the price shot up from ~$100 (it pumped a bit from the initial dump to $19) straight to ~$2400.

![](/images/plaza-finance2/3.png)

I was obviously quite happy with this profit, but I quickly realized that there was more profit to potentially be made by continuously arbitraging between the redemption pool and the open market pool on aerodrome. 

Basically, it's safe to assume that not everyone holding levETH will be aware that there is a redemption pool where they can redeem their levETH for ETH without any slippage at a fixed price. These people will just sell their levETH on the open market. This is where I step in (or anyone else that is aware). Every time someone sells their levETH into the public aerodrome pool they are temporarily pushing the price down below the redemption pool price. I can take advantage of that by monitoring the aerodrome price of levETH and comparing it with the redemption pool price.

As usual, I started off with a detection script, which was very straightforward and took ~20 minutes to setup (just fetch a quote for ETH -> levETH, and then plug the levETH output amount into a formula that calculates how much ETH that can be redeemed for). Once I had this running I was able to manually execute a few arbs. I think the first few were just $5 - $10 at a time. Nothing crazy, but enough to warrant focusing more time on this.

While I could have kept using only the detection script and manually taking the arb, the process involved buying, then approving, then redeeming. I could get rid of the approval step by doing an infinite approval, but simply out of principal, I prefer not to do infinite approvals. So instead I decided to setup a contract.

The contract logic is pretty straightforward. Assuming an arb is detected:
1. Swap ETH to levETH in the aerodrome pool
2. Redeem levETH for more wETH (the redemption contract redeems wETH in return for levETH)
3. Unwrap wETH to ETH

![](/images/plaza-finance2/4.png)

I've seen charts like this (pretty common for stables), but it's very cool to be the sole person that is maintaining a price range. It's also cool to see how different pricing mechanisms completely change the price movements of an asset. Prior to the wind down it looked more like your typical volatile asset, but now the price is pinned within a fixed range.

Interestingly there wasn't really anyone else competing against me on this arb. Prior to me setting up my detection and execution bot there were some people manually arbing at the beginning, but once I had the contract setup, they stopped competing. At this point I had made ~0.569 ETH arbing the price to match the redemption pool. This combined with the additional purchase of levETH at $19 put me at ~1.449 ETH earned from this in total in a matter of 48 hours. Absolutely insane for me.

As more people redeemed, the arbitrage opportunities became less common. There were fewer people still holding levETH so I just had to wait for the remaining holders to either sell or redeem their levETH. 

# 9/13/25 Update
For some reason the Plaza site stopped working and users weren't able to directly redeem their levETH for ETH. The Plaza team started directing people to swap on aerodrome instead of using the site which previously worked. Very strange behavior from them, but this was of course great for me since I seemed to be the only one maintaining the price in the aerodrome pool.

![](/images/plaza-finance2/5.png)

There were a few large sales on the 11th making the price temporarily dump to ~$900, which was around 167% from the redemption price. I was able to make ~$1.5k within an hour that night alone.

At this point there was still 7.5 ETH left in the redemption pool but I wasn't sure how long it would be until that was depleted. That being said, all of the large holders had either sold or directly redeemed, so from this point forward I was really just arbing from smaller sales.

Around this time I calculated that I was making ~0.00313 ETH ($14.53) per hour. It's not a crazy rate, but being that my bot was running running 24/7, that scales pretty quickly and is roughly $348 per day. Not too bad.

# Conclusion
About three months have passed since I started this and at this point I've stopped running the bot since I'm just wasting RPC calls. Additionally the volume and liquidity have nearly stopped aside from a few small $1 - $5 sales every few hours. There is currently only $1.6k remaining in the liquidity pool so I think it's safe to call it quits.

In total I made ~2.46 ETH from this round of Plaza arbitrages. If I include the profit made from the first round before the protocol wound down, I have made 4.91 ETH (~$14k) . This is by far the most money I've made within a single protocol (unc's still got it).

 It's times like these that remind me how PvP these markets really are and sometimes all you need is a little extra information in order to win. Theoretically none of this should have been possible since there exists a contract where people can directly redeem their levETH for ETH. However, realistically the majority of crypto users don't feel comfortable executing transactions directly through a block explorer. On top of that, the Plaza team kind of screwed them over by disabling the website where people were previously redeeming.

All that being said, thank you for reading my ramblings. I've been on the hunt for more opportunities but nothing has come up yet. Hopefully I find something before the end of the year, but it's hard to know whether or not that will happen. Either way, I'm liking the progression I'm making in terms of being able to find and execute on these. The average amount I'm making per arb is slowly but surely increasing so I seem to be doing something right.

If you want to keep up with what I'm doing, follow me on X/Twitter [@lorem___](https://twitter.com/lorem___). You can find my more short-form thoughts on there.
