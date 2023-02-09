const sheetdata = require('../utils/exportsData.Utils');
const zipfile = require('../utils/zipfile.utils');
const Dir = './temp'
const workSheetName = "sheet1";
const filePath = "./temp/jsonsheet.xlsx"

const timeStamp = Date.now();
const Path = timeStamp + '_jsonsheet.zip'
const Dirzip = './temp'
const SheetName = 'sheet'

const xlsxTozip = async () => {
    await sheetdata({ Dir, workSheetName, filePath });
    await zipfile({ Dirzip, Path, SheetName });
}
xlsxTozip();
