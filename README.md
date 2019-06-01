# event 
js事件驱动
## 介绍
    脱离web中的原生事件原理，通过回调形式实现事件机制，并且将事件分成不同的群组的消息，从而实现两级的消息管理
## 如何使用
<pre><code>
//安装
npm install cs-event --save-dev
//然后在页面中引入cs-event
import CSEventEmitter from 'cs-event'
</code></pre>
<pre><code>
CSEventEmitter.on(name,callback,context,group)
//name事件名称，callback回调函数 context设备上下 group 事件分组
</code></pre>
### 示例1:
<pre><code>
//绑定一个event1的事件
CSEventEmitter.on('event1',function(params,event){
    console.log(event.name+'--'+event.group+"---"+params)
})
</code></pre>
### 示例2：
<pre><code>
//绑定一个属于分组group1的名为event3的事件
CSEventEmitter.on('event3',(params,event)=>{
    console.log(event.name+'--'+event.group+"---"+params)
},null,'group1')
</code></pre>
### 示例3：
<pre><code>
function Test(){
    this.name = '123213'
}
Test.prototype = {
    add:function(param){
        return param+'---'+this.name;
    }
}
let test =  new Test();
//绑定一个名为event1并且属于分组group1的事件，并设定设备上下文test实例
CSEventEmitter.on('event1',function(params,event,context){
    console.log(event.name+'--'+event.group+"---"+params)
    console.log(this.add(params));
    console.log(context)
},test,'group1')
</code></pre>
### 示例4
<code><pre>
绑定一个属于group2 并且名为event2的事件
let event2 = CSEventEmitter.on('event2',(params,event,context)=>{
    console.log(event.name+'--'+event.group+"---"+params)
    console.log(test.add(params));
    console.log(context)
},null,'group2')
</code></pre>
<pre><code>
CSEventEmitter.emit(name,params,...g)
//name为事件名，params为参数  g为所属分组（可传入数组） 如果g不传 默认分发所有分组下的事件
</code>
</pre>
<code><pre>
CSEventEmitter.emit('event2',{test:'123123'})
</code></pre>
### 示例5
<pre><code>
//触发group1下事件名event1的事件 并且参数为emit_event1_group1
CSEventEmitter.emit('event1','emit_event1_group1','group1')
</code></pre>
### 示例6
<pre><code>
//触发group1下所有的分组数据，分组数据可多传
CSEventEmitter.emitByGroup('emitByGroup','group1')
</code></pre>
### 示例7
<pre><code>
//触发名为event1的事件并且传入参数event1
CSEventEmitter.emit('event1','emit_event1')
</code></pre>
### 示例8
<pre><code>
//通过事件id移除事件
CSEventEmitter.remove(event2.eid);
</code></pre>
### 示例9
<pre><code>
//移除分组group2下所有的事件
CSEventEmitter.removeByGroup('group2')
</code></pre>
### 示例9
<pre><code>
//移除所有事件名为event1的事件
CSEventEmitter.removeByName('event1')
</code></pre>

window.CSEventEmitter = CSEventEmitter;
