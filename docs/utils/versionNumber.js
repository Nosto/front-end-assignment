import { version } from "../../version.json"
export default {
  init() {
    let container = document.createElement("div")
    let el = document.querySelector(".rsg--logo-5")
    container.innerText = version
    container.className = "styleguide-version-number"
    el.appendChild(container)
  }
}
