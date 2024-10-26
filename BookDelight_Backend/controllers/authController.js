const {writeResult} = require("../utils/writeResult");
const {login} = require("../services/auth/loginService");


const postLogin = async (req, res) => {
    const content = { identity, password } = req.body;

    const { result, error, statusCode } = await login(content);

    writeResult(res, result, error, statusCode);
};

module.exports = { postLogin };
