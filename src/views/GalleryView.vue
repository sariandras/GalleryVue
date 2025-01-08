<template>
    <div class="gallery" v-for="url in actualSmallImageUrls">
        <img :src="url" alt="">

    </div>

    <div class="error-message" v-if="error !=''">

    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();

let page = Number(route.params.page);
const error = ref('');
const actualSmallImageUrls = ref([]);
const actualBigImageUrls = ref([]);


fetch('http://localhost:3000/pexels')
    .then((res)=>res.json())
    .then((data)=>{
        if (page*12<=data.length) {
            for (let i = (page-1)*12; i < page*12; i++) {
                actualSmallImageUrls.value.push('https://images.pexels.com/photos/'+data[i].id+'/pexels-photo-'+data[i].id+'.jpeg?w=400&h=400&auto=compress&cs=tinysrgb')
                actualBigImageUrls.value.push('https://images.pexels.com/photos/'+data[i].id+'/pexels-photo-'+data[i].id+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')                  
            }
        }
        else{
            error.value = "Nincs ennyi kép"          
        }
    })

</script>

<style lang="scss" scoped>

</style>