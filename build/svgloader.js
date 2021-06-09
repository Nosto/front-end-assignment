module.exports = function(content) {
  this.cacheable && this.cacheable()
  this.value = content
  // strip declarations
  content = content.replace(/^\s*<\?xml [^>]*>\s*/i, "")
  // strip xmlns, width and height
  content = content.replace(' xmlns="http://www.w3.org/2000/svg"', "")
  return "module.exports=" + JSON.stringify(content)
}
module.exports.seperable = true
