<template>
   <div class="wrapper">
    <notifications></notifications>
    <div class="main-content">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
    </div>
  </div>
</template>
<script>
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      FadeTransition
    }
  };
</script>

<style>
</style>
