<script lang="ts" setup>
import { useStore } from "~/utils/store";
const store = useStore();
</script>
<template>
  <div class="header">
    <el-row justify="space-between">
      <el-col :span="6">
        <div class="header-logo">{{ store.infoOther.stationName }}</div></el-col
      >
    </el-row>
  </div>
</template>
<style lang="scss">
.el-header {
  background-color: $h-color;
  .header {
    width: 100%;
    height: 100%;
    .header-logo {
      font-size: 30px;
      font-weight: bold;
      color: #fff;
      line-height: 60px;
    }
  }
}
</style>
