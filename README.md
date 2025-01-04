# Webhook Provider and Receiver

## Overview

This project demonstrates the implementation of a basic **Webhook Provider** and **Webhook Receiver** system. The Webhook Provider is responsible for registering webhook URLs and triggering events, while the Webhook Receiver listens to those events and processes the incoming payloads. This project is built with **Node.js**, **Express**, and **TypeScript**, and can be run using **Docker** for containerization.

### Key Features:

- Register webhook URLs with the provider.
- Trigger events from the provider to the receiver.
- Fully containerized using Docker for ease of deployment.

## Project Structure

The project is divided into two main components:

- **Webhook Provider**: Handles webhook registration and event triggering.
- **Webhook Receiver**: Receives webhook events and processes them.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker Desktop**

## Running the Project Using Docker

Follow these steps to run the project using Docker:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/jdratnayake/webhook-provider
cd beginner
```

### 2. Build and Start the Containers

Run the following command to build and start the containers:

```bash
docker-compose up --build -d
```

This will build the images for both the **Webhook Provider** and **Webhook Receiver** and start them as Docker containers. The **Webhook Provider** will be available on **http://localhost:4000**, and the **Webhook Receiver** will be available on **http://localhost:3000**.

### 3. Register the Webhook Receiver

To register the receiver with the provider, run the following `curl` command:

```bash
curl -X POST http://localhost:4000/api/webhook/register \
-H "Content-Type: application/json" \
-d '{"url": "http://webhook-receiver:3000/webhook"}'
```

### 4. Trigger an Event

To trigger an event from the **Webhook Provider**, run the following `curl` command:

```bash
curl -X POST http://localhost:4000/api/webhook/trigger \
-H "Content-Type: application/json" \
-d '{"event": "user_signup", "payload": {"user": "John Doe"}}'
```

### 5. Check the Receiver Logs

You can check the logs of the **Webhook Receiver** by running:

```bash
# Execute the command where docker-compose.yml file located at
docker-compose logs -f webhook-receiver
```

The receiver should log the event and payload as it receives it.

### 6. Stop the Containers

When you are done, you can stop and remove the containers using:

```bash
docker-compose down
```

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for building REST APIs
- **TypeScript**: Superset of JavaScript with type safety
- **Docker**: Containerization for easy deployment
