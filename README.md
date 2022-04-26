# nfters

Install dependencies with:

```txt
npm install -g @microsoft/rush && rush update
```

> *RushJS is the monorepo and build tool used to manage dependencies across projects*

You'll also need a local MongoDB instance available. Use the `MONGO_URL` environment variable to set up its connection string if it needs credentials or if you'd like to use a different db name than `nfters`.

Then, start the backend with:

```txt
cd packages/backend && rushx start:dev
```

And the frontend server with:

```txt
cd packages/nfters && rushx start
```
