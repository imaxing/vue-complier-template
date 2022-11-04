<template>
    <button @click="++count">{{count}}</button>
    </template>
<script>
    export default {
        data: () => ({ count: 0 })
    }
</script>
