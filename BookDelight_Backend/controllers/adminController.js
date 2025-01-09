const {writeResult} = require("../utils/writeResult");
const {adminDashboard} = require("../services/admin/getDashboardService");

const getDashboard = async (req, res) => {
    const userId = req.user.userId;
    // const isAdmin = req.user.isAdmin;

    const { result, error, statusCode } = await adminDashboard(userId);

    writeResult(res, result, error, statusCode);
}

module.exports = { getDashboard };
