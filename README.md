# nfters

## S3 Configuration

Create an AWS S3 bucket with public read access and set the following environment variables:

* `S3_BUCKET` - Name of the bucket
* `S3_REGION` - Region of the bucket

Alternatively, you can use the `S3_ENDPOINT` environment variable instead and make it point to a local [MinIO](https://min.io/) instance.

If you do not have set your AWS credentials locally yet, create a file `~/.aws/credentials` with the following content:

```text
[default]
aws_access_key_id = YOUR_AWS_ACCESS_KEY_ID
aws_secret_access_key = YOUR_AWS_SECRET_ACCESS_KEY
```

This account must have write access to the bucket so that the backend is able to generate signed upload URLs.

## NPM Dependencies

Install dependencies with:

```txt
npm install -g @microsoft/rush && rush update
```

> *RushJS is the monorepo and build tool used to manage dependencies across projects*

## MongoDB

You'll also need a local MongoDB instance available. Use the `MONGO_URL` environment variable to set up its mongodb connection string if it needs credentials or if you'd like to use a different db name than `nfters`.

## Run

Then, start the backend with:

```txt
cd packages/backend && rushx start:dev
```

And the frontend server with:

```txt
cd packages/nfters && rushx start
```
