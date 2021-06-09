function fromRegex(filter) {
  return s => {
    filter.lastIndex = 0
    return filter.test(s)
  }
}

function normalize(str) {
  return str.normalize().toLowerCase()
}

function fromString(f) {
  const filter = normalize(f).trim()
  if (filter.indexOf(" ") === -1) {
    return s => s && normalize(s).indexOf(filter) > -1
  } else {
    // intersection of matches for multiple tokens
    const splitted = filter.split(/\s+/)
    return s => {
      if (!s) return false
      const strLower = normalize(s)
      return splitted.every(s => strLower.indexOf(s) > -1)
    }
  }
}

function fromObject(filter) {
  let filters = []
  Object.keys(filter).forEach(k => {
    filters.push([k, fromAny(filter[k])])
  })
  return obj => filters.every(([field, fieldFilter]) => fieldFilter(obj[field]))
}

/**
 * Turns strings and regexes into string input filters
 * and objects into composite filters for properties
 *
 * @param filter
 * @returns {function(*): boolean}
 */
export default function fromAny(filter) {
  if (filter instanceof RegExp) {
    return fromRegex(filter)
  } else if (typeof filter === "string") {
    return fromString(filter)
  } else if (filter && typeof filter === "object") {
    return fromObject(filter)
  } else if (typeof filter === "function") {
    return filter
  } else {
    return any => true
  }
}
