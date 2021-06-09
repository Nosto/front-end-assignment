/**
 * This gets the version number from package.json without adding the whole file content in to bundle by accident
 */

const fs = require("fs")
let version = require("../package.json").version
let versionObj = JSON.stringify({ version })

fs.writeFile("version.json", versionObj, err => {
  if (err) throw err
})
