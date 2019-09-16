const express = require('express');
const Users = require('../models/user');
const Groups = require('../models/group');

const router = express.Router();

// Add user in phonebook
router.post('/users', async (req, res) => {
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    const user = new Users({
        name,
        phoneNo
    });
    try {
        // console.log(req.body);
        // console.log(user);
        // console.log(user._id);
        if (req.body.groupId) {

            const group = await Groups.find({
                _id: req.body.groupId
            });
            if (!group) {
                return res.status(404).send({
                    "error": "No group Found!"
                });
            }
            group[0].groupIds.push({
                "groupId": user._id
            });

            const groupSave = await Groups.findByIdAndUpdate(req.body.groupId, group[0], {
                new: true,
                runValidators: true
            });
            if (!groupSave) {
                return res.status(500).send({
                    "error": "Server Error!"
                });
            }
        }
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({
            "error": "Bad Request."
        });
    }
})

// Read all users from phoneBook
router.get('/users', async (req, res) => {
    try {
        const user = await Users.find({});
        res.send(user);
    } catch (error) {
        res.status(400).send({
            "error": "No User Found"
        });
    }
})

// Update user from phoneBook
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    // const allowedUpdates = ['name', ];
    // const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    // if (!isValidUpdate) {
    //     return res.status(400).send({
    //         "error": "Invalid Update"
    //     })
    // }
    try {
        console.log("update id:", req.params.id);

        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send({
                "error": "No User Found"
            });
        }
        res.send(user);

    } catch (error) {
        return res.status(400).send({
            "error": "Failed to update!"
        });
    }
})

// Delete a user from phonebook

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({
                "error": "No User Found"
            });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({
            "error": "Server Error"
        });
    }
})

module.exports = router;