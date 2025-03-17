import { defineComponent, renderSlot, provide } from "vue"
const ConfigProvider = defineComponent({
  name: "EPConfigProvider",
  props: {
    table: {
      type: Object,
      default: () => ({})
    },
    dialog: {
      type: Object,
      default: () => ({})
    },
    datePicker: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props, { slots }) {
    Object.entries(props).map(([key, prop]) => {
      provide(key, prop)
    })
    return () => renderSlot(slots, "default")
  }
})

export default ConfigProvider
