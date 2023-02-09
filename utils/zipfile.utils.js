const archiver = require('archiver');
const fs = require('fs');
async function zipfile({ Dirzip, Path, SheetName }) {
    const output = fs.createReadStream(Path);
    const archive = archiver('zip');
    await output.on('close', function () {
        console.log(archive.pointer() + 'total bytes');
    });
    await archive.on('error', function (err) {
        throw err;
    });
    await archive.pipe(output);
    await archive.directory(Dirzip, SheetName);
    await archive.finalize();
}
module.exports = zipfile

