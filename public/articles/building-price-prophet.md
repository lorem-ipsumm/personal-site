Price prophet is a site that allows traders to practice their technical analysis skills on real data from historical market prices. Users are given a random range for a random asset and are able to make predictions based on which direction the price will move in the next few candles. 

This is the first real product that I plan on getting to market and while I've taken several breaks on this, I want to document the rest of the process. As of now I'm very close to being able to release the first version, but there are still a few features and bugs that I would like to add before launching. 

# Tech Stack
- **NextJS + Typescript**:  Frontend/Backend framework
- **Supabase**: Easy to setup + integrate DB
- **TailwindCSS**: Styling
- **Vercel**: Hosting
- **Stripe**: Payments

Aside from NextJS these are all tools that I am very comfortable with. I have plenty of ReactJS experience but NextJS adds more features that I haven't entirely wrapped my head around, however I really like the API routes feature. In terms of hosting I went with Vercel since as far as I know it has the best support for NextJS.

I've never used Stripe before but so far it's been relatively easy to work with and integrate. I don't have to write much code for building a checkout and managing user subscriptions, so I'm happy with this decision, however in the near future I want to integrate crypto payments as that is my target market at the moment.

# MVP Features
As stated before there are a few features remaining that I would like to implement before officially launching, these currently include:
- Improve mobile responsiveness throughout the site
- Improve signup/subscription flow
	- At the moment you need to sign in before you can subscribe to the pro plan (which makes sense), but right now nothing prompts the user to do that which will cause some issues after they submit the payment, so this needs to be fixed.
- Integrate Crypto payments
	- Given that this app largely revolves around crypto markets it makes sense that the majority of my users will be crypto users themselves, so it would make sense to create payment methods that cater towards them.
- Publish the app with Google Oath and Stripe
	- I am currently only using these two services in their dev modes so there are some restrictions, and I can't actually accept any payments.

# Final Thoughts
To be entirely honest I do not expect this app to receive much usage, however this app serves as a starting point for me continuing to develop and launch more apps. I'm very attracted to the idea of building apps and services for a living, but I can't expect to get there without a few failed/retired projects under my belt. I intend to maintain this for as long as possible, but once this is launched I will start working on a new product. With all of that being said, thank you so much for stopping by and I hope you come back to see more updates as well as the eventual launch of Price Prophet!