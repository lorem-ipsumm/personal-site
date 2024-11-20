
[SVGenie](https://svgenie.xyz) is an app that allows web developers to convert SVGs into Typescript react code and import them into their projects with a single command. 

This project was inspired by me running into the issue of working with a designer that works in figma and having to manually import SVGs into my projects. The process of importing the SVGs manually isn't too much effort, but it takes time I'd rather spend actually making the site. With SVGenie I've cut reduced that time to a few seconds.

![demo](https://s11.gifyu.com/images/SGsPN.gif)

The project itself isn't that complicated and in all honesty it took about a week to get a working version published. After I laid out the basic requirements and structure and I realized that the barebones requirements aren't the complicated, I decided to try some new frameworks and technologies out. Those being, vite, netlify functions, and npx.

## Tech Stack
- Frontend: Vite + React + Typescript + Shadcn
- Backend: Netlify cloud functions
- DB: Supabase
- NPX command: Typescript

## App Flow
1. User pastes SVG code, uploads a file, or pastes a link to an SVG hosted somewhere.
2. Raw SVG code is converted to a typescript react component
3. Converted component code is stored in a DB and is given a unique ID
	1. For ex: 1bef55ac
4. The user is presented with a command to import the SVG into their project
	1. Something like npx SVGenie@latest 1bef55ac
5. The command goes to the server and reads the DB to fetch the entry with the ID 1bef55ac
6. The command creates a new file in the project with the SVG source

As you can see, there isn't that much going on, however there are some separate services that need to work together. As stated in the tech stack, when I refer to the server here I'm referring to the Netlify cloud functions. I only have two functions, one for storing components and one for fetching components.

For the DB, a free instance of a Supabase DB is more than enough for this use case. The DB contains a few columns such as id, timestamp, and converted react code.

## The Vite Experience 
This was my first time building a project with Vite and I have to say that the development experience is 10x better than NextJS which I've been using for all of my projects. Aside from the speed improvements, it's also nice not having to worry about hydration issues and the intricacies of client/server components. I do enjoy using NextJS, and the biggest feature that I'll miss is the built in API method support, but at times it feels too opinionated. 

The experience was so good that once I got all of the tools setup (shadcn, tailwind, etc.) I immediately copied the directory and saved it so I can use it as boilerplate for future uses. If you're interested in using it, I've uploaded it to github [here](https://github.com/lorem-ipsumm/Vite-React-Tailwind-Shadcn-Boilerplate). It doesn't come with any fancy bells and whistles, it's just a barebones Vite project with some added tools that I use in almost all of my projects.

Another big reason for why I went with Vite is that I've gotten really into self-hosting lately, and while nothing in this project is self-hosted I know that people have issues hosting NextJS on their own servers or VPS. Throughout the development process I was thinking about the possibility of moving the entire app to a VPS. At the moment, I don't need to, but this is something I'd like to be able to do and feel comfortable doing. Having experience with a framework that is much easier to host anywhere will help out once I start diving deeper into self-hosting.

## Netlify Functions
I also used [Netlify cloud functions](https://www.netlify.com/platform/core/functions/) for the first time in this project, and it was a very smooth process. With NextJS I would have simply had these methods in the API directory for the project, but as stated before I want to be in a better position to self-host my apps and don't want a hard reliance on NextJS and Vercel. I do have a reliance on Netlify as it hosts the site and the functions, but the site can be hosted on just about any VPS, and the same goes with the functions if I switch to using express.

## NPX 
As a web developer I'm very familiar with npm and npx, but I've never actually created my own package before. Fortunately the development experience was pretty straightforward. The core feature I wanted in the application was to allow me to import files into a project. I considered potentially making this a VSCode extension, but after looking into the development stack/experience for making extensions, I was kind of turned away. I'm sure it's not too bad, but as I was already using a few different pieces of tech that I hadn't used before I didn't want to spend time learning yet another new tool. That's an adventure for a project in the future.

The inspiration for using npx came from using [v0.dev](v0.dev). After prompting the AI to generate code for a web page, you're presented with a dialog to "Add to Codebase".

![v0.dev](https://i.ibb.co/317nX52/Screenshot-20241120-112622.png)

Running this command in your terminal prompts you with a few questions and then imports the entire component into your project. I thought that was pretty nifty and felt that it was capable of doing exactly what I wanted. All I needed to figure out was the general architecture to get it working.

## Open Sourced npm Package
I've published the code for the npx command on github. It's a fairly small script, but as it executes code on your machine, I feel that it's worth making it open source so that people can see what exactly it's doing. You can access that [here](https://github.com/lorem-ipsumm/svgenie-package).

## Conclusion
Overall this was a good experience that actually solves a problem that I run into fairly frequently. There are other sites that convert SVGs to TSX, but I didn't find any that let me import into my project (that or I didn't look that hard). The one thing I was interested in the most was having an npx command that can pull data from the web, so I likely would have made this project regardless if I found another solution.

As for the tech stack, I'm really liking Vite + Supabase, however I have a few projects on Supabase and while I don't mind getting rid of the experimental ones, if I make any more projects I'll likely have to pay. That being said I recently came across [Pocketbase](https://pocketbase.io/) and I'm really liking experimenting with it so far. As far as databases go, it's incredibly simple to use and get hosted.

Feel free to check out the site at https://svgenie.xyz