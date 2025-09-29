const fs = require("fs");
const path = require("path");

function generateFolder(invoicesFolder) {
  if (!fs.existsSync(invoicesFolder)) {
    // { recursive: true } : Creates all parent folders if necessary.
    fs.mkdirSync(invoicesFolder, { recursive: true });
  }
}

module.exports = { generateFolder };
