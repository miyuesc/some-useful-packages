"use strict";(self["webpackChunksome_useful_packages"]=self["webpackChunksome_useful_packages"]||[]).push([[68],{3068:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"components-content"},[t("ul",{staticClass:"page-slider"},e._l(e.menus,(function(s){return t("li",{key:s.key,class:{"is-active":e.active.name===s.name},on:{click:function(t){return e.setActive(s)}}},[e._v(" "+e._s(s.name)+" ")])})),0),t("div",{staticClass:"page-content"},[t("transition",{attrs:{name:"slide-left"}},[t("router-view")],1)],1)])},a=[],c=(s(7658),s(4040)),o={name:"App",data(){return{componentsList:c.bK.sort(((e,t)=>e.index-t.index)),menus:c.bK,active:{name:c.bK[0]?.name||0},testArr:[{}],testObj:{a:"1"}}},mounted(){console.log(this),this.active.name=this.menus.find((e=>e.name===this.$route.name))?.name},methods:{setActive(e){this.active.name=e.name,this.$router.push(`/components/${e.path}`)}},watch:{testArr(e){console.log("watch array",e)},"testArr.length"(e){console.log("watch array length",e)},testObj(e){console.log("watch object",e)},"testObj.a"(e){console.log("watch object property",e)}}},i=o,r=s(1001),l=(0,r.Z)(i,n,a,!1,null,"14a2a6dc",null),u=l.exports}}]);