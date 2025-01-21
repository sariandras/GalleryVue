<template>
    <div id="content">
        <a @click="$emit('incrementId',false)"><</a>
        <img :src="props.imgUrl" alt="">
        <a @click="$emit('incrementId',true)">></a>

    </div>
</template>

<script setup>
const props = defineProps(['imgUrl','maxId'])
defineEmits(['incrementId'])
</script>

<style lang="css" scoped>
#content{
    width: 800px;
    display: flex;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    left: 0;
    top: 30%;
    right: 0;

}

img{
    object-fit: fill;
    width: 800px;
    height: 400px;
}

a{
    background-color: blue;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 50%;
    height: 30px;
    margin: auto 0;
}
</style>