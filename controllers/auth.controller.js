const service = require('../service/auth.server');

exports.userLogin = async (req, res, next) => {
    try {
        await service.LogIn(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                })
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    }
    catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.PasswordChange = async (req, res, next) => {
    try {
        await service.changePassword(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                })
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    }
    catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.forgotPassword = async (req, res, next) => {
    try {
        await service.forgotPassword(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                })
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    }
    catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.verfiyTokenNpassword = async (req, res, next) => {
    try {
        await service.resetPassword(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                })
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    }
    catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
