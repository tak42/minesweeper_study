(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2119:function(n,e,t){"use strict";t.r(e);var r=t(6687),i=t(7794),a=t.n(i),o=t(6486),c=t.n(o),u=t(9008),l=t(7294),f=t(7379),s=t(5893);function p(n,e){var t="undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(!n)return;if("string"===typeof n)return d(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(n);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(n,e)}(n))||e&&n&&"number"===typeof n.length){t&&(n=t);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,c=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return o=n.done,n},e:function(n){c=!0,a=n},f:function(){try{o||null==t.return||t.return()}finally{if(c)throw a}}}}function d(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}var m=f.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-eccczk-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;min-height:100vh;padding:0 0.5rem;"]),h=f.ZP.main.withConfig({displayName:"pages__Main",componentId:"sc-eccczk-1"})(["display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;"]),g=f.ZP.div.withConfig({displayName:"pages__Grid",componentId:"sc-eccczk-2"})(["display:flex;flex-wrap:wrap;align-items:center;justify-content:center;max-width:500px;margin-top:3rem;@media (max-width:600px){flex-direction:column;width:100%;}"]),v=f.ZP.div.withConfig({displayName:"pages__Area",componentId:"sc-eccczk-3"})(["width:50px;height:50px;border:1px solid black;background-color:",";text-align:center;line-height:50px;"],(function(n){return n.clicked?"transparent":"green"})),y=f.ZP.footer.withConfig({displayName:"pages__Footer",componentId:"sc-eccczk-4"})(["display:flex;align-items:center;justify-content:center;width:100%;height:100px;border-top:1px solid #eaeaea;a{display:flex;flex-grow:1;align-items:center;justify-content:center;}"]),x=f.ZP.span.withConfig({displayName:"pages__Logo",componentId:"sc-eccczk-5"})(["height:1em;margin-left:0.5rem;"]);e.default=function(){var n=(0,l.useState)(0),e=n[0],t=(n[1],(0,l.useMemo)((function(){return{len:e<1?8:14,margin:e<1?2:4,bomb:e<1?8:16}}),[e])),i=function(){var n=t;return(0,r.Z)(Array(n.len)).map((function(){return(0,r.Z)(Array(n.len+n.margin)).map((function(){return 0}))}))},o=function(){var n=t;return(0,r.Z)(Array(n.len)).map((function(){return(0,r.Z)(Array(n.len+n.margin)).map((function(){return!1}))}))},f=(0,l.useState)(o),d=f[0],w=f[1],_=(0,l.useState)(o),b=_[0],j=_[1],k=(0,l.useState)(i),N=k[0],S=k[1],A=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]],C=function(n,e){var t=d[n][e],r=b[n][e],i=N[n][e];if(r)return"\u65d7";if(!t)return"";var a=String(i);return 99===i&&(a="\u3007"),0===i&&(a=""),a},Z=function n(e,r,i){var a=t,o=a.len+a.margin,c=i[0],u=i[1];if(e[c][u]=!0,r[c][u]>0)return e;var l,f=p(A);try{for(f.s();!(l=f.n()).done;){var s=l.value,d=c+1*s[0],m=u+1*s[1];d<0||m<0||d>a.len-1||m>o-1||!0!==e[d][m]&&n(e,r,[d,m])}}catch(h){f.e(h)}finally{f.f()}return e},P=(0,l.useState)(!1),I=P[0],E=P[1],O=function(n,e){return new Promise((function(o,u){if(!n){var l=function(n){var e,o=t,u=(0,r.Z)(Array(8)).map((function(n,e){return e})),l=(0,r.Z)(Array(8)).map((function(n,e){return e})),f=n[0]-1<0?0:n[0]-1,s=n[0]+1>o.len?o.len:n[0]+1,d=n[1]-1<0?0:n[1]-1,m=n[1]+1>o.len?o.len:n[1]+1,h=u.filter((function(n){return n<f||n>s})),g=l.filter((function(n){return n<d||n>m})),v=[],y=p(h);try{for(y.s();!(e=y.n()).done;){var x,w=e.value,_=p(g);try{for(_.s();!(x=_.n()).done;){var b=x.value;v.push([w,b])}}catch(z){_.e(z)}finally{_.f()}}}catch(z){y.e(z)}finally{y.f()}v=c().shuffle(v);var j,k=a().mark((function n(){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.delegateYield(v,"t0",1);case 1:case"end":return n.stop()}}),n)}))(),N=i(),S=p((0,r.Z)(Array(8)).map((function(){return k.next().value})));try{for(S.s();!(j=S.n()).done;){var C=j.value;if(void 0!==C){N[C[0]][C[1]]=99;var Z,P=p(A);try{for(P.s();!(Z=P.n()).done;){var I=Z.value,E=C[0]+1*I[0],O=C[1]+1*I[1];E<0||O<0||E>o.len-1||O>o.len+o.margin-1||99!=N[E][O]&&(N[E][O]+=1)}}catch(z){P.e(z)}finally{P.f()}}}}catch(z){S.e(z)}finally{S.f()}return N}(e);return E(!0),o(l)}return o(N)}))},z=function(n,e){O(e,n).then((function(e){var t=JSON.parse(JSON.stringify(d)),r=e;S(r),t=Z(t,r,n),w(t)}))};return(0,l.useEffect)((function(){!function(n,e){var r=t;e.flat().map((function(n,e){return n?{row:Math.floor(e/10),col:e%10,val:n}:{row:-1,col:-1,val:n}})).filter((function(n){return n.val})).forEach((function(e){if(99===n[e.row][e.col])return alert("\u5931\u6557\u3067\u3059"),!1}));var i=e.flat().filter((function(n){return!n})).length;r.bomb===i&&alert("\u6210\u529f\u3067\u3059")}(N,d)})),(0,s.jsxs)(m,{children:[(0,s.jsxs)(u.default,{children:[(0,s.jsx)("title",{children:"Minesweeper study"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"favicon.ico"})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("button",{onClick:function(){w(o()),j(o()),E(!1)},children:"\u30af\u30ea\u30a2"}),(0,s.jsx)(g,{children:d.map((function(n,e){return n.map((function(n,t){return(0,s.jsx)(v,{clicked:n,onClick:function(){return z([e,t],I)},onContextMenu:function(n){return function(n,e){n.preventDefault();var t=JSON.parse(JSON.stringify(b));t[e[0]][e[1]]=!0,j(t)}(n,[e,t])},children:C(e,t)},"".concat(e,"-").concat(t))}))}))})]}),(0,s.jsx)(y,{children:(0,s.jsxs)("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",children:["Powered by"," ",(0,s.jsx)(x,{children:(0,s.jsx)("img",{src:"vercel.svg",alt:"Vercel Logo",width:72,height:16})})]})})]})}},5301:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2119)}])}},function(n){n.O(0,[662,239,774,888,179],(function(){return e=5301,n(n.s=e);var e}));var e=n.O();_N_E=e}]);