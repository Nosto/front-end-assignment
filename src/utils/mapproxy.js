function arrayToObject(fields = []) {
  return fields.reduce((prev, path) => {
    const key = path.split(`.`).slice(-1)[0]
    if (prev[key]) {
      throw new Error(`The key \`${key}\` is already in use.`)
    }
    prev[key] = path
    return prev
  }, {})
}

function toPath(prefix, key) {
  if (typeof key === "number") {
    return prefix + "[" + key + "]"
  }
  return prefix + "." + key
}

function unwrap(obj) {
  return (obj && obj._original) || obj
}

/**
 * Alternative to vuex-map-fields which creates a proxy instead
 *
 * @param store
 * @param prefix
 * @returns {*}
 */
export function mapProxy(store, prefix) {
  const obj = store.getters.getField(prefix)
  if (!obj) {
    console.warn("Found no object mapped to %s", prefix)
    return obj
  }
  let handler = {
    get(target, key) {
      return key === "_original" ? obj : obj[key]
    },
    set(target, key, value) {
      value = unwrap(value)
      if (store.getters.getField(prefix) === obj) {
        store.commit("updateField", { path: toPath(prefix, key), value })
      } else {
        obj[key] = value
      }
      return true
    },
    deleteProperty(target, key) {
      return this.set(target, key)
    }
  }
  return new Proxy(obj, handler)
}

export function mapProxies(names) {
  const namesObject = Array.isArray(names) ? arrayToObject(names) : names
  return Object.keys(namesObject).reduce((prev, key) => {
    const path = namesObject[key]
    const field = {
      get() {
        return mapProxy(this.$store, path)
      },
      set(value) {
        value = unwrap(value)
        this.$store.commit("updateField", { path, value })
      }
    }
    prev[key] = field
    return prev
  }, {})
}
