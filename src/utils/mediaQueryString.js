import isUndefined from "./isUndefined"

export default ({ approach, query }) => {
  const attr = { "mobile-first": "min-width", "desktop-first": "max-width" }[approach]
  return `(${attr}: ${query})`
}
