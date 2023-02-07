const service = require('../service/user.service');
exports.UserAdd = async (req, res, next) => {
    try {
        await service.AddUser(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message,
                })
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
};
exports.UserUpdate = async (req, res, next) => {
    try {
        await service.updateUser(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                });
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                });
            }
        });
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.UserDelete = async (req, res, next) => {
    try {
        await service.deleteUser(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                });
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message })
        }
        next(err);
    }
}
exports.UserByID = async (req, res, next) => {
    try {
        await service.getUsetByID(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                });
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data
                })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message })
        }
        next(err);
    }
}
exports.findUsers = async (req, res, next) => {
    try {
        await service.findAllUsers(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                });
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data,

                    // totalcount: { totalcount, data }
                })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message })
        }
        next(err);
    }
}
exports.Profile = async (req, res, next) => {
    try {
        await service.profile(req, (err, resp) => {
            if (err) {
                res.status(200).json({
                    status: err.status,
                    message: err.message
                });
            } else {
                res.status(200).json({
                    status: resp.status,
                    message: resp.message,
                    data: resp.data,
                })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message })
        }
        next(err);
    }
}