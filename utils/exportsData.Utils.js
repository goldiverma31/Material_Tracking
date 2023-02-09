const { Users, Jobs, Verndors } = require('./folders.utils');
// const Data = require('./folders.utils')
const XLSX = require('xlsx');
const fs = require('fs');
const sheetdata = async ({ Dir, workSheetName, filePath }) => {
    const obj = await Jobs();
    const workSheet = XLSX.utils.json_to_sheet(obj);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    if (!fs.existsSync(Dir)) {
        await fs.promises.mkdir(Dir, { recursive: true });
    }
    XLSX.writeFile(workBook, filePath);
}
module.exports = sheetdata;