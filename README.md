# Webhook Provider and Receiver

## Overview

This project demonstrates a basic implementation of a Webhook Provider and Webhook Receiver system. The Webhook Provider registers webhook URLs and triggers events, while the Webhook Receiver listens for those events and processes incoming payloads. Built with Node.js, Express, and TypeScript, this project leverages Docker for containerized deployment.

### Key Features:

- Register webhook URLs with the provider.
- Trigger events from the provider to the receiver.
- Fully containerized using Docker for seamless deployment.

## Project Structure

The project is divided into two main components:

- **Webhook Provider**: Handles webhook registration and event triggering.
- **Webhook Receiver**: Listens for and processes webhook events.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Installation

Follow these steps to set up and run the project locally using Docker:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/jdratnayake/webhook-provider
cd webhook-provider
```

### 2. Build and Start the Containers

Build and launch the Docker containers:

```bash
docker-compose up --build -d
```

This command builds images for the Webhook Provider (accessible at `http://localhost:4000`) and the Webhook Receiver (accessible at `http://localhost:3000`), then starts them in detached mode.

### 3. Register the Webhook Receiver

To register the receiver with the provider, run the following `curl` command:

```bash
curl -X POST http://localhost:4000/api/webhook/register \
-H "Content-Type: application/json" \
-d '{"url": "http://webhook-receiver:3000/webhook"}'
```

### 4. Trigger an Event

Send a sample event from the provider:

```bash
curl -X POST http://localhost:4000/api/webhook/trigger \
-H "Content-Type: application/json" \
-d '{"event": "user_signup", "payload": {"user": "John Doe"}}'
```

### 5. View Receiver Logs

Check the receiver’s logs to verify event reception:

```bash
# Execute the command where docker-compose.yml file located at
docker-compose logs -f webhook-receiver
```

You should see the event and payload logged by the receiver.

### 6. Stop the Containers

Stop and remove the containers when finished:

```bash
docker-compose down
```

## Technologies Used

- [Node.js](https://nodejs.org/en): JavaScript runtime environment
- [Express](https://expressjs.com/): Web framework for building REST APIs
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript with type safety
- [Docker](https://www.docker.com/): Containerization for easy deployment
