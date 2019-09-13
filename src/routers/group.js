const express = require('express');
const Groups = require('../models/group');

const router = express.Router();



// Add group in phonebook
router.post('/groups', async (req, res) => {
    const group = new Groups(req.body);
    try {
        await group.save();
        res.status(201).send(group);
    } catch (error) {
        res.status(400).send({
            "error": "Bad Request!"
        });
    }
})

// Read all groups from phoneBook
router.get('/groups', async (req, res) => {
    try {
        const group = await Groups.find({});
        res.send(group);
    } catch (error) {
        res.status(400).send({
            "error": "No group Found!"
        });
    }
})
// Read a single Group
router.get('/groups/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const result = await Groups.findById(_id);
        if (!result) {
            res.status(404).send({
                "error": "Group Not Found!"
            });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }

})

// Update group from phoneBook
router.patch('/groups/:id', async (req, res) => {
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

        const group = await Groups.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!group) {
            return res.status(404).send({
                "error": "No group Found!"
            });
        }
        res.send(group);

    } catch (error) {
        return res.status(400).send({
            "error": "Failed to update!"
        });
    }
})

// Delete a group from phonebook

router.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Groups.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).send({
                "error": "No group Found"
            });
        }
        res.send(group);
    } catch (error) {
        res.status(500).send({
            "error": "Server Error!"
        });
    }
})

module.exports = router;