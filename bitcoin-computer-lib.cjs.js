"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("bitcoin-computer-bitcore");require("ses");var e=require("axios");var n=require("crypto");var r=require("crypto-js");var s=require("eciesjs");function o(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var c=o(e);var a=o(n);var u=o(r);var d=i(s);function h(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]])}return n}function l(t,e,n,r){var s,o=arguments.length,i=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i}function f(t,e,n,r){return new(n||(n=Promise))((function(s,o){function i(t){try{a(r.next(t))}catch(t){o(t)}}function c(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,c)}a((r=r.apply(t,e||[])).next())}))}const p=t=>new Compartment({}).evaluate(t);const g=(t,e,n)=>new Compartment({target:t,thisArgument:e,argumentsList:n}).evaluate("Reflect.apply(target, thisArgument, argumentsList)");const v=(t,e)=>new Compartment({target:t,argumentsList:e}).evaluate(`Reflect.construct(${t}, argumentsList)`);const{crypto:_}=t.Bitcoin;const b=(t,e)=>{const n=Date.now();const r=_.Hash.sha256(Buffer.from(e+n));const s=[_.ECDSA.sign(r,t,"big").toString("hex"),t.publicKey.toString(),n];return`Bearer ${Buffer.from(s.join(":")).toString("base64")}`};const w=(t,e,n={})=>{const{path:r,passphrase:s}=n;let o=t.toHDPrivateKey(s,e);return r&&(o=o.derive(r)),o.privateKey};const{Transaction:y}=t.Bitcoin;function m(t){return f(this,void 0,void 0,(function*(){if(!function(t){return void 0!==t.config}(t))throw new Error("Unknown error");const{message:e,config:n,response:r}=t;const s=function(t){try{const e=JSON.parse(t);if("object"!=typeof e)throw new Error("Invalid object");if("string"!=typeof e.txhex)throw new Error("Invalid object");return new y(e.txhex)}catch(t){return null}}(null==n?void 0:n.data);const o=`message\t${e}`;const i=`request\t${null==n?void 0:n.method} ${null==n?void 0:n.url}`;const c=s?`transaction\t ${JSON.stringify(s.toJSON(),null,2)}`:"";const a="post"===(null==n?void 0:n.method)?`data\t${null==n?void 0:n.data}`:"";const u=r?`response\t${JSON.stringify(r.data)}`:"";const d=s?c:a;throw t.message=`\n    Communication Error\n    ${o}\n    ${i}\n    ${d}\n    ${u}`,t}))}class O{constructor(t,e,n={}){this.baseUrl=t,this.headers=n,this.privateKey=e}get(t){return f(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:b(this.privateKey,this.baseUrl)}),(yield c.default.get(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return m(t)}}))}post(t,e){return f(this,void 0,void 0,(function*(){const n=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:b(this.privateKey,this.baseUrl)}),(yield c.default.post(n,e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return m(t)}}))}delete(t){return f(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:b(this.privateKey,this.baseUrl)}),(yield c.default.delete(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return m(t)}}))}}const{PrivateKey:x,Transaction:E}=t.Bitcoin;function S(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function j(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function $(t){j(t);const[e,n]=t.split("/");return{txId:e,outputIndex:parseInt(n,10)}}let N=class{constructor(t,e=new x){this.nodeConfig=t,this.bbs=new O(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}getBalance(t){return f(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bbs.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransaction(t){return f(this,void 0,void 0,(function*(){return new E(yield this.getRawTx(t))}))}getRawTx(t){return f(this,void 0,void 0,(function*(){S(t);const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/tx/${t}`)}))}getRawTxData(t){return f(this,void 0,void 0,(function*(){S(t);const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/tx-data/${t}`)}))}getTransactions(t){return f(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new E(t)))}))}getRawTxs(t){return f(this,void 0,void 0,(function*(){t.map(S);const{chain:e,network:n}=this;return this.bbs.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return f(this,void 0,void 0,(function*(){return this.bbs.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosFromAddress(t){return f(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)}))}postNonStandardUtxo(t){return f(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.post(`/v1/${e}/${n}/non-standard-utxo`,t)}))}getOwnedRevs(t){return f(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/wallet/${t.toString()}/non-standard-utxos`)}))}queryRevs(t){return f(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;if(void 0===e&&void 0===n&&void 0===r)throw new Error("Filter parameter for queryRevs endpoint cannot be empty.");let s="";e&&(s+=`?publicKey=${e}`),n&&(s+=0===s.length?"?":"&",s+=`contractName=${n}`),r&&(s+=0===s.length?"?":"&",s+=`contractHash=${r}`);const{chain:o,network:i}=this;return this.bbs.get(`/v1/${o}/${i}/non-standard-utxos${s}`)}))}getLatestRev(t){return f(this,void 0,void 0,(function*(){j(t);const{chain:e,network:n}=this;const[{rev:r}]=yield this.bbs.get(`/v1/${e}/${n}/rev/${t}`);return r}))}getLatestRevs(t){return f(this,void 0,void 0,(function*(){t.map(j),t.map(j);const{chain:e,network:n}=this;return yield this.bbs.post(`/v1/${e}/${n}/revs`,{ids:t})}))}static getSecretOutput({_url:t,privateKey:e}){return f(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new O(s,e);return{host:s,data:yield o.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return f(this,void 0,void 0,(function*(){return new O(e,n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return f(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new O(s,e);yield o.delete(`/v1/store/${r}`)}))}};N=l([t=>t],N);const I=["_id","_rev","_owners","_amount","_readers","_url","__vouts","__func","__index","__args"];const C=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const A=t=>"object"==typeof t?C(t):C(t).toLowerCase();const T=t=>["number","string","boolean","undefined","Null"].includes(A(t));const R=t=>"Array"===A(t);const P=t=>"Object"===A(t);const K=t=>T(t)||["Array","Object"].includes(A(t));const U=(t,e)=>{if(!K(t)||!K(e))throw new Error(`Unsupported data types for deep equals: ${A(t)} & ${A(e)}`);if(A(t)!==A(e))return!1;if(T(t)&&T(e))return t===e;const n=(t,e)=>Object.entries(t).every((([t,n])=>U(e[t],n)));return t&&e&&n(t,e)&&n(e,t)};const D=t=>{if(T(t))return t;if(R(t))return t.map(D);if(P(t)){const e=Object.keys(t).reduce(((e,n)=>(e[n]=D(t[n]),e)),{});const n=Object.create(Object.getPrototypeOf(t));return Object.assign(n,e)}throw new Error(`Unsupported data type for clone: ${A(t)}`)};const B=(t,e)=>Object.fromEntries(Object.entries(t).map((t=>e(t))));const H=(t,e)=>B(t,(([t,n])=>[t,e(n)]));const L=(t,e)=>Object.fromEntries(Object.entries(t).filter((t=>e(t))));const k=(t,e,n,r)=>{if(T(t))return t;if(R(t))return t.map((t=>k(t,e,n,r)));if(P(t)){t._rev=`${r}/${n}`;const s=e[n];return Object.entries(t).forEach((([n,o])=>{"object"==typeof s&&Object.keys(s).includes(n)&&(t[n]=k(o,e,s[n],r))})),t}throw new Error(`Unsupported type ${A(t)} in deep.updateRev`)};const M=(t,e)=>{if(T(t))return t;if(R(t))return t.map((t=>M(t,e)));if(P(t))return t._id=!t._id||t._id.startsWith("__temp__")?t._rev:t._id,t._root=t._root||e,Object.entries(t).forEach((([n,r])=>{t[n]=M(r,e)})),t;throw new Error(`Unsupported type ${A(t)} in deep.addId`)};const F=t=>{if(T(t))return t;if(R(t))return t.map((t=>F(t)));if(P(t)){const e=`__temp__/${Math.random()}`;return t._id=t._id||e,t._rev=t._rev||e,Object.values(t).map((t=>F(t))),t}throw new Error(`Unsupported type ${A(t)} in addRandomId`)};const G=t=>{if(T(t))return t;if(R(t))return t.map((t=>G(t)));if(P(t))return B(t,(([t,e])=>["_owners","_readers"].includes(t)?[t,JSON.stringify(e)]:T(e)?[t,e]:[t,G(e)]));throw new Error(`Unexpected type ${A(t)} in stringifyOwners`)};const J=t=>(t._owners&&(t._owners=JSON.parse(t._owners)),t._readers&&(t._readers=JSON.parse(t._readers)),t);const q=t=>{if(T(t))return t;if(R(t)||P(t))return Object.entries(t).reduce(((t,[e,n])=>{const r=q(n);return(t=>"Object"===A(t)&&Object.keys(t).every((t=>!Number.isNaN(parseInt(t,10)))))(r)?Object.entries(r).forEach((([n,r])=>{t[`${e}_${n}`]=r})):t[e]=r,t}),{});throw new Error(`Unsupported type ${A(t)} in encodeArraysAsObjects`)};const W=t=>{const e={[t._id]:Object.entries(t).reduce(((t,[e,n])=>I.includes(e)?Object.assign(Object.assign({},t),{[e]:n}):T(n)?Object.assign(Object.assign({},t),{[`__basic__${e}`]:n}):Object.assign(Object.assign({},t),{[e]:n._id})),{})};return Object.values(t).filter((t=>!T(t))).reduce(((t,e)=>Object.assign(Object.assign({},t),W(e))),e)};const Z=t=>L(t,(([t])=>!t.startsWith("__basic__")));const Y=(t,e)=>{const n=t[e];return n.__contains=Object.entries(n).reduce(((e,[n,r])=>["__contains",...I].includes(n)?e:"__change"===n?"new"===r||"diff"===r||e:Y(t,r)[r].__contains||e),!1),t};const X=(t,e)=>t.map((t=>Object.entries(t).reduce(((t,[n,r])=>{const s="string"==typeof r&&"undefined"!==A(e[r])?e[r]:r;return Object.assign(Object.assign({},t),{[n]:s})}),{})));class z{constructor(t){this.db=t}get(t){return f(this,void 0,void 0,(function*(){const{txId:e,outputIndex:n}=$(t);const{inRevs:r,outData:s}=yield this.db.fromTxId(e);if(!Array.isArray(r)||!Array.isArray(s)||0===s.length)return;const o=s[0].__index||{};const i=s[o.obj].__cls||"";const c=s[o.obj].__func||"";const a=s[o.obj].__args||[];const u=yield Promise.all(Object.values(o).map((t=>{const e=r[t];return e?this.get(e):Promise.resolve({})})));const d=Object.keys(o).map(((t,e)=>[t,u[e]]));const h=Object.fromEntries(d);let l=h.obj;delete h.obj;const f=Object.entries(h).reduce(((t,[e,n])=>{const r=parseInt(e,10);return Number.isNaN(r)||(t[r]=n),t}),[]);const _=function(t,e){let n=0;return e.map((e=>"__"===e?t[n++]:e))}(f,a);let b;if("constructor"===c){const t=p(`(${i})`);l=v(t,_)}else b=g(l[c].bind(l),l,_);Object.entries(o).forEach((([t,n])=>{const r=parseInt(t,10);let o=f[r];"obj"===t?o=l:"res"===t&&(o=b),k(o,s,n,e)}));const w=l._root||`${e}/${o.obj}`;return M([b,l,...f],w),[...f,l,b][n]}))}}function V(t){return{smartArgs:t.filter((t=>t._rev)),dumbArgs:t.map((t=>t._rev?"__":t))}}class Q{constructor(t){this.db=t,Q.proxyDepth=Q.proxyDepth||0}static getUpdate(t){return f(this,void 0,void 0,(function*(){let e;let n;let r;let s;let o;let i;let c;if("Cls"in t){const{Cls:a}=t;const u=t.args||[];e=a.toString(),n=null,r=v(a,u),s=D(u),o=u,i=null,c=void 0}else{const{target:a,property:u,args:d}=t;e=null,n=D(a),r=a,s=D(d),o=d,i=u,this.proxyDepth+=1,c=g(a[u],a,o),this.proxyDepth-=1}const{smartArgs:a,dumbArgs:u}=V(s);const{smartArgs:d}=V(o);const l=Object.assign(Object.assign(Object.assign({},a),{obj:n}),{_id:"index"});const f=Object.assign(Object.assign(Object.assign({},d),{obj:r}),{_id:"index"});["Object","Array"].includes(A(c))&&(f.res=c);const[p,_,b]=((t,e)=>{const n=F(e);const r=n._id;const s=D(t);const o=D(n);const i=G(s);const c=G(o);const a=q(i);const u=q(c);const d=((t,e)=>B(e,(([e,n])=>{const r=t[e];var s;return n.__change=(s=r)?U(s,n)?"same":"diff":"new",[e,n]})))(W(a),W(u));const l=H(d,Z);const f=Y(l,r);const p=f[r];delete f[r];const g=H(f,(t=>t._rev));const v=(_=t=>t.__contains||Object.values(p).includes(t._id),L(f,(([,t])=>_(t))));var _;const b=Object.values(v);const[w,y]=(m=t=>"new"===t.__change,b.reduce((([t,e],n,r)=>m(n)?[[...t,n],e]:[t,[...e,n]]),[[],[]]));var m;const O=[...y,...w];const x=(t=>t.reduce(((t,e,n)=>Object.assign(Object.assign({},t),{[e._id]:n})),{}))(O);const E=X(O,x);const[S]=X([p],x);const j=y.map((t=>t._rev));const[$,...N]=((t,e)=>[e,...t].map((t=>{const e=h(t,["_id","_rev","__change","__contains"]);return L(e,(([t,e])=>I.includes(t)||"number"==typeof e))})))(E,S);return[j,N.map(J).map((t=>Object.entries(t).reduce(((t,[e,n])=>Object.assign(Object.assign({},t),{[e]:g[n]||n})),{}))),$]})(l,f);void 0!==_[0]&&(_[0].__index=b);const w=b.obj;void 0!==_[w]&&(null!==e&&(_[w].__cls=e),_[w].__func=null===i?"constructor":String(i),_[w].__args=u);const y=b.res;return void 0!==_[y]&&"function Object() { [native code] }"!==c.constructor.toString()&&(_[y].__cls=c.constructor.toString()),[p,_,r,d,c,b]}))}allocate(t,e){return f(this,void 0,void 0,(function*(){const[n,r,s,o,,i]=yield Q.getUpdate({Cls:t,args:e});const[c]=yield this.db.update(n,r);const{txId:a}=$(c);Object.entries(i).forEach((([t,e])=>{const n=parseInt(t,10);let i=o[n];"obj"===t&&(i=s),k(i,r,e,a)}));const u=`${a}/${i.obj}`;return M([s,...o],u),s}))}update(t,e,n){return f(this,void 0,void 0,(function*(){const[r,s,,o,i,c]=yield Q.getUpdate({target:t,property:e,args:n});const[a]=yield this.db.update(r,s);const{txId:u}=$(a);Object.entries(c).forEach((([e,n])=>{const r=parseInt(e,10);let c=o[r];"obj"===e?c=t:"res"===e&&(c=i),k(c,s,n,u)}));const d="string"==typeof t._root?t._root:`${u}/${c.obj}`;return M([i,t,...o],d),i}))}get(t,e){return Q.proxyDepth>0||"function"!=typeof t[e]?Reflect.get(t,e):(...n)=>this.update(t,e,n)}}const tt=process.env.CHAIN||"LTC";const et=process.env.NETWORK||"testnet";const nt=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const rt=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var st={CHAIN:tt,NETWORK:et,MIN_NON_DUST_AMOUNT:nt,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,BBS_URL:process.env.BBS_URL?process.env.BBS_URL:"https://node.bitcoincomputer.io",DEFAULT_FEE:rt,SIGHASH_ALL:1,SIGHASH_FORKID:64,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_SEED:"replace this seed",DEFAULT_PATH:"m/44'/0'/0'/0",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80};const{PublicKey:ot,Mnemonic:it,crypto:ct}=t.Bitcoin;const{Point:at}=ct;function ut(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function dt(t,e,n){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(n))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const r=parseInt(t,e).toString(n);return 2===n?r.padStart(8*Math.ceil(r.length/8),"0"):16===n?r.padStart(2*Math.ceil(r.length/2),"0"):r}function ht(t,e){const n=new RegExp(`.{1,${e}}`,"g");return t.match(n)||[]}function lt(t){return ht(t,2).map((t=>dt(t,16,2))).join("")}function ft(t){return ht(t,8).map((t=>dt(t,2,16))).join("")}function pt(t){return t.toString(16).padStart(st.ENCODING_NUMBER_LENGTH,"0")}function gt(t){return parseInt(t,16)}function vt(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let n=0;let r;for(;!e;){if(n>=256)throw new Error("Something went wrong storing data");const i=n.toString(16).padStart(2,"0")+ft((o=n,(s=lt(t).padStart(64,"0")).slice(o)+s.slice(0,o)));try{r=at.fromX(!1,i),e=!0}catch(t){n+=1}}var s,o;if(!r)throw new Error("Something went wrong storing data");return new ot(r)}function _t(t){const e=t.point.getX().toString("hex").padStart(64,"0");const n=dt(e.slice(0,2),16,10);return ft((s=parseInt(n,10),(r=lt(e.slice(2))).slice(-s)+r.slice(0,-s)));var r,s}function bt(t){const e=function(t){const e=new it(st.ANYONE_CAN_SPEND_SEED);return w(e,t,{path:st.DEFAULT_PATH,passphrase:""})}(t);return ot.fromPrivateKey(e)}const{PublicKey:wt,Script:yt}=t.Bitcoin;function mt(t,e,n){if(t.length>st.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t,e,n){const r=n?[...t,bt(e).toBuffer()]:t;const s=new yt;return s.add("OP_1"),r.forEach((t=>{s.add(t)})),s.add(`OP_${r.length}`),s.add("OP_CHECKMULTISIG"),s}(t.map((t=>t.toBuffer())),e,n)}function Ot(t,e){const n=function(t,e){const n=t.chunks.filter((t=>t.buf));return(e?n.slice(0,-1):n).map((t=>t.buf))}(t,e);return n.map((t=>wt.fromBuffer(t)))}function xt(t){return Buffer.from(u.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function Et(t){return`${xt(t)};${t}`}function St(t){const e=t.substr(0,4);const n=t.substr(5);if(!function(t,e){return xt(t)===e}(n,e))throw new Error("Decryption failure");return n}function jt(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:s}=t,o=h(t,["_readers","_url","_owners","_amount"]);const i=function(t,e){const n=a.default.randomBytes(32).toString("hex");const r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=Et(t);return u.default.AES.encrypt(r,n).toString()}(t,n);const s=e.map((t=>function(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=Et(t);return d.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}(n,t)));return{__cypher:r,__secrets:s}}(JSON.stringify(o),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return t}const{Transaction:$t}=t.Bitcoin;const{Output:Nt}=$t;const{UnspentOutput:It}=$t;let Ct=class{constructor(t,e,n){const r=new $t(n);r.feePerKb(st.FEE_PER_KB),this.nodeConfig=t,this.tx=r,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){return new N(this.nodeConfig,this.privateKey)}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return ht(this.opReturns.slice(0,st.ENCODING_LENGTH*st.ENCODING_NUMBER_LENGTH),st.ENCODING_NUMBER_LENGTH).map(gt)}get dataPrefix(){return this.opReturns.slice(9)}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,n]=t;return this.tx.outputs.slice(e,n)}getOutData(t){return f(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>Ot(t,!0))).flat().map(_t).map(ut).join("");const{dataPrefix:n}=this;const r=JSON.parse(n+e);const s=t.toBuffer().toString("hex");return Promise.all(r.map((e=>f(this,void 0,void 0,(function*(){try{const n=yield function(t){return e=>f(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:n}=e,r=h(e,["_url"]);const{host:s,data:o}=yield N.getSecretOutput({_url:n,privateKey:t});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(o)),{_url:s})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:n,__secrets:r}=t,s=h(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},s),JSON.parse(function({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const s=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return St(d.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,n);r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return St(u.default.AES.decrypt(t,n).toString(u.default.enc.Utf8))}(t,s)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}(n,[s])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>Ot(t.script,!1).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(e){return f(this,void 0,void 0,(function*(){if(!e.length)return;const n=e.map($);const r=n.map((t=>t.txId));const s=yield this.restClient.getTransactions(r);for(let e=0;e<n.length;e+=1){const{txId:r,outputIndex:o}=n[e];const{outputs:i}=s[e];const c=i[o];const a=Math.round(c.satoshis);const u=new t.Bitcoin.Script(c.script);const d=new It({txId:r,outputIndex:o,satoshis:a,script:u});const h=Ot(u,!1).map((t=>t.toString()));this.tx.from([d],h,1)}}))}createOpReturnOut(t){this.tx.addData(JSON.stringify(t))}createDataOuts(e){e.forEach((({_amount:e,_owners:n})=>{if(n&&Array.isArray(n)&&n.length>=17)throw new Error("Too many owners.");const r=(n||[]).map((e=>t.Bitcoin.PublicKey.fromString(e)));const s=e||st.MIN_NON_DUST_AMOUNT;const o=mt(r,this.nodeConfig.network,!1);const i=new Nt({script:o,satoshis:s});this.tx.addOutput(i)}));const n=e.map((t=>h(t,["_amount","_owners"])));const r=st.MIN_NON_DUST_AMOUNT;const s=JSON.stringify(n);const o=st.ENCODING_LENGTH*st.ENCODING_NUMBER_LENGTH;const i=st.OP_RETURN_SIZE-o;const c=s.slice(0,i);const a=function(t,e){var n;return function(t,e){const n=[];for(let e=0;e<t.length;e+=2)n.push(t.slice(e,e+2));return n}(ht((n=t,Buffer.from(n).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(vt)).map((t=>mt(t,e,!0)))}(s.slice(i),this.nodeConfig.network);const u=pt(this.tx.inputs.length)+pt(this.tx.outputs.length)+pt(this.tx.outputs.length+a.length);a.forEach((t=>{const e=new Nt({script:t,satoshis:r});this.tx.addOutput(e)})),this.tx.addData(u+c)}static fromTxHex(t,e,n){return f(this,void 0,void 0,(function*(){const r=new this(e,n);r.tx.fromString(t);const s=yield r.getOutData(n);const o=r.getOwners();const i=r.getAmounts();return r.outData=s.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:o[e],_amount:i[e]}))),r}))}static fromTxId(t,e,n){return f(this,void 0,void 0,(function*(){const r=new N(e,n);const s=yield r.getRawTx(t);return this.fromTxHex(s,e,n)}))}};Ct=l([t=>t],Ct);class At{constructor(t){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}get nodeConfig(){return this.wallet.nodeConfig}fromTxHex(t){return f(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();return Ct.fromTxHex(t,n,r)}))}fromTxId(t){return f(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=new N(n,e.getPrivateKey());const s=yield r.getRawTx(t);return this.fromTxHex(s)}))}get(t){return f(this,void 0,void 0,(function*(){const e=t.map($);return Promise.all(e.map((({txId:t,outputIndex:e})=>f(this,void 0,void 0,(function*(){const{outData:n}=yield this.fromTxId(t);if(e>n.length)throw new Error("Index out of bounds");return n[e]})))))}))}put(t){return this.update([],t)}createTx(t,e){return f(this,void 0,void 0,(function*(){const{wallet:n,nodeConfig:r}=this;const s=n.getPrivateKey();const o=new Ct(r,s);const i=e.map((t=>{var{_owners:e}=t,n=h(t,["_owners"]);return Object.assign({_owners:e||[this.wallet.getPublicKey().toString()]},n)})).map(jt);const c=yield Promise.all(i.map(function(t){return e=>f(this,void 0,void 0,(function*(){if(void 0!==e._url){const{_url:n,_owners:r,_amount:s}=e,o=h(e,["_url","_owners","_amount"]);const i=yield N.setSecretOutput({host:n,secretOutput:{data:JSON.stringify(o)},privateKey:t});return void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return e}))}(s)));return yield o.spendFromData(t),yield o.createDataOuts(c),o}))}update(t,e){return f(this,void 0,void 0,(function*(){const n=yield this.createTx(t,e);return yield this.wallet.fundAndSendTransaction(n,!0),n.outRevs}))}}class Tt{constructor(t,e,n={}){const{path:r="m/44'/0'/0'/0",passphrase:s=""}=n;let o=t.toHDPrivateKey(s,e.network);r&&(o=o.derive(r));const i=o.publicKey.toAddress(e.network);this.mnemonic=t,this.restClient=e,this.path=r,this.passphrase=s,this.hdPrivateKey=o,this.address=i}get chain(){return this.restClient.chain}get network(){return this.restClient.network}get nodeConfig(){return this.restClient.nodeConfig}getMnemonic(){return this.mnemonic}getPath(){return this.path}derive(t="0"){const e=`${this.path}${this.path.length>0?"/":""}${t}`;return new Tt(this.mnemonic,this.restClient,{path:e})}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address}getBalance(){return f(this,void 0,void 0,(function*(){return this.restClient.getBalance(this.getAddress())}))}getUtxos(t=this.getAddress()){return f(this,void 0,void 0,(function*(){return this.restClient.getUtxosFromAddress(t)}))}selectUtxos(t,e){let n=0;const r=[];!function(t){const e=t;for(let t=e.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(t);for(let s=0;s<t.length;s+=1){const o=t[s];if(n+=1e8*o.amount,r.push(o),n>=e)return r}const{network:s,chain:o}=this.restClient.nodeConfig;throw new Error(`Insufficient balance in address ${this.getAddress().toString()} on ${s} ${o}. Found ${n}, required ${e}.`)}fundAndSendTransaction(e,n=!1){return f(this,void 0,void 0,(function*(){e.tx.feePerKb(st.FEE_PER_KB);let r=e.tx._getInputAmount();const s=e.tx._getOutputAmount();const o=e.tx._estimateFee();let i=s-r+Math.round(o);for(;i>0;){const n=yield this.getUtxos(this.getAddress());this.selectUtxos(n,i).forEach((n=>{e.tx.from([new t.Bitcoin.Transaction.UnspentOutput(n)])})),r=e.tx._getInputAmount(),i=s-r+Math.round(e.tx._estimateFee())}e.tx.change(this.getAddress()),e.tx.sign(this.getPrivateKey(),st.SIGHASH_ALL);const c=yield this.restClient.sendTransaction(e.tx.toString());return n&&(yield this.storeResult(c,e)),c}))}storeResult(t,e){return f(this,void 0,void 0,(function*(){const{outData:n,inputs:r,inRevs:s,outRevs:o}=e;const i=JSON.stringify(n);yield this.restClient.postNonStandardUtxo({outData:i,txId:t,inputs:r,inRevs:s,outRevs:o})}))}send(t,e){return f(this,void 0,void 0,(function*(){const n=new Ct(this.restClient.nodeConfig,this.getPrivateKey());return n.tx.to(e,t),this.fundAndSendTransaction(n)}))}}class Rt extends class{constructor(t,e){this.chain=t,this.network=e}isNonStandard(){return"BSV"===this.chain}}{constructor(t,e,n){super(t,e),this.url=n}}const{Mnemonic:Pt,PublicKey:Kt}=t.Bitcoin;exports.Computer=class{constructor(t={}){const{seed:e}=t;const{chain:n=st.CHAIN,network:r=st.NETWORK,url:s=st.BBS_URL,passphrase:o=st.PASSPHRASE,path:i=st.DEFAULT_PATH,mnemonic:c=new Pt(e)}=t;if(!["LTC"].includes(n.toUpperCase()))throw new Error("We are currently only supporting LTC");if(!["mainnet","testnet","regtest"].includes(r.toLowerCase()))throw new Error("Please set 'network' to 'testnet', or 'regtest'");const a=w(c,r,{path:i,passphrase:o});const u=new Rt(n,r,s);const d=new N(u,a);this.db=t.db||new At(new Tt(c,d,{path:i,passphrase:o}))}get chain(){return this.db.chain}get network(){return this.db.network}parseContract(t){const e=t.startsWith("export ")?t.slice(7):t;const n=e.startsWith("default ")?e.slice(8):e;return p(`(${n})`)}new(t,e){return f(this,void 0,void 0,(function*(){const n=t.toString();const r=yield this.parseContract(n);const s=new Q(this.db);const o=yield s.allocate(r,e);return new Proxy(o,s)}))}sync(t){return f(this,void 0,void 0,(function*(){j(t);const e=new z(this.db);const n=new Q(this.db);const r=yield e.get(t);return new Proxy(r,n)}))}getOwnedRevs(t=this.db.wallet.getPublicKey()){return this.db.wallet.restClient.getOwnedRevs(t)}queryRevs(t){return f(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;const s=e?new Kt(e):void 0;return this.db.wallet.restClient.queryRevs({publicKey:s,contractName:n,contractHash:r})}))}getRevs(t=this.db.wallet.getPublicKey()){return f(this,void 0,void 0,(function*(){return(yield this.getOwnedRevs(t)).map((({rev:t})=>t))}))}getLatestRev(t){return f(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRev(t)}))}getLatestRevs(t){return f(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRevs(t)}))}};