var dir = require("node-dir")

dir.readFiles("src", { recursive: true, excludeDir: /templates/, match: /.vue$/ }, (err, content, filename, next) => {
  if (err) throw err
  let matched = /<template>([\s\S]*)<\/template>/m.exec(content)
  if (!matched) {
    throw "Found no template in " + filename
  }
  let template = matched[1]
  // remove expressions
  template = template.replace(/{{[^}]+}}/g, "")
  // remove entities
  template = template.replace(/&nbsp;/g, "")
  // replace new lines
  template = template.replace(/\n/g, " ")
  matched = />([^<>]*\w[^<>]*)</g.exec(template)
  if (matched) {
    throw "Found illegal content in " + filename + ": " + matched[1]
  }
  next()
})
