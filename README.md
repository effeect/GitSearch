# GitSearch

This is a redo of the github repo search app found here : https://github.com/effeect/github-repo-search-app

# Why remake it?

Long story short but it was made as a technical assessment and I wasn't happy with the way it turned out and had a few fundamental design flaws upon reflection. After spending some time doing some research and pondering, I decided to make a new one from scratch.

# What's changed?

I've made a few changes but my main one was to take advantage of React-Query and some other design principles :

- React Query has compressed a lot of annoying issues I was having with loading state and keeping things clean. I could switch back if React Query was non-existent tomorrow but I'm happy with what I've got
- Frankly, all of the components in the previous application were particularly messy so I decided to adopt an atomic design principal, this is my first time doing it and whilst I don't think its perfect, its miles better than before and it should allow me to do automated tests quite easily

Read more about Atomic design here : https://medium.com/@abdallahosama8053/mastering-atomic-design-in-react-a-practical-guide-for-scalable-ui-architecture-bbb86abed541

# API is now seperate

GitSearch-API is a seperate repo, can be found here : https://github.com/effeect/GitSearch-API/tree/main

# Still to do

I haven't done a feature complete redo yet and there is some things I want to implement fully :

- JSONServer implementation that allows me to quickly test without the need for the API to be live and running (low priority but still would be nice)
- Take advantage of Vitest
