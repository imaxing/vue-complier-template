<template>
  <div id="app">
    <vue-run-template v-model="code">
      <template #source="{ code, update }">
        <code-editor :value="code" @input="update" />
      </template>
    </vue-run-template>
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
