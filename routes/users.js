const express = require('express');
const router = express.Router();
const User = require('../models/user');

// getting all users
router.get('/', async (req, res) => {
    // res.send('getting all users');
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// getting a single user
router.get('/:id', getUser, (req, res) => {
    // res.send('getting a single user');
    res.json(res.user);
});

// creating a new user
router.post('/', async (req, res) => {
    // res.send('creating a new user');
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
    });

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// updating a user
router.patch('/:id', getUser, async (req, res) => {
    // res.send('updating a user');
    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    if(req.body.age != null){
        res.user.age = req.body.age;
    }
    if(req.body.email != null){
        res.user.email = req.body.email;
    }
    try{
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

// deleting a user
router.delete('/:id',getUser, async (req, res) => {
    // res.send('deleting a user');
    try{
        await res.user.remove();
        res.json({message: 'Deleted user'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}); 

async function getUser(req, res, next){
    let user;
    try {
        user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'Cannot find user'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user;
    next();
}

module.exports = router;