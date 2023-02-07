const service = require('../service/jobs.service');

exports.JobAdded = async (req, res, next) => {
    try {
        await service.AddJob(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.JobUpdate = async (req, res, next) => {
    try {
        await service.UpdateJob(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        } next(err);
    }
}
exports.JobDelete = async (req, res, next) => {
    try {
        await service.DeleteJob(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        } next(err);
    }
}
exports.findbyID = async (req, res, next) => {
    try {
        await service.getById(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        } next(err);
    }
}
exports.findAll = async (req, res, next) => {
    try {
        await service.findAll_jobs(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, data: resp.data, count: resp.count })
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        } next(err);
    }
}