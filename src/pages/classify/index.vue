<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { ElMessage,ElMessageBox } from "element-plus";

const dataList = ref([]);
const dialogFormVisible = ref(false);
const id = ref();
const form = reactive({
  name: "",
  description: "",
});

onMounted(() => {
  getList();
});
const getList = async () => {
  const { code, data } = await API.type.getList.request({});
  if (code === 0) {
    dataList.value = data;
  }
};
const save = async () => {
  const { code } = await API.type[id.value ? "updateById" : "save"].request(
    null,
    null,
    { data: { id: id.value, ...form } }
  );
  if (code === 0) {
    ElMessage.success("保存成功");
    getList();
  }
  close();
};
const open = (e: any = {}) => {
  if (e.id) {
    id.value = e.id;
    form.name = e.name;
    form.description = e.description;
  }
  dialogFormVisible.value = true;
};
const close = () => {
  dialogFormVisible.value = false;
  id.value = "";
  form.name = "";
  form.description = "";
};
const remove = async (id: number) => {
  ElMessageBox.confirm("确认删除吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const { code } = await API.type.removeById.request({ id });
    if (code === 0) {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      getList();
    }
  });
};
</script>
<template>
  <div class="classify-head">
    <el-button type="primary" @click="open">新 建</el-button>
  </div>
  <el-table
    :data="dataList"
    border
    class="classify-table"
    height="calc(100vh - 160px)"
  >
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="description" label="描述" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="open(scope.row)"
          >修改</el-button
        >
        <el-button link size="small" @click="remove(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" :title="id ? '修改' : '新建'">
    <el-form :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.classify-head {
  padding-bottom: 20px;
}
</style>
