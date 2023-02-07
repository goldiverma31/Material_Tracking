const { Op, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Vendor = require("../models/vendor.models");
const logger = require('../config/logger');
const { gernalMessage, userMessage,
} = require("../response_messages/resMessages");
const queryBuilder = require("../utils/searchquery");

exports.VendorAdd = async (req, next) => {
    try {
        let { firstName, lastName, status } = await req.body;
        await sequelize.transaction(async (t) => {
            let data = await Vendor.create(
                {
                    firstName,
                    lastName,
                    status,
                },
                { transaction: t }
            );
            logger.info(`vendor data insert ${JSON.stringify(req.body)}`);
            if (data) {
                return next(null, {
                    status: 200,
                    message: userMessage.VENDOR.ADD,
                    data: data,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.VendorUpdate = async (req, next) => {
    try {
        let { vendor_id, firstName, lastName, status } = await req.body;
        await sequelize.transaction(async (t) => {
            let data = await Vendor.update(
                {
                    firstName,
                    lastName,
                    status,
                },
                {
                    where: { vendor_id },
                },
                { transaction: t }
            );
            logger.info(`vendor update data ${JSON.stringify(req.body)}`);
            if (data) {
                return next(null, {
                    status: 200,
                    message: userMessage.VENDOR.UPDATE,
                    data: data,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.VendorDelete = async (req, next) => {
    try {
        const { id } = await req.params;
        const data = await Vendor.destroy({
            where: { vendor_id: id },
        });
        logger.info(`vendor delete data ${JSON.stringify(req.params)}`);
        if (!data) {
            return next({ status: 404, message: gernalMessage.Data_Not_Found });
        }
        return next(null, { status: 200, message: userMessage.VENDOR.DELETE });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.getById = async (req, next) => {
    try {
        const { id } = await req.params;
        const data = await Vendor.findOne({
            where: { vendor_id: id },
        });
        if (!data) {
            return next({ status: 404, message: gernalMessage.Data_Not_Found });
        }
        return next(null, {
            status: 200,
            message: gernalMessage.SUCCESS,
            data: data,
        });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};

exports.findAll_vendor = async (req, next) => {
    try {
        const query = queryBuilder(req.body);
        let data, count;
        if (query.search != "" && query.limit != "" && query.page != "") {
            data = await Vendor.findAll({
                order: [[query.sortField, query.order]],
                limit: query.limit,
                offset: query.offset,
                where: {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: "%" + query.search + "%" } },
                        { lastName: { [Op.iLike]: "%" + query.search + "%" } },
                    ],
                },
            });
            count = await Vendor.count({
                order: [[query.sortField, query.order]],
                where: {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: "%" + query.search + "%" } },
                        { lastName: { [Op.iLike]: "%" + query.search + "%" } },
                    ],
                },
            });
        } else if (query.search != "" && query.limit == "" && query.page == "") {
            data = await Vendor.findAll({
                order: [[query.sortField, query.order]],
                where: {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: "%" + query.search + "%" } },
                        { lastName: { [Op.iLike]: "%" + query.search + "%" } },
                    ],
                },
            });
            count = await Vendor.count({
                order: [[query.sortField, query, order]],
                where: {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: "%" + query.search + "%" } },
                        { lastName: { [Op.iLike]: "%" + query.search + "%" } },
                    ],
                },
            });
        } else if (query.search == "" && query.limit != "" && query.page != "") {
            data = await Vendor.findAll({
                order: [[query.sortField, query.order]],
                limit: query.limit,
                offset: query.offset,
            });
            count = await Vendor.count();
        } else {
            data = await Vendor.findAll({
                order: [[query.sortField, query.order]],
            });
            count = await Vendor.count();
        }
        return next(null, { status: 200, data: data, totalCount: count });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
