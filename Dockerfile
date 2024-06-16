# Stage 1: Build the application
FROM node:20 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Create the production image
FROM public.ecr.aws/lambda/nodejs:20

# Copy the built application code from the build stage
COPY --from=build-stage /app/dist ${LAMBDA_TASK_ROOT}

# Copy the node_modules from the build stage
COPY --from=build-stage /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# (For local testing) Install the AWS Lambda Runtime Interface Emulator
# COPY --from=amazon/aws-lambda-runtime-interface-emulator /lambda-entrypoint.sh /lambda-entrypoint.sh

# Set the entry point to the emulator script
# ENTRYPOINT ["/lambda-entrypoint.sh"]

# Set the CMD to your handler function (e.g., index.handler)
CMD ["index.handler"]
