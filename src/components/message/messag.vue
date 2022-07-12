<template>
  <div>
    <n-card>
      <n-form :label-width="80" :model="formValue" :rules="rules">
        <n-form-item label="消息名称" path="name">
          <n-input
            autosize
            v-model:value="formValue.name"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="所属信息分组" path="group">
          <n-select
            autosize
            v-model:value="formValue.group"
            filterable
            placeholder="请选择"
            :options="groupOption"
          />
        </n-form-item>
        <n-form-item label="消息工具" path="tool">
          <n-select
            :disabled="type == 'alter'"
            autosize
            v-model:value="formValue.tool"
            filterable
            placeholder="请选择"
            :options="toolOptions"
          />
        </n-form-item>
        <n-form-item label="信息类型" path="type">
          <n-select
            :disabled="type == 'alter'"
            autosize
            v-model:value="formValue.type"
            filterable
            placeholder="请选择"
            :options="typeOptions"
          />
        </n-form-item>
        <n-form-item label="选择模板" path="templateId">
          <n-select
            autosize
            v-model:value="formValue.templateId"
            filterable
            placeholder="请选择"
            :options="templateOptions"
          />
        </n-form-item>
      </n-form>
      <div>
        <n-button
          :loading="loading"
          @click="handleMessage"
          strong
          secondary
          round
          type="info"
        >
          {{ type == "create" ? "创建" : "更新" }}
        </n-button>
      </div>
      <div class="templatePreviw" v-if="formValue.templateId != null">
        <div>模板预览</div>
        <div>
          <div>
            <span>模板标题</span>
            <div>
              {{ templatePreviewData.title }}
            </div>
          </div>
          <div>
            <span>模板正文</span>
            <div>
              {{ templatePreviewData.content }}
            </div>
          </div>
        </div>
        <div>
          <span>效果图示</span>
          <n-image width="200" :src="templatePreviewData.picUrl" />
        </div>
      </div>
    </n-card>
    <n-modal v-model:show="messageModal.isShow">
      <n-card
        style="width: 600px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        {{ messageModal.content }}
      </n-card>
    </n-modal>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  NForm,
  NFormItem,
  NButton,
  NInput,
  NSelect,
  NCard,
  NImage,
  NModal,
} from "naive-ui";
import axios from "axios";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NButton,
    NInput,
    NSelect,
    NCard,
    NImage,
    NModal,
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    },
    templates() {
      return this.$store.state.templates;
    },
    templateOptions() {
      let options = this.templates.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      console.log(options);
      return options;
    },
    groupOption() {
      let options = this.groups.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return options;
    },
    templatePreviewData() {
      let index = this.templates.findIndex((item) => {
        return item.id == this.formValue.templateId;
      });
      return this.templates[index];
    },
  },
  props: {
    pos: Object,
    type: {
      type: String,
      default: "create",
    },
    formValue: {
      type: Object,
      default: {
        id: -1,
        name: "",
        group: null,
        tool: null,
        type: null,
        templateId: null,
        state: "using",
      },
    },
  },
  data() {
    return {
      messageModal: {
        isShow: false,
        content: "",
      },
      loading: false,
      typeOptions: [
        {
          label: "机器人单聊",
          value: "机器人单聊",
        },

        {
          label: "机器人群聊",
          value: "机器人群聊",
        },
      ],
      toolOptions: [
        {
          label: "钉钉",
          value: "钉钉",
        },
        {
          label: "企业微信",
          value: "企业微信",
        },
      ],
      rules: {
        name: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        group: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        tool: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        type: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        templateId: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
      },
    };
  },

  methods: {
    //显示提示信息
    showMessageModal(content) {
      this.messageModal = {
        isShow: true,
        content,
      };
      setTimeout(() => {
        this.messageModal.isShow = false;
      }, 1000);
    },
    //创建于与更新信息数据
    async handleMessage() {
      for (let key in this.formValue) {
        if (this.formValue[key] == "" || this.formValue[key] == null) {
          this.showMessageModal("有必填项未填");
          return;
        }
      }
      this.loading = true;
      if (this.type == "create") {
        let { data } = await axios.post("/message/build", this.formValue);
        this.loading = false;
        if (data.message == "success") {
          this.showMessageModal("创建成功");
          let child = data.data;
          let groups = this.groups;
          for (let i = 0; i < groups.length; i++) {
            if (groups[i].id == child.group) {
              groups[i].children.push(child);
              break;
            }
          }
          this.$store.commit("updateGroups", groups);
        }
      } else {
        let { data } = await axios.post(
          "/message/alterMessage",
          this.formValue
        );
        this.loading = false;
        if (data.message == "success") {
          this.showMessageModal("更新成功");
          let groups = this.groups;
          let groupIndex = groups.findIndex((item) => {
            return item.id == this.formValue.group;
          });
          let childIndex = groups[groupIndex].children.findIndex((item) => {
            return item.id == this.formValue.id;
          });
          if (
            groupIndex == this.pos.groupIndex &&
            childIndex == this.pos.childIndex
          ) {
            groups[groupIndex].children[childIndex].name = this.formValue.name;
            groups[groupIndex].children[childIndex].group =
              this.formValue.group;
            groups[groupIndex].children[childIndex].templateId =
              this.formValue.templateId;
          } else {
            groups[this.pos.groupIndex].children.splice(this.pos.childIndex, 1);
            groups[groupIndex].children.push(this.formValue);
          }
          this.$store.commit("updateGroups", groups);
        }
      }
      this.$emit("messageHandleFinish");
    },
  },
});
</script>
<style lang="less" scoped>
.n-card {
  max-height: 90vh;
  overflow: auto;
}
.n-input,
.n-select {
  width: 50%;
}
.templatePreviw {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 10px;
  font-weight: bold;
  span {
    display: block;
    color: rgb(161, 161, 161);
  }
  & > div:nth-child(1) {
    width: 100px;
  }
  & > div:nth-child(2) {
    flex: 1;
  }
  & > div:nth-child(3) {
    width: 200px;
    height: 200px;
  }
}
</style>