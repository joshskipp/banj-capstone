# BANJ Prospector
Version `0.0.0 3`


## Technologies
to come

## Usage
You should be able to log in and out of your application using the following credentials:

* Email: `user@email.com`
* Password: `123456`

## Folder Structure
* `/app`: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
    * `/app/lib`: Contains functions used in your application, such as reusable utility functions and data fetching functions.
    * `/app/ui`: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
* `/public`: Contains all the static assets for your application, such as images.
* **Config Files**: You'll also notice config files such as `next.config.ts` at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app.

# Running the development Server

## 1) Install packages

Run pnpm i to install the project's packages.

```
pnpm i
```

## 2) Add the envrionment variable file (.env)

Download the most uptodate `.env` file from either Discord or Google Drive and place it in the root folder of the repo.

## 3) Start Developmetn Server

Followed by pnpm dev to start the development server.

```
pnpm run dev
```

`pnpm dev` starts your Next.js development server on port 3000. Open http://localhost:3000 on your browser. 

# Troubleshooting

## `bycrypt` module cannot be found.

Urg, see Josh.