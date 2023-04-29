## Show and Create Pizzas based on MongoDB docker container

### Instructions
Run the following commands:
1. Run the docker `docker-compose -f scripts/docker-compose-dev.yml up -d`
2. Install npm packages `npm install`
3. Init the DB with 100 users `node scripts/init/initDB.js`
4. Run the NodeJS server `node server.js`
5. Run the client `npm run start`
6. For tests, run `npm run test`

The project will run on http://localhost:3000/

#### Itay Eylon
