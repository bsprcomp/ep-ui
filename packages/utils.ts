const getDefaultValue = value => {
  if (typeof value == "function") {
    return value
  } else {
    return value
  }
}
const getParams = (
  data:
    | {
        prop: string
        defaultValue?: any
        [x: string]: any
      }[]
    | [],
  extraParam: object = {} // 额外参数
) => {
  const params = data.reduce((acc, curr) => {
    if (!curr?.hidden && curr.prop) {
      acc[curr.prop] = getDefaultValue(curr.defaultValue)
    }
    return acc
  }, {})
  return { ...params, ...extraParam }
}
export { getParams }
