(this["webpackJsonptodo-app-react"]=this["webpackJsonptodo-app-react"]||[]).push([[0],{64:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(9),i=n.n(a),o=n(7),u=n(16),s=n(67),l=n(65),d=n(30),p=n(68),f=n(11),j=n(5),b=function(e){var t=e.item,n=e.toggleCompletion,r=e.deleteCompletion,c=e.index,a=(e.showAll,t.completed?"unfinish":"finish"),i={float:"right",margin:"0 0.5em"};return Object(j.jsx)(f.b,{draggableId:t.id,index:c,children:function(e){return Object(j.jsx)("div",Object(o.a)(Object(o.a)(Object(o.a)({ref:e.innerRef},e.draggableProps),e.dragHandleProps),{},{children:Object(j.jsx)(s.a.Item,{style:t.completed?{textDecoration:"line-through"}:null,children:Object(j.jsxs)(l.a,{className:"align-items-center",children:[Object(j.jsx)(d.a,{style:{display:"table-cell",verticalAlign:"middle"},children:Object(j.jsx)("p",{style:{margin:"0"},children:t.text})}),Object(j.jsxs)(d.a,{children:[Object(j.jsx)(p.a,{onClick:r,variant:"danger",style:i,children:"delete"}),Object(j.jsx)(p.a,{onClick:n,variant:"outline-dark",style:i,children:a})]})]})})}))}},t.id)},h=n(8),O=n.n(h),x=n(13),m=n(14),v=n.n(m),g="/todo",y=function(){var e=Object(x.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get(g);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(x.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post(g,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(x.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.delete("".concat(g,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k={getAll:y,create:w,update:function(){var e=Object(x.a)(O.a.mark((function e(t,n){var r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.put("".concat(g,"/").concat(t),n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),remove:C},S=n(66),A=n(31),I=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(u.a)(a,2),l=i[0],d=i[1];Object(r.useEffect)((function(){k.getAll().then((function(e){c(e.sort((function(e,t){return e.position-t.position})))}))}),[]);return Object(j.jsxs)("div",{className:"container",style:{marginTop:"5vh"},children:[Object(j.jsx)("div",{style:{textAlign:"center"},children:Object(j.jsx)("h1",{children:"Shit I Need Todo"})}),Object(j.jsx)(f.a,{onDragEnd:function(e){if(e.destination){var t=Array.from(n),r=t.splice(e.source.index,1),a=Object(u.a)(r,1)[0];t.splice(e.destination.index,0,a);var i=t.map((function(e,t){return Object(o.a)(Object(o.a)({},e),{},{position:t})}));i.filter((function(e,t){return e.id!==n[t].id})).forEach((function(e,t){return k.update(e.id,e)})),c(i)}},children:Object(j.jsx)(f.c,{droppableId:"todo",children:function(e){return Object(j.jsxs)(s.a,Object(o.a)(Object(o.a)({},e.droppableProps),{},{ref:e.innerRef,children:[n.map((function(e,t){return Object(j.jsx)(b,{item:e,index:t,toggleCompletion:function(){return function(e){var t=n.find((function(t){return t.id===e})),r=Object(o.a)(Object(o.a)({},t),{},{completed:!t.completed});k.update(e,r).then((function(t){c(n.map((function(n){return n.id!==e?n:t})))}))}(e.id)},deleteCompletion:function(){return t=e.id,void k.remove(t).then((function(){c(n.filter((function(e){return e.id!==t})))}));var t}},e.id)})),e.placeholder]}))}})}),Object(j.jsxs)(S.a,{onSubmit:function(e){e.preventDefault();var t={id:Object(A.a)(),text:l,completed:!1,position:n.length};k.create(t).then((function(e){c(n.concat(e)),d("")}))},style:{marginTop:"1em"},children:[Object(j.jsx)(S.a.Control,{value:l,onChange:function(e){d(e.target.value)}}),Object(j.jsx)(p.a,{type:"submit",style:{marginTop:"0.5%"},children:"Save"})]})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(I,{})}),document.getElementById("root")),T()}},[[64,1,2]]]);
//# sourceMappingURL=main.02952592.chunk.js.map