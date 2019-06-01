"use strict";
let Emitter = require('./emitter')
module.exports = CSEventEmitter;
function CSEventEmitter(){
}
CSEventEmitter.on = Emitter.default.on;
CSEventEmitter.emit = Emitter.default.emit;
CSEventEmitter.emitByGroup = Emitter.default.emitByGroup;
CSEventEmitter.data = Emitter.default.data;
CSEventEmitter.remove = Emitter.default.remove;
CSEventEmitter.removeByGroup = Emitter.default.removeByGroup;
CSEventEmitter.removeByName = Emitter.default.removeByName;