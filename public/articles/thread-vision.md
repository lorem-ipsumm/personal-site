Over the last few weeks I've been working on [Thread Vision](https://threadvision.xyz), a chrome browser extension that summarizes Reddit threads for you using AI, and I'm happy to announce that it is finally launched on the [chrome extension store](https://chromewebstore.google.com/detail/enofijkmilhlhbcpeedfkfeimodkdpca?utm_source=item-share-cb). Put simply, the extension allows you to quickly get an overview of a discussion within a Reddit thread, saving you time and effort.

![demo](https://s6.gifyu.com/images/bM07Z.gif)

Free users gets 10 summaries in total before they are prompted to sign up for the pro trial. Currently at the moment, you get 10 for the lifetime of the app, but I am considering updating this to be 5 summaries per day.

The premium version costs $5/month and it gives you access to unlimited summaries, the option to choose your AI model, as well as the ability to change the style of the summaries provided. Stripe is used as the payment processor which means you can cancel anytime and your premium access will continue for the remaining days in your subscription period.
# Motivation
The primary motivation initially came from feeling as though I was spending too much time on Reddit. However it's somewhat ironic being that I needed the spend significantly more time on Reddit in order to build and test the extension. Nonetheless from the moment I got a working prototype, I immediately started to see the benefits.

![demo image](https://i.imgur.com/swTYKAH.png)

I find myself spending less and less time reading through comments now that I can get an overview of what the opinions from other users. I especially find it useful for when news comes out. Being able to see what people think at a glance saves a lot of time as well as mental capacity.

![youtube summary](https://i.imgur.com/9Lqg8He.png)

Another motivation for this came from seeing AI summaries for videos on sites like Youtube and X/Twitter. There's a lot of talk about what LLMs are good for, and when it comes to short-ish form text content, I personally believe that LLMs are great for summarizing. There is still the risk of hallucinations, but that will improve over time as we get more complex and efficient models.
# Tech Stack
- **Vite + Typescript**:  Frontend/Backend framework
- **Supabase**: Easy to setup + integrate DB
- **TailwindCSS**: Styling
- **Netlify**: Hosting
- **Stripe**: Payments
# The Chrome Extension Dev Experience
I'll be honest, I kind of hated the experience. There were a lot of issues that I ran into that I'm not used to encountering, and as a result I spent more time putting this together than I had initially planned. I've been using Vite for most of my personal projects recently and I wanted to keep that going, so I found some boilerplate code that helped set that up. While there were some benefits, I can't help but feel like it may have been overkill. I'm not entirely sure yet.
### Tailwind Complications 
Obviously it's different than simply creating a website, but there were some things that were a real annoyance as time went on. Tailwind wasn't a requirement for this project but I wanted to use it, as it helps me get things styled very quickly and it pushes me to make more modular components. I kept running into issues where some Tailwind classes simply wouldn't work, specifically when I wanted to render the summary on the user's screen. As a result there is an annoying mixture of elements using the `style` prop as well as using `className` for tailwind styling (when they would work).

### Hot Reloading
This was incredibly frustrating to deal with. I am willing to admit that there probably is a solution for this somewhere but I couldn't figure it out without breaking a bunch of other parts of the app. 

If I wanted to make any changes to the summary that's being displayed, after making a change, I had to wait until the project had fully been rebuilt, and then reset the extension in the settings. At some points this was driving me crazy and significantly slowed down the development experience. 

Fortunately, for the options page and the extension popup, I just had to refresh the page to see any updates, however I did still have to wait for everything to be rebuilt
### Publishing
I was surprised to learn that you need to pay a $5 fee to start uploading and publishing extensions. Fortunately it's only a one time payment, so I don't mind too much. The most frustrating part about the publishing process is that you have to submit the extension for review before you can continue. It took about three days which wasn't too bad, but unfortunately I discovered a bug preventing the extension from working in some cases, so I had to resubmit again.
### Moving Forward
I generally believe that chrome extensions are a somewhat untapped market so this won't be my last extension, however I'll do a bit more research into what tech stacks are available that would allow me to use the tools I like using while maintaining a good developer experience. I don't need to use something like Vite for extensions, but I would at the very least want to be able to import shadcn and tailwind.
# Conclusion
Overall I am very happy with how this turned out. It solves a problem for me and from the friend's I've sent the extension to, I've gotten good feedback as well as interest in using it. It was certainly a good learning experience and I'll be able to make chrome extensions faster in the future. Like I said before, I think this is a relatively untapped market and this serves as a good starting platform for making more.

If you're interested in trying out the extension you can add it to your browser [here](https://chromewebstore.google.com/detail/enofijkmilhlhbcpeedfkfeimodkdpca?utm_source=item-share-cb). You can also check out the website I made for the site [here](https://threadvision.xyz/). I'm also open to any feedback so feel free to leave a review on the extension page, or shoot me a message on X!
