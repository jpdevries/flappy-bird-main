!function t(e,n,i){function s(o,a){if(!n[o]){if(!e[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=n[o]={exports:{}};e[o][0].call(u.exports,function(t){var n=e[o][1][t];return s(n?n:t)},u,u.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(t){return"function"==typeof t}function r(t){return"number"==typeof t}function o(t){return"object"==typeof t&&null!==t}function a(t){return void 0===t}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!r(t)||0>t||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,n,i,r,c,h;if(this._events||(this._events={}),"error"===t&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[t],a(n))return!1;if(s(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:r=Array.prototype.slice.call(arguments,1),n.apply(this,r)}else if(o(n))for(r=Array.prototype.slice.call(arguments,1),h=n.slice(),i=h.length,c=0;i>c;c++)h[c].apply(this,r);return!0},i.prototype.addListener=function(t,e){var n;if(!s(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,s(e.listener)?e.listener:e),this._events[t]?o(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,o(this._events[t])&&!this._events[t].warned&&(n=a(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){function n(){this.removeListener(t,n),i||(i=!0,e.apply(this,arguments))}if(!s(e))throw TypeError("listener must be a function");var i=!1;return n.listener=e,this.on(t,n),this},i.prototype.removeListener=function(t,e){var n,i,r,a;if(!s(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(n=this._events[t],r=n.length,i=-1,n===e||s(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(o(n)){for(a=r;a-- >0;)if(n[a]===e||n[a].listener&&n[a].listener===e){i=a;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[t],s(n))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?s(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(s(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},{}],2:[function(t,e,n){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],3:[function(t,e,n){function i(){u=!1,a.length?h=a.concat(h):p=-1,h.length&&s()}function s(){if(!u){var t=setTimeout(i);u=!0;for(var e=h.length;e;){for(a=h,h=[];++p<e;)a&&a[p].run();p=-1,e=h.length}a=null,u=!1,clearTimeout(t)}}function r(t,e){this.fun=t,this.array=e}function o(){}var a,c=e.exports={},h=[],u=!1,p=-1;c.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new r(t,e)),1!==h.length||u||setTimeout(s,0)},r.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=o,c.addListener=o,c.once=o,c.off=o,c.removeListener=o,c.removeAllListeners=o,c.emit=o,c.binding=function(t){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(t){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],4:[function(t,e,n){e.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},{}],5:[function(t,e,n){(function(e,i){function s(t,e){var i={seen:[],stylize:o};return arguments.length>=3&&(i.depth=arguments[2]),arguments.length>=4&&(i.colors=arguments[3]),y(e)?i.showHidden=e:e&&n._extend(i,e),x(i.showHidden)&&(i.showHidden=!1),x(i.depth)&&(i.depth=2),x(i.colors)&&(i.colors=!1),x(i.customInspect)&&(i.customInspect=!0),i.colors&&(i.stylize=r),c(i,t,i.depth)}function r(t,e){var n=s.styles[e];return n?"["+s.colors[n][0]+"m"+t+"["+s.colors[n][1]+"m":t}function o(t,e){return t}function a(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function c(t,e,i){if(t.customInspect&&e&&D(e.inspect)&&e.inspect!==n.inspect&&(!e.constructor||e.constructor.prototype!==e)){var s=e.inspect(i,t);return w(s)||(s=c(t,s,i)),s}var r=h(t,e);if(r)return r;var o=Object.keys(e),y=a(o);if(t.showHidden&&(o=Object.getOwnPropertyNames(e)),I(e)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return u(e);if(0===o.length){if(D(e)){var v=e.name?": "+e.name:"";return t.stylize("[Function"+v+"]","special")}if(_(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp");if(L(e))return t.stylize(Date.prototype.toString.call(e),"date");if(I(e))return u(e)}var g="",m=!1,b=["{","}"];if(d(e)&&(m=!0,b=["[","]"]),D(e)){var x=e.name?": "+e.name:"";g=" [Function"+x+"]"}if(_(e)&&(g=" "+RegExp.prototype.toString.call(e)),L(e)&&(g=" "+Date.prototype.toUTCString.call(e)),I(e)&&(g=" "+u(e)),0===o.length&&(!m||0==e.length))return b[0]+g+b[1];if(0>i)return _(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special");t.seen.push(e);var E;return E=m?p(t,e,i,y,o):o.map(function(n){return l(t,e,i,y,n,m)}),t.seen.pop(),f(E,g,b)}function h(t,e){if(x(e))return t.stylize("undefined","undefined");if(w(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return m(e)?t.stylize(""+e,"number"):y(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0}function u(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,n,i,s){for(var r=[],o=0,a=e.length;a>o;++o)k(e,String(o))?r.push(l(t,e,n,i,String(o),!0)):r.push("");return s.forEach(function(s){s.match(/^\d+$/)||r.push(l(t,e,n,i,s,!0))}),r}function l(t,e,n,i,s,r){var o,a,h;if(h=Object.getOwnPropertyDescriptor(e,s)||{value:e[s]},h.get?a=h.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):h.set&&(a=t.stylize("[Setter]","special")),k(i,s)||(o="["+s+"]"),a||(t.seen.indexOf(h.value)<0?(a=v(n)?c(t,h.value,null):c(t,h.value,n-1),a.indexOf("\n")>-1&&(a=r?a.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+a.split("\n").map(function(t){return"   "+t}).join("\n"))):a=t.stylize("[Circular]","special")),x(o)){if(r&&s.match(/^\d+$/))return a;o=JSON.stringify(""+s),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=t.stylize(o,"string"))}return o+": "+a}function f(t,e,n){var i=0,s=t.reduce(function(t,e){return i++,e.indexOf("\n")>=0&&i++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return s>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function d(t){return Array.isArray(t)}function y(t){return"boolean"==typeof t}function v(t){return null===t}function g(t){return null==t}function m(t){return"number"==typeof t}function w(t){return"string"==typeof t}function b(t){return"symbol"==typeof t}function x(t){return void 0===t}function _(t){return E(t)&&"[object RegExp]"===S(t)}function E(t){return"object"==typeof t&&null!==t}function L(t){return E(t)&&"[object Date]"===S(t)}function I(t){return E(t)&&("[object Error]"===S(t)||t instanceof Error)}function D(t){return"function"==typeof t}function C(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function S(t){return Object.prototype.toString.call(t)}function O(t){return 10>t?"0"+t.toString(10):t.toString(10)}function z(){var t=new Date,e=[O(t.getHours()),O(t.getMinutes()),O(t.getSeconds())].join(":");return[t.getDate(),P[t.getMonth()],e].join(" ")}function k(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var R=/%[sdj%]/g;n.format=function(t){if(!w(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(s(arguments[n]));return e.join(" ")}for(var n=1,i=arguments,r=i.length,o=String(t).replace(R,function(t){if("%%"===t)return"%";if(n>=r)return t;switch(t){case"%s":return String(i[n++]);case"%d":return Number(i[n++]);case"%j":try{return JSON.stringify(i[n++])}catch(e){return"[Circular]"}default:return t}}),a=i[n];r>n;a=i[++n])o+=v(a)||!E(a)?" "+a:" "+s(a);return o},n.deprecate=function(t,s){function r(){if(!o){if(e.throwDeprecation)throw new Error(s);e.traceDeprecation?console.trace(s):console.error(s),o=!0}return t.apply(this,arguments)}if(x(i.process))return function(){return n.deprecate(t,s).apply(this,arguments)};if(e.noDeprecation===!0)return t;var o=!1;return r};var B,j={};n.debuglog=function(t){if(x(B)&&(B=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!j[t])if(new RegExp("\\b"+t+"\\b","i").test(B)){var i=e.pid;j[t]=function(){var e=n.format.apply(n,arguments);console.error("%s %d: %s",t,i,e)}}else j[t]=function(){};return j[t]},n.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},n.isArray=d,n.isBoolean=y,n.isNull=v,n.isNullOrUndefined=g,n.isNumber=m,n.isString=w,n.isSymbol=b,n.isUndefined=x,n.isRegExp=_,n.isObject=E,n.isDate=L,n.isError=I,n.isFunction=D,n.isPrimitive=C,n.isBuffer=t("./support/isBuffer");var P=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n.log=function(){console.log("%s - %s",z(),n.format.apply(n,arguments))},n.inherits=t("inherits"),n._extend=function(t,e){if(!e||!E(e))return t;for(var n=Object.keys(e),i=n.length;i--;)t[n[i]]=e[n[i]];return t}}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":4,_process:3,inherits:2}],6:[function(t,e,n){var i=t("../../settings"),s=function(t){this.entity=t,this.flapIndex=0,this.images=[document.getElementById("bird2"),document.getElementById("bird1"),document.getElementById("bird2"),document.getElementById("bird3")],this.radians=0,this.interval=window.setInterval(this.flap.bind(this),240)};s.prototype.flap=function(){this.flapIndex+=1,this.flapIndex>=this.images.length&&(this.flapIndex=0)},s.prototype.draw=function(t){var e=this.entity.components.physics.position;t.save(),t.translate(e.x,e.y),t.scale(-1,1),t.rotate(Math.PI),t.save(),t.translate(i.birdRadius/2,i.birdRadius/2),t.rotate(this.radians);var n=this.entity.components.physics.velocity.y;n=Math.max(i.minVerticalVelocity,n),n=Math.min(i.maxVerticalVelocity,n),n=-n;var s=i.noseDive;t.beginPath(),t.drawImage(this.images[this.flapIndex],-i.birdRadius/2,-i.birdRadius/2,i.birdRadius,i.birdRadius),t.restore(),t.closePath(),t.restore(),this.radians=Math.degreesToRadians(n*s)},n.BirdGraphicsComponent=s},{"../../settings":13}],7:[function(t,e,n){var i=t("events"),s=t("util"),r=t("../../settings"),o=function(t){this.entity=t,this.image=document.getElementById("pipe"),this.emitted=!1};s.inherits(o,i),o.prototype.draw=function(t){var e=this.entity.components.physics.position,n=this.entity.flip;t.save(),t.translate(e.x,e.y),e.x<-r.pipeWidth&&!this.emitted&&(this.emit("passed",this),this.emitted=!0),n&&t.scale(1,-1);var i=this.image;t.drawImage(i,0,0,r.pipeWidth,1),t.restore()},n.PipeGraphicsComponent=o},{"../../settings":13,events:1,util:5}],8:[function(t,e,n){var i=function(t){this.entity=t,this.position={x:0,y:0},this.velocity={x:0,y:0},this.acceleration={x:0,y:0}};i.prototype.update=function(t,e){e&&(this.velocity.x+=this.acceleration.x*t,this.velocity.y+=this.acceleration.y*t),this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t},n.PhysicsComponent=i},{}],9:[function(t,e,n){var i=t("../components/graphics/bird"),s=t("../components/physics/physics"),r=t("../settings"),o=function(){var t=new s.PhysicsComponent(this);t.position.y=.5,t.acceleration.y=-r.gravity||-.75;var e=new i.BirdGraphicsComponent(this);this.components={physics:t,graphics:e}};n.Bird=o},{"../components/graphics/bird":6,"../components/physics/physics":8,"../settings":13}],10:[function(t,e,n){var i=t("../components/graphics/pipe"),s=t("../components/physics/physics"),r=t("events"),o=t("util"),a=function(t,e,n){var r=this;this.id="undefined"==typeof n?"":n,this.flip="undefined"==typeof e?!1:e;var o=new s.PhysicsComponent(this);o.position.x=t.x,o.position.y=t.y,o.velocity.x=-.5;var a=new i.PipeGraphicsComponent(this);a.on("passed",function(t){r.emit("passed",t)}),this.components={physics:o,graphics:a}};o.inherits(a,r),n.Pipe=a},{"../components/graphics/pipe":7,"../components/physics/physics":8,events:1,util:5}],11:[function(t,e,n){Math.randomRange=function(t,e){return t+Math.random()*(e-t)},Math.degreesToRadians=function(t){return t*Math.PI/180},Math.radiansToDegrees=function(t){return 180*t/Math.PI};var i=t("./systems/graphics"),s=t("./systems/physics"),r=t("./systems/input"),o=t("./systems/pipe_system"),a=t("./entities/bird"),c=(t("./settings"),function(){var t=this;this.gameOver=!1,this.score=0,this.entities=[new a.Bird],this.graphics=new i.GraphicsSystem(this.entities),this.physics=new s.PhysicsSystem(this.entities),this.input=new r.InputSystem(this.entities),this.pipes=new o.PipeSystem(this.entities),this.pipes.on("passed",function(e){t.score=e,t.gameOver||console.log(e)}),this.graphics.on("collision",function(){t.gameOver||console.log("gameOver you got "+t.score),t.gameOver=!0,t.gameOver&&(t.graphics.pause(),t.physics.pause(),t.pipes.pause())}),this.input.on("visibilitychange",function(e){console.log("visibilitychange",e),e?(t.graphics.paused=!1,t.physics.run(),t.pipes.run()):(t.graphics.pause(),t.physics.pause(),t.pipes.pause())}),this.pipes.on("pipeadded",function(){var e=t.entities;e=e.filter(function(e){return e.components.physics.position.x>-(t.graphics.canvas.width/t.graphics.canvas.height)?!0:!1}),t.entities=t.graphics.entities=t.physics.entities=t.input.entities=t.pipes.entities=e})});c.prototype.run=function(){this.graphics.run(),this.physics.run(),this.input.run(),this.pipes.run()},n.FlappyBird=c},{"./entities/bird":9,"./settings":13,"./systems/graphics":14,"./systems/input":15,"./systems/physics":16,"./systems/pipe_system":17}],12:[function(t,e,n){var i=t("./flappy_bird");document.addEventListener("DOMContentLoaded",function(){var t=new i.FlappyBird;t.run()})},{"./flappy_bird":11}],13:[function(t,e,n){n.birdRadius=.1,n.pipeWidth=.2,n.collisionAllowance=1,n.gravity=1,n.lift=.5,n.noseDive=90,n.minVerticalVelocity=-1,n.maxVerticalVelocity=0},{}],14:[function(t,e,n){var i=t("events"),s=t("util"),r=t("../settings"),o=function(t){function e(){i.width=window.innerWidth,i.height=window.innerHeight,n.calculations.birdSize=.1*i.height,n.calculations.halfWidth=i.width/2,n.calculations.birdSizeBuffer=1.2*n.calculations.birdSize}var n=this;this.entities=t,this.canvas=document.getElementById("main-canvas"),this.offcanvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.showBoundingBox=!1,this.showCollisionDetection=!0,this.paused=!1;var i=this.canvas;this.offcanvas;document.body.addEventListener("keydown",function(t){n.showCollisionDetection=!n.showCollisionDetection}),console.log("Pro tip: press spacebar to toggle the visibility of the hidden collision detection canvas"),n.calculations={},e(),window.onresize=function(){e()}};s.inherits(o,i),o.prototype.run=function(){window.requestAnimationFrame(this.tick.bind(this))},o.prototype.pause=function(){this.paused=!0},o.prototype.tick=function(){var t=this,e=this.canvas,n=this.offcanvas,i=n.getContext("2d");this.clearContext(e),this.clearContext(n);var s=this.entities[0],o={x:t.calculations.halfWidth,y:(1-s.components.physics.position.y)*e.height,width:t.calculations.birdSizeBuffer,height:t.calculations.birdSizeBuffer};n.width=o.width,n.height=o.height,this.context.save(),i.save(),this.showBoundingBox&&(this.context.fillStyle="#649fd9",this.context.fillRect(o.x,o.y,o.width,o.height)),this.context.translate(t.calculations.halfWidth,this.canvas.height),this.context.scale(this.canvas.height,-this.canvas.height);var a=function(e,n){if(!1 in e.components||!1 in e.components)return!1;n.width=t.canvas.width,n.height=t.canvas.height;var i=n.getContext("2d");e.components.physics.position;i.save(),i.translate(t.calculations.halfWidth,t.canvas.height),i.scale(t.canvas.height,-t.canvas.height),e.components.graphics.draw(i);var s=i.getImageData(o.x,o.y,o.width,o.height);return s=t.colorizeImageData(s,[0,255,0,255]),i.restore(),t.clearContext(n),s}(s,document.createElement("canvas")),c=function(e,n){n.width=t.canvas.width,n.height=t.canvas.height;var i=n.getContext("2d");i.save(),i.translate(t.calculations.halfWidth,t.canvas.height),i.scale(t.canvas.height,-t.canvas.height);for(var s=0;s<e.length;s++){var r=e[s];"graphics"in r.components&&r.components.graphics.draw(i)}var a=i.getImageData(o.x,o.y,o.width,o.height);return a=t.colorizeImageData(a,[255,0,0,255]),i.restore(),t.clearContext(n),a}(this.entities.slice(1),document.createElement("canvas"));i.restore(),i.clearRect(0,0,n.width,n.height),i.globalCompositeOperation="multiply",i.drawImage(t.dataURLtoImg(t.imgDataToDataURL(c)),0,0),i.drawImage(t.dataURLtoImg(t.imgDataToDataURL(a)),0,0);var h=function(){for(var t=i.getImageData(0,0,n.width,n.height),e=t.data,s=0,o=0;o<=e.length-4;o+=4){var a=255==e[o]&&!e[o+1]&&!e[o+2],c=!e[o]&&255==e[o+1]&&!e[o+2],h=0==e[o]&&0==e[o+1]&&0==e[o+2]&&0==e[o+3];if(a||c||h||s++,s>=r.collisionAllowance)return!0}return!1}();h&&(console.log("collision!"),t.emit("collision"));for(var u=0;u<this.entities.length;u++){var p=this.entities[u];"graphics"in p.components&&p.components.graphics.draw(this.context)}this.context.restore(),this.showCollisionDetection&&this.context.putImageData(i.getImageData(0,0,n.width,n.height),0,0),this.paused||window.requestAnimationFrame(this.tick.bind(this))},o.prototype.colorizeImageData=function(t,e){for(var n=t.data,i=0;i<=n.length-4;i+=4)(n[i]||n[i+1]||n[i+2]||n[i+3])&&(n[i]=e[0],n[i+1]=e[1],n[i+2]=e[2],n[i+3]=e[3]);return t},o.prototype.imgDataToDataURL=function(t){var e=document.createElement("canvas");return e.width=t.width,e.height=t.height,e.getContext("2d").putImageData(t,0,0),e.toDataURL()},o.prototype.dataURLtoImg=function(t){var e=new Image;return e.src=t,e},o.prototype.clearContext=function(t,e,n,i,s){e="undefined"==typeof e?0:e,n="undefined"==typeof n?0:n,i="undefined"==typeof i?t.width:i,s="undefined"==typeof s?t.height:s,t.getContext("2d").clearRect(e,n,i,s)},n.GraphicsSystem=o},{"../settings":13,events:1,util:5}],15:[function(t,e,n){var i=t("events"),s=t("util"),r=t("../settings"),o=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas");var e;"undefined"!=typeof document.hidden?e="visibilitychange":"undefined"!=typeof document.mozHidden?e="mozvisibilitychange":"undefined"!=typeof document.msHidden?e="msvisibilitychange":"undefined"!=typeof document.webkitHidden&&(e="webkitvisibilitychange"),document.addEventListener(e,this.handleVisibilityChange.bind(this),!1)};s.inherits(o,i),o.prototype.run=function(){document.body.addEventListener("click",this.onClick.bind(this)),document.body.addEventListener("keydown",this.onkeydown.bind(this))},o.prototype.onClick=function(){var t=this.entities[0];t.components.physics.velocity.y=r.lift},o.prototype.onkeydown=function(t){if(32==t.keyCode){var e=this.entities[0];e.components.physics.velocity.y=r.lift}},o.prototype.handleVisibilityChange=function(){var t;"undefined"!=typeof document.hidden?t="hidden":"undefined"!=typeof document.mozHidden?t="mozHidden":"undefined"!=typeof document.msHidden?t="msHidden":"undefined"!=typeof document.webkitHidden&&(t="webkitHidden"),document[t]?this.emit("visibilitychange",!1):this.emit("visibilitychange",!0)},n.InputSystem=o},{"../settings":13,events:1,util:5}],16:[function(t,e,n){var i=function(t){this.entities=t,this.interval=null};i.prototype.run=function(){this.interval=window.setInterval(this.tick.bind(this),1e3/60)},i.prototype.pause=function(){clearInterval(this.interval)},i.prototype.tick=function(){for(var t=0;t<this.entities.length;t++){var e=this.entities[t];!1 in e.components||e.components.physics.update(1/60,1>t)}},n.PhysicsSystem=i},{}],17:[function(t,e,n){var i=t("../entities/pipe"),s=t("events"),r=t("util"),o=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas"),this.interval=null,this.pipesPassed=0};r.inherits(o,s),o.prototype.run=function(){this.tick(),this.interval=window.setInterval(this.tick.bind(this),2e3)},o.prototype.pause=function(){null!=this.interval&&(window.clearInterval(this.interval),this.interval=null)},o.prototype.tick=function(){function t(t,n,i,s){var t=new t.Pipe(n,i,s);return t.on("passed",function(t){t.entity.flip&&(e.pipesPassed++,e.emit("passed",e.pipesPassed))}),t}var e=this,n={x:this.canvas.width/this.canvas.height,y:Math.randomRange(.25,.65)},s=(this.entities.length-1)/2;this.entities.push(t(i,n,!0,s)),n.y+=.25,this.entities.push(t(i,n,!1,s)),this.emit("pipeadded")},n.PipeSystem=o},{"../entities/pipe":10,events:1,util:5}]},{},[12]);