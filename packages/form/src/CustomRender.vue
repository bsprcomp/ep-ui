<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    render: Function,
    item: Object
  },
  render(ctx: { render: (arg0: any) => any; item: any }) {
    return ctx.render(ctx?.item)
  }
})
</script>
