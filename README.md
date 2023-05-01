# bb2

CLI utils while learning the bluesky API

in `index.ts` uncomment the task you want eg

```
  const func = getRepos
  // const func = getTimeline
  // const func = getRecent
  // const func = doPost

  func({ agent, params, opts, did }).then(res => {
```

[TODO proper CLI with params]

So far:

* doLogin - first signin auth session
* getRepos -
  scrape repos of users in order of joining. also gets first X posts and dumps to src/dumps/repos.json
* getRecent -
  get recent <count> posts from user
* doPost -
  make a post
* getTimeline -
  get a users timeline


## Running
```
npm run build
npm start
```

(for some reason esm modules don't always get rebuilt with just `ts-node-esm`)

you can also use the [justfile](./justfile)
but that requires installing the extremely useful [just](https://github.com/casey/just) tool



# based on: Alice's atproto starter kit

https://github.com/aliceisjustplaying/atproto-starter-kit

Use this as a template repo. Requires Node 18+ with typescript and ts-node installed globally (`npm i -g typescript ts-node`). Add your bluesky username and password to `.env` then run your app with `npm run start` or `ts-node-esm index.ts`.

I recommend using `eslint` (for linting) and `prettier` (for enforcing code style) in your chosen text editor (or from the command line).

API documentation can be found here: [https://github.com/bluesky-social/atproto/tree/main/packages/api](https://github.com/bluesky-social/atproto/tree/main/packages/api)

@ me on bluesky (@aliceisjustplaying.bsky.social, did:plc:by3jhwdqgbtrcc7q4tkkv3cf) if you've built something interesting with it!
