// Chart data points
const models = {
  LineChart: ["paths", "dots"],
  BarChart: ["categories"],
  DonutChart: ["arcs"]
}

export function getModels(vm, chartType) {
  return models[chartType].map(m => vm[m])
}
