const getParams = (
  data:
    | {
        prop: string
        defaultValue?: any
        [x: string]: any
      }[]
    | []
) => {
  return data.reduce((acc, curr) => {
    if (!curr?.hidden) {
      acc[curr.prop] = curr.defaultValue || ""
    }
    return acc
  }, {})
}
export { getParams }
