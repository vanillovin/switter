(this.webpackJsonpswitter=this.webpackJsonpswitter||[]).push([[0],{68:function(e,t,c){},69:function(e,t,c){"use strict";c.r(t);var n=c(10),a=c.n(n),s=c(50),r=c.n(s),i=c(11),o=c(31),l=c(15),j=c(0),u=c.n(j),b=c(1),d=c(51),O=c(28),m=c(18),h=c(52);Object(d.a)({apiKey:"AIzaSyBOtqn8Rj-gLsv9CJm8F3dZKXyhey4x9Zw",authDomain:"switter-b2db8.firebaseapp.com",projectId:"switter-b2db8",storageBucket:"switter-b2db8.appspot.com",messagingSenderId:"132047093499",appId:"1:132047093499:web:315645c2fe687228ab3a5e"});var x=Object(O.d)(),f=Object(m.e)(),p=Object(h.a)(),g=c(16),v=c(36),y=c(4),w=c(39),N=c(6),k=function(){var e=Object(n.useState)({email:"",password:""}),t=Object(i.a)(e,2),c=t[0],a=t[1],s=c.email,r=c.password,o=Object(n.useState)(""),l=Object(i.a)(o,2),j=l[0],d=l[1],m=Object(n.useState)(!0),h=Object(i.a)(m,2),f=h[0],p=h[1],g=function(e){var t=e.target,n=t.name,s=t.value;a(Object(w.a)(Object(w.a)({},c),{},Object(y.a)({},n,s)))},v=function(){var e=Object(b.a)(u.a.mark((function e(t){var c,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!f){e.next=8;break}return e.next=5,Object(O.c)(x,s,r);case 5:c=e.sent,e.next=11;break;case 8:return e.next=10,Object(O.f)(x,s,r);case 10:c=e.sent;case 11:console.log("Auth data",c),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),n=e.t0.message,d(n);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)("form",{onSubmit:v,className:"container",children:[Object(N.jsx)("input",{name:"email",type:"email",placeholder:"Email",required:!0,value:s,onChange:g,className:"authInput"}),Object(N.jsx)("input",{name:"password",type:"password",placeholder:"Password",required:!0,value:r,onChange:g,className:"authInput"}),Object(N.jsx)("input",{type:"submit",className:"authInput authSubmit",value:f?"Create Account":"Sign In"}),j&&Object(N.jsx)("span",{className:"authError",children:j})]}),Object(N.jsx)("span",{onClick:function(){p((function(e){return!e}))},className:"authSwitch",children:f?"Sign In":"Create Account"})]})},S=function(){var e=function(){var e=Object(b.a)(u.a.mark((function e(t){var c,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=t.target.name,e.prev=1,"google"!==c){e.next=8;break}return n=new O.b,e.next=6,Object(O.g)(x,n);case 6:e.next=12;break;case 8:if("github"!==c){e.next=12;break}return n=new O.a,e.next=12,Object(O.g)(x,n);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsxs)("div",{className:"authContainer",children:[Object(N.jsx)(g.a,{icon:v.c,color:"#9775fa",size:"3x",style:{marginBottom:30}}),Object(N.jsx)(k,{}),Object(N.jsxs)("div",{className:"authBtns",children:[Object(N.jsxs)("button",{onClick:e,name:"google",className:"authBtn",children:["Continue with Google"," ",Object(N.jsx)(g.a,{icon:v.b,color:"#fff",style:{marginLeft:2}})]}),Object(N.jsxs)("button",{onClick:e,name:"github",className:"authBtn",children:["Continue with Github"," ",Object(N.jsx)(g.a,{icon:v.a,color:"#fff",style:{marginLeft:2}})]})]})]})},C=c(29),D=c(23),I=function(e){var t=e.sweetObj,c=e.isOwner,a=(e.userObj,Object(n.useState)(!1)),s=Object(i.a)(a,2),r=s[0],o=s[1],l=Object(n.useState)(t.text),j=Object(i.a)(l,2),d=j[0],O=j[1],h=function(){var e=Object(b.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete this sweet?")){e.next=8;break}return e.next=4,Object(m.c)(Object(m.d)(f,"sweets/".concat(t.id)));case 4:return e.next=6,Object(m.c)(Object(m.d)(f,"sweets/".concat(t.id)));case 6:return e.next=8,Object(C.a)(Object(C.d)(p,t.attachmentUrl));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){return o((function(e){return!e}))},v=function(){var e=Object(b.a)(u.a.mark((function e(c){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.preventDefault(),console.log("sweetObj",t,"/ newSweet",d),e.next=4,Object(m.i)(Object(m.d)(f,"sweets/".concat(t.id)),{text:d});case 4:o(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsx)("div",{className:"sweet",children:r?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)("form",{onSubmit:v,className:"container sweetEdit",children:[Object(N.jsx)("input",{type:"text",placeholder:"Edit your sweet",value:d,required:!0,autoFocus:!0,onChange:function(e){var t=e.target.value;return O(t)},className:"formInput"}),Object(N.jsx)("input",{type:"submit",value:"Update Sweet",className:"formBtn"})]}),Object(N.jsx)("span",{onClick:x,className:"formBtn cancelBtn",children:"Cancel"})]}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)("div",{className:"hello",children:[Object(N.jsxs)("div",{className:"info",children:[Object(N.jsx)("span",{style:{fontWeight:"bold",marginRight:4},children:t.email.split("@")[0]}),Object(N.jsx)("span",{style:{color:"gray",fontSize:10,fontWeight:400},children:function(){var e=new Date(t.createdAt).getMonth()+1,c=new Date(t.createdAt).getDate();return"".concat(e,".").concat(c)}()})]}),c&&Object(N.jsxs)("div",{className:"sweet__actions",children:[Object(N.jsx)("span",{onClick:h,children:Object(N.jsx)(g.a,{icon:D.g})}),Object(N.jsx)("span",{onClick:x,children:Object(N.jsx)(g.a,{icon:D.d})})]})]}),Object(N.jsx)("span",{className:"sweet__text",children:t.text}),t.attachmentUrl&&Object(N.jsx)("img",{alt:"img",src:t.attachmentUrl})]})})},F=c(71),B=function(e){var t=e.userObj,c=Object(n.useState)(""),a=Object(i.a)(c,2),s=a[0],r=a[1],o=Object(n.useState)(""),l=Object(i.a)(o,2),j=l[0],d=l[1],O=function(){var e=Object(b.a)(u.a.mark((function e(c){var n,a,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==s){e.next=2;break}return e.abrupt("return");case 2:if(c.preventDefault(),n="",""===j){e.next=13;break}return a=Object(C.d)(p,"".concat(t.uid,"/").concat(Object(F.a)())),e.next=8,Object(C.e)(a,j,"data_url");case 8:return i=e.sent,console.log(i),e.next=12,Object(C.b)(i.ref);case 12:n=e.sent;case 13:return o={text:s,createdAt:Date.now(),creatorId:t.uid,attachmentUrl:n,email:t.email},e.next=16,Object(m.a)(Object(m.b)(f,"sweets"),o);case 16:r(""),d("");case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsxs)("form",{onSubmit:O,className:"factoryForm",children:[Object(N.jsxs)("div",{className:"factoryInput__container",children:[Object(N.jsx)("input",{className:"factoryInput__input",value:s,onChange:function(e){var t=e.target.value;r(t)},type:"text",placeholder:"What kind of sweet thoughts are you having?",maxLength:120}),Object(N.jsx)("input",{type:"submit",value:"\u2192",className:"factoryInput__arrow",onSubmit:onsubmit})]}),Object(N.jsxs)("label",{htmlFor:"attach-file",className:"factoryInput__label",children:[Object(N.jsx)("span",{children:"Add photos"}),Object(N.jsx)(g.a,{icon:D.e})]}),Object(N.jsx)("input",{id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],c=new FileReader;c.onloadend=function(e){var t=e.currentTarget.result;d(t)},c.readAsDataURL(t)},style:{opacity:0}}),j&&Object(N.jsxs)("div",{className:"factoryForm__attachment",children:[Object(N.jsx)("img",{alt:"img",src:j,style:{backgroundImage:j}}),Object(N.jsxs)("div",{className:"factoryForm__clear",onClick:function(){return d("")},children:[Object(N.jsx)("span",{children:"Remove"}),Object(N.jsx)(g.a,{icon:D.f})]})]})]})},_=function(e){var t=e.userObj,c=Object(n.useState)([]),a=Object(i.a)(c,2),s=a[0],r=a[1];return Object(n.useEffect)((function(){var e=Object(m.h)(Object(m.b)(Object(m.e)(),"sweets"),Object(m.g)("createdAt","desc")),t=Object(m.f)(e,(function(e){var t=e.docs.map((function(e){return Object(w.a)({id:e.id},e.data())}));r(t)}));return function(){t()}}),[]),Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)(B,{userObj:t}),Object(N.jsx)("div",{style:{marginTop:30},children:s.map((function(e){return Object(N.jsx)(I,{userObj:t,sweetObj:e,isOwner:e.creatorId===t.uid},e.id)}))})]})},L=function(e){var t=e.userObj;return Object(N.jsx)("nav",{children:Object(N.jsxs)("ul",{style:{display:"flex",justifyContent:"center"},children:[Object(N.jsx)("li",{className:"logo",children:Object(N.jsx)(o.b,{to:"/",children:Object(N.jsx)(g.a,{icon:v.c,size:"2x",color:"#E05D5D"})})}),Object(N.jsx)("li",{className:"home",children:Object(N.jsx)(o.b,{to:"/",children:Object(N.jsx)(g.a,{icon:D.c,size:"2x",color:"#E05D5D"})})}),Object(N.jsx)("li",{className:"profile",children:Object(N.jsxs)(o.b,{activeClassName:"",to:"/profile",style:{display:"flex",flexDirection:"column",alignItems:"center",fontSize:12,color:"#E05D5D"},children:[Object(N.jsx)(g.a,{icon:D.h,size:"2x"}),Object(N.jsx)("span",{style:{marginTop:10},children:t.displayName?"".concat(t.displayName):"\u2665"})]})}),Object(N.jsx)("li",{className:"msg",children:Object(N.jsxs)(o.b,{activeClassName:"active",to:"/msg",style:{display:"flex",flexDirection:"column",alignItems:"center",fontSize:12,color:"#E05D5D"},children:[Object(N.jsx)(g.a,{icon:D.b,size:"2x",color:"#E05D5D"}),Object(N.jsx)("span",{style:{marginTop:10},children:"+1"})]})}),Object(N.jsx)("li",{className:"more",children:Object(N.jsx)(g.a,{icon:D.a,size:"2x",color:"#E05D5D"})})]})})},U=c(37),E=function(e){var t=e.refreshUser,c=e.userObj,a=Object(l.f)(),s=Object(n.useState)(c.displayName),r=Object(i.a)(s,2),o=r[0],j=r[1],d=function(){var e=Object(b.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),c.displayName===o){e.next=4;break}return e.next=4,Object(U.i)(x.currentUser,{displayName:o}).then((function(){t()})).catch((function(e){}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsxs)("div",{className:"container",children:[Object(N.jsxs)("form",{onSubmit:d,className:"profileForm",children:[Object(N.jsx)("input",{onChange:function(e){var t=e.target.value;j(t)},type:"text",autoFocus:!0,placeholder:"Display name",value:o,className:"formInput"}),Object(N.jsx)("input",{type:"submit",value:"Update Profile",className:"formBtn",style:{marginTop:10}})]}),Object(N.jsx)("span",{className:"formBtn cancelBtn logOut",onClick:function(){Object(U.h)(x),a.push("/")},children:"Log Out"})]})},z=function(e){var t=e.userName,c=Object(n.useState)(!0),a=Object(i.a)(c,2),s=a[0],r=a[1],o=Object(n.useState)("".concat(t," click me :)")),l=Object(i.a)(o,2),j=l[0],u=l[1],b=["Don't dwell on the past","Believe in yourself","Seize the day","You only live once","Past is just past","Love yourself","Don't dream, Be it","No sweat, No sweet","Be brave","Good luck","Hang in there","Live positive","Time is gold","You deserve to be loved","Love what you do","Live live there is no tommorrow","Time waites for no one","Don't waste your youth","Life is all about timing","Rome is not built in a day"],d=function(){return r(!s)};return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("div",{className:"msg-container",children:[Object(N.jsx)("div",{className:"msgh",children:Object(N.jsx)("span",{children:"Message"})}),s?Object(N.jsx)("div",{className:"msgs",onClick:d,children:Object(N.jsxs)("div",{className:"chat",children:[Object(N.jsxs)("div",{style:{fontWeight:"bold",marginBottom:12},children:[Object(N.jsx)(g.a,{icon:D.h})," ","user"]}),Object(N.jsx)("span",{children:j})]})}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("div",{className:"back",onClick:d,children:s?"":"\u2190"}),Object(N.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:20},children:[Object(N.jsx)("div",{style:{marginRight:10},children:Object(N.jsx)(g.a,{icon:D.h,color:"black"})}),Object(N.jsx)("div",{className:"mymsg",onClick:function(){return u(b[Math.floor(Math.random()*b.length)])},children:Object(N.jsx)("span",{children:j})})]})]})]})})},A=function(e){var t=e.refreshUser,c=e.isLoggedIn,n=e.userObj;return Object(N.jsx)(o.a,{children:Object(N.jsx)(l.c,{children:Object(N.jsxs)(N.Fragment,{children:[c&&Object(N.jsx)(L,{userObj:n}),c?Object(N.jsxs)("div",{style:{width:"100%",margin:"0 auto",display:"flex",justifyContent:"center"},children:[Object(N.jsx)(l.a,{exact:!0,path:"/",children:Object(N.jsx)(_,{userObj:n})}),Object(N.jsx)(l.a,{exact:!0,path:"/profile",children:Object(N.jsx)(E,{userObj:n,refreshUser:t})}),Object(N.jsx)(l.a,{exact:!0,path:"/msg",children:Object(N.jsx)(z,{userName:n.displayName})})]}):Object(N.jsx)(N.Fragment,{children:Object(N.jsx)(l.a,{exact:!0,path:"/",children:Object(N.jsx)(S,{})})})]})})})};var P=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(null),r=Object(i.a)(s,2),o=r[0],l=r[1];return Object(n.useEffect)((function(){Object(O.e)(x,(function(e){e?l({email:e.email,displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}}):(console.log("not user",e),l(null)),a(!0)}))}),[]),Object(N.jsx)(N.Fragment,{children:c?Object(N.jsx)(A,{refreshUser:function(){var e=x.currentUser;console.log(x.currentUser.displayName),l({email:e.email,displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(o),userObj:o}):Object(N.jsx)("div",{children:"Initializing...."})})},T=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,72)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};c(68);r.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(P,{})}),document.getElementById("root")),T()}},[[69,1,2]]]);
//# sourceMappingURL=main.ae853d4b.chunk.js.map