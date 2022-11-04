export default {
  install(Vue, options = {}) {
    const { name = "vue-complier-template", defaultValue = "" } = options;
    Vue.component(name, {
      props: {
        value: { type: String, default: defaultValue },
        parseCode: {
          type: Function,
          default: options.parseCode,
          required: true,
        },
        parseStyles: { type: Function, default: options.parseStyles },
        renderError: { type: Function, default: options.renderError },
        renderEmpty: { type: Function, default: options.renderEmpty },
        evalScript: {
          type: Function,
          default: options.evalScript,
          required: true,
        },
        render: { type: Function, default: options.render },
      },
      computed: {
        sfcDescriptor() {
          try {
            const { descriptor } = this.parseCode(this.value);
            const { script, template, styles } = descriptor;
            this.evalScript &&
              this.evalScript(
                (script ? script.content : "").replace(
                  /export\s+default/,
                  "window.scriptContent = "
                )
              );

            const scriptContent = window.scriptContent;
            delete window.scriptContent;

            return {
              template: template ? template.content : "",
              script: scriptContent,
              styles,
            };
          } catch (error) {
            console.error(`源码解析失败: \n`, error);
            return {
              error: "源码解析失败",
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
          if (renderError)
            return renderError({
              h,
              error,
              descriptor: this.sfcDescriptor,
            });
          return h("div", { class: "parse-error" }, error);
        }

        // 空代码渲染
        if (!template) {
          if ($scopedSlots.empty) return $scopedSlots.empty(error);
          if (renderEmpty)
            return renderEmpty({ h, descriptor: this.sfcDescriptor });
          return h("div", { class: "empty-template" }, "模板为空");
        }

        return h({ template, ...script });
      },
    });
  },
};
