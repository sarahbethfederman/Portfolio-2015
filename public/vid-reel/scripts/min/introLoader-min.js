"use strict";var mainLoop=require("./mainLoop.js"),buttons=require("./buttons.js"),videoModule=require("./video.js"),introLoader={init:function(e,o,t,n){var d=this;buttons.makeButton(n,function(){d.endIntro(e,o)}),o.load(),o.addEventListener("loadstart",function(){videoModule.loaderStart(e,o),console.log("loadstarted")}),o.addEventListener("canplaythrough",function(){videoModule.loaderEnd(e,o)}),o.addEventListener("timeupdate",function(){videoModule.progressBar(o,t)}),o.addEventListener("ended",function(){d.endIntro(e,o)})},endIntro:function(e,o){e.classList.add("fade-out"),o.pause(),mainLoop.init(),setTimeout(function(){document.body.removeChild(e)},300)}};module.exports=introLoader;