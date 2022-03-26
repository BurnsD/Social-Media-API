const { Thought, User } = require('../models')

const userController = {
    // Get all Users
    getAllUser(req,res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
            });
    },
    // Get 1 User by ID


}