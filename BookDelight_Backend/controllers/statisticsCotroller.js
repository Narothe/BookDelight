const {writeResult} = require("../utils/writeResult");
const {showStatsWithRange} = require("../services/statistics/getStatisticsService");

const getStatistics = async (req, res) => {
    const date_range = req.body;

    const { result, error, statusCode } = await showStatsWithRange(date_range);

    writeResult(res, result, error, statusCode);
}

module.exports = { getStatistics };
