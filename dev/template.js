export default `
<template>
  <button @click="count++">{{message}}-{{count}}</button>
</template>
<script>
  export default {
    data() {
      return {
        message: 'hello world',,
        count: 0
      };
    }
  };
</script>

<style>
  .user-name {
    color: red;
  }
</style>

<style lang="less">
  .user-name {
    color: red;
  }
</style>
<style lang="scss">
  .user-name {
    color: red;
    a {
      color: #fff;
    }
  }
</style>
`;
