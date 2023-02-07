// const jwt = require('jsonwebtoken');

// const config = process.env;
// exports.validateToken = async (req, res, next) => {
//     const token = req.body.token || req.query.token || req.headers['x-access-token'];
//     if (!token) {
//         return next({ status: 403, message: 'UNAUTHORIZED' });
//     }
//     try {
//         const decoded = jwt.verify(token, config.SECRETKEY);
//         req.use = decoded;
//     } catch (err) {
//         return next({ status: 401, message: 'Invalid Token' });
//     }
//     return next();
// }                                                                                                    
