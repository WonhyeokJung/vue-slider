<template>
  <div class="home">
    <a href="https://stackoverflow.com/questions/62023604/where-to-find-or-how-to-set-htmlwebpackplugin-options-title-in-project-created-w">참고 사이트</a>
    <br />
    <a href="https://cli.vuejs.org/config/">Vue CLI</a>
    <br />
    <a href="https://cli.vuejs.org/guide/mode-and-env.html#environment-variables">BASE_URL</a>

    <br />
    <slider
      :width="500"
      :height="375"
      :useArrow="{ enabled: true }"
      :usePagination="{ enabled: true, clickable: true }"
      :loop="true">
        <slider-slide><img src="../assets/images/skyblue.jpg" alt=""></slider-slide>
        <slider-slide><img src="../assets/images/orange.jpg" alt=""></slider-slide>
        <slider-slide v-for="(v, i) in data" :key="i">
          <img :src="v.download_url" alt="loading..">
        </slider-slide>
    </slider>
  </div>
</template>

<script>
import { Slider, SliderSlide } from '../assets/js/vue-slider.js';
import { ref } from 'vue';
import '../assets/css/pure-js-slider.css';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    Slider,
    SliderSlide
  },
  setup() {
    const data = ref([])
    const images = async function () {
      await fetch('https://picsum.photos/v2/list?page=49&limit=5', { method: 'GET' })
        .then((r) => r.json())
        .then((d) => { data.value = d })
    }
    return {
      data,
      images: images()
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style>
  /* [class^='slider-arrow'] {
    color: black;
  } */
</style>
