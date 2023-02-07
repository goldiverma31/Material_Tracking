const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Job = require("../models/jobs.models");
const logger = require('../config/logger');
const {
    gernalMessage,
    userMessage,
} = require("../response_messages/resMessages");
const queryBuilder = require("../utils/searchquery");
exports.AddJob = async (req, next) => {
    try {
        let { job_name, job_no, description } = await req.body;
        await sequelize.transaction(async (t) => {
            let data = await Job.create(
                {
                    job_name,
                    job_no,
                    description,
                },
                { transaction: t }
            );
            logger.info(`Job data insert ${JSON.stringify(req.body)}`);
            if (data) {
                return next(null, {
                    status: 200,
                    message: userMessage.JOBS.ADD,
                    data: data,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.UpdateJob = async (req, next) => {
    try {
        let { job_id, job_name, job_no, description } = await req.body;
        await sequelize.transaction(async (t) => {
            let data = await Job.update(
                {
                    job_name,
                    job_no,
                    description,
                },
                {
                    where: { job_id },
                },
                { transaction: t }
            );
            logger.info(`job update data ${JSON.stringify(req.body)}`);
            if (data) {
                return next(null, {
                    status: 200,
                    message: userMessage.JOBS.UPDATE,
                    data: data,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.DeleteJob = async (req, next) => {
    try {
        let { id } = await req.params;
        const data = await Job.destroy({
            where: {
                job_id: id,
            },
        });
        logger.info(`job delete data ${JSON.stringify(req.params)}`);
        if (!data) {
            return next({ status: 404, message: gernalMessage.Data_Not_Found });
        }
        return next(null, { status: 200, message: userMessage.JOBS.DELETE });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
exports.getById = async (req, next) => {
    try {
        let { id } = await req.params;
        const data = await Job.findOne({
            where: {
                job_id: id,
            },
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
exports.findAll_jobs = async (req, next) => {
    try {
        const query = queryBuilder(req.body);
        let data, count;
        if (query.search != "" && query.limit != "" && query.page != "") {
            data = await Job.findAll({
                order: [[query.sortField, query.order]],
                limit: query.offset,
                offset: query.offset,
                where: {
                    job_name: {
                        [Sequelize.Op.iLike]: "%" + query.search + "%",
                    },
                },
            });
            count = await Job.count({
                order: [[query.sortField, query.order]],
                where: {
                    job_name: {
                        [Sequelize.Op.iLike]: "%" + query.search + "%",
                    },
                },
            });
        } else if (query.search != "" && query.limit == "" && query.page == "") {
            data = await Job.findAll({
                order: [[query.sortField, query.order]],
                where: {
                    job_name: {
                        [Sequelize.Op.iLike]: "%" + query.search + "%",
                    },
                },
            });
            count = await Job.count({
                order: [[query.sortField, query.order]],
                where: {
                    job_name: {
                        [Sequelize.Op.iLike]: "%" + query.search + "%",
                    },
                },
            });
        } else if (query.search == "" && query.limit != "" && query.page != "") {
            data = await Job.findAll({
                order: [[query.sortField, query.order]],
                offset: query.offset,
                limit: query.limit,
            });
            count = await Job.count();
        } else {
            data = await Job.findAll({
                order: [[query.sortField, query.order]],
            });
            count = await Job.count();
        }
        return next(null, { status: 200, data: data, totalcount: count });
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
};
