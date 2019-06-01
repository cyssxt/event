class Event {
    constructor({callback,name,context,group}) {
        if(!name){
            throw Error('name cannot be null')
        }
        this.eid =++Event.cid
        this.callback = callback
        this.context = context
        this.group = group
        this.name = name
    }
}
Event.cid=0

export default Event