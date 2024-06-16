# Overview

A simple Docker container to automatically send daily reflections to Notion, using `cron` schedule expressions. Container is deployed to [Unraid](https://www.unraid.net) or AWS Lambda + CloudWatch.

# Deployment Instructions

## AWS Lambda

1. Run the following:

```
npm run docker:build
npm run docker:tag -- <insert ECR URI>
npm run docker: push -- <insert ECR URI>
```

2. In AWS Lambda, update to the new image.

3. Test.

4. Setup CloudWatch based on the cron configuration of your choosing.

### Configuration

## Unraid

### Configuration

1. In `index.ts` (refer to an older commit), change the cron configuration to one of your choosing. For explanation on how cron works, visit [Crontab Guru](https://crontab.guru). In the same file, make changes to the Timezone if necessary.
2. Save the changes and push to docker hub. A sample of the bash script can be found below:

```
docker buildx build --platform=linux/amd64 -t notion-dailyreflections .

docker tag notion-dailyreflections your-name/notion-dailyreflections

docker push your-name/notion-dailyreflections
```

3. Proceed to the deployment instructions below

After making changes to the configuration, proceed with the below:

### Deployment

1. Go to Docker tab in Unraid
2. Create a new container
3. Repository should be set to `your-name/notion-dailyreflections` (based on your configuration above)

- This assumes you have pushed your docker image to [Docker Hub](https://hub.docker.com)

4. Change from Basic view to Advanced view
5. Under `Extra Parameters`, add the below, and proceed to create the container.

```bash
--platform=linux/amd64 -e NOTION_TOKEN=XXX -e DATABASE_ID=XXX -e GOSPEL_API=XXX
# Replace XXX with your Notion token, Notion Database ID and Gospel API from https://api.esv.org
```

# Credits

- [Notion](https://www.notion.so)
- [ESV API](https://api.esv.org)
