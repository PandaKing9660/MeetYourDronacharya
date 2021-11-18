const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.use(express.json());

const getUser = async ({ sId, idMe, idYou }) => {
    // email=email.trim().toLowerCase();
    try {
        let users = [];
        let error = '';
        await user
            .find({})
            .then((resp) => {
                users.push(resp.filter((users) => users._id == idMe)[0]);
                users.push(resp.filter((users) => users._id == idYou)[0]);
            })
            .catch((err) => {
                console.log(err);
                error = err;
                return err;
            });

        return users;
    } catch (err) {
        console.log(err);
    }

    // return users.find((user) => user.id === id);
};

module.exports = { getUser };
