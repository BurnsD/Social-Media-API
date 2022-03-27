const router = require('express').Router();
// Import API routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 Error')
});

module.exports = router;