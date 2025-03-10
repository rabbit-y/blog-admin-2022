<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "~/utils/store";

const stote = useStore();
const form = ref<any>(stote.infoOther);

watch(
  () => stote.infoOther,
  () => {
    form.value = stote.infoOther;
  }
);
const addDomain = (type: string) => {
  if (type == "friend") {
    form.value.friend.push({
      name: "",
      dec: "",
      avatar: "",
      url: "",
    });
  } else {
    form.value[type].push({
      name: "",
      dec: "",
      tab: "",
      url: "",
      color: "",
    });
  }
};
const removeDomain = (type: string, item: any) => {
  const index = form.value[type].indexOf(item);
  if (index !== -1) {
    form.value[type].splice(index, 1);
  }
};
const onSubmit = async () => {
  const { code } = await API.other.saveMaster.request(null, null, {
    data: { other: JSON.stringify(form.value) },
  });
  if (code === 0) {
    location.reload();
  }
};
</script>
<template>
  <el-form :model="form" v-if="form">
    <el-tabs type="border-card">
      <el-tab-pane label="站长资料">
        <!-- <el-form-item label="站长昵称">
          <el-input v-model="form.nickname" disabled />
        </el-form-item>
        <el-form-item label="站长邮箱">
          <el-input v-model="form.email" disabled />
        </el-form-item> -->
        <el-form-item label="站长描述">
          <el-input v-model="form.dec" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="站点信息">
        <el-form-item label="站点名称">
          <el-input v-model="form.stationName" />
        </el-form-item>
        <el-form-item label="站点描述">
          <el-input v-model="form.stationDec" />
        </el-form-item>
        <el-form-item label="备案信息">
          <el-input v-model="form.stationPutOnRecord" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="友链">
        <div class="profile-head">
          <el-button @click="addDomain('friend')" type="primary"
            >新 增</el-button
          >
        </div>
        <el-form-item
          v-for="(item, index) in form.friend"
          :key="item.key"
          :prop="'friend.' + index + '.value'"
        >
          <el-row :gutter="20">
            <el-col :span="5">
              <el-input v-model="item.name" placeholder="昵称" />
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.dec" placeholder="描述" />
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.avatar" placeholder="头像" />
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.url" placeholder="站点" />
            </el-col>
            <el-col :span="4">
              <el-button
                class="mt-2"
                @click.prevent="removeDomain('friend', item)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="工具">
        <div class="profile-head">
          <el-button @click="addDomain('website')" type="primary"
            >新 增</el-button
          >
        </div>
        <el-form-item
          v-for="(item, index) in form.website"
          :key="item.key"
          :prop="'website.' + index + '.value'"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input v-model="item.name" placeholder="昵称" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.dec" placeholder="描述" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.tab" placeholder="类型" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.url" placeholder="站点" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.color" placeholder="主题色" />
            </el-col>
            <el-col :span="4">
              <el-button
                class="mt-2"
                @click.prevent="removeDomain('website', item)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="插件">
        <div class="profile-head">
          <el-button @click="addDomain('plugins')" type="primary"
            >新 增</el-button
          >
        </div>
        <el-form-item
          v-for="(item, index) in form.plugins"
          :key="item.key"
          :prop="'plugins.' + index + '.value'"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input v-model="item.name" placeholder="昵称" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.dec" placeholder="描述" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.tab" placeholder="类型" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.url" placeholder="站点" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.color" placeholder="主题色" />
            </el-col>
            <el-col :span="4">
              <el-button
                class="mt-2"
                @click.prevent="removeDomain('plugins', item)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-tab-pane>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-tabs>
  </el-form>
</template>
<style lang="scss">
.profile-head {
  padding-bottom: 20px;
}
</style>
