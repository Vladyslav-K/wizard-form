(this["webpackJsonpwizard-form"]=this["webpackJsonpwizard-form"]||[]).push([[2],{162:function(e,a,t){"use strict";t.r(a);var n=t(98);t.d(a,"default",(function(){return n.a}))},266:function(e,a){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},267:function(e,a){function t(){return e.exports=t=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},t.apply(this,arguments)}e.exports=t},271:function(e,a,t){"use strict";t.d(a,"c",(function(){return n})),t.d(a,"a",(function(){return r})),t.d(a,"b",(function(){return l}));var n=["HTML","CSS","Javascript","React","Angular","jQuery","NodeJS","Python","PHP","Ruby On Rails","SQL","BackboneJS","Web Design","Project management","Git","Docker","AWS Lambda","Firebase"],r=["Art","Sport, fitness, aerobica and staff like that","I just want to play games, I\u2019m not living in this life","I\u2019m a female... I\u2019m doing nothing. Every day.","Guitar, guitar and guitar again. I\u2019m fall in love with it.","WTF is \u201chobbies\u201d???"],l=["English","French","Spanish","Arabic","Mandarin","Russian","Portuguese","German","Japanese","Hindi","Malay","Persian","Swahili","Tamil","Italian","Dutch","Bengali","Turkish","Vietnamese","Polish","Javanese","Punjabi","Thai","Korean"]},272:function(e,a,t){"use strict";t.d(a,"a",(function(){return d}));var n=t(0),r=t.n(n),l=t(125),o=t(391),i=t(214),c=t(389),u=t(71),d=Object(n.memo)((function(e){var a=e.placeholder,t=e.required,n=e.multiple,l=e.options,d=e.field,m=e.label,f=e.form,b=e.errors,p=s();return r.a.createElement(o.a,{getOptionLabel:function(e){return e},value:d.value,multiple:n,options:l,size:"small",onChange:function(e,a){return f.setFieldValue(d.name,a)},renderInput:function(e){return r.a.createElement(i.a,{container:!0,className:p.fieldContainer},r.a.createElement(i.a,{container:!0,justify:"space-between"},r.a.createElement("label",{htmlFor:d.name}," ",m," "),t&&r.a.createElement("label",null," * ")),r.a.createElement(c.a,Object.assign({className:p.fieldStyles,placeholder:a,variant:"outlined",name:d.name,id:d.name},e,{fullWidth:!0})),b&&r.a.createElement(u.a,{value:b}))}})})),s=Object(l.a)((function(e){return{fieldContainer:{marginTop:"16px",marginBottom:"3rem"},fieldStyles:{marginBottom:"8px",fontFamily:"Roboto",fontStyle:"normal",fontWeight:"500",fontSize:"14px",lineHeight:"16px"}}}))},273:function(e,a,t){"use strict";var n=t(1),r=t(15),l=t(3),o=t(0),i=t.n(o),c=(t(6),t(4)),u=t(220),d=t(265),s=t(8),m=t(248),f=i.a.forwardRef((function(e,a){var t=e.autoFocus,o=e.checked,s=e.checkedIcon,f=e.classes,b=e.className,p=e.defaultChecked,h=e.disabled,v=e.icon,g=e.id,y=e.inputProps,O=e.inputRef,k=e.name,E=e.onBlur,j=e.onChange,x=e.onFocus,C=e.readOnly,P=e.required,S=e.tabIndex,w=e.type,B=e.value,I=Object(l.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),R=Object(u.a)({controlled:o,default:Boolean(p),name:"SwitchBase"}),z=Object(r.a)(R,2),F=z[0],N=z[1],M=Object(d.a)(),H=h;M&&"undefined"===typeof H&&(H=M.disabled);var L="checkbox"===w||"radio"===w;return i.a.createElement(m.a,Object(n.a)({component:"span",className:Object(c.a)(f.root,b,F&&f.checked,H&&f.disabled),disabled:H,tabIndex:null,role:void 0,onFocus:function(e){x&&x(e),M&&M.onFocus&&M.onFocus(e)},onBlur:function(e){E&&E(e),M&&M.onBlur&&M.onBlur(e)},ref:a},I),i.a.createElement("input",Object(n.a)({autoFocus:t,checked:o,defaultChecked:p,className:f.input,disabled:H,id:L&&g,name:k,onChange:function(e){var a=e.target.checked;N(a),j&&j(e,a)},readOnly:C,ref:O,required:P,tabIndex:S,type:w,value:B},y)),F?s:v)}));a.a=Object(s.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(f)},274:function(e,a,t){"use strict";var n=t(266);Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,a){var t=l.default.memo(l.default.forwardRef((function(a,t){return l.default.createElement(o.default,(0,r.default)({ref:t},a),e)})));0;return t.muiName=o.default.muiName,t};var r=n(t(267)),l=n(t(0)),o=n(t(162))},308:function(e,a,t){"use strict";var n=t(1),r=t(3),l=t(0),o=t.n(l),i=(t(6),t(4)),c=t(265),u=t(8),d=t(161),s=t(11),m=o.a.forwardRef((function(e,a){e.checked;var t=e.classes,l=e.className,u=e.control,m=e.disabled,f=(e.inputRef,e.label),b=e.labelPlacement,p=void 0===b?"end":b,h=(e.name,e.onChange,e.value,Object(r.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),v=Object(c.a)(),g=m;"undefined"===typeof g&&"undefined"!==typeof u.props.disabled&&(g=u.props.disabled),"undefined"===typeof g&&v&&(g=v.disabled);var y={disabled:g};return["checked","name","onChange","value","inputRef"].forEach((function(a){"undefined"===typeof u.props[a]&&"undefined"!==typeof e[a]&&(y[a]=e[a])})),o.a.createElement("label",Object(n.a)({className:Object(i.a)(t.root,l,"end"!==p&&t["labelPlacement".concat(Object(s.a)(p))],g&&t.disabled),ref:a},h),o.a.cloneElement(u,y),o.a.createElement(d.a,{component:"span",className:Object(i.a)(t.label,g&&t.disabled)},f))}));a.a=Object(u.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(m)},309:function(e,a,t){"use strict";var n=t(266);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),l=(0,n(t(274)).default)(r.default.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank");a.default=l},390:function(e,a,t){"use strict";t.r(a);var n=t(24),r=t(0),l=t.n(r),o=t(55),i=t(129),c=t(271),u=t(214),d=t(272),s=t(131),m=t(130);function f(){return(f=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function b(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=l.a.createElement("rect",{x:2,y:2,width:11,height:11,fill:"#4E86E4",stroke:"#C1CFE0",strokeWidth:3}),h=function(e){var a=e.svgRef,t=e.title,n=b(e,["svgRef","title"]);return l.a.createElement("svg",f({width:24,height:24,viewBox:"0 0 16 16",fill:"none",ref:a},n),t?l.a.createElement("title",null,t):null,p)},v=l.a.forwardRef((function(e,a){return l.a.createElement(h,f({svgRef:a},e))})),g=(t.p,t(309)),y=t.n(g),O=t(308),k=t(1),E=t(3),j=(t(6),t(4)),x=t(273),C=t(70),P=Object(C.a)(l.a.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),S=Object(C.a)(l.a.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),w=t(25),B=Object(C.a)(l.a.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),I=t(11),R=t(8),z=l.a.createElement(S,null),F=l.a.createElement(P,null),N=l.a.createElement(B,null),M=l.a.forwardRef((function(e,a){var t=e.checkedIcon,n=void 0===t?z:t,r=e.classes,o=e.color,i=void 0===o?"secondary":o,c=e.icon,u=void 0===c?F:c,d=e.indeterminate,s=void 0!==d&&d,m=e.indeterminateIcon,f=void 0===m?N:m,b=e.inputProps,p=e.size,h=void 0===p?"medium":p,v=Object(E.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]);return l.a.createElement(x.a,Object(k.a)({type:"checkbox",classes:{root:Object(j.a)(r.root,r["color".concat(Object(I.a)(i))],s&&r.indeterminate),checked:r.checked,disabled:r.disabled},color:i,inputProps:Object(k.a)({"data-indeterminate":s},b),icon:l.a.cloneElement(s?f:u,{fontSize:"small"===h?"small":"default"}),checkedIcon:l.a.cloneElement(s?f:n,{fontSize:"small"===h?"small":"default"}),ref:a},v))})),H=Object(R.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(w.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(w.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(M),L=Object(r.memo)((function(e){var a=e.field,t=e.form,n=e.fieldName,r=e.label,o=e.options;return l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{style:{margin:"1rem 0"}},r),l.a.createElement("div",{id:"checkbox-group"},o.map((function(e,r){return l.a.createElement(O.a,{onChange:function(a,l){return t.setFieldValue("".concat(n,".").concat(r),l?e:null)},control:l.a.createElement(H,{checked:a.value&&a.value.includes(e),icon:l.a.createElement(y.a,{fontSize:"small"}),checkedIcon:l.a.createElement(v,{fontSize:"small"})}),label:e,key:r})}))))}));a.default=Object(r.memo)((function(e){var a=e.saveChangeToRedux,t=e.initialData,r=e.handleSubmit,f=e.getButtons;e.userData;return l.a.createElement(o.d,{validationSchema:i.b,validateOnChange:!1,validateOnBlur:!1,enableReinitialize:!0,initialValues:t,onSubmit:r},(function(e){var r=e.values,i=e.errors;return l.a.createElement(u.a,{container:!0,justify:"space-around",style:{marginTop:"2rem"}},a(r,t),l.a.createElement(u.a,{item:!0,xs:4},l.a.createElement(s.a,null,l.a.createElement(o.a,{placeholder:"Choose your skills",component:d.a,errors:i.skills,options:c.c,label:"Skills",name:"skills",multiple:!0,required:!0}),l.a.createElement(o.a,{placeholder:"You can write additional information here (maximum 300 characters)",label:"Additional information",name:"additionalInformation",component:m.a,multiline:!0,rows:5}))),l.a.createElement(u.a,{item:!0,xs:4},l.a.createElement(s.a,null,l.a.createElement(o.b,{name:"hobbies",render:function(){return l.a.createElement(o.a,{options:c.a,component:L,label:"My hobbies",fieldName:"hobbies",name:"hobbies"})}}),f({backButton:!0,finishButton:!0,errors:Object(n.a)({},i)}))))}))}))}}]);
//# sourceMappingURL=2.3738552e.chunk.js.map