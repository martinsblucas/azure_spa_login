<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Auth",
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("user/auth", {redirectTo: {name: "index"}});
    });
  },
});
</script>

<style>
body,
html,
#app {
  height: 100%;
}
</style>