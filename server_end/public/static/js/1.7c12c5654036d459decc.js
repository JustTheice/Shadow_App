webpackJsonp([1],{"1kS7":function(t,e){e.f=Object.getOwnPropertySymbols},BW5I:function(t,e){},Dd8w:function(t,e,s){"use strict";e.__esModule=!0;var n,o=s("woOf"),a=(n=o)&&n.__esModule?n:{default:n};e.default=a.default||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t}},Ey6P:function(t,e){},NpIQ:function(t,e){e.f={}.propertyIsEnumerable},PaqO:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("Dd8w"),o=s.n(n),a=s("3Zko"),i=s("Au9i"),r=s("HZZI"),c={props:["shows"],mounted:function(){var t=this;Object(r.a)().then(function(e){0===e.code&&t.$store.dispatch("saveUser",{userInfo:e.data})},function(t){console.log("自动登陆失败"+t)})},computed:{},data:function(){return{type:"pwd",pwdData:{name:"",pwd:"",imgCode:""},phoneData:{phone:"",imgCode:"",phoneCode:""},imgCodeSrc:"http://192.168.2.104:5000/getImgCode?"+Date.now(),codeCount:0}},methods:{login:function(){var t=this,e=this.type,s=this.pwdData,n=this.phoneData,o=void 0;if("pwd"==e){var a=s.name,c=s.pwd,l=s.imgCode;if(!a)return Object(i.MessageBox)("格式错误","用户名不能为空");if(!c)return Object(i.MessageBox)("格式错误","密码不能为空");if(4!=l.length)return Object(i.MessageBox)("格式错误","图片验证码只能是4位");o={type:"pwd",data:{name:a,pwd:c,imgCode:l}}}else if(e="phone"){var d=n.phone,u=n.phoneCode;if(!/^1\d{10}$/.test(d))return Object(i.MessageBox)("格式错误","手机号格式错误且仅支持中国大陆号");if(6!=u.length)return Object(i.MessageBox)("格式错误","短信验证码只能是6位");o={type:"phone",data:{phone:d,phoneCode:u}}}Object(r.c)(o).then(function(e){0===e.code?(t.$store.dispatch("saveUser",{userInfo:e.data}),Object(i.MessageBox)("验证消息","登录成功"),t.shows.login=!1):1!==e.code&&2!==e.code||(Object(i.MessageBox)("验证消息",e.msg),1===e.code&&t.getImgCode())},function(t){console.log(t)})},getImgCode:function(){this.imgCodeSrc="http://192.168.2.104:5000/getImgCode?"+Date.now()},getPhoneCode:function(){var t=this;if(!/^1\d{10}$/.test(this.phoneData.phone))return Object(i.MessageBox)("格式错误","手机号格式错误且仅支持中国大陆号");Object(r.d)(this.phoneData.phone).then(function(t){},function(t){}),this.codeCount=30;var e=setInterval(function(){t.codeCount--,0===t.codeCount&&clearInterval(e)},1e3)}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{ref:"wrap",attrs:{id:"login"}},[s("div",{staticClass:"back iconfont icon-back",on:{click:function(e){t.shows.login=!1}}}),t._v(" "),s("div",{attrs:{id:"container"}},[s("div",{staticClass:"type"},[s("h3",{on:{click:function(e){t.type="pwd"}}},[t._v("密码登录")]),t._v(" "),s("h3",{on:{click:function(e){t.type="phone"}}},[t._v("手机登录")]),t._v(" "),s("div",{staticClass:"slide",style:{left:"pwd"==t.type?".5rem":"6.5rem"}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"pwd"==t.type,expression:"type=='pwd'"}],staticClass:"pwd"},[s("mt-field",{attrs:{label:"用户名",placeholder:"昵称/手机号"},model:{value:t.pwdData.name,callback:function(e){t.$set(t.pwdData,"name",e)},expression:"pwdData.name"}}),t._v(" "),s("mt-field",{attrs:{label:"密码",placeholder:"密码",type:"password"},model:{value:t.pwdData.pwd,callback:function(e){t.$set(t.pwdData,"pwd",e)},expression:"pwdData.pwd"}}),t._v(" "),s("mt-field",{attrs:{label:"验证码",placeholder:"不分大小写",type:"text"},model:{value:t.pwdData.imgCode,callback:function(e){t.$set(t.pwdData,"imgCode",e)},expression:"pwdData.imgCode"}},[s("img",{staticClass:"img-code",attrs:{src:t.imgCodeSrc,alt:"验证码"},on:{click:t.getImgCode}})]),t._v(" "),s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:function(e){return t.login()}}},[t._v("注册/登录")])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"phone"==t.type,expression:"type=='phone'"}],staticClass:"phone"},[s("mt-field",{attrs:{label:"手机号",placeholder:"仅支持中国大陆",type:"tel"},model:{value:t.phoneData.phone,callback:function(e){t.$set(t.phoneData,"phone",e)},expression:"phoneData.phone"}},[s("mt-button",{directives:[{name:"show",rawName:"v-show",value:!t.codeCount,expression:"!codeCount"}],attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.getPhoneCode(e)}}},[t._v("获取")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.codeCount,expression:"codeCount"}]},[t._v(t._s(t.codeCount)+"s")])],1),t._v(" "),s("mt-field",{attrs:{label:"验证码",placeholder:"短信验证码",type:"password"},model:{value:t.phoneData.phoneCode,callback:function(e){t.$set(t.phoneData,"phoneCode",e)},expression:"phoneData.phoneCode"}}),t._v(" "),s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:t.login}},[t._v("注册/登录")])],1)])])},staticRenderFns:[]};var d=s("VU/8")(c,l,!1,function(t){s("QY4C")},null,null).exports,u={props:["shows","userId"],data:function(){return{fontLv:2,pwds:{oldPwd:"",newPwd:""}}},watch:{fontLv:function(t){this.$store.dispatch("updateSize",{newV:t})}},methods:{changePwd:function(){var t=this.pwds,e=t.oldPwd,s=t.newPwd;e==s&&Object(i.MessageBox)("提示","新旧密码相同"),Object(r.g)({oldPwd:e,newPwd:s}).then(function(t){Object(i.MessageBox)("提示",t.msg)},function(t){Object(i.MessageBox)("","请稍后再试")})},logout:function(){var t=this;i.MessageBox.confirm("确定要退出登录？").then(function(e){t.$store.dispatch("saveUser",{userInfo:{}}),t.shows.setting=!1})},signout:function(){i.MessageBox.confirm("注销后账号不可找回，三思而后行").then(function(t){return i.MessageBox.confirm("确定要注销吗？")}).then(function(t){return Object(r.e)()}).then(function(t){Object(i.MessageBox)("提示","注销成功")},function(t){console.log("请求失败"+t)})}}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{attrs:{id:"setting"}},[s("div",{staticClass:"back iconfont icon-back",on:{click:function(e){t.shows.setting=!1}}}),t._v(" "),s("div",{staticClass:"font-setting"},[s("h3",{staticClass:"adjust",style:{"font-size":t.$store.state.settings.adjustSize+"rem"}},[t._v("字体大小")]),t._v(" "),s("div",{staticClass:"right"},[s("mt-range",{attrs:{min:1,max:4,value:"2"},model:{value:t.fontLv,callback:function(e){t.fontLv=e},expression:"fontLv"}},[s("div",{staticStyle:{"font-size":".5rem"},attrs:{slot:"start"},slot:"start"},[t._v("小")]),t._v(" "),s("div",{staticStyle:{"font-size":"1.5rem"},attrs:{slot:"end"},slot:"end"},[t._v("大")])])],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.userId,expression:"userId"}],staticClass:"change-pwd"},[s("h3",[t._v("修改密码")]),t._v(" "),s("mt-field",{attrs:{label:"旧密码",placeholder:"请输入旧密码",type:"password"},model:{value:t.pwds.oldPwd,callback:function(e){t.$set(t.pwds,"oldPwd",e)},expression:"pwds.oldPwd"}}),t._v(" "),s("mt-field",{attrs:{label:"新密码",placeholder:"请输入新密码",type:"password"},model:{value:t.pwds.newPwd,callback:function(e){t.$set(t.pwds,"newPwd",e)},expression:"pwds.newPwd"}}),t._v(" "),s("mt-button",{attrs:{size:"large",type:"primary"},on:{click:t.changePwd}},[t._v("确认修改")])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.userId,expression:"userId"}],staticClass:"logout"},[s("mt-button",{attrs:{size:"large",type:"danger"},on:{click:t.logout}},[t._v("退出账号")])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.userId,expression:"userId"}],staticClass:"logoff"},[s("mt-button",{attrs:{size:"large",type:"danger"},on:{click:t.signout}},[t._v("注销账号")])],1)])},staticRenderFns:[]};var p=s("VU/8")(u,f,!1,function(t){s("BW5I")},null,null).exports,v=s("NYxO"),h={props:["shows"],data:function(){return{}},computed:o()({},Object(v.b)(["userInfo"])),methods:{sendChange:function(){var t=this;Object(r.f)(this.userInfo).then(function(e){Object(i.MessageBox)("","修改成功"),t.shows.userInfo=!1},function(t){Object(i.MessageBox)("","修改失败，请稍后再试"),console.log("发送失败"+t)})}}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{attrs:{id:"user-info"}},[s("div",{staticClass:"top"},[s("div",{staticClass:"back iconfont icon-back",on:{click:function(e){t.shows.userInfo=!1}}}),t._v(" "),s("h2",[t._v("个人信息")])]),t._v(" "),s("form",{attrs:{action:"/"}},[s("mt-field",{attrs:{label:"昵称",placeholder:"请输入用户名"},model:{value:t.userInfo.name,callback:function(e){t.$set(t.userInfo,"name",e)},expression:"userInfo.name"}}),t._v(" "),s("mt-field",{attrs:{label:"爱好"},model:{value:t.userInfo.hobbies,callback:function(e){t.$set(t.userInfo,"hobbies",e)},expression:"userInfo.hobbies"}}),t._v(" "),s("mt-field",{attrs:{label:"生日",placeholder:"请输入生日",type:"date"},model:{value:t.userInfo.birthday,callback:function(e){t.$set(t.userInfo,"birthday",e)},expression:"userInfo.birthday"}}),t._v(" "),s("mt-field",{attrs:{label:"自我介绍",type:"textarea",rows:"4"},model:{value:t.userInfo.introduction,callback:function(e){t.$set(t.userInfo,"introduction",e)},expression:"userInfo.introduction"}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo._id,expression:"userInfo._id"}],attrs:{type:"hidden"},domProps:{value:t.userInfo._id},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"_id",e.target.value)}}}),t._v(" "),s("mt-button",{attrs:{type:"default",size:"large"},on:{click:function(e){return e.preventDefault(),t.sendChange(e)}}},[t._v("确认修改")])],1)])},staticRenderFns:[]};var w=s("VU/8")(h,m,!1,function(t){s("f+AD")},null,null).exports,g={props:["shows"],mounted:function(){var t=this;this.$refs.content.style.height=this.$refs.score.offsetHeight-this.$refs.top.offsetHeight-this.$refs.mid.offsetHeight+"px",this.$refs.rank.style.height=this.$refs.content.clientHeight-this.$refs.type.offsetHeight+"px",this.$refs.prize.style.height=this.$refs.content.clientHeight-this.$refs.type.offsetHeight+"px",Object(r.b)().then(function(e){t.ranks=e},function(t){console.log(t)})},data:function(){return{type:0,ranks:[]}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{ref:"score",attrs:{id:"score"}},[n("div",{ref:"top",staticClass:"top"},[n("div",{staticClass:"back iconfont icon-back",on:{click:function(e){t.shows.score=!1}}}),t._v(" "),n("h2",[t._v("积分")])]),t._v(" "),n("div",{ref:"mid",staticClass:"mid"},[n("p",[t._v(t._s(t.$store.state.userInfo._id?"当前积分："+t.$store.state.userInfo.integral:"请先登录"))])]),t._v(" "),n("div",{ref:"content",staticClass:"content"},[n("div",{ref:"type",staticClass:"type"},[n("h3",{class:{active:0===t.type},on:{click:function(e){t.type=0}}},[t._v("排行榜")]),t._v(" "),n("h3",{class:{active:1===t.type},on:{click:function(e){t.type=1}}},[t._v("积分兑奖")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:0===t.type,expression:"type===0"}],ref:"rank",staticClass:"rank"},[n("ul",t._l(t.ranks,function(e,o){return n("li",{key:o},[n("span",{staticClass:"rank-place"},[t._v(t._s(o+1))]),t._v(" "),n("img",{attrs:{src:s("Pyv7"),alt:"头像"}}),t._v(" "),n("span",{staticClass:"rank-name"},[t._v(t._s(e.name))]),t._v(" "),n("span",{staticClass:"rank-score"},[t._v(t._s(e.integral))])])}),0)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"type===1"}],ref:"prize",staticClass:"prize"},[t._m(0)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("img",{attrs:{alt:"暂无"}}),t._v(" "),s("div",{staticClass:"right"},[s("span",{staticClass:"prize-name"},[t._v("虚空之物")]),t._v(" "),s("span",{staticClass:"description"},[t._v("此物源于虚空不作多言")]),t._v(" "),s("div",[s("span",{staticClass:"prize-left"},[t._v("还剩-1件")]),t._v(" "),s("a",{attrs:{href:"javascript:;"}},[t._v("兑换")])])])])])}]};var b=s("VU/8")(g,_,!1,function(t){s("Yxvz")},null,null).exports,y={components:{HeaderTop:a.a,Login:d,Setting:p,UserInfo:w,Score:b},data:function(){return{shows:{login:!1,setting:!1,userInfo:!1,score:!1}}},computed:o()({},Object(v.b)(["userInfo"])),mounted:function(){window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",this.backFn,!1))},methods:{backFn:function(){for(var t in this.shows)!0===this.shows.key&&(this.shows.key=!1)}},destroyed:function(){window.removeEventListener("popstate",this.backFn,!1)}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{attrs:{id:"profile"}},[s("HeaderTop",{attrs:{title:"个人信息"}}),t._v(" "),s("div",{attrs:{id:"info"}},[t._m(0),t._v(" "),s("div",{staticClass:"right"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.userInfo._id,expression:"!userInfo._id"}],staticClass:"not-login",on:{click:function(e){t.shows.login=!0}}},[s("p",[t._v("登陆/注册>>")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.userInfo._id,expression:"userInfo._id"}],staticClass:"logined",on:{click:function(e){t.shows.userInfo=!0}}},[s("div",{staticClass:"lv"},[s("span",[t._v("LV"+t._s(t.userInfo.lv))]),t._v(" "),s("span",[t._v("弟中弟")])]),t._v(" "),s("p",{staticClass:"name"},[s("strong",[t._v(t._s(t.userInfo.name))])]),t._v(" "),s("p",[t._v("今日未签到")])])])]),t._v(" "),s("div",{attrs:{id:"cells"}},[s("mt-cell",{attrs:{title:"我的积分","is-link":""},nativeOn:{click:function(e){t.shows.score=!0}}},[s("span",{staticClass:"iconfont icon-score",attrs:{slot:"icon"},slot:"icon"})]),t._v(" "),s("mt-cell",{attrs:{title:"设置","is-link":"",to:"javascript:;"},nativeOn:{click:function(e){t.shows.setting=!0}}},[s("span",{staticClass:"iconfont icon-setting",attrs:{slot:"icon"},slot:"icon"})])],1),t._v(" "),s("Login",{style:{transform:t.shows.login?"translateX(0)":"translateX(100%)"},attrs:{shows:t.shows}}),t._v(" "),s("Setting",{style:{transform:t.shows.setting?"translateX(0)":"translateX(100%)"},attrs:{shows:t.shows,userId:t.userInfo._id}}),t._v(" "),s("UserInfo",{style:{transform:t.shows.userInfo?"translateX(0)":"translateX(100%)"},attrs:{shows:t.shows}}),t._v(" "),s("Score",{style:{transform:t.shows.score?"translateX(0)":"translateX(100%)"},attrs:{shows:t.shows}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"avatar"},[e("img",{attrs:{src:s("koce")}})])}]};var k=s("VU/8")(y,C,!1,function(t){s("Ey6P")},null,null);e.default=k.exports},Pyv7:function(t,e,s){t.exports=s.p+"static/img/avatar.94fe46d.png"},QY4C:function(t,e){},R4wc:function(t,e,s){var n=s("kM2E");n(n.S+n.F,"Object",{assign:s("To3L")})},To3L:function(t,e,s){"use strict";var n=s("+E39"),o=s("lktj"),a=s("1kS7"),i=s("NpIQ"),r=s("sB3e"),c=s("MU5D"),l=Object.assign;t.exports=!l||s("S82l")(function(){var t={},e={},s=Symbol(),n="abcdefghijklmnopqrst";return t[s]=7,n.split("").forEach(function(t){e[t]=t}),7!=l({},t)[s]||Object.keys(l({},e)).join("")!=n})?function(t,e){for(var s=r(t),l=arguments.length,d=1,u=a.f,f=i.f;l>d;)for(var p,v=c(arguments[d++]),h=u?o(v).concat(u(v)):o(v),m=h.length,w=0;m>w;)p=h[w++],n&&!f.call(v,p)||(s[p]=v[p]);return s}:l},V3tA:function(t,e,s){s("R4wc"),t.exports=s("FeBl").Object.assign},Yxvz:function(t,e){},"f+AD":function(t,e){},koce:function(t,e,s){t.exports=s.p+"static/img/avatar.94fe46d.png"},woOf:function(t,e,s){t.exports={default:s("V3tA"),__esModule:!0}}});
//# sourceMappingURL=1.7c12c5654036d459decc.js.map