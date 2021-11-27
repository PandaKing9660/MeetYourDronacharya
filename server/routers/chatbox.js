const express = require('express');
const router = express.Router();

router.use(express.json());

// socket server
router.get('/', (req, res) => {
    res.send('Socket server running');
});


module.exports = router;