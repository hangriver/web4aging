<template>
  <q-layout view="lHh LpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> 适老化阅读实验人机界面 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style>
.q-field__label {
  font-size: 24px;
  line-height: 30px;
}
</style>
