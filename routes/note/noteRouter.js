// packages
const router = require('express').Router();
const mongoose = require("mongoose");

// models
const taskModel = require('../../models/task');


// create new task
router.post('/', async (req, res) => {
    try {

        const user = req.session.user;

        const title = req.body['title'];
        const description = req.body['description'];

        await taskModel.create({user: user._id, title, description});

        return res.status(200).json({
            success: true,
            message: "new task created"
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// update task
router.patch('/:taskId', async (req, res) => {
    try {
        const fields = {title, description} = req.body;

        const taskId = req.params['taskId'];

        const user = req.session.user;

        await taskModel.findOneAndUpdate({_id: taskId, user: user._id}, fields);

        return res.status(200).json({
            success: true,
            message: "new task created"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// remove task
router.delete('/:taskId', async (req, res) => {
    try {
        const taskId = req.params['taskId'];

        const user = req.session.user;

        await taskModel.findOneAndRemove({_id: taskId, user: user._id});

        return res.status(200).json({
            success: true,
            message: "task removed"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// get task list
router.get('/list', async (req, res) => {
    try {

        const user = req.session.user;

        const tasks = await taskModel.find({user: user._id}, {
            '_id': 0,
            'user': 0,
            'updatedAt': 0,
            '__v': 0
        });

        if (!tasks.length) {
            return res.status(200).json({
                success: false,
                message: "your task list is empty",
            });
        }

        return res.status(200).json({
            success: true,
            message: "user info",
            data: {result: tasks}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// change status of a task
router.get('/status/:taskId', async (req, res) => {
    try {

        const taskId = req.params['taskId'];
        const status = req.query['status'];

        const user = req.session.user;


        const task = await taskModel.findOne({_id: mongoose.Types.ObjectId(taskId), user: user._id});
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "internal server error"
            });
        }

        task.status = status;
        await task.save();

        let message;
        if (task.status) {
            message = 'task is done';
        } else {
            message = 'task is not done';
        }

        return res.status(200).json({
            success: true,
            message
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// get single task
router.get('/:taskId', async (req, res) => {
    try {

        const taskId = req.params['taskId'];

        const user = req.session.user;


        const isExistsTask = await taskModel.findOne({_id: mongoose.Types.ObjectId(taskId), user: user._id});
        if (!isExistsTask) {
            return res.status(404).json({
                success: false,
                message: "task not found"
            });
        }

        const aggregationPipeLine = [
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(taskId)
                }
            }, {
                '$project': {
                    '_id': 0,
                    'user': 0,
                    'updatedAt': 0,
                    '__v': 0
                }
            }
        ];

        const taskInfo = await taskModel.aggregate(aggregationPipeLine);

        return res.status(200).json({
            success: true,
            message: "user info",
            data: {result: taskInfo[0]}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;