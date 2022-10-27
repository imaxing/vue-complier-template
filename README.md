# 实现 vue 组件的实时修改实时运行

> 实现 ElementUi 文档的组件示例效果

---

**安装**

```bash
npm install vue-run-template
```

**用法**

```js
// main.js
import Vue from "vue";
import VueRunTemplate from "vue-run-template";
Vue.use(VueRunTemplate);
```

```js
// example-source-code.js
export default `<script>
  export default {
    data() {
      return {
        tableData: Array(6).fill('').map((_, index) => ({
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519弄'
        }))
      }
    }
  }
</script>

<template>
  <el-table :data="tableData" border>
    <el-table-column prop="date" label="日期" width="180"/>
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>
`;
```

```html
<!-- example.vue -->
<template>
  <div id="app">
    <vue-run-template v-model="codeValue" />
    <textarea v-model="codeValue" />
  </div>
</template>

<script>
  import sourceCode from "path/to/example-source-code.js";
  export default {
    name: "App",
    data: () => ({
      codeValue: sourceCode,
    }),
  };
</script>
```

**DEMO**
[![Edit vue-run-template-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-run-template-example-4qjo20?fontsize=14&hidenavigation=1&theme=dark)
