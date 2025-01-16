# Deploy Next.js to Flightcontrol

This is a Next.js template which can be deployed to [Flightcontrol](https://www.flightcontrol.dev/?ref=nextjs). This will deploy Next.js to a long running server with autoscaling, self-healing, and the CloudFront CDN automatically configured.

## Deploying to Flightcontrol

This repository is pre-configured to deploy a Next.js application with Docker to Flightcontrol. It includes a `flightcontrol.json` file with the optimal settings.

1. [Create a Flightcontrol account](https://app.flightcontrol.dev/signup?ref=nextjs)
2. Connect your AWS account to Flightcontrol with 1-click setup
3. Connect GitHub and select this repository
4. Click the Next.js preset
   - You can keep the store config "in Flightcontrol" option or choose "as a file in my repository" to use the `flightcontrol.json` from this repo.
6. Click "Create project" and it will start deploying

For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting) and the [Flightcontrol documentation](https://www.flightcontrol.dev/docs?ref=nextjs).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Run locally

Be sure to have set all the appropriate API environment variables in a local `.env` file.

1. docker build -t nextjs-app .
2. docker run --env-file .env -p 3000:3000 test_nodejs
3. Navigate to `http://localhost:3000/`

# Notes

I am using the Mux player for streaming: https://www.mux.com/docs/guides/mux-player-web
I added this ot package.json

I also manually added parameters in AWS for API secrets:
- ETRNL_KEY
- MUX_TOKEN_ID
- MUX_TOKEN_SECRET
- MUX_SIGNING_KEY_ID
- MUX_SIGNING_KEY_SECRET

If you update dependencies, youll need to update the pnpm-lockfile.
- Delete the old lockfile
- Run `pnpm install` to install the updated dependencies.