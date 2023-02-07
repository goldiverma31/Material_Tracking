const jwt = require('jsonwebtoken');
const sequelize = require('../config/database')
const User = require('../models/user.model');
const { securePassword, comparePassword } = require('../utils/securePassword.utils');
const { gernalMessage,
    validationMessage } = require('../response_messages/resMessages');
const ResetPasswordToken = require('../models/resetpasswordToken');
const sendEmail = require('../utils/sendEMail.utils');

exports.LogIn = async (req, next) => {
    const { Email, password } = await req.body;
    try {
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return next({ status: 400, message: validationMessage.EMAIL_NOT_FOUND });
        }
        if (password) {
            const compareResult = await comparePassword(password, user.password);
            if (compareResult) {
                return next(null, { status: 200, message: gernalMessage.SUCCESS, data: user });
            }
            console.log(compareResult);
            return next({ status: 400, message: gernalMessage.Password_Not_Match });
        }
    } catch (err) {
        console.log(err);
        return next({
            status: 400, message: err.message
        })
    }
}
exports.changePassword = async (req, next) => {
    try {
        let { user_id, oldPassword, newPassword } = req.body;
        const hash = await securePassword(newPassword);
        const pass = await User.findOne({ where: { user_id } });
        const isOld_password = await comparePassword(oldPassword, pass.password);
        const isnew_password = await comparePassword(newPassword, pass.password);
        if (!isOld_password) {
            return next({ status: 400, message: gernalMessage.Password_Not_Match })
        }
        if (isnew_password) {
            return next({ status: 400, message: gernalMessage.Password_Same })
        }
        await sequelize.transaction(async (t) => {
            await User.update({
                password: hash
            }, {
                where: {
                    user_id,
                }, transaction: t
            });
            return next(null, { status: 200, message: gernalMessage.Password_change })
        });
    } catch (err) {
        console.log(err);
        return next({
            status: 400, message: err.message
        })
    }
}
exports.forgotPassword = async (req, next) => {
    try {
        await sequelize.transaction(async (t) => {
            let user = await User.findOne({ where: { Email: req.body.Email } });
            if (user) {
                delete user.password;
                const secret = user.user_id;
                user.resetToken = jwt.sign({}, secret, {
                    expiresIn: '1h',
                });
                await ResetPasswordToken.destroy({
                    where: {
                        user_id: user.user_id
                    }
                    , transaction: t
                });
                await ResetPasswordToken.create({
                    reset_token: user.resetToken,
                    user_id: user.user_id
                }
                    , { transaction: t }
                );
                const passwordResetLink =
                    'http://' + process.env.domain + '/user/resetpassword/' + user.resetToken;
                console.log(passwordResetLink);

                const emailData = {
                    from: `Reset password ${process.env.SMTP_UserName}`,
                    to: user.Email,
                    subject: `${user.Name} , Link to reset  your password`,
                    details: `Hello ${user.Name},
                     \nFollow this link to reset your ${process.env.domain}
                      password for your ${user.Email} account. 
                      \n${passwordResetLink} \nIf you didn't ask to reset your password, you can ignore the email. \n\nThanks,`
                };
                await sendEmail(emailData);
                return next(null, { status: 200, message: gernalMessage.Email_sent });
            } else {
                return next({ status: 404, message: gernalMessage.EMAIL_NOT_FOUND });
            }
        })
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message })

    }
}
exports.resetPassword = async (req, next) => {
    try {
        const { reset_token, password } = await req.body;
        const hash = await securePassword(password);
        const data = await ResetPasswordToken.findOne({
            where: { reset_token }
        });
        console.log(data);
        if (data != null) {
            jwt.verify(data.reset_token, data.user_id, async (err, jwtData) => {
                if (err) {
                    return next(null, { status: 404, message: validationMessage.Link_is_Expired });
                } else {
                    await sequelize.transaction(async (t) => {
                        await User.update({
                            password: hash
                        }, {
                            where:
                                { user_id: data.user_id },
                            transaction: t
                        });
                        await ResetPasswordToken.destroy({
                            where: {
                                user_id: data.user_id
                            }, transaction: t,
                        });
                        return next(null, { status: 200, message: gernalMessage.Password_change });
                    })
                }
            });
        } else {
            return next(null, { status: 403, message: validationMessage.validation_Error })
        }
    } catch (err) {
        console.log(err);
        return next({ status: 400, message: err.message });
    }
}