!function t(i,n,e){function s(c,r){if(!n[c]){if(!i[c]){var p="function"==typeof require&&require;if(!r&&p)return p(c,!0);if(o)return o(c,!0);var h=new Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h}var a=n[c]={exports:{}};i[c][0].call(a.exports,function(t){var n=i[c][1][t];return s(n?n:t)},a,a.exports,t,i,n,e)}return n[c].exports}for(var o="function"==typeof require&&require,c=0;c<e.length;c++)s(e[c]);return s}({1:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position;t.save(),t.translate(i.x,i.y),t.beginPath();var n=document.getElementById("main-canvas"),t=n.getContext("2d"),e=document.getElementById("bird");t.scale(-1,1),t.rotate(Math.PI),t.drawImage(e,0,0,.1,.1),t.closePath(),t.restore()},n.BirdGraphicsComponent=e},{}],2:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position,n=this.entity.flip;t.save(),t.translate(i.x,i.y),n&&t.scale(1,-1);var e=document.getElementById("pipe");t.drawImage(e,0,0,.2,1),t.restore()},n.PipeGraphicsComponent=e},{}],3:[function(t,i,n){var e=function(t){this.entity=t,this.position={x:0,y:0},this.velocity={x:0,y:0},this.acceleration={x:0,y:0}};e.prototype.update=function(t){this.velocity.x+=this.acceleration.x*t,this.velocity.y+=this.acceleration.y*t,this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t},n.PhysicsComponent=e},{}],4:[function(t,i,n){var e=t("../components/graphics/bird"),s=t("../components/physics/physics"),o=function(){var t=new s.PhysicsComponent(this);t.position.y=.5,t.acceleration.y=-.75;var i=new e.BirdGraphicsComponent(this);this.components={physics:t,graphics:i}};n.Bird=o},{"../components/graphics/bird":1,"../components/physics/physics":3}],5:[function(t,i,n){var e=t("../components/graphics/pipe"),s=t("../components/physics/physics"),o=function(t,i){this.flip="undefined"==typeof i?!1:i;var n=new s.PhysicsComponent(this);n.position.x=t.x,n.position.y=t.y,n.acceleration.x=-.07;var o=new e.PipeGraphicsComponent(this);this.components={physics:n,graphics:o}};n.Pipe=o},{"../components/graphics/pipe":2,"../components/physics/physics":3}],6:[function(t,i,n){var e=t("./systems/graphics"),s=t("./systems/physics"),o=t("./systems/input"),c=t("./systems/pipe_system"),r=t("./entities/bird"),p=.25,h=function(){function t(t,i){return t+Math.random()*(i-t)}var i,n;i=n=t(.25,.65),i+=p,this.entities=[new r.Bird],this.graphics=new e.GraphicsSystem(this.entities),this.physics=new s.PhysicsSystem(this.entities),this.input=new o.InputSystem(this.entities),this.pipes=new c.PipeSystem(this.entities)};h.prototype.run=function(){this.graphics.run(),this.physics.run(),this.input.run(),this.pipes.run()},n.FlappyBird=h},{"./entities/bird":4,"./systems/graphics":8,"./systems/input":9,"./systems/physics":10,"./systems/pipe_system":11}],7:[function(t,i,n){var e=t("./flappy_bird");document.addEventListener("DOMContentLoaded",function(){var t=new e.FlappyBird;t.run()})},{"./flappy_bird":6}],8:[function(t,i,n){var e=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas"),this.context=this.canvas.getContext("2d")};e.prototype.run=function(){window.requestAnimationFrame(this.tick.bind(this))},e.prototype.tick=function(){function t(){i.width=window.innerWidth,i.height=window.innerHeight}var i=this.canvas;t(),window.onresize=function(){t()},this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.save(),this.context.translate(this.canvas.width/2,this.canvas.height),this.context.scale(this.canvas.height,-this.canvas.height);for(var n=0;n<this.entities.length;n++){var e=this.entities[n];!1 in e.components||e.components.graphics.draw(this.context)}this.context.restore(),window.requestAnimationFrame(this.tick.bind(this))},n.GraphicsSystem=e},{}],9:[function(t,i,n){var e=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas")};e.prototype.run=function(){this.canvas.addEventListener("click",this.onClick.bind(this)),document.body.addEventListener("keydown",this.onkeydown.bind(this))},e.prototype.onClick=function(){var t=this.entities[0];t.components.physics.velocity.y=.4},e.prototype.onkeydown=function(t){if(32==t.keyCode){console.log("Spacebar pressed!");var i=this.entities[0];i.components.physics.velocity.y=.4}},n.InputSystem=e},{}],10:[function(t,i,n){var e=function(t){this.entities=t};e.prototype.run=function(){window.setInterval(this.tick.bind(this),1e3/60)},e.prototype.tick=function(){for(var t=0;t<this.entities.length;t++){var i=this.entities[t];!1 in i.components||i.components.physics.update(1/60)}},n.PhysicsSystem=e},{}],11:[function(t,i,n){var e=t("../entities/pipe"),s=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas"),this.interval=null};s.prototype.run=function(){this.tick(),this.interval=window.setInterval(this.tick.bind(this),2e3)},s.prototype.pause=function(){null!=this.interval&&(window.clearInterval(this.interval),this.interval=null)},s.prototype.tick=function(){var t=.2,i={x:1.5,y:(1-t)*Math.random()};this.entities.push(new e.Pipe(i,!0)),this.entities.push(new e.Pipe(i,!1)),i.x<-1.5&&(console.log("Removing pipe!"),this.pipe.splice())},n.PipeSystem=s},{"../entities/pipe":5}]},{},[7]);