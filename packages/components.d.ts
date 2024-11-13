import EPSelect from "./select/src/index.vue"
import EPTable from "./table/src/index.vue"
import EPButton from "./button/src/index.vue"
import EPInput from "./input/src/index.vue"
import EPDatePicker from "./date-picker/src/index.vue"
import EPRadio from "./radio/src/index.vue"
import EPCheckbox from "./checkbox/src/index.vue"

declare module "vue" {
  export interface GlobalComponents {
    EPSelect: typeof EPSelect
    EPTable: typeof EPTable
    EPButton: typeof EPButton
    EPInput: typeof EPInput
    EPDatePicker: typeof EPDatePicker
    EPRadio: typeof EPRadio
    EPCheckbox: typeof EPCheckbox
  }
}
