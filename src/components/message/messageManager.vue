<template>
  <div class="messageWrap">
    <div class="group">
      <group @createMessage="onCreateMessage" @alterMessage="onAlterMessage"></group>
    </div>
    <div class="message">
      <message :pos="controller.pos" :type="controller.type" :formValue="controller.formValue" @messageHandleFinish="onMessaegFinish"></message>
    </div>
  </div>
</template>
<script>
import group from "./group.vue";
import message from "./messag.vue";
export default {
  components: {
    group,
    message,
  },
  data() {
    return {
      controller: {
        type: "create",
        formValue: {
            id: -1,
            name: "",
            group: null,
            tool: null,
            type: null,
            templateId: null,
            state: "using",
        }
      },
    };
  },
  methods:{
    //监听信息编辑完成事件
    onMessaegFinish(){
        this.controller={
        pos:{
            groupIndex:-1,
            childIndex:-1
        },
        type: "create",
        formValue: {
            id: -1,
            name: "",
            group: null,
            tool: null,
            type: null,
            templateId: null,
            state: "using",
        }
      }
    },
    //监听信息创建事件
    onCreateMessage(groupId){
        this.controller={
        type: "create",
        formValue: {
            id: -1,
            name: "",
            group: groupId,
            tool: null,
            type: null,
            templateId: null,
            state: "using",
        }
      }
    },
    //监听信息修改事件
    onAlterMessage(formValue,groupIndex,childIndex){
        this.controller.type='alter',
        this.controller.formValue={...formValue};
        this.controller.pos={
            groupIndex,
            childIndex
        }
    },
  }
};
</script>
<style lang="less" scoped>
.messageWrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .group {
    width: 600px;
  }
  .message {
    flex: 1;
    margin: 0px 10px;
  }
}
</style>