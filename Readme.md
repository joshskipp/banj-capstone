# BANJ Prospector

`VERSION 0.0.0 1`

Blank slate development environment for the BANJ Capstone Project. Comprises Vite+React front end, Express Node API backend, and MySQL database server.

Dockerized for simplified collaboration.

## Installation
1) Clone the GitHub repo to your local machine.
2) Add the `.env` file to the server directory, see Skipp for the file.
3) Within the repo root directory, run via terminal `docker compose up --build`. Docker will download the base images and initialise the containers.

### Usage
Access the front end by navigating your browser to `localhost:5173` for the development version or `localhost:3000` for production. At this stage, they are identical.

After making a change, you will need to stop the Docker container and restart it with `docker compose up`, or hit the play button for the container stack in Docker Desktop. **This is an area of optimisation.**

## Known issues:
- Making changes to the front end or back end requires reloading the Docker container. `nodemon` and React don't auto-update after saving the file.

- When building for the first time, the API will error out, as it requires the database to finish its startup script. Once the database is finished, stop and start the API container again.
    - **Fixed-ish** (30/1/25): The API will attempt to reconnect five times after a few seconds each attempt, waiting for the MySQL server to finish initialising.
