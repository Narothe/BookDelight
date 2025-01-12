const express = require('express');
const {getStatistics, getStatisticsDashboard} = require("../controllers/statisticsCotroller");
const router = express.Router();

router.post('/statistics/', getStatistics);
router.get('/statistics/dashboard', getStatisticsDashboard);



module.exports = router;
