<template>
    <img :src="props.imgUrl" alt="">
</template>

<script setup>
const props = defineProps(['imgUrl'])
console.log(props.imgUrl)
</script>

<style lang="css" scoped>

</style>