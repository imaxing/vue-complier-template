import { parse } from "@vue/compiler-sfc";

export default /*#__PURE__*/ (() => ({
  install(Vue, options = {}) {
    const { name = "vue-run-template", defaultValue = "" } = options;
    Vue.component(name, {
      props: {
        value: { type: String, default: defaultValue },
        parseStyles: { type: Function, default: options.parseStyles },
        renderError: { type: Function, default: options.renderError },
        renderEmpty: { type: Function, default: options.renderEmpty },
        render: { type: Function, default: options.render },
      },
      computed: {
        sfcDescriptor() {
          try {
            const { descriptor } = parse(this.value);
            const { script, template, styles } = descriptor;
            eval(
              script.content.replace(
                /export\s+default/,
                "this.scriptContent = "
              )
            );

            return {
              template: template.content,
              script: this.scriptContent,
              styles,
            };
          } catch (error) {
            return {
              error,
            };
          }
        },
      },
      mounted() {
        const unWatchCode = this.$watch(
          "value",
          async () => {
            const { template, styles } = this.sfcDescriptor;
            if (!template) return;
            this.parseStyles && this.parseStyles({ styles, vm: this });
          },
          { immediate: true }
        );
        this.$once("hook:beforeDestory", unWatchCode);
      },
      render(h) {
        const { $scopedSlots, renderError, renderEmpty, render, value } = this;

        // 完全交给外部渲染
        if (render) return render({ h, descriptor: this.sfcDescriptor });

        const { template, script, error } = this.sfcDescriptor;

        // 错误渲染
        if (error) {
          if ($scopedSlots.error) return $scopedSlots.error(error);
          if (renderError) return renderError(error);
          return h("div", { class: "parse-error" }, error);
        }

        // 空代码渲染
        if (!template) {
          if ($scopedSlots.empty) return $scopedSlots.empty(error);
          if (renderEmpty) return renderEmpty(error);
          return h("div", { class: "empty-template" }, "模板为空");
        }

        return h("div", [
          h({
            template,
            ...script,
          }),
          $scopedSlots.source &&
            $scopedSlots.source({
              code: value,
              update: (v) => this.$emit("input", v),
            }),
        ]);
      },
    });
  },
}))();
