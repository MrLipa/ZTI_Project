# Getting Started with Air-Book

## Prerequisites 📋
- Visual Studio Code
- Node
- Docker

ogarnać eslite oraz prittier 
ogarnąć agenty jenkinsa
ogarnąc odpalanie co dzień oraz po każdym koicie
jenkins z gotowymi pluginami oraz konto admin admin
branch name
git url credentials
budowanie commad komendy kopoiowania export display
akcje po zadaniu zachowaj artefakty pliki do zarychwizowania report, junit, screenhots, flv, log

## Project structure 📁
The project consists of the following containers:

- `database`: Postgres database container
- `pdadmin`: PgAdmin container for the database graphical interface
- `backend`: TomEE container for deploying the backend application
- `frontend`: Python container for pre-database configuration scripts
- `jenkins`: Jenkins container for continuous integration and deployment

Each container has its environment settings, ports, and volumes configured in the `docker-compose.yml` file.

## Endpoints 📡

Legend:

1. 👥 All users have access to this endpoint
2. 🔓 Only authenticated users have access to this endpoint
3. 🛡️ Only users with moderator privileges have access to this endpoint

The following endpoints are available in the application:

- GET 🔓 `/user`
- GET 🔓 `/user/johndoe@example.com`
- GET 🔓 `/user`
- GET 🔓 `/user`
- GET 🔓 `/user/111@example.com`
- GET 🔓 `/user/flights_history/johndoe@example.com`
- GET 🔓 `/user/made_reservation`
- GET 🔓 `/user/cancel_reservation`
- GET 🔓 `/flight`
- GET 🔓 `/flight/flights_to`
- GET 🔓 `/flight/flights_by_ids`
- GET 🔓 `/flight`
- GET 🔓 `/register`
- GET 🔓 `/login`
- GET 🔓 `/refresh`
- GET 🔓 `/logout`


File `Air-Book.postman_collection.json` contains a collection of basic endpoints that are ready to use 
with Postman, a popular API development tool. The file can be imported into Postman to quickly test the 
functionality of the endpoints and interact with the backend application.

The JWT is a token that can be used for token-based authentication in subsequent API requests. It is set to expire 
after 15 seconds for security reasons, and the user will need to re-authenticate by logging in again after expiration.

The refresh token is used for obtaining new JWTs after the original JWT expires. It is set to expire after 24 hours, 
which means that users can use the refresh token to obtain new JWTs within this time period without having to re-authenticate with their credentials.


## Other Useful Commands 🛠️
- `docker info`: Displays information about Docker configuration and the host system.
- `docker version`: Displays information about the installed Docker version.
- `docker login`: Logs in to a Docker registry.
---
- `docker pull [imageName]`: Pulls an image with the name `[imageName]` from a Docker registry.
- `docker run [imageName]`: Runs a new container based on the `[imageName]` image.
- `docker run -d [imageName]`: Runs a new container in the background based on the `[imageName]` image.
- `docker start [containerName]`: Starts a stopped container with the name `[containerName]`.
- `docker ps`: Lists the running containers.
- `docker ps -a`: Lists all containers (running and stopped).
- `docker stop [containerName]`: Stops a container with the name `[containerName]`.
- `docker kill [containerName]`: Forcefully stops a container with the name `[containerName]`.
- `docker image inspect [imageName]`: Displays detailed information about the `[imageName]` image.
---
- `docker run --memory="256m" nginx`: Runs a container with a memory limit set to 256 MB.
- `docker run --cpus=".5" nginx`: Runs a container with the CPU limit set to 0.5 (half a CPU).
---
- `docker run --publish 80:80 --name [imageName] nginx`: Runs a container named `[imageName]` with port mapping from host port 80 to container port 80 for the nginx image.
- `docker run -d -p 8080:80 --name [imageName] nginx`: Runs a container named `[imageName]` in detached mode with port mapping from host port 8080 to container port 80 for the nginx image.
---
- `docker run -it nginx -- /bin/bash`: Runs an interactive container with the nginx image and opens a Bash shell.
- `docker run -it -- microsoft/powershell:nanoserver pwsh.exe`: Runs an interactive container with the Microsoft PowerShell image based on the Nano Server and opens a PowerShell shell.
- `docker container exec -it [containerName] bash`: Executes a command inside a running container with the name `[containerName]` and opens a Bash shell.
---
- `docker rm [containerName]`: Removes a stopped container with the name `[containerName]`.
- `docker rm $(docker ps -a -q)`: Removes all stopped containers.
- `docker images`: Lists the available images.
- `docker rmi [imageName]`: Removes an image with the name `[imageName]`.
- `docker system prune -a`: Removes all unused containers, networks, and images.
---
- `docker build -t [name:tag]`: Builds an image with the specified name and tag.
- `docker build -t [name:tag] -f [fileName]`: Builds an image with the specified name, tag, and Dockerfile path.
- `docker tag [imageName] [name:tag]`: Creates a new image tag for an existing image.
---
- `docker create volume [volumeName]`: Creates a named volume with the given `[volumeName]`.
- `docker volume ls`: Lists all volumes.
- `docker volume inspect [volumeName]`: Displays detailed information about a specific volume.
- `docker volume rm [volumeName]`: Removes a specific volume.
- `docker volume prune`: Removes all unused volumes.
- `docker run -d --name devtest -v [volumeName]:/app nginx:latest`: Runs a container in the background with the name "devtest" and mounts a volume named `[volumeName]` to the "/app" directory inside the container using the nginx:latest image.
- `docker run -d --name devtest -v d:/test:/app nginx:latest`: Runs a container in the background with the name "devtest" and mounts the host directory "d:/test" to the "/app" directory inside the container using the nginx:latest image.
- `docker exec -it [containerName] bash`: Executes an interactive Bash shell inside a running container with the name `[containerName]`.
- `docker volume rm [volumeName]`: Removes a specific volume.
---
- `docker-compose build`: Builds or rebuilds services defined in a Compose file.
- `docker-compose start`: Starts existing containers for a Compose file.
- `docker-compose stop`: Stops running containers for a Compose file.
- `docker-compose up -d`: Creates and starts containers in the background for a Compose file.
- `docker-compose -p test2 up -d`: Creates and starts containers in the background for a Compose file with a specific project name.
- `docker-compose ps`: Lists the containers for a Compose file.
- `docker-compose rm`: Removes stopped containers for a Compose file.
- `docker-compose down`: Stops and removes containers, networks, and volumes for a Compose file.
- `docker-compose logs`: Displays the logs of services for a Compose file.
- `docker-compose exec [container] bash`: Executes a command inside a running container defined in a Compose file.
---
- `docker-compose --project-name test1 up -d`: Creates and starts containers in the background for a Compose file with a specific project name.
- `docker-compose -p test2 up -d`: Creates and starts containers in the background for a Compose file with a specific project name.
- `docker-compose ls`: Lists the services defined in a Compose file.
- `docker-compose cp [containerID]:[SRC_PATH] [DEST_PATH]`: Copies files/folders between a container and the host for a Compose file.
- `docker-compose cp [SRC_PATH]:[containerID] [DEST_PATH]`: Copies files/folders between the host and a container for a Compose file.
- `docker-compose logs -f web-fe`: Displays the live logs of a specific service (web-fe) for a Compose file.
- `docker-compose -p test2 down`: Stops and removes containers, networks, and volumes for a Compose file with a specific project name.
---
- `docker login -u [username] -p [password]`: Logs in to a Docker registry with the specified username and password.
- `docker tag [imageName] k8sacademy/[imageName]:latest`: Creates a new image tag for an existing image with a new repository name.
- `docker push k8sacademy/[imageName]:latest`: Pushes an image to a Docker registry with a specific repository name and tag.
- `docker pull k8sacademy/[imageName]:latest`: Pulls an image from a Docker registry with a specific repository name and tag.
---
- `docker build -t [YourRegistryName]/express:v1`: Builds an image with the specified name and tag using the Dockerfile in the current directory.
- `docker push [YourRegistryName]/express:v1`: Pushes an image with the specified name and tag to a Docker registry.
- `docker rmi [YourRegistryName]/express:v1`: Removes an image with the specified name and tag from the local Docker environment.
- `docker build -t [YourRegistryName]/express:v2 .`: Builds an image with the specified name and tag using the Dockerfile in the current directory.
- `docker push [YourRegistryName]/express:v2`: Pushes an image with the specified name and tag to a Docker registry.
- `docker rmi [YourRegistryName]/express:v2`: Removes an image with the specified name and tag from the local Docker environment.
- `docker pull [YourRegistryName]/express:v2`: Pulls an image with the specified name and tag from a Docker registry.
---
- `docker rmi [YourRegistryName]/express:v1`: Removes an image with the specified name and tag from the local Docker environment.
- `docker rmi [YourRegistryName]/express:v2`: Removes an image with the specified name and tag from the local Docker environment.

## Contributing 👥
Contributions are welcome! Please fork the repository and create a pull request.
