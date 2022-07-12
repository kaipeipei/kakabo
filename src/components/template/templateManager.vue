<template>
  <div>
    <n-card>
      <div class="templateWrap">
        <div class="header">
          <n-button @click="buildTemplate">新建</n-button>
        </div>
        <div class="content">
          <n-table :single-line="false">
            <thead>
              <tr>
                <th>模板ID</th>
                <th>模板名称</th>
                <th>消息标题</th>
                <th>消息正文</th>
                <th>标题变量</th>
                <th>正文变量</th>
                <th>效果图示</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(template, index) in templates">
                <td>{{ template.id }}</td>
                <td>{{ template.name }}</td>
                <td>{{ template.title }}</td>
                <td>{{ template.content }}</td>
                <td>{{ template.titleVariable }}</td>
                <td>{{ template.contentVariable }}</td>
                <td class="imgWrap">
                  <n-image width="150" :src="template.picUrl" />
                </td>
                <td>
                                  <n-popover trigger="hover">
                    <template #trigger>
                  <n-button @click="alterPicture(index)">
                    <svg
                      style="color: blue"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3l150.1 178L658.1 489L888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176a88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28s-28-12.5-28-28s12.5-28 28-28z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </n-button>
                    </template>
                    <span>修改图片</span>
                  </n-popover>
                                                    <n-popover trigger="hover">
                    <template #trigger>
                  <n-button @click="alterTemplate(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                    >
                      <g fill="none">
                        <path
                          d="M27.314 10.344a4 4 0 0 0-5.657-5.657L20.254 6.09l5.656 5.657l1.404-1.403zm-2.818 2.818L12.541 25.117a4.999 4.999 0 0 1-2.323 1.315l-4.582 1.146a1 1 0 0 1-1.213-1.213l1.146-4.582a5 5 0 0 1 1.315-2.323L18.839 7.505l5.657 5.657z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </n-button>
                    </template>
                    <span>修改模板</span>
                  </n-popover>
<n-popover trigger="hover">
                    <template #trigger>
                  <n-button @click="showDeleteConfirmModal(index)">
                    <svg
                      style="color: red"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </n-button>
                    </template>
                    <span>删除模板</span>
                  </n-popover>
                </td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </div>
    </n-card>
    <n-modal v-model:show="picAlterModal.showModal">
      <n-card
        style="width: 600px"
        title="输入你的图片的url"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-input
          v-model:value="picAlterModal.pictureUrl"
          type="text"
          placeholder="基本的 Input"
        />
        <template #footer>
          <n-button @click="submitNewPic">提交</n-button>
        </template>
      </n-card>
    </n-modal>
    <!-- 确认删除 -->
    <n-modal v-model:show="deleteConfirmModal.showModal">
      <n-card
        style="width: 600px"
        title="确认删除?"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="confirmModal">
          <n-button @click="handleDeleteTemplate('confirm')" type="success"
            >确认</n-button
          >
          <n-button @click="handleDeleteTemplate('cancel')" type="error"
            >取消</n-button
          >
        </div>
      </n-card>
    </n-modal>
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
import { NCard, NButton, NTable, NModal, NInput, NImage,NPopover } from "naive-ui";
import axios from "../../common/axios.js";
export default {
  components: {
    NInput,
    NCard,
    NButton,
    NTable,
    NModal,
    NImage,
    NPopover
  },
  data() {
    return {
      messageModal: {
        isShow: false,
        content: "",
      },
      picAlterModal: {
        showModal: false,
        pictureUrl: "",
        index: 0,
      },
      deleteConfirmModal: {
        showModal: false,
        index: 0,
      },
    };
  },
  computed: {
    templates() {
      console.log(this.$store.state.templates);
      return this.$store.state.templates;
    },
  },
  mounted() {
    this.getTemplates();
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
    //获取模板数据
    async getTemplates() {
      let { data } = await axios.get("/template/get");
      this.$store.commit("updateTemplate", data.data.templates);
    },
    //发送创建模板请求给父组件
    buildTemplate() {
      this.$emit("addTemplate");
    },
    //修改图片
    alterPicture(index) {
      this.picAlterModal = {
        showModal: true,
        pictureUrl: "",
        index: index,
      };
    },
    //确认更新图片
    async submitNewPic() {
      console.log(this.templates);
      console.log(this.picAlterModal.index);
      let { data } = await axios.post("/template/alterPic", {
        id: this.templates[this.picAlterModal.index].id,
        value: this.picAlterModal.pictureUrl,
      });
      if ((data.message = "success")) {
        this.templates[this.picAlterModal.index].picUrl =
          this.picAlterModal.pictureUrl;
        this.showMessageModal("修改成功");
      } else {
        this.showMessageModal("修改失败");
      }
      this.picAlterModal = {
        showModal: false,
        pictureUrl: "",
        index: 0,
      };
    },
    //修改模板
    alterTemplate(index) {
      this.$emit("alterTemplate", this.templates[index]);
    },
    //显示是否删除确认框
    showDeleteConfirmModal(index) {
      this.deleteConfirmModal = {
        showModal: true,
        index: index,
      };
    },
    //确认删除模板
    async handleDeleteTemplate(result) {
      if (result == "confirm") {
        let { data } = await axios.delete("/template/delete", {
          params: {
            id: this.templates[this.deleteConfirmModal.index].id,
          },
        });
        if (data.message == "success") {
            this.showMessageModal('删除模板成功')
          let templates = this.templates;
          templates.splice(this.deleteConfirmModal.index, 1);
          this.$store.commit("updateTemplate", templates);
        }
      }
      this.deleteConfirmModal = {
        showModal: false,
        index: 0,
      };
    },
  },
};
</script>
<style scoped lang="less">
.content {
  height: 85vh;
  overflow: auto;
}
.imgWrap {
  overflow: hidden;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-button svg {
  width: 25px;
  height: 25px;
}
.confirmModal {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>