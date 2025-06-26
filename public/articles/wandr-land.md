[Wandr.land](https://wandr.land) is a web based social experience / digital art piece I've put together that allows people to create a share drawings. The main access point to the site is through QR codes that I've placed around the city I live in as well as any cities I travel to. The core idea is to give people an unexpected novel experience when they scan a random QR code they come across in their normal day-to-day life.

![demo](https://s6.gifyu.com/images/bzbBO.gif)
## Motivations
I'm very interested in the idea of scanning a QR code and being presented with an activity that I can immediately participate in. The reason it exists as a website that can be accessed through a QR code is that I want it to be something that people can come in contact with unexpectedly. There is no app to download, no account to create, and no incentive to polish what you post for maximized consumption. The drawings are meant to be raw and unfiltered snapshots of the visitors imagination at the time of visiting the site.

After someone leaves a drawing I fully expect them to entirely forget about the site and never come back. All drawings left on the site are largely for the future visitors, as well as for my personal enjoyment. There is a certain amount of enjoyment that I get when I open the site and see new drawings. I feel a sense of accomplishment knowing that someone took the time out of their day to participate in my goofy app.

## Inspirations
HQ Trivia and Pokemon Go are two apps from my past that heavily driven my motivations in making sites like these. These two apps completely changed the way that I look at apps and what it means to be an app. These felt more like experiences rather than pure dopamine drips that I had come to know.

In order to participate in Pokemon Go you had to interact with the real world. The direct analog for wandr.land is that the main entry point is through QR codes that you encounter in the real world. Wandr.land isn't nearly as complex and intricate as Pokemon Go, but the idea is to create a sense of wonder that comes from an online experience that heavily relies on you being outside.

There isn't a direct analog in wandr.land for HQ Trivia but I felt I should mention it anyways. Something about tuning in for a game on my phone every day was very interesting to me at the time. Seeing the chat roaring with messages from people all over the country and world was fascinating. While wandr.land doesn't share any properties with HQ Trivia, I like to keep it in mind because what I want most from these apps is to give people a "wow" sensation when using my apps.

## Lifespan
This app will likely have a short life in terms of updates and development. I won't be taking it down any time soon, but there isn't much room for growth and that's okay. There are no monetization schemes, no go-to-market plans, or any kind of long term roadmap. I'll do some polishing to make the overall experience better, but after some time it will simply live on in its existing form. For me, there is something liberating in the thought of an application simply existing without the need for constant and undefined growth.

I really like the concept of bite-sized social media experiences that are more focused on novelty than longevity. Many of the social media I use on a regular basis will likely be in existence indefinitely. There is a certain amount of value that I get out of these (Twitter/X, Instagram, Reddit, etc.), but these experiences come with mental baggage that starts to build up over time. Wandr.land is meant to be something that you come across one day and completely forget about. The overall experience is incredibly short-lived, however the aim is to give visitors a sense of novelty and surprise for that brief moment.

## Built In Anonymity
The app is purposefully built in a way to remove any potential barriers that would prevent visitors from engaging. This comes with both advantages and disadvantages, the largest disadvantage being that there is no explicit incentive to not post hateful or harmful content. One of the biggest advantages is that being fully anonymous removes the mental barriers that people may have when posting something. This comes with its own collection of issues, but I want people to feel free to draw whatever is on their mind or whatever they are feeling.

There is a bit of a trickiness that comes with allowing people to post anything they want. I want the feed to be unfiltered and raw, but I want people to feel comfortable posting something. I don't want to ever censor anything someone posts, but I don't want someone to immediately feel offended when they view the site. On one hand they should just "get over it" I guess, but being that the main access point is a QR code I don't want someone to scan one and immediately get flashbanged with hate speech when they open the site. For now I'll simply play it by ear and see what happens.

## Tech Stack
- Vite + Typescript: Website framework
- TailwindCSS + Shadcn: Styling
- Supabase: Database
- Netlify Functions: Serverless functions

Normally I put the tech stack info earlier in my articles, but I wanted to focus more on the motivations and my though process of the app. That being said, I feel as though I've really been hitting my stride with this specific stack. It's incredibly easy to setup and I'm really liking the experience of using Vite compared to when I used NextJS in the past. As for Tailwind I've been immediately sold on it since the first time I used it. It just integrates incredibly well into my workflow and I find very easy to use and modify.

I really like Netlify's cloud functions. They are incredibly simple to setup and doesn't add much complication to the app. My biggest issue with them is having to run the app locally through their cli with `netlify dev` in order to test the cloud functions. I'm sure I can get around this, but for now it's fine.

Supabase is very convenient for these small-ish projects. My only gripe is that the project gets "paused" if no one uses it for a while unless I want to pay for a subscription. If I continue making projects with Supabase I'll need to subscribe anyway as I can only have around 5 projects at a time (I can't remember the exact number).

My ultimate plan is to eventually move to something like [PocketBase](https://pocketbase.io/)for databases, and running all of my servers in typescript using something like Express. I want to be able to self host all of my projects and break free from these cloud hosting solutions.

## Conclusion
This is technically the second or third social experience I've created,but this is the one that I like the most and feels the most polished. I've had a lot of time to think about what my motivations are and why I want to make these. I'll write more in detail about the previous versions in a future post, however I will say that they were more-so experiments and at the time of building them I hadn't really fleshed out my opinions and beliefs on what it means to crate a social experience. They were more akin to your traditional apps and websites that incentivize repeated use and there were some loose plans on how to grow and expand.

At the moment I like to think of these somewhat similar to performance art but with a heavy digital influence. While I don't see myself as much of an artist in the traditional sense, I'm attracted to the idea of using my skills as a web developer to create experiences that can evoke feelings and emotions similar to those of traditional art pieces.

I don't feel as though I've reached the final form of what I believe it means to create social experiences, however each project and experiment brings me closer, and this is yet another step that I can use to further this journey.

As of now, the best way I can describe the internal motivation is that in a sea of dopamine drip websites and apps I want to create novel experiences that give sensations of wonder and surprise. At times I feel like that idea feels a little "out there", but it genuinely bothers me that we have these complex networks of people and apps and so many apps are just cookie cutter copies of each other. A lot of the magic of social media is gone, and while I don't plan on being the lone ranger who single-handedly brings it back, I want to make apps that stand out. Not necessarily in a ground-breaking or innovative way, but more-so in a creative and fascinating way.

If you want to check out the site you can access it at [wandr.land](https://wandr.land)
