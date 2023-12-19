import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import envVars from "../config/env-vars.js";
import ErrorHandler from "../util/errorHandler.js";
import constants from "../util/constants.js";
import jwt from "jsonwebtoken";
import validator from 'validator';
import moment from "moment";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next()
        const hash = await bcrypt.hash(this.password, Number(envVars.saltRound))
        this.password = hash
        return next();
    } catch (error) {
        return next(err)
    }
});

userSchema.methods.matchPassword = async function (enteredPass) {
    return bcrypt.compare(enteredPass, this.password);
};

/**
 * User Model Methods
 */
userSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'name', 'email', 'isAdmin'];
        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        return transformed;
    },
    token(user) {
        const payload = {
            user,
            exp: moment().add(envVars.jwtExpirationInterval, 'hours').unix(),
            iat: moment().unix(),
            sub: this._id,
        };
        return jwt.sign(payload, envVars.jwtSecret);
    },
    async matchPassword(password) {
        return bcrypt.compare(password, this.password);
    },
});

/**
 * Statics
 */
userSchema.statics = {
    /**
     * Get user
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, ErrorHandler>}
     */
    async get(id) {
        if (!Types.ObjectId.isValid(id)) {
            throw new ErrorHandler({
                message: constants.VALIDATION_ERROR,
                errors: [{
                    field: 'id',
                    location: 'params',
                    messages: 'Please enter valid User ID',
                }],
                status: constants.NOT_FOUND,
            });
        }
        const user = await this.findById(id).exec();
        if (!user) throw new ErrorHandler({ message: constants.NO_RECORD_FOUND, status: constants.NOT_FOUND });
        return user;
    },

    /**
     * Find user by email and tries to generate a JWT token
     *
     * @param {Object} options - User Object
     * @param options.email - User Email
     * @param options.password - User password
     * @returns { Promise<User> | ErrorHandler> }
     */
    async ValidateUserAndGenerateToken(options) {
        const { email, password } = options;
        const user = await this.findOne({ email });
        if (!user) {
            throw new ErrorHandler({ message: constants.INVALID_CREDENTIALS, status: constants.UNAUTHORIZED });
        }
        if (!await user.matchPassword(password)) {
            throw new ErrorHandler({ message: constants.INVALID_CREDENTIALS, status: constants.UNAUTHORIZED });
        }
        return { user: user.transform(), accessToken: user.token({name: user?.name, email: user?.email, id: user?._id }) };
    },

    /**
     * Return Validation Error
     * If error is a mongoose duplication key error
     *
     * @param {Error} error
     * @returns { Error | ErrorHandler }
     */
    checkDuplication(error) {
        if (error.code === 11000 && (error.name === 'BulkWriteError' || error.name === 'MongoServerError')) {
            const keys = Object.keys(error.keyPattern);
            if (keys.includes('name')) {
                return new ErrorHandler({ message: 'Name already exist', status: constants.NOT_FOUND });
            }
            if (keys.includes('email')) {
                return new ErrorHandler({ message: constants.EMAIL_EXIST, status: constants.BAD_REQUEST });
            }
        }
        return error;
    },
};

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;