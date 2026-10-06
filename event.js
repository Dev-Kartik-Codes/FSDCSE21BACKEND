// EventEmitter is a class
// emit("event param"}:trigger/create/fire and on("event emit param")
// const EventEmitter = require('events');
// const event = new EventEmitter();
// event.on("greet", () => {
//     console.log("This is Event Emitter");
// })
// event.once("greet",()=>{
//     console.log("call event only once")
// })
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");

// 1 & 2 exp
const MyEmitter extends EventEmitter{}
const event=new MyEmitter()
event.on("greet",(msg)=>{
console.log('hello ${msg}'); //Template literlas: ${var}`

})
event.on("exit",()=>{
    console.log("exits myemitter application...")
});
event.emit("greet","CSE 21 this fsd class");
event.emit("exit")

//2. Simulate DOM like event handling in Node.js using
//Button: click and mouseover events
class Button extends EventEmitter{
    click(){
        console.log("/ncall button click event");
        this.emit("click");
    }
    mouseover(){
        console.log("/n call button mouseover event");
        this.emit("mouseover");
    }
    const button=new Button();
}