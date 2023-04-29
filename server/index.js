const express = require("express");
const {isEmailExists} = require("./services/user");
const { findAllUsers, createUser } = require("./services/user");
const router = express.Router();

router.use((req, res, next)=> {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        res.append('Content-Type', 'application/json');

        next();
});

router.get('/validate', (req, res) => {
        isEmailExists(req.query.email)
          .then(isExists=> res.send({ isExists }))
          .catch(err => res.status(400).send({msg: "Error in checking if user exists", err}));
});

router.get('/',  (req, res) => {
        const start = req.query.start ? parseInt(req.query.start) : -1
        findAllUsers(start)
          .then(users => res.send({ users }))
          .catch(err => res.status(400).send({msg: "Error in getting user data", err}));
});

router.post('/', (req, res) => {
        createUser(req.body)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(400).send({msg: err.message}));
})

module.exports = router
