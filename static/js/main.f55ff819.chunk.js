(this["webpackJsonpmega-tools"]=this["webpackJsonpmega-tools"]||[]).push([[0],{15:function(e,t,n){e.exports={Sliders:"SMDColorSelector_Sliders__3ENca",Value:"SMDColorSelector_Value__2Dhvx",ColorInput:"SMDColorSelector_ColorInput__3URPy",R:"SMDColorSelector_R__2SUfS",G:"SMDColorSelector_G__39nqU",B:"SMDColorSelector_B__18YXH"}},42:function(e,t,n){},46:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(20),o=n.n(a),s=(n(42),n(18)),l=(n(46),n(19)),i=n(7),u=n(54),j=n(55),d=s.c,b=n(16),h=Object(b.c)({name:"palette",initialState:{color:0},reducers:{setColor:function(e,t){e.color=t.payload}}}),x=h.actions.setColor,O=function(e){return e.palette.color},m=h.reducer,v=n(11),f=n(53),g=n(34),p=n(56),S=[0,52,87,116,144,172,206,255],C=[0,29,52,70,87,101,116,130],N=[130,144,158,172,187,206,228,255];function M(e){return{r:e>>1&7,g:e>>5&7,b:e>>9&7}}function w(e){return e.b<<9|e.g<<5|e.r<<1}function H(e,t){for(var n=0;n<t.length;n+=1)if(t[n]>=e){if(!(n>0))return n;if(e-t[n-1]<t[n]-e)return n-1}return t.length-1}function I(e,t,n){return(1-n)*e+n*t}function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:S,n=M(e);return n.r=t[n.r],n.g=t[n.g],n.b=t[n.b],n.r<<16|n.g<<8|n.b}function y(e,t,n){var r=M(e),c=M(t);return w({r:Math.round(I(r.r,c.r,n)),g:Math.round(I(r.g,c.g,n)),b:Math.round(I(r.b,c.b,n))})}function G(e){var t=e.toString(16);return"#".concat("0".repeat(Math.max(0,6-t.length))).concat(t)}var L,R=n(15),D=n.n(R),A=n(1);function k(e){return e===L.SHADOW?C:e===L.HIGHLIGHT?N:S}function T(e){return"0x".concat((2*e).toString(16))}function B(e){var t=e.initialColor,n=void 0===t?0:t,c=e.initialBrightnessMode,a=void 0===c?L.NORMAL:c,o=e.onChangeColor,s=Object(r.useState)(n),l=Object(v.a)(s,2),i=l[0],u=l[1],j=Object(r.useState)("0x".concat(n.toString(16))),d=Object(v.a)(j,2),b=d[0],h=d[1],x=Object(r.useState)(a),O=Object(v.a)(x,2),m=O[0],C=O[1],N=M(i),I=N.r,y=N.g,R=N.b,B=Object(r.useRef)(null),W=Object(r.useRef)(null),V=Object(r.useRef)(null),P=G(_(i,k(m))),U=function(){var e,t,n,r=w({r:(null===(e=B.current)||void 0===e?void 0:e.valueAsNumber)||0,g:(null===(t=W.current)||void 0===t?void 0:t.valueAsNumber)||0,b:(null===(n=V.current)||void 0===n?void 0:n.valueAsNumber)||0});h("0x".concat(r.toString(16))),u(r),o&&o(r)};return Object(A.jsx)("div",{children:Object(A.jsxs)(f.a,{children:[Object(A.jsx)(g.a,{xs:"auto",children:Object(A.jsx)("div",{className:"border rounded border-2 p-1 h-100",children:Object(A.jsx)("div",{className:"h-100",style:{backgroundColor:P,minWidth:"15vw"},children:"\xa0"})})}),Object(A.jsxs)(g.a,{children:[Object(A.jsxs)(p.a.Group,{as:f.a,xs:2,lg:6,children:[Object(A.jsx)(p.a.Label,{column:!0,sm:6,md:3,lg:"auto",children:"Brightness Mode:"}),Object(A.jsx)(g.a,{xs:6,md:3,children:Object(A.jsxs)(p.a.Select,{defaultValue:m,onChange:function(e){return C(parseInt(e.currentTarget.value))},children:[Object(A.jsx)("option",{value:L.NORMAL,children:"Normal"}),Object(A.jsx)("option",{value:L.SHADOW,children:"Shadow"}),Object(A.jsx)("option",{value:L.HIGHLIGHT,children:"Highlight"})]})}),Object(A.jsx)(p.a.Label,{column:!0,xs:6,md:3,lg:"auto",children:"SMD:"}),Object(A.jsx)(g.a,{xs:6,md:3,children:Object(A.jsx)(p.a.Control,{value:b,onChange:function(e){h(e.currentTarget.value);var t=parseInt(e.currentTarget.value);0===(-3823&t)&&(u(t),o&&o(t))}})}),Object(A.jsxs)(p.a.Label,{column:!0,xs:4,lg:"auto",children:["Web:"," "]}),Object(A.jsx)(g.a,{xs:4,children:Object(A.jsx)(p.a.Control,{type:"color",value:P,onChange:function(e){u(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:S,n=H(255&e,t),r=H(e>>8&255,t);return w({r:H(e>>16&255,t),g:r,b:n})}(parseInt(e.currentTarget.value.substr(1),16),k(m)))}})}),Object(A.jsx)(p.a.Label,{column:!0,xs:4,lg:"auto",children:P})]}),Object(A.jsxs)("div",{className:D.a.Sliders,children:[Object(A.jsxs)(f.a,{className:D.a.R,children:[Object(A.jsx)(g.a,{children:Object(A.jsx)(p.a.Range,{ref:B,min:0,max:7,step:1,value:I,onChange:U})}),Object(A.jsx)(g.a,{className:D.a.Value,xs:"auto",children:T(I)})]}),Object(A.jsxs)(f.a,{className:D.a.G,children:[Object(A.jsx)(g.a,{children:Object(A.jsx)(p.a.Range,{ref:W,min:0,max:7,step:1,value:y,onChange:U})}),Object(A.jsx)(g.a,{className:D.a.Value,xs:"auto",children:T(y)})]}),Object(A.jsxs)(f.a,{className:D.a.B,children:[Object(A.jsx)(g.a,{children:Object(A.jsx)(p.a.Range,{ref:V,min:0,max:7,step:1,value:R,onChange:U})}),Object(A.jsx)(g.a,{className:D.a.Value,xs:"auto",children:T(R)})]})]})]})]})})}function W(){var e=Object(s.b)(),t=d(O);return Object(A.jsx)("div",{children:Object(A.jsx)(B,{initialColor:t,onChangeColor:function(t){e(x(t))}})})}function V(e){for(var t=e.from,n=e.to,r=e.steps,c=void 0===r?8:r,a=[],o=0;o<c;o+=1){var s=y(t,n,o/(c-1));a.push(s)}var l=a.map((function(e){return Object(A.jsx)("div",{className:"h-100",style:{backgroundColor:G(_(e)),minWidth:"15vw"},children:"\xa0"})}));return Object(A.jsx)("div",{className:"border rounded border-2 p-1",children:l})}function P(){return Object(A.jsxs)("div",{children:[Object(A.jsxs)(f.a,{children:[Object(A.jsx)(g.a,{lg:6,children:Object(A.jsx)(B,{})}),Object(A.jsx)(g.a,{lg:6,children:Object(A.jsx)(B,{})})]}),Object(A.jsx)(V,{from:0,to:3822,steps:8})]})}!function(e){e[e.NORMAL=0]="NORMAL",e[e.SHADOW=1]="SHADOW",e[e.HIGHLIGHT=2]="HIGHLIGHT"}(L||(L={}));var U=function(){return Object(A.jsxs)(u.a,{children:[Object(A.jsx)("h1",{children:"Mega Tools"}),Object(A.jsx)("a",{className:"float-end",href:"https://github.com/StealthC/mega-tools",children:"View on Github"}),Object(A.jsx)("p",{className:"pb-2",children:"Here you may encounter some tools to help learn Sega Genesis/Mega Drive development."}),Object(A.jsxs)(l.a,{children:[Object(A.jsxs)(j.a,{variant:"tabs",children:[Object(A.jsx)(j.a.Item,{children:Object(A.jsx)(j.a.Link,{as:l.b,to:"/colors",children:"Color"})}),Object(A.jsx)(j.a.Item,{children:Object(A.jsx)(j.a.Link,{as:l.b,to:"/gradient",children:"Gradient (Soon\u2122)"})}),Object(A.jsx)(j.a.Item,{children:Object(A.jsx)(j.a.Link,{as:l.b,to:"/vdp",children:"VDP (Soon\u2122)"})})]}),Object(A.jsx)("div",{className:"py-4",children:Object(A.jsxs)(i.d,{children:[Object(A.jsx)(i.b,{path:"/colors",children:Object(A.jsx)(W,{})}),Object(A.jsx)(i.b,{path:"/gradient",children:Object(A.jsx)(P,{})}),Object(A.jsx)(i.b,{path:"/",children:Object(A.jsx)(i.a,{to:"/colors"})})]})})]}),Object(A.jsxs)("p",{className:"pt-4 text-center",children:["If you like this project and want to help me to create more,"," ",Object(A.jsx)("a",{href:"https://www.patreon.com/stealthc",children:"please consider being my patron"}),"."]})]})},E=n(28),J=n.n(E),q=n(37);function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var Y=Object(b.b)("counter/fetchCount",function(){var e=Object(q.a)(J.a.mark((function e(t){var n;return J.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$=Object(b.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(Y.pending,(function(e){e.status="loading"})).addCase(Y.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),z=$.actions,F=(z.increment,z.decrement,z.incrementByAmount,$.reducer),K=Object(b.a)({reducer:{counter:F,palette:m}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(s.a,{store:K,children:Object(A.jsx)(U,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[52,1,2]]]);
//# sourceMappingURL=main.f55ff819.chunk.js.map