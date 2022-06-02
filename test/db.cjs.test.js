"use strict";var t=require("bitcoin-computer-bitcore");var e=require("chai");var n=require("exponential-backoff");var r=require("axios");require("child_process");var o=require("crypto");var s=require("crypto-js");var i=require("eciesjs");require("ses");var a=require("http");var c=require("https");var u=require("url");var d=require("util");function f(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function l(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var p=f(r);var h=f(o);var g=f(s);var v=l(i);var b=f(a);var y=f(c);var w=f(u);var m=f(d);function x(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function S(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}function _(t,e,n,r){return new(n||(n=Promise))((function(o,s){function i(t){try{c(r.next(t))}catch(t){s(t)}}function a(t){try{c(r.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((r=r.apply(t,e||[])).next())}))}const{crypto:T}=t.Bitcoin;const O=(t,e)=>{const n=Date.now();const r=T.Hash.sha256(Buffer.from(e+n));const o=[T.ECDSA.sign(r,t,"big").toString("hex"),t.publicKey.toString(),n];return`Bearer ${Buffer.from(o.join(":")).toString("base64")}`};class C{constructor(t,e,n={}){this.baseUrl=t,this.headers=n,this.privateKey=e}get(t){return _(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield p.default.get(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}post(t,e){return _(this,void 0,void 0,(function*(){const n=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield p.default.post(`${this.baseUrl}${t}`,e,{headers:Object.assign(Object.assign({},this.headers),n)})).data}))}delete(t){return _(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield p.default.delete(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}}var P={CHAIN:process.env.CHAIN||"LTC",NETWORK:process.env.NETWORK||"testnet",BCN_URL:process.env.BCN_URL||"https://node.bitcoincomputer.io",TEST_SEEDS:"travel upgrade inside soda birth essence junk merit never twenty system opinion;toddler hockey salute wheel harvest video narrow riot guitar lake sea call;cannon hour begin test replace fury motion squirrel envelope announce neck culture"};class E extends class{constructor({chain:t=P.CHAIN,network:e=P.NETWORK}={}){this.chain=t,this.network=e}}{constructor({chain:t=P.CHAIN,network:e=P.NETWORK,url:n=P.BCN_URL}={}){super({chain:t,network:e}),this.url=n}}const{PrivateKey:R,Transaction:N}=t.Bitcoin;const{UnspentOutput:B}=N;function A(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function I(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function K(t){I(t);const[e,n]=t.split("/");return{txId:e,outputIndex:parseInt(n,10)}}let k=class{constructor({nodeConfig:t=new E,privateKey:e=new R}={}){this.nodeConfig=t,this.bcn=new C(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getBalance(t){return _(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bcn.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransaction(t){return _(this,void 0,void 0,(function*(){return new N(yield this.getRawTx(t))}))}getRawTx(t){return _(this,void 0,void 0,(function*(){A(t);const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/tx/${t}`)}))}getTransactions(t){return _(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new N(t)))}))}getRawTxs(t){return _(this,void 0,void 0,(function*(){t.map(A);const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return _(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosByAddress(t){return _(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return(yield this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)).map((({rev:t,scriptPubKey:e,satoshis:n})=>{const[r,o]=t.split("/");return new B({txId:r,outputIndex:parseInt(o,10),satoshis:n,script:e})}))}))}getOwnedRevs(t){return _(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/non-standard-utxos`)}))}queryRevs(t){return _(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;if(void 0===e&&void 0===n&&void 0===r)throw new Error("Filter parameter for queryRevs endpoint cannot be empty.");let o="";e&&(o+=`?publicKey=${e}`),n&&(o+=0===o.length?"?":"&",o+=`contractName=${n}`),r&&(o+=0===o.length?"?":"&",o+=`contractHash=${r}`);const{chain:s,network:i}=this;return this.bcn.get(`/v1/${s}/${i}/non-standard-utxos${o}`)}))}getLatestRev(t){return _(this,void 0,void 0,(function*(){I(t);const{chain:e,network:n}=this;const[{rev:r}]=yield this.bcn.get(`/v1/${e}/${n}/rev/${t}`);return r}))}getLatestRevs(t){return _(this,void 0,void 0,(function*(){t.map(I),t.map(I);const{chain:e,network:n}=this;return yield this.bcn.post(`/v1/${e}/${n}/revs`,{ids:t})}))}static getSecretOutput({_url:t,privateKey:e}){return _(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const o=n.slice(0,-2).join("/");const s=new C(o,e);return{host:o,data:yield s.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return _(this,void 0,void 0,(function*(){return new C(e,n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return _(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const o=n.slice(0,-2).join("/");const s=new C(o,e);yield s.delete(`/v1/store/${r}`)}))}};k=S([t=>t],k);const U=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const j=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var D={MIN_NON_DUST_AMOUNT:U,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,DEFAULT_FEE:j,SIGHASH_ALL:1,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_SEED:"replace this seed",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80};const{PublicKey:H,crypto:M}=t.Bitcoin;const{Point:$}=M;function L(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function q(t,e){return t.slice(e)+t.slice(0,e)}function W(t,e,n){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(n))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const r=parseInt(t,e).toString(n);return 2===n?r.padStart(8*Math.ceil(r.length/8),"0"):16===n?r.padStart(2*Math.ceil(r.length/2),"0"):r}function F(t,e){const n=new RegExp(`.{1,${e}}`,"g");return t.match(n)||[]}function G(t){return F(t,2).map((t=>W(t,16,2))).join("")}function J(t){return F(t,8).map((t=>W(t,2,16))).join("")}function z(t){return t.toString(16).padStart(D.ENCODING_NUMBER_LENGTH,"0")}function Y(t){return parseInt(t,16)}function X(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let n=0;let r;for(;!e;){if(n>=256)throw new Error("Something went wrong storing data");const o=n.toString(16).padStart(2,"0")+J(q(G(t).padStart(64,"0"),n));try{r=$.fromX(!1,o),e=!0}catch(t){n+=1}}if(!r)throw new Error("Something went wrong storing data");return new H(r)}function Z(t){const e=t.point.getX().toString("hex").padStart(64,"0");const n=W(e.slice(0,2),16,10);return J((o=parseInt(n,10),(r=G(e.slice(2))).slice(-o)+r.slice(0,-o)));var r,o}function Q(t=P.CHAIN,e=P.NETWORK){if("testnet"===e||"regtest"===e)return 1;if("BTC"===t)return 0;if("LTC"===t)return 2;if("DOGE"===t)return 3;if("BCH"===t)return 145;if("BSV"===t)return 236;throw new Error(`Unsupported chain ${t}`)}function V({purpose:t=44,coinType:e=2,account:n=0}={}){return`m/${t.toString()}'/${e.toString()}'/${n.toString()}'`}function tt(t=P.CHAIN,e=P.NETWORK){return V({coinType:Q(t,e)})}function et(){return Math.round(Math.random()*Math.pow(2,31))}const{PublicKey:nt,Script:rt}=t.Bitcoin;function ot(t){if(t.length>D.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t){const e=new rt;return e.add("OP_1"),t.forEach((t=>{e.add(t)})),e.add(`OP_${t.length}`),e.add("OP_CHECKMULTISIG"),e}(t.map((t=>t.toBuffer())))}function st(t){return function(t){return t.chunks.filter((t=>t.buf)).map((t=>t.buf))}(t).map((t=>nt.fromBuffer(t)))}function at(t){return Buffer.from(g.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function ct(t){return`${at(t)};${t}`}function ut(t){const e=t.substr(0,4);const n=t.substr(5);if(!function(t,e){return at(t)===e}(n,e))throw new Error("Decryption failure");return n}function dt(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:o}=t,s=x(t,["_readers","_url","_owners","_amount"]);const i=function(t,e){const n=h.default.randomBytes(32).toString("hex");const r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=ct(t);return g.default.AES.encrypt(r,n).toString()}(t,n);const o=e.map((t=>function(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=ct(t);return v.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}(n,t)));return{__cypher:r,__secrets:o}}(JSON.stringify(s),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==o&&(i._amount=o),i}return t}const{Transaction:ft}=t.Bitcoin;const{Output:lt}=ft;const{UnspentOutput:pt}=ft;let ht=class{constructor(t,e,n){const r=new ft(n);r.feePerKb(D.FEE_PER_KB),this.nodeConfig=t,this.tx=r,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){const{nodeConfig:t,privateKey:e}=this;return new k({nodeConfig:t,privateKey:e})}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return F(this.opReturns.slice(0,D.ENCODING_LENGTH*D.ENCODING_NUMBER_LENGTH),D.ENCODING_NUMBER_LENGTH).map(Y)}get dataPrefix(){return this.opReturns.slice(9)}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,n]=t;return this.tx.outputs.slice(e,n)}getOutData(t){return _(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>st(t))).flat().map(Z).map(L).join("");const{dataPrefix:n}=this;const r=JSON.parse(n+e);const o=t.toBuffer().toString("hex");const s=this.getOwnerOutputs();if(s.length!==r.length)throw new Error("Inconsistent state");const i=s.map(((t,e)=>Object.assign(Object.assign({},r[e]),{_owners:st(t.script).map((t=>t.toString())),_amount:t.satoshis})));return Promise.all(i.map((e=>_(this,void 0,void 0,(function*(){try{const n=yield function(t){return e=>_(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:n}=e,r=x(e,["_url"]);const{host:o,data:s}=yield k.getSecretOutput({_url:n,privateKey:t});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(s)),{_url:o})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:n,__secrets:r}=t,o=x(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},o),JSON.parse(function({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const o=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return ut(v.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,n);r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return ut(g.default.AES.decrypt(t,n).toString(g.default.enc.Utf8))}(t,o)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}(n,[o])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>st(t.script).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(e){return _(this,void 0,void 0,(function*(){if(!e.length)return;const n=e.map(K);const r=n.map((t=>t.txId));const o=yield this.restClient.getTransactions(r);for(let e=0;e<n.length;e+=1){const{txId:r,outputIndex:s}=n[e];const{outputs:i}=o[e];const a=i[s];const c=Math.round(a.satoshis);const u=new t.Bitcoin.Script(a.script);const d=new pt({txId:r,outputIndex:s,satoshis:c,script:u});const f=st(u).map((t=>t.toString()));this.tx.from([d],f,1)}}))}createDataOuts(e){e.forEach((({_amount:e,_owners:n=[]})=>{if(Array.isArray(n)&&n.length>D.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners.");const r=n.map((e=>t.Bitcoin.PublicKey.fromString(e)));const o=e||D.MIN_NON_DUST_AMOUNT;const s=ot(r);this.tx.addOutput(new lt({script:s,satoshis:o}))}));const n=e.map((t=>x(t,["_amount","_owners"])));const r=D.MIN_NON_DUST_AMOUNT;const o=JSON.stringify(n);const s=D.OP_RETURN_SIZE-D.ENCODING_LENGTH*D.ENCODING_NUMBER_LENGTH;const i=o.slice(0,s);const a=function(t){var e;return function(t,e){const n=[];for(let r=0;r<t.length;r+=e)n.push(t.slice(r,r+e));return n}(F((e=t,Buffer.from(e).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(X),D.MAX_PUBKEYS_PER_SCRIPT).map((t=>ot(t)))}(o.slice(s));const c=z(this.tx.inputs.length)+z(this.tx.outputs.length)+z(this.tx.outputs.length+a.length);a.forEach((t=>{this.tx.addOutput(new lt({script:t,satoshis:r}))})),this.tx.addData(c+i)}static fromTxHex(t,e,n){return _(this,void 0,void 0,(function*(){let r=[];let o=[];let s=[];const i=new this(e,n);i.tx.fromString(t);try{r=yield i.getOutData(n)}catch(t){}try{o=i.getOwners()}catch(t){}try{s=i.getAmounts()}catch(t){}return i.outData=r.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:o[e],_amount:s[e]}))),i}))}static fromTxId(t,e,n){return _(this,void 0,void 0,(function*(){const r=new k({nodeConfig:e,privateKey:n});const o=yield r.getRawTx(t);return this.fromTxHex(o,e,n)}))}};ht=S([t=>t],ht);class gt{constructor({seed:e="",chain:n=P.CHAIN,network:r=P.NETWORK,url:o=P.BCN_URL,path:s=tt(),passphrase:i=""}={}){this.passphrase=i,this.seed=e,this.path=s;const a=new t.Bitcoin.Mnemonic(e);this.hdPrivateKey=a.toHDPrivateKey(i,r).deriveChild(s);const c=new E({chain:n,network:r,url:o});this.restClient=new k({nodeConfig:c,privateKey:this.hdPrivateKey.privateKey}),this.address=this.hdPrivateKey.publicKey.toAddress(r)}get nodeConfig(){return this.restClient.nodeConfig}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getMnemonic(){return new t.Bitcoin.Mnemonic(this.seed)}derive(t="0"){const e=`${this.path}${this.path.length>0?"/":""}${t}`;const{seed:n,chain:r,network:o,url:s}=this;return new gt({seed:n,chain:r,network:o,url:s,path:e})}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address}getBalance(){return _(this,void 0,void 0,(function*(){return this.restClient.getBalance(this.getAddress())}))}getUtxosByAmount(t){return _(this,void 0,void 0,(function*(){const e=yield this.restClient.getUtxosByAddress(this.getAddress());let n=0;const r=[];!function(t){const e=t;for(let t=e.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(e);for(const o of e)if(n+=o.satoshis,r.push(o),n>=t)return r;const{network:o,chain:s}=this.restClient.nodeConfig;const i=this.getAddress().toString();throw new Error(`Insufficient balance in address ${i} on ${o} ${s}. Found ${n}, required ${t}.`)}))}fundAndSendTx(e){return _(this,void 0,void 0,(function*(){e.tx.feePerKb(D.FEE_PER_KB);const{chain:r,network:o}=this.nodeConfig;const{enc:s}=e;const[,i=0]=s;const a=i*function(t){if("LTC"===t)return 8e3;if("BTC"===t)return 22;if("DOGE"===t)return 7e6;if("BCH"===t)return 2700;throw new Error(`Unsupported chain ${t}`)}(r);const c=.001*e.tx._getOutputAmount();const u=Math.max(D.MIN_NON_DUST_AMOUNT,a+c);e.tx.to(function(t,e){const n={"any-testnet":"gLjNGbKQzxqKA9bv2nhn1Ewf7rxYVXgrtR","BTC-mainnet":"84ZHRqRPTcUv6AFGMVC1KmSUeC9Y8SNfMm","LTC-mainnet":"mov5ivrsqWut5ffZhiz18uAkwy2D4y98iz","DOGE-mainnet":"1MVukPYmWdbEoxy3Sqq1ES4nYqDfpB5e68","BCH-mainnet":"P9CmJszhvARfQc8YjUW1K2oBnus1ZQWEqk","BSV-mainnet":"G2wxQ74zX48WMo7sfiX1faGGNQB8ebVth"};return q("testnet"===e||"regtest"===e?n["any-testnet"]:n[`${t}-${e}`],19)}(r,o),Math.round(u));let d=e.tx._getInputAmount();const f=e.tx._getOutputAmount();const l=e.tx._estimateFee();let p=f-d+Math.round(l);return p>0&&((yield n.backOff((()=>this.getUtxosByAmount(p)))).forEach((n=>{e.tx.from([new t.Bitcoin.Transaction.UnspentOutput(n)])})),d=e.tx._getInputAmount(),p=f-d+Math.round(e.tx._estimateFee())),e.tx.change(this.getAddress()),e.tx.sign(this.getPrivateKey(),D.SIGHASH_ALL),this.restClient.sendTransaction(e.tx.toString())}))}send(t,e){return _(this,void 0,void 0,(function*(){const{nodeConfig:n}=this.restClient;const r=this.getPrivateKey();const o=new ht(n,r);return o.tx.to(e,t),this.fundAndSendTx(o)}))}}class vt{constructor({wallet:t=new gt}={}){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}get nodeConfig(){return this.wallet.nodeConfig}fromTxHex(t){return _(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();return ht.fromTxHex(t,n,r)}))}fromTxId(t){return _(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();const o=new k({nodeConfig:n,privateKey:r});const s=yield o.getRawTx(t);return this.fromTxHex(s)}))}get(t){return _(this,void 0,void 0,(function*(){const e=t.map(K);return Promise.all(e.map((({txId:t,outputIndex:e})=>_(this,void 0,void 0,(function*(){const{outData:n}=yield this.fromTxId(t);if(e>n.length)throw new Error("Index out of bounds");return n[e]})))))}))}put(t){return this.update([],t)}createTx(t,e){return _(this,void 0,void 0,(function*(){const{wallet:n,nodeConfig:r}=this;const o=n.getPrivateKey();const s=new ht(r,o);const i=e.map((t=>{var{_owners:e}=t,n=x(t,["_owners"]);return Object.assign({_owners:e||[this.wallet.getPublicKey().toString()]},n)})).map(dt);const a=yield Promise.all(i.map(function(t){return e=>_(this,void 0,void 0,(function*(){if(void 0!==e._url){const{_url:n,_owners:r,_amount:o}=e,s=x(e,["_url","_owners","_amount"]);const i=yield k.setSecretOutput({host:n,secretOutput:{data:JSON.stringify(s)},privateKey:t});return void 0!==r&&(i._owners=r),void 0!==o&&(i._amount=o),i}return e}))}(o)));return yield s.spendFromData(t),yield s.createDataOuts(a),s}))}update(t,e){return _(this,void 0,void 0,(function*(){const n=yield this.createTx(t,e);return yield this.wallet.fundAndSendTx(n),n.outRevs}))}}var bt=b.default;var yt=y.default;var wt=w.default;function mt(t){"string"==typeof t&&(t=function(t){var e=wt.parse(t);var n=e.hostname;var r=parseInt(e.port,10);var o=e.protocol;o=o.substring(0,o.length-1);var s=e.auth.split(":");return{host:n,port:r,protocol:o,user:s[0]?decodeURIComponent(s[0]):null,pass:s[1]?decodeURIComponent(s[1]):null}}(t)),t=t||{},this.host=t.host||"127.0.0.1",this.port=t.port||8332,this.user=t.user||"user",this.pass=t.pass||"pass",this.protocol="http"===t.protocol?bt:yt,this.batchedCalls=null,this.disableAgent=t.disableAgent||!1;var e=void 0!==t.rejectUnauthorized;this.rejectUnauthorized=!e||t.rejectUnauthorized,mt.config.log?this.log=mt.config.log:this.log=mt.loggers[mt.config.logger||"normal"]}var xt=console.log.bind(console);var St=function(){};function _t(t,e){var n=this;t=JSON.stringify(t);var r=this.user+":"+this.pass;var o=Buffer.from&&Buffer.from!==Uint8Array.from?Buffer.from(r):new Buffer(r);this.auth=o.toString("base64");var s={host:n.host,path:"/",method:"POST",port:n.port,rejectUnauthorized:n.rejectUnauthorized,agent:!n.disableAgent&&void 0};if(n.httpOptions)for(var i in n.httpOptions)s[i]=n.httpOptions[i];var a=!1;var c="Bitcoin JSON-RPC: ";var u=this.protocol.request(s,(function(t){var r="";t.on("data",(function(t){r+=t})),t.on("end",(function(){if(!a)if(a=!0,401!==t.statusCode)if(403!==t.statusCode){if(500===t.statusCode&&"Work queue depth exceeded"===r.toString("utf8")){var o=new Error("Bitcoin JSON-RPC: "+r.toString("utf8"));return o.code=429,void e(o)}var s;try{s=JSON.parse(r)}catch(o){n.log.err(o.stack),n.log.err(r),n.log.err("HTTP Status code:"+t.statusCode);var i=new Error(c+"Error Parsing JSON: "+o.message);return void e(i)}e(s.error,s)}else e(new Error(c+"Connection Rejected: 403 Forbidden"));else e(new Error(c+"Connection Rejected: 401 Unnauthorized"))}))}));u.on("error",(function(t){var n=new Error(c+"Request Error: "+t.message);a||(a=!0,e(n))})),u.setHeader("Content-Length",t.length),u.setHeader("Content-Type","application/json"),u.setHeader("Authorization","Basic "+n.auth),u.write(t),u.end()}mt.loggers={none:{info:St,warn:St,err:St,debug:St},normal:{info:xt,warn:xt,err:xt,debug:St},debug:{info:xt,warn:xt,err:xt,debug:xt}},mt.config={logger:"normal"},mt.prototype.batch=function(t,e){this.batchedCalls=[],t(),_t.call(this,this.batchedCalls,e),this.batchedCalls=null},mt.callspec={abandonTransaction:"str",abortRescan:"",addMultiSigAddress:"",addNode:"",analyzePSBT:"str",backupWallet:"",bumpFee:"str",clearBanned:"",combinePSBT:"obj",combineRawTransaction:"obj",convertToPSBT:"str",createMultiSig:"",createPSBT:"obj",createRawTransaction:"obj obj",createWallet:"str",decodePSBT:"str",decodeScript:"str",decodeRawTransaction:"",deriveAddresses:"str",disconnectNode:"",dumpPrivKey:"",dumpWallet:"str",encryptWallet:"",enumerateSigners:"",estimateFee:"",estimateSmartFee:"int str",estimatePriority:"int",generate:"int",generateBlock:"str obj",generateToAddress:"int str",generateToDescriptor:"int str",getAccount:"",getAccountAddress:"str",getAddedNodeInfo:"",getAddressMempool:"obj",getAddressUtxos:"obj",getAddressBalance:"obj",getAddressDeltas:"obj",getAddressesByLabel:"str",getAddressInfo:"str",getAddressTxids:"obj",getAddressesByAccount:"",getBalance:"str int",getBalances:"",getBestBlockHash:"",getBlockDeltas:"str",getBlock:"str int",getBlockchainInfo:"",getBlockCount:"",getBlockFilter:"str",getBlockHashes:"int int obj",getBlockHash:"int",getBlockHeader:"str",getBlockNumber:"",getBlockStats:"str",getBlockTemplate:"",getConnectionCount:"",getChainTips:"",getChainTxStats:"",getDescriptorInfo:"str",getDifficulty:"",getGenerate:"",getHashesPerSec:"",getIndexInfo:"",getInfo:"",getMemoryInfo:"",getMemoryPool:"",getMemPoolAncestors:"str",getMemPoolDescendants:"str",getMemPoolEntry:"str",getMemPoolInfo:"",getMiningInfo:"",getNetTotals:"",getNetworkHashPS:"",getNetworkInfo:"",getNewAddress:"str str",getNodeAddresses:"",getPeerInfo:"",getRawChangeAddress:"",getRawMemPool:"bool",getRawTransaction:"str int",getReceivedByAccount:"str int",getReceivedByAddress:"str int",getReceivedByLabel:"str",getRpcInfo:"",getSpentInfo:"obj",getTransaction:"",getTxOut:"str int bool",getTxOutProof:"",getTxOutSetInfo:"",getUnconfirmedBalance:"",getWalletInfo:"",getWork:"",getZmqNotifications:"",finalizePSBT:"str",fundRawTransaction:"str",help:"",importAddress:"str str bool",importDescriptors:"str",importMulti:"obj obj",importPrivKey:"str str bool",importPrunedFunds:"str, str",importPubKey:"str",importWallet:"str",invalidateBlock:"str",joinPSBTs:"obj",keyPoolRefill:"",listAccounts:"int",listAddressGroupings:"",listBanned:"",listDescriptors:"",listLabels:"",listLockUnspent:"bool",listReceivedByAccount:"int bool",listReceivedByAddress:"int bool",listReceivedByLabel:"",listSinceBlock:"str int",listTransactions:"str int int",listUnspent:"int int",listWalletDir:"",listWallets:"",loadWallet:"str",lockUnspent:"",logging:"",move:"str str float int str",ping:"",preciousBlock:"str",prioritiseTransaction:"str float int",pruneBlockChain:"int",psbtBumpFee:"str",removePrunedFunds:"str",reScanBlockChain:"",saveMemPool:"",send:"obj",setHDSeed:"",setLabel:"str str",setWalletFlag:"str",scanTxOutSet:"str",sendFrom:"str str float int str str",sendMany:"str obj int str",sendRawTransaction:"str",sendToAddress:"str float str str",setAccount:"",setBan:"str str",setNetworkActive:"bool",setGenerate:"bool int",setTxFee:"float",signMessage:"",signMessageWithPrivKey:"str str",signRawTransaction:"",signRawTransactionWithKey:"str obj",signRawTransactionWithWallet:"str",stop:"",submitBlock:"str",submitHeader:"str",testMemPoolAccept:"obj",unloadWallet:"",upgradeWallet:"",uptime:"",utxoUpdatePSBT:"str",validateAddress:"",verifyChain:"",verifyMessage:"",verifyTxOutProof:"str",walletCreateFundedPSBT:"",walletDisplayAddress:"str",walletLock:"",walletPassPhrase:"string int",walletPassphraseChange:"",walletProcessPSBT:"str"};var Tt=function(t,e,n){return Array.prototype.slice.call(t,e,n)};function Ot(){return parseInt(1e5*Math.random())}!function(t,e,n){function r(t,e){return function(){var r=arguments.length-1;this.batchedCalls&&(r=arguments.length);for(var o=0;o<r;o++)e[o]&&(arguments[o]=e[o](arguments[o]));this.batchedCalls?this.batchedCalls.push({jsonrpc:"2.0",method:t,params:Tt(arguments),id:Ot()}):n.call(this,{method:t,params:Tt(arguments,0,arguments.length-1),id:Ot()},arguments[arguments.length-1])}}var o={str:function(t){return t.toString()},int:function(t){return parseFloat(t)},float:function(t){return parseFloat(t)},bool:function(t){return!0===t||"1"==t||"true"==t||"true"==t.toString().toLowerCase()},obj:function(t){return"string"==typeof t?JSON.parse(t):t}};for(var s in e){var i=[];if(e[s].length){i=e[s].split(" ");for(var a=0;a<i.length;a++)o[i[a]]?i[a]=o[i[a]]:i[a]=o.str}var c=s.toLowerCase();t.prototype[s]=r(c,i),t.prototype[c]=t.prototype[s]}}(mt,mt.callspec,_t);var Ct=mt;const Pt=new Ct({protocol:process.env.RPC_PROTOCOL,user:process.env.RPC_USER,pass:process.env.RPC_PASSWORD,host:process.env.RPC_HOST,port:process.env.RPC_PORT});m.default.promisify(Ct.prototype.createwallet.bind(Pt)),m.default.promisify(Ct.prototype.getaddressinfo.bind(Pt)),m.default.promisify(Ct.prototype.getBlock.bind(Pt)),m.default.promisify(Ct.prototype.getBlockchainInfo.bind(Pt)),m.default.promisify(Ct.prototype.getBlockHash.bind(Pt)),m.default.promisify(Ct.prototype.generateToAddress.bind(Pt)),m.default.promisify(Ct.prototype.getRawTransaction.bind(Pt)),m.default.promisify(Ct.prototype.importaddress.bind(Pt)),m.default.promisify(Ct.prototype.listunspent.bind(Pt)),m.default.promisify(Ct.prototype.sendRawTransaction.bind(Pt));const{PrivateKey:Et,Opcode:Rt,Script:Nt,Mnemonic:Bt,crypto:At,Transaction:It,encoding:Kt}=t.Bitcoin;const{CHAIN:kt,NETWORK:Ut,TEST_SEEDS:jt}=P;function Dt(t=0){return function(t=0){return new Bt(function(t=0){return jt.split(";")[t]}()).toHDPrivateKey("",Ut).derive(function({chain:t=P.CHAIN,network:e=P.NETWORK,account:n=et()}={}){return V({account:n,coinType:Q(t,e)})}({account:t}))}(t).privateKey}function Ht(t=0){return function(t=0){return Dt(t).toPublicKey()}(t).toAddress()}function Mt(e=1e5,n=0){const r=Nt.buildPublicKeyHashOut(Ht(n));return{address:Ht(n),txId:"a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458",outputIndex:n,script:r,vout:0,amount:e/1e8,satoshis:e,scriptPubKey:"",inspect:()=>"",toObject:()=>new t.Bitcoin.Transaction.UnspentOutput({})}}new E;const{CHAIN:$t="LTC",NETWORK:Lt="regtest",RPC_USER:qt,RPC_PASSWORD:Wt,RPC_HOST:Ft}=process.env;const Gt="LTC"===process.env.CHAIN?19332:8332;var Jt=Object.assign(Object.assign({},P),{CHAIN:$t,NETWORK:Lt,BCN_URL:"http://127.0.0.1:3000",RPC_PROTOCOL:"http",RPC_USER:qt,RPC_PASSWORD:Wt,RPC_HOST:Ft,RPC_PORT:Gt,TEST_ADDRESSES:"mwADSUHvPCGrrX4ozP8Kcd5JCWK93rnc8h;moMoH1vTgCc2dkDfGSKYPnafxy22wSqgrr;mmQEk8VwtSehRryLF8jhVapYg553hJGhNa;miKQVhZbFKSsJcQZ8eXwBQ89xNyetpN34q;mzoGRNh55y9j57TPdwRGi3nt9X4CFwpqUS;n1X6JFDyxibtdhYrc7mrkuft6o168ELFNW;mjLcig6eTZVJkgRgJFMkwrYHpfMnZ1t4kk;mfYkMQAe7afeRSkgLxAtwnMVryjLTfr95Q"});const{PrivateKey:zt,PublicKey:Yt,Transaction:Xt}=t.Bitcoin;const{CHAIN:Zt,NETWORK:Qt}=Jt;const Vt=new E;const te=new zt;describe("Db",(()=>{describe("to",(()=>{it("should add a p2sh output",(()=>{const t=new ht(Vt,te);t.tx.to(Ht(),D.MIN_NON_DUST_AMOUNT),e.expect(t.chain).eq(Zt),e.expect(t.network).eq(Qt),e.expect(t.tx).to.not.be.undefined,e.expect(t.inputs).to.deep.eq([]),e.expect(t.outData).to.deep.eq([]),e.expect(t.opReturns).to.deep.eq("")}))})),describe("fromTxHex",(()=>{const t=new vt;it("should return an empty array if opReturn is not set",(()=>_(void 0,void 0,void 0,(function*(){const n=new ht(Vt,te);n.tx.from([new Xt.UnspentOutput(Mt())]),n.tx.to(Ht(),D.MIN_NON_DUST_AMOUNT),n.tx.sign(Dt(),D.SIGHASH_ALL);const r=yield t.fromTxHex(n.tx.toString());e.expect(r.opReturns).to.deep.eq("")})))),it("should work for a transaction with a data output",(()=>_(void 0,void 0,void 0,(function*(){const t={a:1,_owners:[Yt.fromPrivateKey(te).toString()],_amount:D.MIN_NON_DUST_AMOUNT};const n=new vt;const r=new ht(Vt,te);r.createDataOuts([t]),r.tx.from([new Xt.UnspentOutput(Mt())]),r.tx.sign(Dt(),D.SIGHASH_ALL);const o=r.tx.toString();const{inputs:s,inRevs:i,outRevs:a,opReturns:c,outData:u,txId:d,tx:f}=yield n.fromTxHex(o);e.expect(f).to.not.be.undefined,e.expect(f.inputs).to.not.be.undefined,e.expect(f.outputs).to.not.be.undefined,e.expect(f.outputs[0].satoshis).to.not.be.undefined,e.expect(f.outputs[0].script).to.not.be.undefined,e.expect(f.version).to.not.be.undefined,e.expect(f.nLockTime).to.not.be.undefined,e.expect(s).to.deep.eq(["a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458/0"]),e.expect(i).to.deep.eq([]),e.expect(a).to.deep.eq([`${r.tx.id}/0`]),e.expect(c).to.deep.eq('000001001[{"a":1}]'),e.expect(u).to.deep.eq([t]),e.expect(d).eq(r.tx.id)})))),it("should work for a transaction with another invalid output script",(()=>_(void 0,void 0,void 0,(function*(){const{inputs:n,inRevs:r,outRevs:o,opReturns:s,outData:i,txId:a}=yield t.fromTxHex("0100000001cbf75e37f8f57f338dd435d564c7302a02d9c6d03e26c8f0f24fa46052c0c0d1010000008b48304502210095cf913f96c52242b3a88dc59a9aed2a568dc80446541348c89c5430727d548402206adbe00b00db7d71458b990ab69090a038244a6b94faca98652656fd0b9be4e4014104dac5c4da1fd483b8655ab6a5d8e5dd2226ef20d1023d7ff38df29bfa8fcfdf73fb99a07efa0c66112c1fa438a8ed8571364bc04f21eaadf54c4918d43aba8ed3ffffffff02804f1200000000001976a914d40f073684cfac11be0366dc6a56a8d3cc87ece488ac1027000000000000044e6f6e6500000000");e.expect(n).to.deep.eq(["d1c0c05260a44ff2f0c8263ed0c6d9022a30c764d535d48d337ff5f8375ef7cb/1"]),e.expect(r).to.deep.eq([]),e.expect(o).to.deep.eq([]),e.expect(i).to.deep.eq([]),e.expect(s).to.deep.eq(""),e.expect(a).to.deep.eq("ad0a426817666f56d5b4fba97177f455bbfba3b80faca32a58ae9f947896ec68")})))),it("should work for a coinbase transactions",(()=>_(void 0,void 0,void 0,(function*(){const n=yield Promise.all(["01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0b03c58c01062f503253482fffffffff0386600f27010000001976a914dde4906f870df11cf316b15adb628a3c3cc9883988ac8ab8f60200000000434104ffd03de44a6e11b9917f3a29f9443283d9871c9d743ef30d5eddcd37094b64d1b3d8090496b53256786bf5c82932ec23c3b74d9f05a6f95a8b5529352656664bac00000000000000002a6a28e73cd21eb4ac1eb1ba3767f4bf12be98935656451df3d6dee34c125662bcd599000000000000010000000000","020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff03530101ffffffff0200f2052a010000001976a9141eb941d36faa46404c7fbf6e22364e39cb66641f88ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000","020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff04016b0101ffffffff0200f2052a010000001976a9147c012a0d8fefc443441b169d9a82edc3221e647a88ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000"].map((e=>t.fromTxHex(e))));for(let t=0;t<n.length;t+=1){const{inputs:r,inRevs:o,outRevs:s,opReturns:i,outData:a,txId:c}=n[t];e.expect(r).to.be.an("array").that.has.length(1),e.expect(o).to.deep.eq([]),e.expect(s).to.deep.eq([]),e.expect(a).to.deep.eq([]),e.expect(i).to.be.string,e.expect(c).to.be.string}}))))}))}));
