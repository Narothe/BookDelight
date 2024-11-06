const {writeResult} = require("../utils/writeResult");
const {login} = require("../services/auth/loginService");
const {logout} = require("../services/auth/logoutService");
const {register} = require("../services/auth/registerService");
const {sendVerify, verifyToken} = require("../services/auth/verifyUserService");


const postLogin = async (req, res) => {
    const content = { identity, password } = req.body;

    const { result, error, statusCode } = await login(content);

    writeResult(res, result, error, statusCode);
};

const postLogout = async (req, res) => {
    const date = new Date(Date.now());
    const auth = req.header('Authorization').replace('Bearer ', '');

    const { result, error, statusCode } = await logout(date, auth);

    writeResult(res, result, error, statusCode);
};

const postRegister = async (req, res) => {
    const content = { email, password, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date } = req.body;

    const { result, error, statusCode } = await register(content);

    writeResult(res, result, error, statusCode);
};

const postVerify = async (req, res) => {
    const userId = req.user.userId;

    const { result, error, statusCode } = await sendVerify(userId);

    writeResult(res, result, error, statusCode);
}

const getVerifyToken = async (req, res) => {
    const { token } = req.query;

    const { result, error, statusCode } = await verifyToken(token);

    writeResult(res, result, error, statusCode);
}


module.exports = {
    postLogin,
    postLogout,
    postRegister,
    postVerify,
    getVerifyToken
};
