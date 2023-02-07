exports.checkvendorform = async (req, res, next) => {
    let temp = [];
    if (!req.body.firstName) {
        temp.push({
            field: 'firstName',
            error: 'firstName is invalid'
        })
    }
    if (!req.body.lastName) {
        temp.push({
            field: 'lastName',
            error: 'lastName is invalid'
        })
    }
    if (temp.length) {
        res.status(200).json({ status: 400, error: temp })
    } next();
}