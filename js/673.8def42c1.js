"use strict";(self["webpackChunksome_useful_packages"]=self["webpackChunksome_useful_packages"]||[]).push([[673],{673:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"components-content"},[t("ul",{staticClass:"page-slider"},e._l(e.menus,(function(n){return t("li",{key:n.key,class:{"is-active":e.active.name===n.name},on:{click:function(t){return e.setActive(n)}}},[e._v(" "+e._s(n.name)+" ")])})),0),t("div",{staticClass:"page-content"},[t("transition",{attrs:{name:"slide-left"}},[t("router-view")],1)],1)])},a=[],i=(n(7658),n(4040)),u={name:"App",data(){return{componentsList:i.bK.sort(((e,t)=>e.index-t.index)),menus:i.bK,active:{name:i.bK[0]?.name||0}}},mounted(){this.active.name=this.menus.find((e=>e.name===this.$route.name)).name},methods:{setActive(e){this.active.name=e.name,this.$router.push(`/components/${e.path}`)}}},c=u,o=n(1001),r=(0,o.Z)(c,s,a,!1,null,"3d60410e",null),m=r.exports}}]);