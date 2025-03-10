<script lang="ts" setup>
import { ref, shallowRef, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import "@wangeditor/editor/dist/css/style.css";

const editorRef = shallowRef();
const valueHtml = ref("");
const dataList = ref([]);
const id = ref(null);
const pageParam = reactive({
  size: 4,
  current: 1,
  total: 0,
  pages: 0,
});

onMounted(() => {
  getList();
});
const getList = async (type: string = "") => {
  const {
    code,
    data: { records, current, total, pages },
  } = await API.mood.getList.request(pageParam);
  if (code === 0) {
    dataList.value = type == "add" ? [...dataList.value, ...records] : records;
    pageParam.current = current;
    pageParam.total = total;
    pageParam.pages = pages;
  }
};
const creat = () => {
  valueHtml.value = " ";
  id.value = 0;
};
const update = async (e: number) => {
  const {
    code,
    data: { id: ids, content },
  } = await API.mood.getById.request({ id: e });
  if (code === 0) {
    id.value = ids;
    valueHtml.value = content;
  }
};
const save = async () => {
  const { code } = await API.mood[id.value ? "updateById" : "save"].request(
    null,
    null,
    {
      data: { id: id.value, content: valueHtml.value },
    }
  );
  if (code === 0) {
    ElMessage({
      message: "保存成功",
      type: "success",
      duration: 1500,
    });
    pageParam.current = 1;
    getList();
    creat();
  }
};
const remove = (e: number) => {
  ElMessageBox.confirm("确认删除吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const { code } = await API.mood.removeById.request({ id: e });
    if (code === 0) {
      ElMessage.success("删除成功");
      getList();
    }
  });
};
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const load = () => {
  if (pageParam.current < pageParam.pages) {
    pageParam.current++;
    getList("add");
  }
};
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-button type="primary" @click="creat">新 建</el-button>
      <div class="say-editor">
        <Toolbar
          mode="simple"
          :editor="editorRef"
          :defaultConfig="{
            insertKeys: {
              index: 1,
              keys: ['emotion'],
            },
          }"
        />
        <Editor v-model="valueHtml" @onCreated="handleCreated" />
      </div>
      <div class="say-save">
        <el-button type="primary" @click="save">发 布</el-button>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="say-list" v-infinite-scroll="load">
        <el-timeline>
          <el-timeline-item
            v-for="item in dataList"
            :timestamp="item.createTime"
            placement="top"
          >
            <el-card @click="update(item.id)">
              <div v-html="item.content"></div>
              <el-button type="primary" @click.stop="remove(item.id)"
                >删除</el-button
              >
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss">
.say-editor {
  border: 1px solid $h-color;
  height: calc(100vh - 220px);
  margin: 20px 0;
  overflow: hidden;
}
.say-save {
  text-align: right;
}
.say-list {
  height: calc(100vh - 120px);
  overflow: auto;
}
</style>
