<template>
    <div class="outter">
        <aside>
            <aside-menu @changeMenu="onMenuChange"></aside-menu>
        </aside>
        <main>
            <header>
                <n-config-provider>
                    <n-tag :class="page.active?'active':''" round :closable="index==0?false:true" @click="choosePage(index)" @close.stop="handleClose(index)" v-for="(page,index) in pages">
                        {{page.name}}
                    </n-tag>
                </n-config-provider>
            </header>
            <section v-for="(page,index) in pages">
                <div v-show="page.active">
                    <div v-if="page.type=='1'">
                        <template-manager @addTemplate="buildAddTemplatePage" @alterTemplate="buildAlterTemplatePage"></template-manager>
                    </div>
                    <div v-else-if="page.type=='2'" >
                        <message-manager></message-manager>
                    </div>
                    <div v-else-if="page.type=='3'" >
                        <edit-template @editFinish="editFinish" :index="index" :templateData="page.templateData"></edit-template>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import asideMenu from '../components/asideMenu.vue'
import templateManager from '../components/template/templateManager.vue'
import messageManager from '../components/message/messageManager.vue'
import editTemplate from '../components/template/editTemplate.vue'
import {NConfigProvider,NTag} from 'naive-ui'

import { defineComponent } from 'vue'
import EditTemplate from '../components/template/editTemplate.vue'
export default defineComponent({
    components:{
    asideMenu,
    templateManager,
    messageManager,
    editTemplate,
    NConfigProvider,
    NTag,
    EditTemplate
},
    data() {
        return {
            pages:[
                {
                    name:'模板管理',
                    type:1,
                    active:true
                },
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        onMenuChange(args){
            let flag=false;
            this.pages.forEach((item)=>{
                if(item.name==args.itemName){
                    flag=true;
                    item.active=true;
                }else{
                    item.active=false;
                }
            })
            if(flag==false){
                let page={
                    name:args.itemName,
                    type:args.itemName=='模板管理'?1:2,
                    active:true
                }
                this.pages.push(page);
            }
        },
        handleClose(index){
            let deletePage=this.pages.splice(index,1)
            if(deletePage[0].active==true){
                this.pages[0].active=true;
            }
        },
        choosePage(pageIndex){
            this.pages.forEach((item,index)=>{
                if(index==pageIndex){
                    if(item.active==false){
                        item.active=true
                    }
                }else{
                    item.active=false;
                }
            })
        },
        buildAddTemplatePage(){
            let index=this.pages.findIndex(item=>{
                if(item.type==3&&item.id=='-1'){
                    return true;
                }
            })
            if(index==-1){
                let page={
                        name:`编辑模板`,
                        type:3,
                        templateData:{
                            id:'-1',
                            name:'',
                            title:'',
                            content:'',
                            titleVariable:'',
                            contentVariable:'',
                            picUrl:''
                        },
                        id:'-1',
                        active:true,
                }
                this.pages[0].active=false;
                this.pages.push(page);
            }else{
                this.pages[0].active=false;
                this.pages[index].active=true;
            }
        },
        buildAlterTemplatePage(data){
            let index=this.pages.findIndex(item=>{
                if(item.type==3&&item.id==data.id){
                    return true;
                }
            })
            if(index==-1){
                let page={
                        name:`编辑模板(${data.name})`,
                        type:3,
                        templateData:data,
                        active:true,
                        id:data.id
                }
                this.pages[0].active=false;
                this.pages.push(page);
            }else{
                this.pages[0].active=false;
                this.pages[index].active=true;
            }
        },
        editFinish(index){
            this.pages.splice(index,1)
            this.pages[0].active=true;
        }
    },
});
</script>
<style scoped lang="less">
    .outter{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-width: 1500px;
        height: 100vh;
        overflow-y: auto;
        main{
            background: #e1e3e5;
            border: 1px solid black;
            flex: 1;
            height: 100vh;
            header{
                margin: 10px;
                .n-tag{
                    padding: 0px 20px;
                    height: 40px;
                    font-size: 16px;
                    text-align: center;
                    margin-right: 10px
                }
                .n-tag:hover{
                    cursor: pointer;
                }
                .n-tag.active{
                    color: #4978bf
                }
            }
        };
        aside{
            border: 1px solid black;
            width:220px;
            height: 100vh;
        }
    }
</style>