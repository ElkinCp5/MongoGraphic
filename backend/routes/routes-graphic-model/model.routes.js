const express = require('express');
const router = express.Router();

index = async(req, res) =>{
    res.json({
        status: 'Api init'
    })
}
router.get('/', index);

module.exports = router;