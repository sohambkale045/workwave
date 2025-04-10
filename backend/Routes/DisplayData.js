const express = require('express');
const router = express.Router();
router.post('/workersData',(req,res)=>{
    try {
        console.log(global.workers)
        res.send([global.workerscategory,global.workers])
    } catch (error) {
        console.error(error.message);
        res.send("sever error")
        
    }
})
module.exports = router;