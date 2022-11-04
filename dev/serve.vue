<template>
  <div id="app">
    <vue-complier-template v-model="code" />
    <code-editor v-model="code" />
  </div>
</template>

<script>
import TemplateString from "./template.js";
import CodeEditor from "simple-code-editor";
export default {
  name: "App",
  components: { CodeEditor },
  data: () => ({ code: TemplateString }),
};
</script>
