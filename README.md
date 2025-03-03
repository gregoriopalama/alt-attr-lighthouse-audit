# ALT attribute Lighthouse Audit

## Prepare your environment
* Create a `.env` file that contains a `GOOGLE_SERVICE_ACCOUNT` env variable. The variable's value should be a service account with the `Vertex AI User` role
* Globally install `dotenv-cli` using `npm install -g dotenv-cli`

## Run Lightouse with the custom audit:
* Use this command to run lighthouse with the custom audit: `npm run test -- YOUR_SITE`, specifying the URL to test instead of `YOUR_SITE`