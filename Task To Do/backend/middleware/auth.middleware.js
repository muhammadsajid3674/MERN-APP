const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const protectedRoute = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Not authorized, no token',
                status: false
            })
        }
    } if (!token) {
        res.json({
            message: 'Not authorized, no token',
            status: false
        })
    }
}

module.exports = protectedRoute