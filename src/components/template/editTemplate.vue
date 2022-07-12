<template>
  <div>
    <n-card>
      <div class="editPageTitle" v-if="templateData.id != '-1'">
        模板ID <span>{{ templateData.id }}</span>
      </div>
      <div class="editWrap">
        <n-form :label-width="80" :model="templateData" :rules="rules">
          <n-form-item label="模板名称" path="name">
            <n-input v-model:value="templateData.name" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="标题变量" path="titleVariable">
            <n-input
              v-model:value="templateData.titleVariable"
              type="textarea"
              :autosize="{
                minRows: 5,
              }"
            />
          </n-form-item>
          <n-form-item label="消息标题" path="title">
            <n-input v-model:value="templateData.title" />
          </n-form-item>
          <n-form-item label="正文变量" path="contentVariable">
            <n-input
              v-model:value="templateData.contentVariable"
              type="textarea"
              :autosize="{
                minRows: 5,
              }"
            />
          </n-form-item>
          <n-form-item label="消息正文" path="content">
            <n-input
              v-model:value="templateData.content"
              type="textarea"
              :autosize="{
                minRows: 5,
              }"
            />
          </n-form-item>
        </n-form>
      </div>
      <div class="subitBtn">
        <n-button @click="submitTemplate" round type="info">提交</n-button>
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
import { NCard, NInput, NButton, NForm, NFormItem, NModal } from "naive-ui";
import axios from "../../common/axios";
export default {
  components: {
    NCard,
    NInput,
    NButton,
    NForm,
    NFormItem,
    NModal,
  },
  props: {
    index: Number,
    templateData: {
      type: Object,
      default: {
        id: "-1",
        name: "",
        title: "",
        content: "",
        titleVariable: "",
        contentVariable: "",
        picUrl: "",
      },
    },
  },
  data() {
    return {
      messageModal: {
        isShow: false,
        content: "",
      },
      rules: {
        name: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        title: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        content: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        titleVariable: {
          required: true,
          message: "必填",
          trigger: "blur",
        },
        contentVariable: {
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
    //验证输入是否有空
    valiateInput() {
      for (let iterator in this.templateData) {
        if (iterator != "picUrl") {
          if (this.templateData[iterator].length == 0) {
            return false;
          }
        }
      }
      return true;
    },
    async submitTemplate() {
      if (!this.valiateInput()) {
        this.showMessageModal("有必填项未填写");
        return;
      }
      let { data } = await axios.post(
        "/template/alterOrUpdate",
        this.templateData
      );
      if (data.message == "success") {
        this.showMessageModal("提交成功");
        this.$emit("editFinish", this.index);
        this.$store.commit("alterOrUpdateTemplates", {
          type: this.templateData.id == "-1" ? "add" : "update",
          template: data.data,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.editPageTitle {
  font-size: 16px;
  font-weight: bold;
  span {
    font-weight: 500;
  }
}
.editWrap {
  .n-form {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .n-form-item {
      width: 48%;
      margin-right: 10px;
    }
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.subitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>