<template>
    <div class="container" :class="isSelected ? 'blur' : ''">
        <div class="error-message" v-if="error !=''">
    
        </div>
        <div class="gallery">
            <div class="image-container" v-for="id in actualIds">
                <img :src="'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=400&h=400&auto=compress&cs=tinysrgb'" @click="selectImage(id)">
            </div>
        </div>
        <div class="pager">
            <div class="pager-button" v-for="p in pages">
                    <a :href="p">{{ p }}</a>
            </div>
        </div>
    </div>
    <BigPicture v-if="isSelected" :imgUrl="selectedUrl"/>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import BigPicture from '../components/BigPicture.vue'

const route = useRoute();

let page = Number(route.params.page);
const pages = ref([]);
const error = ref('');
const actualIds = ref([]);
const isSelected = ref(false);
const selectedUrl = ref('');


fetch('http://localhost:3000/pexels')
    .then((res)=>res.json())
    .then((data)=>{
        if (page*12<=data.length) {
            pages.value=range(1,data.length/12);
            for (let i = (page-1)*12; i < page*12; i++) {         
                actualIds.value.push(data[i].id)
            }
        }
        else{
            error.value = "Nincs ennyi kép"          
        }
    })
    .catch((err)=>error.value= err.message)

function selectImage(id){
    selectedUrl.value = 'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
    isSelected.value = true;
}

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}
</script>

<style lang="css" scoped>
.gallery{
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-items: center;
    flex-wrap: wrap;
}
img{
    width: 200px;
    height: 150px;
    margin: 8px;
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
}
.pager{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    width: 40%;
}
.blur{
    filter: blur(10px);
}
</style>