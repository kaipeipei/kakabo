import Mock from 'mockjs'
import baseConfig from './config.json'
let localConfig=localStorage.getItem('config')
if(localConfig){
    var config=JSON.parse(localConfig);
}else{
    var config=baseConfig;
}

function saveConfig(){
    localStorage.setItem('config',JSON.stringify(config));
}

//模板相关接口
//获取模板
Mock.mock('/template/get','get',()=>{
    return {
        message:'success',
        data:{
           templates:config.templates 
        }
    }
})
//创建模板
Mock.mock('/template/build','post',(params)=>{
    let template=JSON.parse(params.body)
    template.id=Mock.mock('@id');
    config.templates.push(template);
    saveConfig();
    return {
        message:'success',
        data:{
            template
        }
    }
})
//修改图片
Mock.mock(/\/template\/alterPic.*/,'post',(params)=>{
    
    let{id,value}=JSON.parse(params.body)
    let index=config.templates.findIndex((item)=>{
        if(item.id==id){
            return true;
        }
    })
    config.templates[index].picUrl=value;
    saveConfig();
    return {
        message:'success',
    }
})
//更新修改模板
//修改图片
Mock.mock(/\/template\/alterOrUpdate.*/,'post',(params)=>{
    
    let data=JSON.parse(params.body)
    if(data.id=='-1'){
        data.id=Mock.mock('@id')
        config.templates.push(data)
    }else{
        let index=config.templates.findIndex((item)=>{
            if(item.id==data.id){
                return true;
            }
        })
        config.templates[index]=data;
    }
    saveConfig();
    return {
        message:'success',
        data
    }
})
//删除模板
Mock.mock(/\/template\/delete.*/,'delete',(params)=>{
    console.log(params)
    let id=params.url.match(/id=(.+)/)[1];
    let templates=config.templates.filter(item=>{
        if(item.id==id){
            return false;
        }else{
            return true;
        }
    })
    config.templates=templates;
    saveConfig();
    return {
        message:'success',
    }
})
//模板相关接口结束



//分组相关接口
//获取分组信息
Mock.mock('/group/get','get',(params)=>{
    let groups=config.groups.map(item=>{
        let children=config.messages.filter((message)=>{
            return message.group==item.id
        })
        return {
            ...item,
            children
        }
    })
    return {
        message:'success',
        data:{
           groups
        }
    }
})
//创建分组
Mock.mock('/group/build','post',(params)=>{
    let data=JSON.parse(params.body)
    let group={
        id:Mock.mock("@id"),
        name:data.name
    }
    config.groups.push(group)
    saveConfig();
    return{
        message:'success',
        data:group
    }
})
//删除分组
Mock.mock(/\/group\/delete.*/,'delete',(params)=>{
    let id=params.url.match(/id=(.*)/)[1]
    config.groups=config.groups.filter((item)=>{
        if(item.id==id){
            return false;
        }else{
            return true;
        }
    })
    let messages=config.messages.filter(item=>{
        return item.group==id 
    })
    config.messages=messages;
    saveConfig();
    return{
        message:'success'
    }
})
//修改分组名字
Mock.mock(/\/group\/alter.*/,'post',(params)=>{
    let data=JSON.parse(params.body)
    let id=data.id
    let name=data.name
    config.groups.forEach((item)=>{
        if(item.id==id){
            item.name=name;
        }
    })
    saveConfig();
    return{
        message:'success'
    }
})
//消息相关接口
//修改状态
Mock.mock(/\/message\/alterState.*/,'get',(params)=>{
    let id=params.url.match(/id=(.*)/)[1];
    config.messages.map(item=>{
        if(item.id==id){
            item.state=item.state=='using'?'saved':'using'
        }
    })
    
    saveConfig();
    return {
        message:'success'
    }
})
//创建消息
Mock.mock(/\/message\/build/,'post',(params)=>{
    let data=JSON.parse(params.body)
    data.id=Mock.mock("@id");
    config.messages.push(data);
    saveConfig();
    return{
        message:'success',
        data
    }
})
//修改消息
Mock.mock(/\/message\/alterMessage/,'post',(params)=>{
    let data=JSON.parse(params.body)
    config.messages.map(item=>{
        if(item.id==data.id){
            item.name=data.name;
            item.group=data.group;
            item.templateId=data.templateId;
        }
    })
    saveConfig();
    return{
        message:'success'
    }
})