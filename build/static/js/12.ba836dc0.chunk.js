(this["webpackJsonpswl-webapp"]=this["webpackJsonpswl-webapp"]||[]).push([[12],{340:function(e,t,r){"use strict";var a=r(98);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r(99)),i=r(5),o=(0,n.default)((0,i.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=o},381:function(e,t,r){"use strict";var a=r(15),n=r(13),i=r(4),o=r(1),c=r(22),l=r(264),s=r(26),d=r(18),u=r(139),b=r(19),m=r(138),f=r(101),j=r(133),h=r(193);function v(e){return Object(j.a)("MuiFormControl",e)}Object(h.a)("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);var p=r(5),O=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],g=Object(d.a)("div",{name:"MuiFormControl",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return Object(i.a)({},t.root,t["margin".concat(Object(b.a)(r.margin))],r.fullWidth&&t.fullWidth)}})((function(e){var t=e.ownerState;return Object(i.a)({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},"normal"===t.margin&&{marginTop:16,marginBottom:8},"dense"===t.margin&&{marginTop:8,marginBottom:4},t.fullWidth&&{width:"100%"})})),x=o.forwardRef((function(e,t){var r=Object(s.a)({props:e,name:"MuiFormControl"}),d=r.children,j=r.className,h=r.color,x=void 0===h?"primary":h,w=r.component,y=void 0===w?"div":w,N=r.disabled,C=void 0!==N&&N,S=r.error,W=void 0!==S&&S,z=r.focused,F=r.fullWidth,P=void 0!==F&&F,k=r.hiddenLabel,q=void 0!==k&&k,M=r.margin,E=void 0===M?"none":M,L=r.required,R=void 0!==L&&L,B=r.size,I=void 0===B?"medium":B,A=r.variant,D=void 0===A?"outlined":A,J=Object(n.a)(r,O),T=Object(i.a)({},r,{color:x,component:y,disabled:C,error:W,fullWidth:P,hiddenLabel:q,margin:E,required:R,size:I,variant:D}),_=function(e){var t=e.classes,r=e.margin,a=e.fullWidth,n={root:["root","none"!==r&&"margin".concat(Object(b.a)(r)),a&&"fullWidth"]};return Object(l.a)(n,v,t)}(T),G=o.useState((function(){var e=!1;return d&&o.Children.forEach(d,(function(t){if(Object(m.a)(t,["Input","Select"])){var r=Object(m.a)(t,["Select"])?t.props.input:t;r&&Object(u.a)(r.props)&&(e=!0)}})),e})),H=Object(a.a)(G,2),K=H[0],Q=H[1],U=o.useState((function(){var e=!1;return d&&o.Children.forEach(d,(function(t){Object(m.a)(t,["Input","Select"])&&Object(u.b)(t.props,!0)&&(e=!0)})),e})),V=Object(a.a)(U,2),X=V[0],Y=V[1],Z=o.useState(!1),$=Object(a.a)(Z,2),ee=$[0],te=$[1];C&&ee&&te(!1);var re=void 0===z||C?ee:z,ae=o.useCallback((function(){Y(!0)}),[]),ne={adornedStart:K,setAdornedStart:Q,color:x,disabled:C,error:W,filled:X,focused:re,fullWidth:P,hiddenLabel:q,size:I,onBlur:function(){te(!1)},onEmpty:o.useCallback((function(){Y(!1)}),[]),onFilled:ae,onFocus:function(){te(!0)},registerEffect:undefined,required:R,variant:D};return Object(p.jsx)(f.a.Provider,{value:ne,children:Object(p.jsx)(g,Object(i.a)({as:y,ownerState:T,className:Object(c.a)(_.root,j),ref:t},J,{children:d}))})}));t.a=x},460:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r(9),i=r(15),o=r(1),c=r.n(o),l=r(20),s=r(141),d=r(80),u=r(381),b=r(323),m=r(320),f=r(321),j=r(324),h=r(340),v=r.n(h),p=r(134),O=r(97),g=r(121),x=r(35),w=r(5),y=function(){var e=c.a.useState(!1),t=Object(i.a)(e,2),r=t[0],o=t[1],h=c.a.useState(""),y=Object(i.a)(h,2),N=y[0],C=y[1],S=Object(d.b)(),W=Object(l.n)(),z=function(){return o(!1)},F=function(){var e=Object(n.a)(Object(a.a)().mark((function e(){var t,r,n;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new s.a("request-otp",{size:"normal"},p.c),r="+91".concat(N),e.next=4,Object(s.c)(p.c,r,t);case 4:n=e.sent,S(Object(g.b)(n)),W(x.a.verifyPage,{state:{phoneNumber:N,isForgotPasswordPage:!0}});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"signup-page-inside d-flex flex-column align-center p-24",children:[Object(w.jsxs)("div",{className:"w-100 h-100 d-flex flex-column justify-between",children:[Object(w.jsxs)("div",{className:"relative index-1",children:[Object(w.jsx)("div",{children:Object(w.jsx)("h1",{className:"f-28 f-w-700 l-h-normal txt-primary mb-24",children:"Forgot Password"})}),Object(w.jsxs)(u.a,{variant:"outlined",fullWidth:!0,className:"mb-16",children:[Object(w.jsx)("label",{className:"form-label",children:"Phone number or email"}),Object(w.jsx)(O.e,{id:"outlined-adornment-weight",placeholder:"ex: +1 44423847384",value:N,onChange:function(e){return C(e.target.value)}})]})]}),Object(w.jsx)("div",{children:Object(w.jsx)(b.a,{variant:"contained",color:"primary",size:"large",fullWidth:!0,disabled:!N,onClick:function(){return o(!0)},children:"Submit"})})]}),Object(w.jsx)(m.a,{onClose:z,"aria-labelledby":"customized-dialog-title",className:"forgot-password-modal",open:r,children:Object(w.jsxs)(f.a,{children:[Object(w.jsx)(j.a,{onClick:z,"aria-label":"close",className:"mb-24",children:Object(w.jsx)(v.a,{className:"f-24 txt-secondary"})}),Object(w.jsx)("p",{className:"f-18 f-w-700 l-h-normal txt-primary mb-12",children:"Forgot Password"}),Object(w.jsx)("p",{className:"f-14 f-w-500 l-h-22 txt-primary mb-32",children:"In order to reset your Password we need to verify this request with your mobile device!"}),Object(w.jsx)("div",{id:"request-otp"}),Object(w.jsx)(b.a,{onClick:F,variant:"contained",color:"primary",size:"large",fullWidth:!0,children:"Request Code"})]})})]})};t.default=c.a.memo(y)}}]);
//# sourceMappingURL=12.ba836dc0.chunk.js.map