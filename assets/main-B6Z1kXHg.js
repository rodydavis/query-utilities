(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,ee=h.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},b=(e,t)=>!l(e,t),te={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(v(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?y:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?y:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??b)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:`open`},x[v(`elementProperties`)]=new Map,x[v(`finalized`)]=new Map,ee?.({ReactiveElement:x}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var S=globalThis,ne=e=>e,C=S.trustedTypes,re=C?C.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ie=`$lit$`,w=`lit$${Math.random().toFixed(9).slice(2)}$`,ae=`?`+w,oe=`<${ae}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,O=Array.isArray,se=e=>O(e)||typeof e?.[Symbol.iterator]==`function`,k=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,le=/>/g,j=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),M=/'/g,ue=/"/g,de=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),fe=new WeakMap,I=T.createTreeWalker(T,129);function pe(e,t){if(!O(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return re===void 0?t:re.createHTML(t)}var me=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=A;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===A?c[1]===`!--`?o=ce:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(de.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=le:o===j?c[0]===`>`?(o=i??A,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?ue:M):o===ue||o===M?o=j:o===ce||o===le?o=A:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===A?n+oe:l>=0?(r.push(s),n.slice(0,l)+ie+n.slice(l)+w+d):n+w+(l===-2?t:d)}return[pe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},L=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=me(t,n);if(this.el=e.createElement(l,r),I.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=I.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ie)){let t=u[o++],n=i.getAttribute(e).split(w),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ge:r[1]===`?`?_e:r[1]===`@`?ve:B}),i.removeAttribute(e)}else e.startsWith(w)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(de.test(i.tagName)){let e=i.textContent.split(w),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),I.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8)if(i.data===ae)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(w,e+1))!==-1;)c.push({type:7,index:a}),e+=w.length-1}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function R(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=R(e,i._$AS(e,t.values),i,r)),t}var he=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);I.currentNode=r;let i=I.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new z(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ye(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=I.nextNode(),a++)}return I.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},z=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),D(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?se(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=L.createElement(pe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new he(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new L(e)),t}k(t){O(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ne(e).nextSibling;ne(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=R(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=R(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ge=class extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},_e=class extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},ve=class extends B{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ye=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}},be=S.litHtmlPolyfillSupport;be?.(L,z),(S.litHtmlVersions??=[]).push(`3.3.2`);var xe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new z(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},V=globalThis,H=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};H._$litElement$=!0,H.finalized=!0,V.litElementHydrateSupport?.({LitElement:H});var Se=V.litElementPolyfillSupport;Se?.({LitElement:H}),(V.litElementVersions??=[]).push(`4.2.2`);var Ce=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},we={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},Te=(e=we,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function Ee(e){return(t,n)=>typeof n==`object`?Te(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function U(e){return Ee({...e,state:!0,attribute:!1})}var De={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oe=e=>(...t)=>({_$litDirective$:e,values:t}),ke=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},W=class extends ke{constructor(e){if(super(e),this.it=F,e.type!==De.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===F||e==null)return this._t=void 0,this.it=e;if(e===P)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};W.directiveName=`unsafeHTML`,W.resultType=1;var G=Oe(W);function Ae(e,t){let n=new RegExp(t,`gi`);return e.replace(n,e=>`<mark>${e}</mark>`)}var K=class{},q=class extends K{constructor(){super(...arguments),this.type=`ALL`}},J=class extends K{constructor(e,t={isExactMatch:!1}){super(),this.text=e,this.options=t,this.type=`TEXT`}},je=class extends J{constructor(e,t){super(e,{isExactMatch:!0}),this.phrase=e,this.children=t,this.type=`PHRASE`}},Y=class extends K{constructor(e,t){super(),this.field=e,this.child=t,this.type=`FIELD_SCOPE`}},Me=[`=`,`!=`,`<`,`<=`,`>`,`>=`],Ne=class extends Y{constructor(e,t,n){super(e,n),this.field=e,this.operator=t,this.text=n,this.type=`FIELD_COMPARE`}},Pe=class extends K{constructor(e,t,n={startInclusive:!0,endInclusive:!0}){super(),this.start=e,this.end=t,this.options=n,this.type=`RANGE`}},Fe=class extends K{constructor(e){super(),this.child=e,this.type=`GROUP`}},Ie=class extends K{constructor(e){super(),this.child=e,this.type=`NOT`}},Le=class extends K{constructor(e){super(),this.children=e}get left(){return this.children[0]}get right(){return this.children[1]}},Re=class extends Le{constructor(){super(...arguments),this.type=`AND`}},ze=class extends Le{constructor(){super(...arguments),this.type=`OR`}},X=class extends K{constructor(e,t){super(),this.section=e,this.child=t,this.type=`SECTION`}};function Z(e){let t=e.trim(),n=e.split(``),r=e.split(/\s+/),i=[`AND`,`OR`,`NOT`],a=r.findIndex(e=>i.includes(e)),o=r[a],s=[`(`,`"`,`'`],c=n.findIndex(e=>s.includes(e)),l=n[c];if(o===`AND`)return new Re([Z(r.slice(0,a).join(` `)),Z(r.slice(a+1).join(` `))]);if(o===`OR`)return new ze([Z(r.slice(0,a).join(` `)),Z(r.slice(a+1).join(` `))]);if(o===`NOT`)return new Ie(Z(r.slice(a+1).join(` `)));let u=n.findIndex(e=>e===`)`);if(l===`(`&&u!=-1)return new Fe(Z(e.slice(c+1,u-1)));let d=n.findIndex(e=>Me.includes(e));if(d!=-1){let e=n.slice(0,d).join(``).trim(),t=n[d];return new Ne(e,t,new J(n.slice(d+1).join(``).trim()))}let f=n.findIndex(e=>e===`:`);if(f!==-1)return new Y(e.substring(0,f),Z(e.substring(f+1)));if(n.findIndex(e=>e===`@`)!==-1){let e=n.findIndex(e=>e===` `),t=n.slice(1,e===-1?n.length:e).join(``).trim(),r=e===-1?``:n.slice(e).join(``).trim();return new X(t,e===-1?new q:Z(r))}let p=Be(e,[`'`,`"`]);if(p.valid){let e=p.value.split(` `).map(e=>new J(e));return new je(p.value,e)}let m=n.findIndex(e=>e===`[`),h=n.findIndex(e=>e===`]`),g=n.findIndex(e=>e===`{`),_=n.findIndex(e=>e===`}`);if(e.indexOf(` TO `)!=-1&&(m!=-1||g!=-1)&&(h!=-1||_!=-1)){let t=m!=-1,n=h!=-1,r=t?m:g,i=n?h:_,a=e.slice(r+1,i-1).split(` TO `).map(e=>e.trim());return new Pe(new J(a[0]),new J(a[1]),{startInclusive:t,endInclusive:n})}return new J(t,{isExactMatch:!1})}function Be(e,t){let n=0,r=-1,i=-1,a=-1,o=-1;for(;n<e.length;){let s=e[n];if(s===``||s===` `){n++;continue}t.includes(s)?r===-1?r=n:i=n:a===-1?a=n:o=n,n++}let s=r!==-1&&i!==-1&&r<i,c=a>=r+1&&o<=i-1;return{valid:s&&c,value:e.slice(a,o+1)}}var Ve=class{constructor(e){this.max=e,this.sources=new Map,this.resultBuilders=new Map}get sections(){return Array.from(this.sources.keys())}reset(){this.sources.clear(),this.resultBuilders.clear()}addSource(e,t,n){this.sources.set(e,t),this.resultBuilders.set(e,n)}getQuery(e){return Z((e||``).trim())}getResults(e){let t=[],n=this.getQuery(e);for(let r of this.sources.keys()){if(n instanceof X&&n.child instanceof q&&n.section===r)return this.getSection(r);if(this.max&&t.length>=this.max)return t;this.searchSource(n,r,t,n=>{let i=this.resultBuilders.get(r);t.push(i(n,e))})}return t}getSection(e){let t=[],n=this.sources.get(e);for(let r of n){let n=this.resultBuilders.get(e);t.push(n(r,``))}return t}searchSource(e,t,n,r){let i=this.sources.get(t);if(i)for(let a of i){if(this.max&&n.length>=this.max)return;this.matchItem(e,a,{section:t})&&r(a)}}matchItem(e,t,n){let r=JSON.stringify(t),i=n?.field,a=n?.section,o=i?t[i]:r;if(e instanceof Fe)return this.matchItem(e.child,t,{section:a});if(e instanceof Y){let n=e.field;return this.matchItem(e.child,t,{field:n,section:a})}if(e instanceof Re)return e.children.every(e=>this.matchItem(e,t,{section:a}));if(e instanceof ze)return e.children.some(e=>this.matchItem(e,t,{section:a}));if(e instanceof Ie)return!this.matchItem(e.child,t,{section:a});if(e instanceof X)return e.section===a&&this.matchItem(e.child,t,{section:e.section});if(e instanceof Ne){let n=t[e.field];if(n===void 0)return!1;let r=e.text.text,i=e.operator;if(i===`=`){if(n===r)return!0}else if(i===`!=`){if(n!==r)return!0}else if(i===`<`){if(n<r)return!0}else if(i===`<=`){if(n<=r)return!0}else if(i===`>`){if(n>r)return!0}else if(i===`>=`&&n>=r)return!0;return!1}if(e instanceof Pe){let t=e.options.startInclusive,n=e.options.endInclusive,r=e.start.text,i=e.end.text;return!!(t&&n&&o>=r&&o<=i||t&&!n&&o>=r&&o<i||!t&&n&&o>r&&o<=i||!t&&!n&&o>r&&o<i)}return e instanceof J?e.options.isExactMatch?e.text===o:typeof o==`string`&&Number.isNaN(+o)?o.toLowerCase().includes(e.text.toLowerCase()):o==e.text:e instanceof q}};function Q(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var He=[{label:`Text`,query:`Bret`,desc:`Basic text search across all fields`},{label:`All Users`,query:`@users`,desc:`Section query — all users`},{label:`All Todos`,query:`@todos`,desc:`Section query — all todos`},{label:`Field Scope`,query:`name:Leanne`,desc:`Search a specific field`},{label:`Section+Field`,query:`@todos userId:1`,desc:`Section + field scope`},{label:`OR`,query:`name:Leanne OR name:Ervin`,desc:`OR operator`},{label:`AND`,query:`name:Leanne AND email:Sincere`,desc:`AND operator`},{label:`NOT`,query:`NOT Leanne`,desc:`NOT operator`},{label:`Exact Phrase`,query:`"Leanne Graham"`,desc:`Exact phrase match`},{label:`Field Compare`,query:`userId = 1`,desc:`Field comparison (=, <, >)`},{label:`Range`,query:`title:[a TO m]`,desc:`Inclusive range query on a field`}],$=class extends H{constructor(...e){super(...e),this.loaded=!1,this.value=``,this.results=[],this.queryType=``,this.sq=new Ve}static{this.styles=o`
    :host {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      color: #202124;
    }

    * {
      box-sizing: border-box;
    }

    main {
      max-width: 820px;
      margin: 0 auto;
      padding: 32px 16px;
    }

    h1 {
      margin: 0 0 4px;
      font-size: 1.875rem;
      font-weight: 700;
    }

    .subtitle {
      color: #5f6368;
      margin: 0 0 28px;
      font-size: 0.9375rem;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px 16px;
      font-size: 1rem;
      border: 2px solid #dadce0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.15s;
      margin-bottom: 16px;
    }

    input[type="text"]:focus {
      border-color: #1a73e8;
    }

    .examples-label {
      font-size: 0.8125rem;
      color: #5f6368;
      margin-bottom: 8px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    button.chip {
      padding: 5px 12px;
      border: 1px solid #dadce0;
      border-radius: 16px;
      font-size: 0.8125rem;
      cursor: pointer;
      background: #f8f9fa;
      color: #202124;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      white-space: nowrap;
      font-family: inherit;
    }

    button.chip:hover {
      background: #e8f0fe;
      border-color: #1a73e8;
      color: #1a73e8;
    }

    button.chip code {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.75rem;
    }

    .query-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 28px;
      margin-bottom: 16px;
    }

    .query-type {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: "SFMono-Regular", Consolas, monospace;
      letter-spacing: 0.03em;
    }

    .query-type.TEXT {
      background: #e6f4ea;
      color: #137333;
    }
    .query-type.PHRASE {
      background: #fce8b2;
      color: #b45309;
    }
    .query-type.AND {
      background: #e8f0fe;
      color: #1a73e8;
    }
    .query-type.OR {
      background: #f3e8fd;
      color: #7b1fa2;
    }
    .query-type.NOT {
      background: #fce8e6;
      color: #c5221f;
    }
    .query-type.FIELD_SCOPE {
      background: #e0f7fa;
      color: #00695c;
    }
    .query-type.FIELD_COMPARE {
      background: #fff8e1;
      color: #e65100;
    }
    .query-type.SECTION {
      background: #e8eaf6;
      color: #283593;
    }
    .query-type.RANGE {
      background: #f1f8e9;
      color: #33691e;
    }
    .query-type.GROUP {
      background: #f5f5f5;
      color: #424242;
    }

    .result-count {
      font-size: 0.875rem;
      color: #5f6368;
    }

    .results {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .result-card {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dadce0;
      background: #fff;
    }

    .result-card.user {
      border-left: 4px solid #1a73e8;
    }

    .result-card.todo {
      border-left: 4px solid #34a853;
    }

    .result-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
    }

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.4;
    }

    .badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .badge.user {
      background: #e8f0fe;
      color: #1a73e8;
    }

    .badge.todo {
      background: #e6f4ea;
      color: #137333;
    }

    .result-meta {
      font-size: 0.875rem;
      color: #5f6368;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-row {
      display: flex;
      gap: 6px;
      align-items: baseline;
    }

    .meta-label {
      font-weight: 600;
      color: #3c4043;
      min-width: 72px;
    }

    .completed-yes {
      color: #137333;
      font-weight: 500;
    }

    .completed-no {
      color: #c5221f;
      font-weight: 500;
    }

    mark {
      background: #fbf303;
      border-radius: 2px;
      padding: 0 1px;
      color: inherit;
    }

    .loading,
    .empty {
      text-align: center;
      padding: 56px 16px;
      color: #5f6368;
      font-size: 1rem;
    }

    .syntax-ref {
      margin-top: 36px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #dadce0;
    }

    .syntax-ref h2 {
      margin: 0 0 14px;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #5f6368;
      font-weight: 600;
    }

    table.syntax-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    table.syntax-table td {
      padding: 5px 8px;
      vertical-align: top;
    }

    table.syntax-table td:first-child {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.8rem;
      color: #c0392b;
      white-space: nowrap;
      width: 1%;
    }

    table.syntax-table td:last-child {
      color: #5f6368;
    }
  `}render(){return this.loaded?N`
      <main>
        <h1>Query Utilities</h1>
        <p class="subtitle">
          Zero-dependency JavaScript library for advanced search and query
          parsing. Search across multiple data sources using a rich query
          syntax.
        </p>

        <input
          type="text"
          placeholder='Try: @users, name:Leanne, "Leanne Graham", NOT Leanne'
          .value=${this.value}
          @input=${this.onInput.bind(this)}
        />

        <div class="examples-label">Click an example to try it:</div>
        <div class="chips">
          ${He.map(e=>N`<button
                class="chip"
                title=${e.desc}
                @click=${()=>this.setQuery(e.query)}
              >
                ${e.label}: <code>${e.query}</code>
              </button>`)}
        </div>

        <div class="query-bar">
          ${this.queryType?N`
                <span class="query-type ${this.queryType}"
                  >${this.queryType}</span
                >
                <span class="result-count"
                  >${this.results.length}
                  result${this.results.length===1?``:`s`}</span
                >
              `:``}
        </div>

        <div class="results">
          ${this.value&&this.results.length===0?N`<div class="empty">
                No results found for &ldquo;${this.value}&rdquo;
              </div>`:this.results.map(e=>this.renderResult(e))}
        </div>

        ${this.renderSyntaxRef()}
      </main>
    `:N`<div class="loading">Loading data…</div>`}renderResult(e){if(e.type===`USER`){let t=e.item;return N`
        <div class="result-card user">
          <div class="result-header">
            <h3 class="result-title">
              ${G(this.hl(t.name,e.search))}
            </h3>
            <span class="badge user">User</span>
          </div>
          <div class="result-meta">
            <div class="meta-row">
              <span class="meta-label">username:</span>
              <span>${G(this.hl(t.username,e.search))}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">email:</span>
              <span>${G(this.hl(t.email,e.search))}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">phone:</span>
              <span>${t.phone}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">company:</span>
              <span>${t.company.name}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">city:</span>
              <span>${t.address.city}</span>
            </div>
          </div>
        </div>
      `}if(e.type===`TODO`){let t=e.item;return N`
        <div class="result-card todo">
          <div class="result-header">
            <h3 class="result-title">
              ${G(this.hl(t.title,e.search))}
            </h3>
            <span class="badge todo">Todo</span>
          </div>
          <div class="result-meta">
            <div class="meta-row">
              <span class="meta-label">id:</span>
              <span>${t.id}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">userId:</span>
              <span>${t.userId}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">completed:</span>
              <span class="${t.completed?`completed-yes`:`completed-no`}"
                >${t.completed?`✓ Yes`:`✗ No`}</span
              >
            </div>
          </div>
        </div>
      `}return N``}renderSyntaxRef(){return N`
      <div class="syntax-ref">
        <h2>Query Syntax Reference</h2>
        <table class="syntax-table">
          <tr>
            <td>hello world</td>
            <td>Text search across all fields</td>
          </tr>
          <tr>
            <td>"exact phrase"</td>
            <td>Exact phrase match (PhraseQuery)</td>
          </tr>
          <tr>
            <td>field:value</td>
            <td>Scope search to a specific field (FieldScope)</td>
          </tr>
          <tr>
            <td>field = value</td>
            <td>
              Field comparison with operator =, &lt;, &gt; (FieldCompareQuery)
            </td>
          </tr>
          <tr>
            <td>@section</td>
            <td>Return all items from a named section (SectionQuery)</td>
          </tr>
          <tr>
            <td>@section query</td>
            <td>Search within a section (SectionQuery)</td>
          </tr>
          <tr>
            <td>A AND B</td>
            <td>Both conditions must match (AndQuery)</td>
          </tr>
          <tr>
            <td>A OR B</td>
            <td>Either condition must match (OrQuery)</td>
          </tr>
          <tr>
            <td>NOT query</td>
            <td>Exclude matching results (NotQuery)</td>
          </tr>
          <tr>
            <td>(A OR B) AND C</td>
            <td>Group expressions with parentheses (GroupQuery)</td>
          </tr>
          <tr>
            <td>field:[start TO end]</td>
            <td>Inclusive range on a field (RangeQuery)</td>
          </tr>
          <tr>
            <td>field:{start TO end}</td>
            <td>Exclusive range on a field (RangeQuery)</td>
          </tr>
        </table>
      </div>
    `}hl(e,t){if(!t||!e)return e;try{return Ae(e,t)}catch{return e}}setQuery(e){this.value=e,this.updateResults()}onInput(e){this.value=e.target.value,this.updateResults()}updateResults(){this.results=[],this.queryType=``,this.value&&(this.queryType=this.sq.getQuery(this.value).type,this.results=this.sq.getResults(this.value))}async firstUpdated(){let[e,t]=await Promise.all([fetch(`https://jsonplaceholder.typicode.com/todos`).then(e=>e.json()),fetch(`https://jsonplaceholder.typicode.com/users`).then(e=>e.json())]);this.sq.addSource(`todos`,e,(e,t)=>({type:`TODO`,item:e,search:t})),this.sq.addSource(`users`,t,(e,t)=>({type:`USER`,item:e,search:t})),this.loaded=!0}};Q([U()],$.prototype,`loaded`,void 0),Q([U()],$.prototype,`value`,void 0),Q([U()],$.prototype,`results`,void 0),Q([U()],$.prototype,`queryType`,void 0),$=Q([Ce(`search-example`)],$);