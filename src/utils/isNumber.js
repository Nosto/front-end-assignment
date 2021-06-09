import isNumber from "lodash/isNumber"

export default function(arg) {
  return isNumber(arg) && !isNaN(arg)
}
