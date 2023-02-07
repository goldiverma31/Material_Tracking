const multer = require('multer');
const fs = require('fs');

const Storage = multer.diskStorage({
    destination: './public/images/',
    if(destination) {
        if (!fs.existsSync(destination)) {
            fs.mkdir(destination, { recursive: true });
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + '_' + file.originalname);
    },
});
const upload = multer({ storage: Storage });
module.exports = upload;
