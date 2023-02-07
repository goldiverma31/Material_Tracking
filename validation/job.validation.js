exports.checkJobform = async (req, res, next) => {
    let temp = [];
    if (!req.body.job_name) {
        temp.push({
            field: 'job_name',
            error: 'job_name invalid'
        })
    }
    if (!req.body.job_no) {
        temp.push({
            field: 'job_no',
            error: ' job_no invalid'
        })
    }
    if (temp.length) {
        res.status(200).json({ status: 400, error: temp })
    } next()
}