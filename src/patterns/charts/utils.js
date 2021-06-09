export function withPalette(className, palette) {
  if (className) {
    return className.indexOf("palette") > -1 ? className : className + " " + palette
  } else {
    return palette
  }
}

export function formatNumber(v) {
  let vabs = Math.abs(v)
  if (vabs >= 1000000) {
    return v / 1000000 + "M"
  } else if (vabs >= 1000) {
    return v / 1000 + "k"
  } else if (vabs > 0 && vabs < 0.01) {
    return v * 1000 + "m"
  } else {
    return v
  }
}

export const defaultDimensions = {
  defaultWidth: 1000,
  defaultLegendHeight: 64,
  defaultHeight: 300
}
