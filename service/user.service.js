const { Op, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user.model");
const logger = require('../config/logger');
const {
    securePassword,
    comparePassword,
} = require("../utils/securePassword.utils");
const {
    gernalMessage,
    userMessage,
    validationMessage,
} = require("../response_messages/resMessages");
const queryBuilder = require("../utils/searchquery");

exports.AddUser = async (req, next) => {
    try {
        let { Name, Email, password, Role, DOB } = await req.body;
        const userExisting = await User.findOne({ where: { Email } });
        // const hash = await securePassword(password);
        if (userExisting) {
            return next(null, {
                status: 400,
                message: validationMessage.Email_Exist,
            });
        }
        if (password) {
            const hash = await securePassword(password);
            password = hash;
        } else {
            User.password = null;
        }
        await sequelize.transaction(async (t) => {
            const data = await User.create(
                {
                    Name,
                    Email,
                    // password,
                    Role,
                    DOB,
                },
                { transaction: t }
            );
            logger.info(`User data insert ${JSON.stringify(req.body)}`);
            if (data) {
                return next(null, {
                    status: 200,
                    message: userMessage.USER.ADD,
                    data: data,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({
            status: 400,
            message: err.message,
        });
    }
};

exports.updateUser = async (req, next) => {
    try {
        let { user_id, Name, Email, password, Role, DOB } = await req.body;

        if (Email) {
            const userExisting = await User.findOne({ where: { Email } });
            if (userExisting) {
                return next(null, {
                    status: 400,
                    message: validationMessage.Email_Exist,
                });
            }
        }
        if (password) {
            const hash = await securePassword(password);
            password = hash;
        } else {
            User.password = null;
        }
        await sequelize.transaction(async (t) => {
            const update = await User.update(
                {
                    Name,
                    Email,
                    // password,
                    Role,
                    DOB,
                },
                {
                    where: { user_id: user_id },
                },
                { transaction: t }
            );
            logger.info(`User update data ${JSON.stringify(req.body)}`);
            if (update) {
                return next(null, {
                    status: 200,
                    message: userMessage.USER.UPDATE,
                    data: update,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return next({
            status: 400,
            message: err.message,
        });
    }
};
exports.deleteUser = async (req, next) => {
    try {
        let { id } = req.params;
        await sequelize.transaction(async (t) => {
            const data = await User.destroy({
                where: {
                    user_id: id,
                },
            });
            logger.info(`user delete data ${JSON.stringify(req.params)}`);
            if (!data) {
                return next({ status: 404, message: gernalMessage.Data_Not_Found });
            } else {
                return next({ status: 200, message: userMessage.USER.DELETE });
            }
        });
    } catch (err) {
        console.log(err);
        return next({
            status: 400,
            message: err.message,
        });
    }
};
exports.getUsetByID = async (req, next) => {
    try {
        let { id } = await req.params;
        const data = await User.findOne({
            where: {
                user_id: id,
            },
        });
        if (data) {
            return next(null, {
                status: 200,
                message: gernalMessage.SUCCESS,
                data: data,
            });
        } else {
            return next({ status: 404, message: gernalMessage.Data_Not_Found });
        }
    } catch (err) {
        console.log(err);
        return next({
            status: 400,
            message: err.message,
        });
    }
};
exports.findAllUsers = async (req, next) => {
    try {
        const query = queryBuilder(req.body);
        let data, count;
        if (query.search != "" && query.limit != "" && query.page != "") {
            data = await User.findAll({
                order: [[query.sortField, query.order]],
                limit: query.limit,
                offset: query.offset,
                where: {
                    [Op.or]: [
                        { Name: { [Op.iLike]: '%' + query.search + '%', } },
                        { Email: { [Op.iLike]: '%' + query.search + '%', } },
                        { Role: { [Op.iLike]: '%' + query.search + '%', } },
                    ],
                },
            });
            count = await User.count({
                order: [[query.sortField, query.order]],
                where: {
                    [Op.or]: [
                        { Name: { [Op.iLike]: '%' + query.search + '%', } },
                        { Email: { [Op.iLike]: '%' + query.search + '%', } },
                        { Role: { [Op.iLike]: '%' + query.search + '%', } },
                    ],
                },
            });
        } else if (query.search != "" && query.limit == "" && query.page == "") {
            data = await User.findAll({
                order: [[query.sortField, query.order]],
                where: {
                    [Op.or]: [
                        { Name: { [Op.iLike]: '%' + query.search + '%', } },
                        { Email: { [Op.iLike]: '%' + query.search + '%', } },
                        { Role: { [Op.iLike]: '%' + query.search + '%', } },
                    ],
                },
            });
            count = await User.count({
                order: [[query.sortField, query.order]],
                where: {
                    [Op.or]: [
                        { Name: { [Op.iLike]: '%' + query.search + '%', } },
                        { Email: { [Op.iLike]: '%' + query.search + '%', } },
                        { Role: { [Op.iLike]: '%' + query.search + '%', } },
                    ],
                },
            });
        } else if (query.search == "" && query.limit != "" && query.page != "") {
            data = await User.findAll({
                order: [[query.sortField, query.order]],
                limit: query.limit,
                offset: query.offset,
            });
            count = await User.count();
        } else {
            data = await User.findAll({
                order: [[query.sortField, query.order]],
            });
            count = await User.count();
        }
        return next(null, { status: 200, data: data, totalCount: count });
    } catch (err) {
        return next({ status: 400, message: err.message });
    }
};

exports.profile = async (req, next) => {
    try {

        const { destination, filename } = req.file;
        logger.info(`User profile update  ${JSON.stringify(req.file)}`);
        if (req.file) {
            return next(null, {
                status: 200,
                message: 'Update Profile Image ',
                data: {
                    filename,
                    destination: filename + '/' + destination
                }
            });
        } else {
            return next({
                status: 404,
                message: " Profile image is not able to uploaded [please check]",
            });
        }
    } catch (err) {
        console.log(err);
        return next({
            status: 400,
            message: err.message,
        });
    }
}


