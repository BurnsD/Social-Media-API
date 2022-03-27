const { User, Thought } = require('../models');
const { populate } = require('../models/User');

const thoughtController = {
    // Create
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.pizzaId },
              { $push: { comments: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'This User could not be found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

    // Get all
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '__v'
            })
            .select('__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },
    // Get 1 Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ __id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },
    // Create Thought
    // createThought({ body }, res) {
    //     Thought.create(body)
    //         .then(dbThoughtData => res.json(dbThoughtData))
    //         .catch(err => res.json(err));
    // },
    //Update by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought could not be found'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // Delete
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;