
# How to spin up your local development envrionment:

The simplest method is to have [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) installed on your machine. 

Run Docker Desktop, so the service is in the background.

Fetching the repo from GitHub. With your terminal inside the root directory `banj-capstone`, run:

```
docker compose up
```

Docker will create the images, and spin up a container for each, the app the the mysql database instance. Once ready you should be able to see the app on  `localhost:3000`.

When you are finished, run the below command to to spin down the containers.

``` 
docker compose down 
```