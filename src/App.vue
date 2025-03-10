<script lang="ts" setup>
import { useStore } from "./utils/store";

const store = useStore();
store.getTypeList();
</script>

<template>
  <router-view></router-view>
</template>
