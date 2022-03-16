import{r as J,t as L,s as V,$ as y,n as H}from"./vendor.f49077f3.js";const K=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerpolicy&&(c.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?c.credentials="include":n.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=e(n);fetch(n.href,c)}};K();class x{}class j extends x{constructor(){super(...arguments);this.type="ALL"}}class m extends x{constructor(t,e={isExactMatch:!1}){super();this.text=t,this.options=e,this.type="TEXT"}}class X extends m{constructor(t,e){super(t,{isExactMatch:!0});this.phrase=t,this.children=e,this.type="PHRASE"}}class R extends x{constructor(t,e){super();this.field=t,this.child=e,this.type="FIELD_SCOPE"}}const z=["=","!=","<","<=",">",">="];class P extends R{constructor(t,e,s){super(t,s);this.field=t,this.operator=e,this.text=s,this.type="FIELD_COMPARE"}}class T extends x{constructor(t,e,s={startInclusive:!0,endInclusive:!0}){super();this.start=t,this.end=e,this.options=s,this.type="RANGE"}}class M extends x{constructor(t){super();this.child=t,this.type="GROUP"}}class D extends x{constructor(t){super();this.child=t,this.type="NOT"}}class _ extends x{constructor(t){super();this.children=t}get left(){return this.children[0]}get right(){return this.children[1]}}class $ extends _{constructor(){super(...arguments);this.type="AND"}}class B extends _{constructor(){super(...arguments);this.type="OR"}}class N extends x{constructor(t,e){super();this.section=t,this.child=e,this.type="SECTION"}}function p(i){const t=i.trim(),e=i.split(""),s=i.split(/\s+/),n=["AND","OR","NOT"],c=s.findIndex(r=>n.includes(r)),o=s[c],l=["(",'"',"'"],u=e.findIndex(r=>l.includes(r)),d=e[u];if(o==="AND"){const r=p(s.slice(0,c).join(" ")),f=p(s.slice(c+1).join(" "));return new $([r,f])}if(o==="OR"){const r=p(s.slice(0,c).join(" ")),f=p(s.slice(c+1).join(" "));return new B([r,f])}if(o==="NOT"){const r=p(s.slice(c+1).join(" "));return new D(r)}const h=e.findIndex(r=>r===")");if(d==="("&&h!=-1){const r=p(i.slice(u+1,h-1));return new M(r)}const a=e.findIndex(r=>z.includes(r));if(a!=-1){const r=e.slice(0,a).join("").trim(),f=e[a],g=e.slice(a+1).join("").trim(),v=new m(g);return new P(r,f,v)}const S=e.findIndex(r=>r===":");if(S!==-1){const r=i.substring(0,S),f=p(i.substring(S+1));return new R(r,f)}if(e.findIndex(r=>r==="@")!==-1){const r=e.findIndex(w=>w===" "),f=e.slice(1,r===-1?e.length:r).join("").trim(),g=r===-1?"":e.slice(r).join("").trim(),v=r===-1?new j:p(g);return new N(f,v)}const E=W(i,["'",'"']);if(E.valid){const r=E.value.split(" ").map(f=>new m(f));return new X(E.value,r)}const Q=e.findIndex(r=>r==="["),b=e.findIndex(r=>r==="]"),A=e.findIndex(r=>r==="{"),C=e.findIndex(r=>r==="}");if(i.indexOf(" TO ")!=-1&&(Q!=-1||A!=-1)&&(b!=-1||C!=-1)){const r=Q!=-1,f=b!=-1,g=r?Q:A,v=f?b:C,w=i.slice(g+1,v-1).split(" TO ").map(G=>G.trim()),F=new m(w[0]),U=new m(w[1]);return new T(F,U,{startInclusive:r,endInclusive:f})}return new m(t,{isExactMatch:!1})}function W(i,t){let e=0,s=-1,n=-1,c=-1,o=-1;for(;e<i.length;){const d=i[e];if(d===""||d===" "){e++;continue}t.includes(d)?s===-1?s=e:n=e:c===-1?c=e:o=e,e++}const l=s!==-1&&n!==-1&&s<n,u=c>=s+1&&o<=n-1;return{valid:l&&u,value:i.slice(c,o+1)}}class Y{constructor(t){this.max=t,this.sources=new Map,this.resultBuilders=new Map}get sections(){return Array.from(this.sources.keys())}reset(){this.sources.clear(),this.resultBuilders.clear()}addSource(t,e,s){this.sources.set(t,e),this.resultBuilders.set(t,s)}getQuery(t){const e=(t||"").trim();return p(e)}getResults(t){const e=[],s=this.getQuery(t);for(const n of this.sources.keys()){if(s instanceof N&&s.child instanceof j&&s.section===n)return this.getSection(n);if(this.max&&e.length>=this.max)return e;this.searchSource(s,n,e,c=>{const o=this.resultBuilders.get(n);e.push(o(c,t))})}return e}getSection(t){const e=[],s=this.sources.get(t);for(const n of s){const c=this.resultBuilders.get(t);e.push(c(n,""))}return e}searchSource(t,e,s,n){const c=this.sources.get(e);if(!!c)for(const o of c){if(this.max&&s.length>=this.max)return;this.matchItem(t,o,{section:e})&&n(o)}}matchItem(t,e,s){const n=JSON.stringify(e),c=s==null?void 0:s.field,o=s==null?void 0:s.section,l=c?e[c]:n;if(t instanceof M)return this.matchItem(t.child,e,{section:o});if(t instanceof R){const u=t.field;return this.matchItem(t.child,e,{field:u,section:o})}if(t instanceof $)return t.children.every(u=>this.matchItem(u,e,{section:o}));if(t instanceof B)return t.children.some(u=>this.matchItem(u,e,{section:o}));if(t instanceof D)return!this.matchItem(t.child,e,{section:o});if(t instanceof N)return t.section===o&&this.matchItem(t.child,e,{section:t.section});if(t instanceof P){const u=t.field,d=e[u];if(d===void 0)return!1;const h=t.text.text,a=t.operator;if(a==="="){if(d===h)return!0}else if(a==="!="){if(d!==h)return!0}else if(a==="<"){if(d<h)return!0}else if(a==="<="){if(d<=h)return!0}else if(a===">"){if(d>h)return!0}else if(a===">="&&d>=h)return!0;return!1}if(t instanceof T){const u=t.options.startInclusive,d=t.options.endInclusive,h=t.start.text,a=t.end.text;return!!(u&&d&&l>=h&&l<=a||u&&!d&&l>=h&&l<a||!u&&d&&l>h&&l<=a||!u&&!d&&l>h&&l<a)}return t instanceof m?t.options.isExactMatch?t.text===l:typeof l=="string"&&Number.isNaN(+l)?l.toLowerCase().includes(t.text.toLowerCase()):l==t.text:t instanceof j}}var Z=Object.defineProperty,k=Object.getOwnPropertyDescriptor,O=(i,t,e,s)=>{for(var n=s>1?void 0:s?k(t,e):t,c=i.length-1,o;c>=0;c--)(o=i[c])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Z(t,e,n),n};let I=class extends V{constructor(){super(...arguments);this.loaded=!1,this.value="",this.results=[],this.query=new Y}render(){return this.loaded?y`<main>
      <header>
        <h2>Query Utilities</h2>
        <input
          type="text"
          placeholder="Search"
          value=${this.value}
          @input=${this.onInput.bind(this)}
        />
      </header>
      <section>
        ${this.results.map(i=>i.type==="USER"?y`<div class="result user">
              <h3>${i.item.name}</h3>
              <p>${i.item.email}</p>
            </div>`:i.type==="TODO"?y`<div class="result todo">
              <h3>${i.item.title}</h3>
              <p>Completed: ${i.item.completed}</p>
            </div>`:y``)}
      </section>
    </main>`:y`<div>Loading...</div>`}onInput(i){const t=i.target;this.value=t.value,this.results=[],this.value&&(this.results=this.query.getResults(this.value))}async firstUpdated(){const{query:i}=this,t=await fetch("https://jsonplaceholder.typicode.com/todos").then(s=>s.json());i.addSource("todos",t,(s,n)=>({type:"TODO",item:s,search:n}));const e=await fetch("https://jsonplaceholder.typicode.com/users").then(s=>s.json());i.addSource("users",e,(s,n)=>({type:"USER",item:s,search:n})),this.loaded=!0}};I.styles=J`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    header,
    section {
      max-width: 600px;
      width: 100%;
    }

    input {
      width: 100%;
    }

    div.user {
      border-left: 5px solid #f44336;
    }
    div.todo {
      border-left: 5px solid #2196f3;
    }
    div.result {
      padding: 10px;
    }
  `;O([L()],I.prototype,"loaded",2);O([L()],I.prototype,"value",2);O([L()],I.prototype,"results",2);I=O([H("search-example")],I);
