"use strict";var buttons=require("./buttons.js"),slideNav={names:[],slides:[],currentSlide:void 0,navContainer:void 0,onLeft:!1,onRight:!1,init:function(e,t){var n=this;for(var i in e)e.hasOwnProperty(i)&&n.names.push(i);n.names.forEach(function(e,i,a){var o=document.createElement("li");o.classList.add("slide"),o.setAttribute("data-target-video",i),o.innerHTML=a[i],n.slides.push(o),n.navContainer.appendChild(o),buttons.makeButton(o,function(){var e=o.getAttribute("data-target-video");t(e)})}),n.initEvents(),n.initArrows()},initArrows:function(){var e=this,t=document.createElement("div"),n=document.createElement("div");e.navContainer.parentNode.appendChild(t),e.navContainer.parentNode.appendChild(n),t.classList.add("arrow-left"),n.classList.add("arrow-right"),console.log(t),console.log(n),t.addEventListener("mouseleave",function(){e.onLeft=!1}),t.addEventListener("mouseleave",function(){e.onRight=!1}),t.addEventListener("mouseenter",function(){if(e.onLeft=!0,e.onLeft){var t=parseInt(getComputedStyle(e.navContainer).getPropertyValue("left"));t+=200,e.navContainer.style.left=t+"px"}}),n.addEventListener("mouseenter",function(){if(e.onRight=!0,e.onRight){var t=parseInt(getComputedStyle(e.navContainer).getPropertyValue("right"));console.log(t),t+=200,e.navContainer.style.right=t+"px"}})},initEvents:function(){var e=this,t=document.querySelector(".view-all"),n=document.createElement("div");n.classList.add("overlay"),buttons.makeButton(t,function(){e.navContainer.classList.toggle("viewing-all"),t.innerHTML=e.navContainer.classList.contains("viewing-all")?"Close":"View all videos"})},move:function(e,t){var n=this,i=n.navContainer.querySelector(".slide"),a=275*e;n.currentSlide=t;var o=n.navContainer.querySelectorAll(".selected");if(null!=o)for(var r=0;r<o.length;r++)o[r].classList.remove("selected");a=e-t>=0?-a:0,console.log(a),n.slides[e].classList.add("selected")}};module.exports=slideNav;