const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const errorMessage = require("../helper/errorMessage");
const { responseJsonHandler } = require("../helper")

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.userId )
            next()
        } catch (error) {
            responseJsonHandler(errorMessage["008"], null, res);
        }
    }
    if (!token) {
        responseJsonHandler("No Token Avaliable", null, res);
    }
}

module.exports = authenticate