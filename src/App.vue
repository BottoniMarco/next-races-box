<template>
  <div>
    <NextRace/>
  </div>
</template>

<script>
import NextRace from './components/NextRace.vue'

export default {
  name: 'App',
  components: {
    NextRace
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
