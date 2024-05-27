<template>
  <p class="color-white">{{episode}}</p>
</template>

  <script  setup lang="ts">
    import { onMounted, ref} from 'vue'
    import  useGetData  from '../hooks/useGetData'
    const {getEpisode} = useGetData()
    const {url} = defineProps(['url'])
    const episode = ref('')
 
    onMounted( async() => {
    const data =   await getEpisode(url) 
        episode.value = data
    })
  </script>