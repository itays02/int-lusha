# Showing / Creating Users based on MongoDB docker container
## Description
A NodeJS service that serves a react app for creating and displaying users. \
The task includes a view displaying a grid of all created users (fetching using infinite-scroll) and a view of a form for creating a single user.
There is an end to end test for creating new user. 

## Instructions
Run the following commands:
1. Run the docker `docker-compose -f scripts/docker-compose-dev.yml up`
2. Init the DB with 100 users`node scripts/init/initDB.js`
3. Install npm packages `npm install`
4. Run the NodeJS server `node server.js`
5. Run the client `npm run start`
6. For tests, run `npm run test`

The project will run on http://localhost:3000/

#### Itay Eylon
