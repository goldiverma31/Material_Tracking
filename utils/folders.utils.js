const User = require('../models/user.model');
const Job = require('../models/jobs.models');
const vendor = require('../models/vendor.models');

exports.Users = async () => {
    let UserData = await User.findAll()
    UserData.map((e, i) => {
        UserData[i] = {
            Name: e.Name,
            Email: e.Email,
            Role: e.Role,
        }
    })
    return UserData;
    // console.log(UserData);
}

exports.Jobs = async () => {
    let JobData = await Job.findAll()
    JobData.map((e, i) => {
        JobData[i] = {
            job_name: e.job_name,
            job_no: e.job_no,
            description: e.description
        }
    })
    return JobData;
    // console.log(JobData);
}


exports.Verndors = async () => {
    let VendorData = await vendor.findAll()
    VendorData.map((e, i) => {
        VendorData[i] = {
            Name: e.firstName + ' ' + e.lastName,
            status: e.status
        }
    })
    return VendorData;
    // console.log(VendorData);
}
