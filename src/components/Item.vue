<template>
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
      <div>
        First seen in:
        <p class="color-white">{{ getEpisode(item.episode[0]) }}</p>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import  useGetData  from './hooks/useGetData'
  const items = defineProps(['items'])
  const {getEpisode} = useGetData()
</script>

<style>
  
</style>