import Event from './event'
const DEFAULT_GROUP = 'default'
let  CSEventEmitter = {
    data:{},
    itemMap:{},
    nameMap:{},
    on:function (name,callback,context,group){
        group = group|| DEFAULT_GROUP
        let event = new Event({callback,name,context,group})
        CSEventEmitter.push(event)
        return event
    },
    get(name,group,index){
        return CSEventEmitter.data[group][name][index];
    },
    emit:function (name,params,...g){
        let nameInfos = CSEventEmitter.nameMap[name]
        if(!nameInfos || nameInfos.length==0){
            return
        }
        if(g.length==0){
            for(let group in nameInfos){
                let index = nameInfos[group]
                CSEventEmitter.emitItem(CSEventEmitter.get(name,group,index),params)
            }
        }else{
            let cache = {}
            for(let key in g){
                let gr = g[key]
                cache[gr] = true
            }
            for(let group in nameInfos) {
                if (cache[group]) {
                    let index = nameInfos[group]
                    CSEventEmitter.emitItem(CSEventEmitter.get(name, group, index), params)
                }
            }
        }
    },
    exec(item,params){
        try{
            let {callback,context} = item
            callback.apply(context,[params,item,context])
        }catch (e) {
            console.error(e)
        }
    },
    emitByGroup(params,...group){
        group.forEach((item)=>{
            CSEventEmitter.emitByGroupSingle(item,params)
        })
    },
    emitItem(item,params){
        CSEventEmitter.exec(item,params)
    },
    emitByGroupSingle(group,params){
        let groups = CSEventEmitter.data[group]
        if(groups) {
            for (let key in groups) {
                let tmp = groups[key]
                tmp.forEach((item) => {
                    CSEventEmitter.emitItem(item,params)
                })
            }
        }
    },
    push:function(event){
        let {name,eid,group} = event
        let items = CSEventEmitter.data[group]
        if(!items){
            items = {}
            CSEventEmitter.data[group] = items
        }
        let listeners = items[name]
        if(!listeners){
            listeners = []
            items[name] = listeners
        }
        CSEventEmitter.itemMap[eid] = {name:name,group:group}
        let names = CSEventEmitter.nameMap[name]||{};
        let nameGroups = names[group] || []
        nameGroups.push(listeners.length)
        names[group] = nameGroups
        CSEventEmitter.nameMap[name] = names
        listeners.push(event)
    },
    removeByGroup:function(gr){
        if(!gr){
            throw Error('group name not null')
        }
        let items = CSEventEmitter.data[gr]
        for(let name in items){
            CSEventEmitter.nameMap[name][gr]=null
            delete CSEventEmitter.nameMap[name][gr]
        }
        CSEventEmitter.data[gr] = null
        delete CSEventEmitter.data[gr]
    },
    removeByName:function(name,group){
        if(group && CSEventEmitter.nameMap[name]){
            CSEventEmitter.nameMap[name][group]=null
            delete  CSEventEmitter.nameMap[name][group]
            CSEventEmitter.data[group][name] = null//删除对象
            delete CSEventEmitter.data[group][name]
        }else if(!group){
            let groups = CSEventEmitter.nameMap[name]
            for(let group in groups){
                CSEventEmitter.data[group]=null
                delete CSEventEmitter.data[group]
            }
            CSEventEmitter.nameMap[name]=null
            delete  CSEventEmitter.nameMap[name]

        }
    },
    remove:function(id){
        let {group,name} = CSEventEmitter.itemMap[id]
        if(!CSEventEmitter.data[group]){
            return
        }
        let items = CSEventEmitter.data[group][name]
        let delItem = null
        let length = items.length
        if(length==0){
            return
        }
        for(let index in items){
            let item = items[index]
            let {eid} = item
            if(id==eid){
                items[index]=null
                if(index==length-1){
                    items.length=length-1
                }else{
                    let tmpItems = items.slice(index,length)
                    items = items.splice(0,index)
                    items = items.concat(tmpItems)
                    CSEventEmitter.data[group] = items
                }
                delItem = item
                break
            }
        }
        return delItem
    }
}
export default CSEventEmitter

