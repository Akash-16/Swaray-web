(this["webpackJsonpswl-webapp"]=this["webpackJsonpswl-webapp"]||[]).push([[16],{381:function(e,t,n){"use strict";var r=n(15),o=n(13),a=n(4),u=n(1),i=n(22),c=n(264),l=n(26),s=n(18),p=n(139),f=n(19),d=n(138),h=n(101),v=n(133),y=n(193);function b(e){return Object(v.a)("MuiFormControl",e)}Object(y.a)("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);var m=n(5),g=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],O=Object(s.a)("div",{name:"MuiFormControl",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return Object(a.a)({},t.root,t["margin".concat(Object(f.a)(n.margin))],n.fullWidth&&t.fullWidth)}})((function(e){var t=e.ownerState;return Object(a.a)({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},"normal"===t.margin&&{marginTop:16,marginBottom:8},"dense"===t.margin&&{marginTop:8,marginBottom:4},t.fullWidth&&{width:"100%"})})),I=u.forwardRef((function(e,t){var n=Object(l.a)({props:e,name:"MuiFormControl"}),s=n.children,v=n.className,y=n.color,I=void 0===y?"primary":y,j=n.component,S=void 0===j?"div":j,w=n.disabled,C=void 0!==w&&w,P=n.error,k=void 0!==P&&P,D=n.focused,N=n.fullWidth,x=void 0!==N&&N,A=n.hiddenLabel,F=void 0!==A&&A,E=n.margin,W=void 0===E?"none":E,M=n.required,V=void 0!==M&&M,_=n.size,R=void 0===_?"medium":_,L=n.variant,B=void 0===L?"outlined":L,T=Object(o.a)(n,g),q=Object(a.a)({},n,{color:I,component:S,disabled:C,error:k,fullWidth:x,hiddenLabel:F,margin:W,required:V,size:R,variant:B}),z=function(e){var t=e.classes,n=e.margin,r=e.fullWidth,o={root:["root","none"!==n&&"margin".concat(Object(f.a)(n)),r&&"fullWidth"]};return Object(c.a)(o,b,t)}(q),K=u.useState((function(){var e=!1;return s&&u.Children.forEach(s,(function(t){if(Object(d.a)(t,["Input","Select"])){var n=Object(d.a)(t,["Select"])?t.props.input:t;n&&Object(p.a)(n.props)&&(e=!0)}})),e})),J=Object(r.a)(K,2),U=J[0],G=J[1],H=u.useState((function(){var e=!1;return s&&u.Children.forEach(s,(function(t){Object(d.a)(t,["Input","Select"])&&Object(p.b)(t.props,!0)&&(e=!0)})),e})),Q=Object(r.a)(H,2),X=Q[0],Y=Q[1],Z=u.useState(!1),$=Object(r.a)(Z,2),ee=$[0],te=$[1];C&&ee&&te(!1);var ne=void 0===D||C?ee:D,re=u.useCallback((function(){Y(!0)}),[]),oe={adornedStart:U,setAdornedStart:G,color:I,disabled:C,error:k,filled:X,focused:ne,fullWidth:x,hiddenLabel:F,size:R,onBlur:function(){te(!1)},onEmpty:u.useCallback((function(){Y(!1)}),[]),onFilled:re,onFocus:function(){te(!0)},registerEffect:undefined,required:V,variant:B};return Object(m.jsx)(h.a.Provider,{value:oe,children:Object(m.jsx)(O,Object(a.a)({as:S,ownerState:q,className:Object(i.a)(z.root,v),ref:t},T,{children:s}))})}));t.a=I},386:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==m(e)&&"function"!==typeof e)return{default:e};var n=a(t);if(n&&n.has(e))return n.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(r,u,i):r[u]=e[u]}r.default=e,n&&n.set(e,r);return r}(n(1)),o=["placeholder","separator","isLastChild","inputStyle","focus","isDisabled","hasErrored","errorStyle","focusStyle","disabledStyle","shouldAutoFocus","isInputNum","index","value","className","isInputSecure"];function a(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(a=function(e){return e?n:t})(e)}function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}function p(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?v(e):t}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){return m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}var g=function(e){return"object"===m(e)},O=function(e){p(n,e);var t=d(n);function n(e){var o;return c(this,n),b(v(o=t.call(this,e)),"getClasses",(function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return!g(e)&&!1!==e})).join(" ")})),b(v(o),"getType",(function(){var e=o.props,t=e.isInputSecure,n=e.isInputNum;return t?"password":n?"tel":"text"})),o.input=r.default.createRef(),o}return s(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.focus,n=e.shouldAutoFocus,r=this.input.current;r&&t&&n&&r.focus()}},{key:"componentDidUpdate",value:function(e){var t=this.props.focus,n=this.input.current;e.focus!==t&&n&&t&&(n.focus(),n.select())}},{key:"render",value:function(){var e=this.props,t=e.placeholder,n=e.separator,a=e.isLastChild,c=e.inputStyle,l=e.focus,s=e.isDisabled,p=e.hasErrored,f=e.errorStyle,d=e.focusStyle,h=e.disabledStyle,v=(e.shouldAutoFocus,e.isInputNum),y=e.index,b=e.value,m=e.className,O=(e.isInputSecure,i(e,o));return r.default.createElement("div",{className:m,style:{display:"flex",alignItems:"center"}},r.default.createElement("input",u({"aria-label":"".concat(0===y?"Please enter verification code. ":"").concat(v?"Digit":"Character"," ").concat(y+1),autoComplete:"off",style:Object.assign({width:"1em",textAlign:"center"},g(c)&&c,l&&g(d)&&d,s&&g(h)&&h,p&&g(f)&&f),placeholder:t,className:this.getClasses(c,l&&d,s&&h,p&&f),type:this.getType(),maxLength:"1",ref:this.input,disabled:s,value:b||""},O)),!a&&n)}}]),n}(r.PureComponent),I=function(e){p(n,e);var t=d(n);function n(){var e;c(this,n);for(var o=arguments.length,a=new Array(o),u=0;u<o;u++)a[u]=arguments[u];return b(v(e=t.call.apply(t,[this].concat(a))),"state",{activeInput:0}),b(v(e),"getOtpValue",(function(){return e.props.value?e.props.value.toString().split(""):[]})),b(v(e),"getPlaceholderValue",(function(){var t=e.props,n=t.placeholder,r=t.numInputs;if("string"===typeof n){if(n.length===r)return n;n.length>0&&console.error("Length of the placeholder should be equal to the number of inputs.")}})),b(v(e),"handleOtpChange",(function(t){(0,e.props.onChange)(t.join(""))})),b(v(e),"isInputValueValid",(function(t){return(e.props.isInputNum?!isNaN(parseInt(t,10)):"string"===typeof t)&&1===t.trim().length})),b(v(e),"focusInput",(function(t){var n=e.props.numInputs,r=Math.max(Math.min(n-1,t),0);e.setState({activeInput:r})})),b(v(e),"focusNextInput",(function(){var t=e.state.activeInput;e.focusInput(t+1)})),b(v(e),"focusPrevInput",(function(){var t=e.state.activeInput;e.focusInput(t-1)})),b(v(e),"changeCodeAtFocus",(function(t){var n=e.state.activeInput,r=e.getOtpValue();r[n]=t[0],e.handleOtpChange(r)})),b(v(e),"handleOnPaste",(function(t){t.preventDefault();var n=e.state.activeInput,r=e.props,o=r.numInputs;if(!r.isDisabled){for(var a=e.getOtpValue(),u=n,i=t.clipboardData.getData("text/plain").slice(0,o-n).split(""),c=0;c<o;++c)c>=n&&i.length>0&&(a[c]=i.shift(),u++);e.setState({activeInput:u},(function(){e.focusInput(u),e.handleOtpChange(a)}))}})),b(v(e),"handleOnChange",(function(t){var n=t.target.value;e.isInputValueValid(n)&&e.changeCodeAtFocus(n)})),b(v(e),"handleOnKeyDown",(function(t){8===t.keyCode||"Backspace"===t.key?(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput()):46===t.keyCode||"Delete"===t.key?(t.preventDefault(),e.changeCodeAtFocus("")):37===t.keyCode||"ArrowLeft"===t.key?(t.preventDefault(),e.focusPrevInput()):39===t.keyCode||"ArrowRight"===t.key?(t.preventDefault(),e.focusNextInput()):32!==t.keyCode&&" "!==t.key&&"Spacebar"!==t.key&&"Space"!==t.key||t.preventDefault()})),b(v(e),"handleOnInput",(function(t){if(e.isInputValueValid(t.target.value))e.focusNextInput();else if(!e.props.isInputNum){var n=t.nativeEvent;null===n.data&&"deleteContentBackward"===n.inputType&&(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput())}})),b(v(e),"renderInputs",(function(){for(var t=e.state.activeInput,n=e.props,o=n.numInputs,a=n.inputStyle,u=n.focusStyle,i=n.separator,c=n.isDisabled,l=n.disabledStyle,s=n.hasErrored,p=n.errorStyle,f=n.shouldAutoFocus,d=n.isInputNum,h=n.isInputSecure,v=n.className,y=[],b=e.getOtpValue(),m=e.getPlaceholderValue(),g=e.props["data-cy"],I=e.props["data-testid"],j=function(n){y.push(r.default.createElement(O,{placeholder:m&&m[n],key:n,index:n,focus:t===n,value:b&&b[n],onChange:e.handleOnChange,onKeyDown:e.handleOnKeyDown,onInput:e.handleOnInput,onPaste:e.handleOnPaste,onFocus:function(t){e.setState({activeInput:n}),t.target.select()},onBlur:function(){return e.setState({activeInput:-1})},separator:i,inputStyle:a,focusStyle:u,isLastChild:n===o-1,isDisabled:c,disabledStyle:l,hasErrored:s,errorStyle:p,shouldAutoFocus:f,isInputNum:d,isInputSecure:h,className:v,"data-cy":g&&"".concat(g,"-").concat(n),"data-testid":I&&"".concat(I,"-").concat(n)}))},S=0;S<o;S++)j(S);return y})),e}return s(n,[{key:"render",value:function(){var e=this.props.containerStyle;return r.default.createElement("div",{style:Object.assign({display:"flex"},g(e)&&e),className:g(e)?"":e},this.renderInputs())}}]),n}(r.Component);b(I,"defaultProps",{numInputs:4,onChange:function(e){return console.log(e)},isDisabled:!1,shouldAutoFocus:!1,value:"",isInputSecure:!1});var j=I;t.default=j}}]);
//# sourceMappingURL=16.15ce9210.chunk.js.map