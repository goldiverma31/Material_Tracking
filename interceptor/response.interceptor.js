// const logger = require('../config/logger');
// const response = async (req, resp) => {
//     let { status, message, data, count, err } = resp;
//     const code = status;
//     if (code === 500) {
//         logger.info(`[CRASH AT 500] :${JSON.stringify(resp)}`);
//     }
//     if (code === 400 && err) {
//         logger.info(`[CRASH AT 400] :${JSON.stringify(resp)}`);
//     }
//     logger.info(`${JSON.stringify(resp)}`);

// }
// module.exports = response;