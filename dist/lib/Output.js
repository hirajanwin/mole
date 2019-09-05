"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _is=_interopRequireDefault(require("../util/is")),_fsExtra=_interopRequireDefault(require("fs-extra")),_lodash=_interopRequireDefault(require("lodash.merge")),_glob=_interopRequireDefault(require("glob")),_Template=_interopRequireDefault(require("./Template")),_Model=_interopRequireDefault(require("./Model"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);return Object.getOwnPropertySymbols&&c.push.apply(c,Object.getOwnPropertySymbols(a)),b&&(c=c.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var Output=function a(b,c,d,e,f){_classCallCheck(this,a),Object.assign(this,_objectSpread({name:b.name},getContent(b,c,d,e,f),{path:b.dir+b.file}))};function getContent(a,b,c,d,e){var f={};for(var m in b)if(null===a[m]&&(a[m]=e),a[m]){var n=[];for(var o in a[m])switch(_is["default"].what(a[m][o])){case"dir":n.push(getContentFromDirs(a[m][o],a,b,m,c,d,e));break;case"file":n.push(getFileContent(a[m][o],m,c,d,e));break;case"string":if(!b[m])console.log("No ".concat(m,"s named '").concat(a[m][o],"', please check"));else// Check if any peripherals have been added
if(0<b[m].length){var g=!0,h=!1,i=void 0;try{for(var j,k,l=b[m][Symbol.iterator]();!(g=(j=l.next()).done);g=!0)k=j.value,a[m][o]===k.name?n.push(k.data||k.string):console.log("Does not match a named ".concat(m,", please check"))}catch(a){h=!0,i=a}finally{try{g||null==l["return"]||l["return"]()}finally{if(h)throw i}}}else// When model is added using config, but doesn't exist then set model to data. Needs improving
n.push(e);break;default:n.push(a[m]);}"model"==m&&(f[m]=_lodash["default"].apply(void 0,n)),"template"==m&&(f[m]=n.join("\n"))}// console.log('object -> ', object)
return f}function getContentFromDirs(a,b,c,d,e,f,g){var h=[];h=Object.keys(g),h.push("index"),h=h.join("|");// console.log(keys)
var i=[];// If has subdirectory that matches named output eg "templates/ios/"
if(_fsExtra["default"].existsSync(e.root+a+b.name+"/")){// console.log('has matching directories')
// Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
var j=_glob["default"].sync(e.root+a+b.name+"/@("+h+")*"),k=!0,l=!1,m=void 0;try{for(var n,o,p=j[Symbol.iterator]();!(k=(n=p.next()).done);k=!0)// console.log(fs.readFileSync(file, 'utf8'))
if(o=n.value,/\.js$/gmi.test(o)){if("model"===d){var x=new _Model["default"]("name",require(o),f,g);i.push(x.data),g.update(x.data)}"template"===d&&i.push(new _Template["default"]("name",require(o),f,g).string)}else i.push(_fsExtra["default"].readFileSync(o,"utf8"))}catch(a){l=!0,m=a}finally{try{k||null==p["return"]||p["return"]()}finally{if(l)throw m}}}else{// If main directory has file that matches named output eg "templates/ios.njk"
// TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
var q=_glob["default"].sync(e.root+a+b.name+"*"),r=!0,s=!1,t=void 0;try{for(var u,v,w=q[Symbol.iterator]();!(r=(u=w.next()).done);r=!0)if(v=u.value,/\.js$/gmi.test(v)){if("model"===d){var y=new _Model["default"]("name",require(v),f,g);i.push(y.data),g.update(y.data)}"template"===d&&i.push(new _Template["default"]("name",require(v),f,g).string)}else i.push(_fsExtra["default"].readFileSync(v,"utf8"))}catch(a){s=!0,t=a}finally{try{r||null==w["return"]||w["return"]()}finally{if(s)throw t}}}return"model"===d?_lodash["default"].apply(void 0,i):"template"===d?i.join("\n"):void 0}function getFileContent(a,b,c,d,e){if(/\.js$/gmi.test(a)){if("model"===b){var f=new _Model["default"]("name",require(c.root+a),d,e);return e.update(f.data),f.data}if("template"===b)return new _Template["default"]("name",require(c.root+a),d,e).string}else return _fsExtra["default"].readFileSync(c.root+a,"utf8")}// Todo: Add functionality to get template or model from user defined model of template
function getPluginContent(a,b){var c=!0,d=!1,e=void 0;try{for(var f,g,h=b[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)if(g=f.value,a===g.name)return g.string||g.data}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}}var _default=Output;exports["default"]=_default,module.exports=exports.default;