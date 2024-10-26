const {writeResult} = require("../utils/writeResult");
const {login} = require("../services/auth/loginService");
const {logout} = require("../services/auth/logoutService");
const {register} = require("../services/auth/registerService");


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

module.exports = { postLogin, postLogout, postRegister };
