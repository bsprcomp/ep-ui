<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "CustomRender",
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render(ctx: {
    row: { [x: string]: any }
    index: any
    column: { prop: string | number }
    render: (arg0: any, arg1?: any) => any
  }) {
    return ctx.render(ctx.row || ctx.column, ctx?.index)
  }
})
</script>
