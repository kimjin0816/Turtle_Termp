<template>
  <hello-world />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';


export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  mounted() {
    window.addEventListener('beforeunload', this.clearLocalStorage);
  },
  // beforeDestroy() {
  //   window.removeEventListener('beforeunload', this.clearLocalStorage);
  // },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem('keywordArray');
    },
    // ...
  },
}
</script>