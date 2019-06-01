import CSEventEmitter from './emitter'
// CSEventEmitter.on('name','123')
CSEventEmitter.on('event1',function(params,event){
    console.log(event.name+'--'+event.group+"---"+params)
})

CSEventEmitter.on('event3',(params,event)=>{
    console.log(event.name+'--'+event.group+"---"+params)
},null,'group1')
function Test(){
    this.name = '123213'
}
Test.prototype = {
    add:function(param){
        return param+'---'+this.name;
    }
}
let test =  new Test();
CSEventEmitter.on('event1',function(params,event,context){
    console.log(event.name+'--'+event.group+"---"+params)
    console.log(this.add(params));
    console.log(context)
},test,'group1')

let event2 = CSEventEmitter.on('event2',(params,event,context)=>{
    console.log(event.name+'--'+event.group+"---"+params)
    // console.log(test.add(params));
    // console.log(context)
},null,'group2')

// CSEventEmitter.emit('event2',2222)
// CSEventEmitter.emit('event1','emit_event1_group1','group1')
// CSEventEmitter.emitByGroup('emitByGroup','group1')
// CSEventEmitter.emit('event1','emit_event1')
// CSEventEmitter.remove(event2.eid);

// CSEventEmitter.removeByGroup('group2')
CSEventEmitter.removeByName('event1')

window.CSEventEmitter = CSEventEmitter;
