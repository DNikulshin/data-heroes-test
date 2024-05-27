<template>
  <div class="container-items">
    <div class="filter">
      <select v-model="selectedValue">
        <option 
          v-for="option in select"
          :key="option.value" 
          :value="option.value"
         >
          {{option.label}}
        </option>

      </select>
      <input
        v-model="inputValue" 
        type="text" 
        placeholder="Enter name..." 
        />
      <button 
        @click="setFilter"
        type="button"
        >
        Apply
      </button>
    </div>
<div class="list">

  <div
    class="item"
     v-for="item in items"
     :key="item.id"
    >
    <div class="item-img">
    <img :src="item.image" alt="item.name" />
      </div>
    
    <div class="info">
      <div class="item-name"><h2>{{ item.name }}</h2>
              <span class="status">
         <span  :class="{
            alive: item.status === 'Alive', 
            'dead': item.status === 'Dead'
          }">
          </span>
            {{ item.status }}-{{item.name}}
              </span>
      </div>
      <div class="color-gray location">
        Last known location:
        <p class="color-white">{{ item.location.name }}</p>
      </div>
      <div class="color-gray">
        First seen in:
      <Episode :url="item.episode[0]"/>
      </div>
    </div>
    </div>

</div>
    <paginate
      v-model="page"
      :page-count="itemsInfo.pages ?? 1"
      :click-handler="setPaginate"
      :page-range="3"
      :margin-pages="2"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
    </div>
</template>

<script setup lang="ts">
  import axios from "axios"
  import Paginate from "vuejs-paginate-next"
  import { onMounted, ref, computed} from 'vue'
  import  useGetData  from './hooks/useGetData' 
  import Episode from './components/Episode.vue'
 
  const items = ref<IData>([])
  const itemsInfo = ref<IData>({})
  const {getData , getEpisode, getFilterData} = useGetData()
  const page = ref(1)
  const selectedValue = ref('')
  const inputValue = ref('')
  const select = ref([
     {value: '', label: 'No Filter'},
     {value: 'Alive', label: 'Alive'},
     {value: 'Dead', label: 'Dead'},
     {value: 'Unknown', label: 'Unknown'},
  ])
 
  onMounted( async () => {
  const {info, results}: IData = await getData()
  items.value = results
  itemsInfo.value = info
  })

  const setPaginate = async(page: number) => {
     const {results}: IData = await getData(page)
     items.value = results
  }

  const setFilter = async () => {
     const {results}: IData = await getFilterData(
       {
         name: inputValue.value , 
        status: selectedValue.value
       }
     )
    items.value = results
    console.log(items.value)
  }

</script>

<style>
   @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: rgb(39, 43, 51);
    position: relative;
  }
  
  .container-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 4.5rem 0px;
    min-height: calc(-60px + 50vh);
  }
  .list {
     display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1920px;
    margin-bottom: 1rem;
  }
  .item {
    width: 600px;
    height: 220px;
    display: flex;
    overflow: hidden;
    background: rgb(60, 62, 68);
    border-radius: 0.5rem;
    margin: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }

  .item-name:first-child {
    -webkit-box-pack: start;
    justify-content: flex-start;
  }
  
  .item-img {
    flex: 2 1 0%;
    width: 100%;
  }


  .item img {
    width: 100%;
    height: 100%;
    margin: 0px;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    object-position: center center;
    object-fit: cover;
  }

  .info {
    flex: 3 1 0%;
    position: relative;
    padding: 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .status {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-transform: capitalize;
  }
  
  .status > span {
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(158, 158, 158);
    border-radius: 50%;
    font-size: 16px;
    font-weight: 500;
  }
  .alive {
    background: rgb(0, 255, 0)!important;
  }

  .dead {
      background: rgb(214, 61, 46)!important;
  }
  
  .color-gray {
    color: rgb(158, 158, 158);
  }
  
  .color-white {
    color: rgb(245, 245, 245);
  }

  .pagination {
    margin-top: auto;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .filter {
    display: flex;
    gap: .5rem;
  }
  .filter select, .filter button {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background: rgb(60, 62, 68);
    color: white;
  }
   .filter select > option {
     padding: .5rem;
   }
  .filter select:invalid { 
    color: white!important;
  }
</style>
