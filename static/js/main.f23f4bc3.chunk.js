(this.webpackJsonpswitter=this.webpackJsonpswitter||[]).push([[0],{68:function(e,t,c){},69:function(e,t,c){"use strict";c.r(t);var a=c(10),n=c.n(a),s=c(50),r=c.n(s),i=c(11),o=c(31),l=c(15),j=c(0),u=c.n(j),b=c(1),d=c(51),O=c(28),m=c(18),h=c(52);Object(d.a)({apiKey:"AIzaSyBOtqn8Rj-gLsv9CJm8F3dZKXyhey4x9Zw",authDomain:"switter-b2db8.firebaseapp.com",projectId:"switter-b2db8",storageBucket:"switter-b2db8.appspot.com",messagingSenderId:"132047093499",appId:"1:132047093499:web:315645c2fe687228ab3a5e"});var x=Object(O.d)(),f=Object(m.e)(),p=Object(h.a)(),v=c(16),g=c(36),y=c(4),N=c(39),w=c(5),k=function(){var e=Object(a.useState)({email:"",password:""}),t=Object(i.a)(e,2),c=t[0],n=t[1],s=c.email,r=c.password,o=Object(a.useState)(""),l=Object(i.a)(o,2),j=l[0],d=l[1],m=Object(a.useState)(!0),h=Object(i.a)(m,2),f=h[0],p=h[1],v=function(e){var t=e.target,a=t.name,s=t.value;n(Object(N.a)(Object(N.a)({},c),{},Object(y.a)({},a,s)))},g=function(){var e=Object(b.a)(u.a.mark((function e(t){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!f){e.next=8;break}return e.next=5,Object(O.c)(x,s,r);case 5:c=e.sent,e.next=11;break;case 8:return e.next=10,Object(O.f)(x,s,r);case 10:c=e.sent;case 11:console.log("Auth data",c),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),a=e.t0.message,d(a);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("form",{onSubmit:g,className:"container",children:[Object(w.jsx)("input",{name:"email",type:"email",placeholder:"Email",required:!0,value:s,onChange:v,className:"authInput"}),Object(w.jsx)("input",{name:"password",type:"password",placeholder:"Password",required:!0,value:r,onChange:v,className:"authInput"}),Object(w.jsx)("input",{type:"submit",className:"authInput authSubmit",value:f?"Create Account":"Sign In"}),j&&Object(w.jsx)("span",{className:"authError",children:j})]}),Object(w.jsx)("span",{onClick:function(){p((function(e){return!e}))},className:"authSwitch",children:f?"Sign In":"Create Account"})]})},C=function(){var e=function(){var e=Object(b.a)(u.a.mark((function e(t){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=t.target.name,e.prev=1,"google"!==c){e.next=8;break}return a=new O.b,e.next=6,Object(O.g)(x,a);case 6:e.next=12;break;case 8:if("github"!==c){e.next=12;break}return a=new O.a,e.next=12,Object(O.g)(x,a);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"authContainer",children:[Object(w.jsx)(v.a,{icon:g.c,color:"#000",size:"3x",style:{marginBottom:30}}),Object(w.jsx)(k,{}),Object(w.jsxs)("div",{className:"authBtns",children:[Object(w.jsxs)("button",{onClick:e,name:"google",className:"authBtn",children:["Continue with Google"," ",Object(w.jsx)(v.a,{icon:g.b,color:"#fff",style:{marginLeft:2}})]}),Object(w.jsxs)("button",{onClick:e,name:"github",className:"authBtn",children:["Continue with Github"," ",Object(w.jsx)(v.a,{icon:g.a,color:"#fff",style:{marginLeft:2}})]})]})]})},S=c(29),I=c(23),D=function(e){var t=e.sweetObj,c=e.isOwner,n=Object(a.useState)(!1),s=Object(i.a)(n,2),r=s[0],o=s[1],l=Object(a.useState)(t.text),j=Object(i.a)(l,2),d=j[0],O=j[1],h=function(){var e=Object(b.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete this sweet?")){e.next=8;break}return e.next=4,Object(m.c)(Object(m.d)(f,"sweets/".concat(t.id)));case 4:return e.next=6,Object(m.c)(Object(m.d)(f,"sweets/".concat(t.id)));case 6:return e.next=8,Object(S.a)(Object(S.d)(p,t.attachmentUrl));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){return o((function(e){return!e}))},g=function(){var e=Object(b.a)(u.a.mark((function e(c){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.preventDefault(),console.log("sweetObj",t,"/ newSweet",d),e.next=4,Object(m.i)(Object(m.d)(f,"sweets/".concat(t.id)),{text:d});case 4:o(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)("div",{className:"sweet",children:r?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("form",{onSubmit:g,className:"container sweetEdit",children:[Object(w.jsx)("input",{type:"text",placeholder:"Edit your sweet",value:d,required:!0,autoFocus:!0,onChange:function(e){var t=e.target.value;return O(t)},className:"formInput"}),Object(w.jsx)("input",{type:"submit",value:"Update Sweet",className:"formBtn"})]}),Object(w.jsx)("span",{onClick:x,className:"formBtn cancelBtn",children:"Cancel"})]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("div",{className:"hello",children:[Object(w.jsxs)("div",{className:"info",children:[Object(w.jsx)("span",{style:{fontWeight:"bold",marginRight:4},children:t.dName||"\u2665"}),Object(w.jsx)("span",{style:{color:"gray",fontSize:10,fontWeight:400},children:function(){var e=new Date(t.createdAt).getMonth()+1,c=new Date(t.createdAt).getDate();return"".concat(e,".").concat(c)}()})]}),c&&Object(w.jsxs)("div",{className:"sweet__actions",children:[Object(w.jsx)("span",{onClick:h,children:Object(w.jsx)(v.a,{icon:I.g})}),Object(w.jsx)("span",{onClick:x,children:Object(w.jsx)(v.a,{icon:I.d})})]})]}),Object(w.jsx)("span",{className:"sweet__text",children:t.text}),t.attachmentUrl&&Object(w.jsx)("img",{alt:"img",src:t.attachmentUrl})]})})},F=c(71),B=function(e){var t=e.userObj,c=Object(a.useState)(""),n=Object(i.a)(c,2),s=n[0],r=n[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),j=l[0],d=l[1],O=function(){var e=Object(b.a)(u.a.mark((function e(c){var a,n,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==s){e.next=2;break}return e.abrupt("return");case 2:if(c.preventDefault(),a="",""===j){e.next=13;break}return n=Object(S.d)(p,"".concat(t.uid,"/").concat(Object(F.a)())),e.next=8,Object(S.e)(n,j,"data_url");case 8:return i=e.sent,console.log(i),e.next=12,Object(S.b)(i.ref);case 12:a=e.sent;case 13:return o={text:s,createdAt:Date.now(),creatorId:t.uid,attachmentUrl:a,dName:t.displayName,email:t.email},e.next=16,Object(m.a)(Object(m.b)(f,"sweets"),o);case 16:r(""),d("");case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("form",{onSubmit:O,className:"factoryForm",children:[Object(w.jsxs)("div",{className:"factoryInput__container",children:[Object(w.jsx)("input",{className:"factoryInput__input",value:s,onChange:function(e){var t=e.target.value;r(t)},type:"text",placeholder:"What sweet thoughts are you thinking of?",maxLength:120}),Object(w.jsx)("input",{type:"submit",value:"\u2192",className:"factoryInput__arrow",onSubmit:onsubmit})]}),Object(w.jsxs)("label",{htmlFor:"attach-file",className:"factoryInput__label",children:[Object(w.jsx)("span",{children:"Add photos"}),Object(w.jsx)(v.a,{icon:I.e})]}),Object(w.jsx)("input",{id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],c=new FileReader;c.onloadend=function(e){var t=e.currentTarget.result;d(t)},c.readAsDataURL(t)},style:{opacity:0}}),j&&Object(w.jsxs)("div",{className:"factoryForm__attachment",children:[Object(w.jsx)("img",{alt:"img",src:j,style:{backgroundImage:j}}),Object(w.jsxs)("div",{className:"factoryForm__clear",onClick:function(){return d("")},children:[Object(w.jsx)("span",{children:"Remove"}),Object(w.jsx)(v.a,{icon:I.f})]})]})]})},_=function(e){var t=e.userObj,c=Object(a.useState)([]),n=Object(i.a)(c,2),s=n[0],r=n[1];return Object(a.useEffect)((function(){var e=Object(m.h)(Object(m.b)(Object(m.e)(),"sweets"),Object(m.g)("createdAt","desc")),t=Object(m.f)(e,(function(e){var t=e.docs.map((function(e){return Object(N.a)({id:e.id},e.data())}));r(t)}));return function(){t()}}),[]),Object(w.jsxs)("div",{className:"container",children:[Object(w.jsx)(B,{userObj:t}),Object(w.jsx)("div",{style:{marginTop:30},children:s.map((function(e){return Object(w.jsx)(D,{userObj:t,sweetObj:e,isOwner:e.creatorId===t.uid},e.id)}))})]})},L=function(e){var t=e.userObj;return Object(w.jsx)("nav",{children:Object(w.jsxs)("ul",{style:{display:"flex",justifyContent:"center"},children:[Object(w.jsx)("li",{className:"logo",children:Object(w.jsxs)(o.b,{to:"/",className:"navlink",activeClassName:"",children:[Object(w.jsx)(v.a,{icon:g.c,size:"2x",color:"#E05D5D"}),Object(w.jsx)("span",{children:"\u2665"})]})}),Object(w.jsx)("li",{className:"home",children:Object(w.jsxs)(o.b,{to:"/",className:"navlink",activeClassName:"",children:[Object(w.jsx)(v.a,{icon:I.c,size:"2x",color:"#E05D5D"}),Object(w.jsx)("span",{children:"home"})]})}),Object(w.jsx)("li",{className:"profile",children:Object(w.jsxs)(o.b,{className:"navlink",activeClassName:"",to:"/profile",children:[Object(w.jsx)(v.a,{icon:I.h,size:"2x"}),Object(w.jsx)("span",{children:t.displayName?"".concat(t.displayName):"\u2665"})]})}),Object(w.jsx)("li",{className:"msg",children:Object(w.jsxs)(o.b,{to:"/msg",className:"navlink",activeClassName:"active",children:[Object(w.jsx)(v.a,{icon:I.b,size:"2x",color:"#E05D5D"}),Object(w.jsx)("span",{children:"+1"})]})}),Object(w.jsx)("li",{className:"more",children:Object(w.jsx)(v.a,{icon:I.a,size:"2x",color:"#E05D5D"})})]})})},U=c(37),A=function(e){var t=e.refreshUser,c=e.userObj,n=Object(l.f)(),s=Object(a.useState)(c.displayName),r=Object(i.a)(s,2),o=r[0],j=r[1],d=function(){var e=Object(b.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),c.displayName===o){e.next=4;break}return e.next=4,Object(U.i)(x.currentUser,{displayName:o}).then((function(){t()})).catch((function(e){}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"container",children:[Object(w.jsxs)("form",{onSubmit:d,className:"profileForm",children:[Object(w.jsx)("input",{onChange:function(e){var t=e.target.value;j(t)},type:"text",autoFocus:!0,placeholder:"Display name",value:o||"",className:"formInput"}),Object(w.jsx)("input",{type:"submit",value:"Update Profile",className:"formBtn",style:{marginTop:10}})]}),Object(w.jsx)("span",{className:"formBtn logOut",onClick:function(){Object(U.h)(x),n.push("/")},children:"Log Out"})]})},E=function(e){var t=e.userName,c=Object(a.useState)(!0),n=Object(i.a)(c,2),s=n[0],r=n[1],o=Object(a.useState)("".concat(t||"hey"," click me :)")),l=Object(i.a)(o,2),j=l[0],u=l[1],b=["Don't dwell on the past","Believe in yourself","Seize the day","You only live once","Past is just past","Love yourself","Don't dream, Be it","No sweat, No sweet","Be brave","Good luck","Hang in there","Live positive","Time is gold","You deserve to be loved","Love what you do","Live live there is no tommorrow","Time waites for no one","Don't waste your youth","Life is all about timing","Rome is not built in a day"],d=function(){return r(!s)};return Object(w.jsx)("div",{className:"container",children:Object(w.jsxs)("div",{className:"msg-container",children:[Object(w.jsx)("div",{className:"msgh",children:Object(w.jsx)("span",{children:"Message"})}),s?Object(w.jsx)("div",{className:"msgs",onClick:d,children:Object(w.jsxs)("div",{className:"chat",children:[Object(w.jsxs)("div",{style:{fontWeight:"bold",marginBottom:12},children:[Object(w.jsx)(v.a,{icon:I.h})," ","user"]}),Object(w.jsx)("span",{children:j})]})}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("div",{className:"back",onClick:d,children:s?"":"\u2190"}),Object(w.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:20},children:[Object(w.jsx)("div",{style:{marginRight:10},children:Object(w.jsx)(v.a,{icon:I.h,color:"black"})}),Object(w.jsx)("div",{className:"mymsg",onClick:function(){return u(b[Math.floor(Math.random()*b.length)])},children:Object(w.jsx)("span",{children:j})})]})]})]})})},z=function(e){var t=e.refreshUser,c=e.isLoggedIn,a=e.userObj;return Object(w.jsx)(o.a,{children:Object(w.jsx)(l.c,{children:Object(w.jsxs)(w.Fragment,{children:[c&&Object(w.jsx)(L,{userObj:a}),c?Object(w.jsxs)("div",{style:{width:"100%",margin:"0 auto",display:"flex",justifyContent:"center"},children:[Object(w.jsx)(l.a,{exact:!0,path:"/",children:Object(w.jsx)(_,{userObj:a})}),Object(w.jsx)(l.a,{exact:!0,path:"/profile",children:Object(w.jsx)(A,{userObj:a,refreshUser:t})}),Object(w.jsx)(l.a,{exact:!0,path:"/msg",children:Object(w.jsx)(E,{userName:a.displayName})})]}):Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(l.a,{exact:!0,path:"/",children:Object(w.jsx)(C,{})})})]})})})};var P=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),c=t[0],n=t[1],s=Object(a.useState)(null),r=Object(i.a)(s,2),o=r[0],l=r[1];return Object(a.useEffect)((function(){Object(O.e)(x,(function(e){e?l({email:e.email,displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}}):(console.log("not user",e),l(null)),n(!0)}))}),[]),Object(w.jsx)(w.Fragment,{children:c?Object(w.jsx)(z,{refreshUser:function(){var e=x.currentUser;console.log(x.currentUser.displayName),l({email:e.email,displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(o),userObj:o}):Object(w.jsx)("div",{children:"Initializing...."})})},R=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,72)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),a(e),n(e),s(e),r(e)}))};c(68);r.a.render(Object(w.jsx)(n.a.StrictMode,{children:Object(w.jsx)(P,{})}),document.getElementById("root")),R()}},[[69,1,2]]]);
//# sourceMappingURL=main.f23f4bc3.chunk.js.map