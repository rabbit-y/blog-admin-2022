<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "~/utils/store";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const route = useRoute();
const router = useRouter();
const store = useStore();
const text = ref();
const id = ref();
const form = reactive({ title: "", typeId: "" });

onMounted(() => {
  const paramId = route.params.id as string;
  if (paramId == "creat") {
  } else {
    getDtl(paramId);
    id.value = paramId;
  }
});
const getDtl = async (e: string) => {
  const {
    code,
    data: { title, content, typeId },
  } = await API.article.getById.request({ id: Number(e) });
  if (code === 0) {
    form.title = title;
    form.typeId = typeId;
    text.value = content;
  }
};
const save = async () => {
  const param = {
    ...form,
    content: text.value,
    id: id.value,
  };
  const { code, data } = await API.article[
    id.value ? "updateById" : "save"
  ].request(null, null, { data: param });
  if (code === 0) {
    ElMessage.success("保存成功");
    jumpHistory();
  }
};
const jumpHistory = () => {
  router.back();
};
</script>
<template>
  <div class="mark-header">
    <el-page-header
      title="返回"
      :content="id ? '💖 修改文档' : '💝 新建文档'"
      @back="jumpHistory"
    />
  </div>
  <el-form :inline="true">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.typeId">
        <el-option
          v-for="item in store.typeList"
          :label="item.typeName"
          :value="item.typeId"
        ></el-option>
      </el-select>
    </el-form-item>
    <md-editor
      v-model="text"
      preview-theme="github"
      :toolbarsExclude="['pageFullscreen', 'catalog', 'github', 'save']"
    />
    <el-form-item>
      <div class="mark-dtl-foot">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.mark-header {
  padding-bottom: 10px;
  border-bottom: 3px double $h-color;
  margin-bottom: 20px;
}
.mark-dtl-foot {
  padding-top: 20px;
}
</style>
