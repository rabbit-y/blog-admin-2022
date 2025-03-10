<script setup lang="ts">
import { navList } from "../../utils/dataList";
</script>

<template>
  <el-menu default-active="1" :router="true">
    <template v-for="item in navList" v-bind:key="item.index">
      <el-sub-menu :index="item.index" v-if="item.list">
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="iItem in item.list" v-bind:key="iItem.index">
          <el-menu-item :index="iItem.index">
            {{ iItem.name }}
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item :index="item.index" v-else>{{ item.name }} </el-menu-item>
    </template>
  </el-menu>
</template>
