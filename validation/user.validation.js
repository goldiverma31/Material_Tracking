const is_email = require("../helper/Validation.helper");
exports.checkuserForm = async (req, res, next) => {
    let temp = [];
    if (!req.body.Name) {
        temp.push({
            field: 'Name',
            error: 'invalid Name'
        })
    }
    if (
        is_email(req.body.Email)) {
        temp.push({
            field: 'Email',
            error: 'invalid Email'
        })
    }
    if (temp.length) {
        res.status(200).json({ status: 400, error: temp })
    }
    next();
}




    // temp.push(!Name && !Email) ? console.log("blank") :
    // temp.push(!Name) ? console.log("name is blank") : temp.push(!Email) ? console.log("email is  blank") : next();


    // temp.push(!Name && !Email) ? console.log(Name, Email) : console.log("blank");
    // temp.push(!Name) ? console.log(Name) : console.log("name is blank");
    // temp.push(!Email) ? console.log(Email) : console.log("email is  blank");


    // // temp.push(Name && Email) ? console.log(Name, Email) : res.status(200).json({ status: 400, message: validationMessage.validation_Error });
    // temp.push(!Name) ? res.status(200).json({ status: 403, message: 'name is blank' }) :
    //     temp.push(!Email) ? res.status(200).json({ status: 403, message: 'email is blank' }) : console.log("blank");
    // //  next();

    // }

    // arr = [Name, Email];
    // var temp = [];
    // temp.push(...arr);
    // if (!temp)
    //     !(arr[0]) ? res.status(200).json({ status: 403, message: "name is blank" })
    //         : (!arr[1])
    //             ? res.status(200).json({ status: 403, message: "email is blank." })
    //             : next();


    // let temp;
    // let arr = [Name, Email];
    // for (let i = 0; i < arr.length; i++) {
    //     if (!temp) {
    //         temp = [];
    //         temp.push(arr[i])
    //     } else {
    //         next();
    //     }
    // }
    // console.log(temp);

    // };

//     const Name = await (req.body);
//     const Email = await (req.body);

//     if (!Name && !Email) {
//         res.status(200).json({ status: 400, message: validationMessage.validation_Error })
//     } else {
//         if (!Name) {
//             res.status(200).json({ status: 403, message: 'The name must be cantain between  2 to 100 characters .' })
//         } else {
//             if (!Email) {
//                 res.status(200).json({ status: 403, message: 'This email is  not valid.' })
//             } else {
//             }
//             next();
//         }
//     }
// }
