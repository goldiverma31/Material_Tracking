// exports.is_email = (data) =>
// {
//     var regex =
//         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (!email) return false;
//     else return regex.test(email);
// };
const is_email = (data) => {
    regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (!regexp.test(data));

}
module.exports = is_email;

exports.isBoolean = (data) => {
    return typeof data === 'boolean';
}