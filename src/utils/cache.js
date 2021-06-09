/**
 * Factory method for cache creation
 * @param creator function to create the value for a given key
 */
export default function(creator) {
  const cache = new Map()
  return key => {
    if (!cache.has(key)) {
      try {
        cache.set(key, creator(key))
      } catch (e) {
        cache.delete(key)
      }
    }
    return cache.get(key)
  }
}
