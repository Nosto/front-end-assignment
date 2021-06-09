export function getBBox(e) {
  try {
    return {
      width: parseInt(e.getBBox().width),
      height: parseInt(e.getBBox().height)
    }
  } catch (e) {
    return { width: 0, height: 0 }
  }
}
