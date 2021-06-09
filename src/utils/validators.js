import isNumber from "@/utils/isNumber"

let i18n = key => key

export function setI18n(impl) {
  i18n = impl
}

export function required(field, value) {
  if (value === undefined || value === null || value === "") {
    return i18n("is.required", field.label || field.name)
  }
}

export function numeric(field, value) {
  let { min, max, step } = field
  if (isNumber(min) || isNumber(max) || isNumber(step)) {
    if (isNumber(min) && value < min) {
      return i18n("minimum", min)
    } else if (isNumber(max) && value > max) {
      return i18n("maximum", max)
    } else if (step === 1 && value && value % 1 !== 0) {
      return i18n("integer.only")
    }
  }
}

export function email(field, value) {
  if (value) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(value)) {
      return i18n("invalid.email")
    }
  }
}

export function combine() {
  let args = arguments
  return (field, value) => {
    for (var i = 0; i < args.length; i++) {
      let result = args[i](field, value)
      if (result) {
        return result
      }
    }
  }
}

export default { setI18n, required, numeric, email, combine }
