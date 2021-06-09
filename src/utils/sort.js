export default function sort(a, b) {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b)
  } else if (typeof a === typeof b) {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  } else if (!a && b) {
    return -1
  } else if (a && !b) {
    return 1
  } else {
    return sort(typeof a, typeof b)
  }
}
