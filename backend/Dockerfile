# backend/Dockerfile

# Use golang:alpine as the base image for development
FROM golang:alpine

WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Install Air for live-reload
RUN go install github.com/air-verse/air@latest

# Copy the rest of the application source code
COPY . .

# Expose the port the application listens on
EXPOSE 8080

# Command to run the application with Air
CMD ["air"]
