<script setup lang="ts">
import Nav from "~/components/nav/index.vue";
import Header from "~/components/header/index.vue";
</script>

<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.el-container {
  height: 100vh;
  .el-aside {
    height: 100%;
  }
  .el-main {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
}
</style>
