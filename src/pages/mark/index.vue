<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const dataList = ref([]);
const route = useRouter();
const pageParam = reactive({
  size: 14,
  current: 1,
  total: 0,
});
onMounted(() => {
  getList();
});
watch(pageParam, () => {
  getList();
});
const getList = async () => {
  const {
    code,
    data: { records, current, total },
  } = await API.article.getList.request(pageParam);
  if (code === 0) {
    dataList.value = records;
    pageParam.current = current;
    pageParam.total = total;
  }
};
const jumpDtl = (e: number | string) => {
  route.push(`/mark/${e}`);
};
const remove = (e: number) => {
  ElMessageBox.confirm("确认删除这篇文章吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const { code } = await API.article.removeById.request({ id: e });
    if (code === 0) {
      ElMessage.success("删除成功");
      getList();
    }
  });
};
</script>
<template>
  <div class="mark-title">
    <el-button type="primary" @click="jumpDtl('creat')">新建文档</el-button>
  </div>
  <el-table
    :data="dataList"
    border
    class="mark-table"
    height="calc(100vh - 200px)"
  >
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="typeName" label="类型">
      <template #default="scope">
        <el-tag>{{
          scope.row.typeName ? scope.row.typeName : "未分类"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="更新日期" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="jumpDtl(scope.row.id)"
          >修改</el-button
        >
        <el-button link size="small" @click="remove(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="mark-page">
    <el-pagination
      small
      background
      :hide-on-single-page="true"
      :total="pageParam.total"
      :page-size="pageParam.size"
      v-model:current-page="pageParam.current"
    />
  </div>
</template>
<style lang="scss">
.mark-title {
  height: 40px;
}
.mark-page {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  height: 60px;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 10px;
  border-top: 3px double $h-color;
}
</style>
