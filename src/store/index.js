import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
        templates:[],
        groups:[],
        messages:[]
    }
},
mutations:{
  updateGroups(state,newValue){
    state.groups=newValue;
  },
  updateTemplate(state,newValue){
    state.templates=newValue;
  },
  alterOrUpdateTemplates(state,args){
    let template=args.template;
    if(args.type=='add'){
      state.templates.push(template)
    }else{
      state.templates.forEach(item=>{
        if(item.id==template.id){
          for(let iterator in item){
            item[iterator]=template[iterator]
          }
        }
      })
    }
  }
},
  actions: {
  },
  modules: {
  }
})
