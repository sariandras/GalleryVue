<template>
    <div class="container" id="container" :class="isSelected ? 'blur' : ''" @click="removeBlur()">
        <div class="error-message" v-if="error !=''">
    
        </div>
        <div class="gallery">
            <div class="image-container" v-for="(id,index) in Ids">
                <img v-if="index<(page*12) && index>=(page-1)*12" :src="'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=400&h=400&auto=compress&cs=tinysrgb'" @click="selectImage(id)">
            </div>
        </div>
        <div class="pager">
            <div class="pager-button" v-for="p in pages">
                <a :href="p" :class="route.params.p==p ? 'active':''">{{ p }}</a>
            </div>
        </div>
    </div>
    <BigPicture v-if="isSelected" @incrementId="asd($event)" :imgUrl="selectedUrl" :maxId="Ids.length"/>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import BigPicture from '../components/BigPicture.vue'

const route = useRoute();


let page = Number(route.params.page);
const pages = ref([]);
const error = ref('');
const Ids = ref([]);
const isSelected = ref(false);
const selectedUrl = ref('');
let clickCounter =0;

fetch('http://localhost:3000/pexels')
    .then((res)=>res.json())
    .then((data)=>{
        if (page*12<=data.length) {
            pages.value=range(1,data.length/12);
            data.forEach(d => {
                Ids.value.push(d.id)
            });;
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

function removeBlur(){
    clickCounter++;
    if (clickCounter%2==0) {
        isSelected.value=false
        
    }
}

function asd(doIncrement){
    let id = selectedUrl.value.split('/')[4];
    let index = Ids.value.findIndex((identity)=>identity==id)
    if (doIncrement) {
        selectedUrl.value = 'https://images.pexels.com/photos/'+Ids.value[index+1]+'/pexels-photo-'+Ids.value[index+1]+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    }else{
        if (Ids.value[index]>0) {
            selectedUrl.value = 'https://images.pexels.com/photos/'+Ids.value[index-1]+'/pexels-photo-'+Ids.value[index-1]+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        }
        else{
            selectedUrl.value = 'https://images.pexels.com/photos/'+Ids.value[Ids.value.length-1]+'/pexels-photo-'+Ids.value[Ids.value.length-1]+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        }
    }
}

onMounted(()=>{
    document.addEventListener('keydown',(e)=>{
        if(e.key === "Escape") {
        isSelected.value = false;
        clickCounter=0;
    }
    })
})
</script>

<style lang="css" scoped>
#container{
    z-index: -100!important;

}
.gallery{
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-items: center;
    flex-wrap: wrap;
    z-index: 1000;
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

.active{
    color: blue;
    background-color: white;
}
</style>