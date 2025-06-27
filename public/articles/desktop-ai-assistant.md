A few months ago I decided to build my own desktop assistant as a way to break away from relying on popular online LLMs like ChatGPT and Claude. In this article I'll be going over my motivations as well as a broad overview of the project as a whole. I won't spend any time going through the code, but it's all open source and on my [Github](https://github.com/lorem-ipsumm/electron-gpt), so if you want to make your own, feel free to fork my project.

In the last year and a half we've seen a lot of growth in the popularity for LLMs like ChatGPT, Claude, and more. It's become obvious that LLMs can be incredibly useful and powerful tools when it comes to certain tasks. I personally use ChatGPT often and in some ways it has replaced search engines like Google for me. While I am aware that LLMs tend to hallucinate, when it comes to thinking through ideas or projects, LLMs are very useful for breaking down steps and exploring thought processes.
## My Motivations

My general motivations for this are that I believe that every single person should have private access to a semi-powerful LLM. LLMs aren't perfect, but I like to think of them as a version of Wikipedia that you can talk to. They have massive amounts of data collected from on and offline media and it's compiled in a way where we can communicate with it using natural language. Search engines are still better for some tasks, but there is a lot of ground that LLMs can and likely will take from them.

Fairly frequently I find myself hesitating to ask ChatGPT certain questions when they may give away personal info about myself. In general I'm very conscious about the data I give away while browsing the web, and as my usage of ChatGPT has increased I've become increasingly aware that a lot of personal info about me can be assumed based on the questions I ask. These worries led me to looking into how I can run models locally.
## Enter Ollama

[Ollama](https://ollama.com/) is a project that allows individuals to run a variety of models locally on their own machines. I had tried different solutions such as GPT4All, and while each of them got the job done, Ollama had the most flexibility and was easiest to build on top of. It runs perfectly on Linux and it exposes REST API endpoints in order to run and manage models.

## My Application

![demo](/images/assistant/1.gif)

After learning how easy it was to work with Ollama I decided to make my own. To do this I went with Electron to build the actual desktop application itself. As a web developer, Electron allows me to use the tools I am already comfortable with such as React, CSS, Tailwind, etc.

As stated before, while Ollama is running, it exposes a REST API that allows me to communicate with models. This makes it incredibly easy to hook up to an app. For example, if I wanted to start a chat with a Llama2 model I would make a POST request to the `/chat` endpoint. It would look something like this:

```
curl http://localhost:11434/api/chat -d '{
  "model": "mistral",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
```

As the conversation continues I simply add my messages and the models replies to the messages array that is passed in, and that is used as context for the model when responding. By default Ollama runs on port 11434, so all requests need to go to that port. This is only one of the many endpoints that Ollama makes available, however, this is the majority of what I needed to build this app.

## Using Models From My Laptop

While there are some models that would work on my laptop, like TinyLlama, they aren't as smart and have very narrow use cases. To remedy this I setup a server with [Paperspace](https://www.paperspace.com/) that has an NVIDIA P4000 GPU available. All I had to do was install Ollama on the server and then do some port-forwarding magic through SSH in order to communicate. Here is an example of what that command looks like:

`ssh -L 8000:localhost:11434 paperspace@219.42.536.443

What this does is it maps port 8000 on my machine to to localhost:11434 on the Paperspace server. This allows me to communicate with the model on the VPS with minimal changes to my code. I just need to change the port my frontend communicating with to 8000 instead of 11434.

Once all of that is setup I can start my UI and use whatever models I have installed on the VPS. It would still cost a lot of money to run the top of the line models, but this essentially gives me private access to powerful models from anywhere as long as I have my laptop with me.

## Final Thoughts

In all honesty, at the moment, none of the models I've used compare with ChatGPT/Claude especially when it comes down to longer conversations. The biggest drawback that I see with these models is the context length as they will completely forget what we are talking about once the conversation gets even a little long.

While I know that there are very good models that can compete with the heavy hitters, I am constrained by the limitations of my PC and the specs of the VPSs that I use/can afford. That being said, I have laid the groundwork for being able to eventually use powerful models that can compete. If I ever feel like spending the money for a powerful VPS or a more powerful PC I've already written the code that will allow me to interact with these models in a user friendly way. In the meantime, it's fun to play with and experiment with models that are made for specific use cases.

If you have any questions or you'd like to build something similar feel free to reach out to me on [Twitter](https://twitter.com/lorem___)!
