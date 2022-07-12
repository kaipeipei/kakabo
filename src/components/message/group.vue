<template>
  <div class="groupWrap">
    <n-card>
      <n-popconfirm
        :show="showPop"
        :show-icon="false"
        positive-text="创建"
        :negative-text="null"
        @positive-click="buildGroup"
        @negative-click="groupInBuild.name = ''"
      >
        <template #trigger>
          <n-button @click="showPop = !showPop" type="primary"
            >新建消息分组</n-button
          >
        </template>
        <n-input v-model:value="groupInBuild.name" type="text" />
      </n-popconfirm>
      <div class="groupHeader">
        筛选消息
        <n-button
          :color="nowState == 'using' ? '#7510d4' : ''"
          @click="nowState = 'using'"
          >使用中</n-button
        >
        <n-button
          :color="nowState == 'saved' ? '#7510d4' : ''"
          @click="nowState = 'saved'"
          >已归档</n-button
        >
      </div>
      <div class="groups">
        <n-collapse>
          <n-collapse-item v-for="(group, index) in groups">
            <template #header>
              <span style="margin: 0px 5px">{{ group.name }}</span>
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button
                    @click.stop="handleGroup('add', index)"
                    :bordered="false"
                  >
                    <svg
                      style="width: 20px; height: 20px; color: green"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </n-button>
                </template>
                <span>新建消息</span>
              </n-popover>

              <n-popover trigger="hover">
                <template #trigger>
                  <n-button
                    @click.stop="handleGroup('edit', index)"
                    :bordered="false"
                  >
                    <svg
                      style="width: 20px; height: 20px; color: blue"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 16 16"
                    >
                      <g fill="none">
                        <path
                          d="M13.416 2.584c.778.778.778 2.039 0 2.817L6.058 12.76c-.319.32-.719.546-1.156.655l-2.283.57a.498.498 0 0 1-.604-.603l.57-2.283a2.49 2.49 0 0 1 .656-1.156l7.358-7.358a1.992 1.992 0 0 1 2.817 0zM9.894 4.697l-5.949 5.949a1.495 1.495 0 0 0-.393.694l-.369 1.477l1.477-.37c.263-.065.503-.2.694-.392l5.949-5.95l-1.409-1.408zm1.41-1.41l-.705.705l1.408 1.409l.705-.704a.996.996 0 0 0-1.409-1.41z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </n-button>
                </template>
                <span>编辑分组名</span>
              </n-popover>

              <n-popover trigger="hover">
                <template #trigger>
                  <n-button
                    @click.stop="handleGroup('delete', index)"
                    :bordered="false"
                  >
                    <svg
                      style="width: 20px; height: 20px; color: red"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 20 20"
                    >
                      <g fill="none">
                        <path
                          d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </n-button>
                </template>
                <span>删除分组</span>
              </n-popover>
            </template>
            <template v-if="isEmpty(group.children)">
              <div class="groupMessage">空</div>
            </template>
            <template v-for="(message, messageIndex) in group.children">
              <div class="groupMessage" v-if="message.state == nowState">
                <div
                  class="messageConfig"
                  @click="$emit('alterMessage', message, index, messageIndex)"
                >
                  <div>{{ message.name }}</div>
                  <div>{{ message.id }}</div>
                </div>
                <div class="messageHandler">
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-button @click="copyMessageId(message.id)">
                        <svg
                          style="width: 20px; height: 25px; color: #e8e289"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </n-button>
                    </template>
                    <span>复制ID</span>
                  </n-popover>
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-button
                        @click="changeMessageState(index, messageIndex)"
                      >
                        <svg
                          v-if="message.state == 'saved'"
                          style="width: 20px; height: 25px; color: greenyellow"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 384 512"
                        >
                          <path
                            d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                            fill="currentColor"
                          ></path>
                        </svg>

                        <svg
                          v-if="message.state == 'using'"
                          style="width: 20px; height: 25px; color: red"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M27.4 14.7l-6.1-6.1C21 8.2 20.5 8 20 8h-8c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V16.1c0-.5-.2-1-.6-1.4zM20 10l5.9 6H20v-6zm-8 18V10h6v6c0 1.1.9 2 2 2h6v10H12z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M6 18H4V4c0-1.1.9-2 2-2h14v2H6v14z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </n-button>
                    </template>
                    <span>{{
                      message.state == "saved" ? "使用" : "归档"
                    }}</span>
                  </n-popover>
                </div>
              </div>
            </template>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-card>
    <input type="text" class="copyInput" ref="input" />
    <n-modal v-model:show="editGroup.showModal">
      <n-card
        style="width: 600px"
        title="编辑新组名"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-input v-model:value="editGroup.name" type="text"></n-input>
        <template #footer>
          <n-button @click="confirmGroupName">确认</n-button>
        </template>
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
      {{messageModal.content}}
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import axios from "../../common/axios";
import {
  NCard,
  NButton,
  NCollapse,
  NCollapseItem,
  NInput,
  NPopconfirm,
  NPopover,
  NModal,
} from "naive-ui";
export default {
  components: {
    NCard,
    NButton,
    NCollapse,
    NCollapseItem,
    NInput,
    NPopconfirm,
    NPopover,
    NModal,
  },
  data() {
    return {
        messageModal:{
            isShow:false,
            content:''
        },
      editGroup: {
        name: "",
        showModal: false,
        index: 0,
        id: 0,
      },
      nowState: "using",
      showPop: false,
      groupInBuild: {
        id: "-1",
        name: "",
        children: [],
      },
    };
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    },
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    //显示提示信息
    showMessageModal(content){
        this.messageModal={
            isShow:true,
            content
        }
        setTimeout(()=>{
            this.messageModal.isShow=false
        },1000)
    },
    //分组内是否为空
    isEmpty(children) {
      let isExist = children.some((item) => {
        return item.state == this.nowState;
      });
      return !isExist;
    },
    //分组操作处理
    handleGroup(type, index) {
      switch (type) {
        case "delete":
          this.deleteGroup(index);
          break;
        case "add":
          this.$emit("createMessage", this.groups[index].id);
          break;
        case "edit":
          this.editGroup = {
            name: this.groups[index].name,
            id: this.groups[index].id,
            showModal: true,
            index: index,
          };
          break;
      }
    },
    //编辑分组
    async confirmGroupName() {
      let { data } = await axios.post("/group/alter", {
          id: this.editGroup.id,
          name: this.editGroup.name,
      });
      if (data.message == "success") {
        this.showMessageModal("修改成功")
        let groups = this.groups;
        groups[this.editGroup.index].name = this.editGroup.name;
        this.$store.commit("updateGroups", groups);
        this.editGroup = {
          name: "",
          showModal: false,
          index: 0,
        };
      }
    },
    //删除分组
    async deleteGroup(index) {
      let groupId = this.groups[index].id;
      let { data } = await axios.delete("/group/delete", {
        params: {
          id: groupId,
        },
      });
      if (data.message) {
        this.showMessageModal("删除成功")
        let groups = this.groups.filter((item) => {
          return item.id != groupId;
        });
        this.$store.commit("updateGroups", groups);
      }
    },
    //复制id
    copyMessageId(id) {
      this.$refs.input.value = id;
      this.$refs.input.select();
      document.execCommand("copy");
      this.showMessageModal("复制成功")
    },
    //改变消息状态
    async changeMessageState(i, j) {
      let { data } = await axios.get("/message/alterState", {
        params: {
          id: this.groups[i].children[j].id,
        },
      });
      if (data.message == "success") {
        let groups = this.groups;
        groups[i].children[j].state ="using" ? "saved" : "using";
        this.showMessageModal(`${groups[i].children[j].state == "using" ? "转入使用" : "归档成功"}`)

        this.$store.commit("updateGroups", groups);
      }
    },
    //获取分组信息
    async getGroups() {
      let { data } = await axios.get("/group/get");
      console.log(data.data);
      this.$store.commit("updateGroups", data.data.groups);
    },
    //创建分组
    async buildGroup() {
      let { data } = await axios.post("/group/build", {
        name: this.groupInBuild.name,
      });
      if ((data.message = "success")) {
        this.showMessageModal("创建成功")
        let groups = this.groups;
        data.data.children = [];
        groups.push(data.data);
        this.$store.commit("updateGroups", groups);
      }
      this.showPop = false;
      this.groupInBuild = {
        id: "-1",
        name: "",
        children: [],
      };
    },
  },
};
</script>
<style lang="less" scoped>
.groupWrap {
  width: 600px;
  .groupHeader {
    margin: 5px 0px;
  }
  .groups {
    max-height: 75vh;
    overflow: auto;
    .groupMessage {
      width: 500px;
      height: 100px;
      margin: 5px 0px;
      border: 1px solid rgb(201, 201, 201);
      display: flex;
      justify-content: center;
      align-items: center;

      .messageConfig {
        width: 75%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left;
        transition: 0.2s;
      }
      .messageConfig:hover {
        cursor: pointer;
        border: 1px solid #337edc;
      }
      .messageHandler {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 20%;
      }
    }
  }
}
.copyInput {
  opacity: 0;
  position: absolute;
}
</style>