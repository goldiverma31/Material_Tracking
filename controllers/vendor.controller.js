const service = require('../service/vendor.service');

exports.AddVendor = async (req, res, next) => {
    try {
        await service.VendorAdd(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data });
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.UpdatVendor = async (req, res, next) => {
    try {
        await service.VendorUpdate(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data });
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.DeleteVendor = async (req, res, next) => {
    try {
        await service.VendorDelete(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message });
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.findById = async (req, res, next) => {
    try {
        await service.getById(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, message: resp.message, data: resp.data });
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}
exports.FindAll = async (req, res, next) => {
    try {
        await service.findAll_vendor(req, (err, resp) => {
            if (err) {
                res.status(200).json({ status: err.status, message: err.message });
            } else {
                res.status(200).json({ status: resp.status, data: resp.data, count: resp.count });
            }
        })
    } catch (err) {
        if (!err) {
            res.status(200).json({ status: 400, message: err.message });
        }
        next(err);
    }
}