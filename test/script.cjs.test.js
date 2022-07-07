"use strict";var e=require("chai");var t=require("bitcoin-computer-bitcore");require("child_process"),process.env.CHAIN,process.env.NETWORK,process.env.BCN_URL,process.env.RPC_USER,process.env.RPC_PASSWORD,parseInt(process.env.BC_DUST_LIMIT||"",10),parseInt(process.env.BC_DEFAULT_FEE||"",10),parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10);const{PublicKey:r,crypto:n}=t.Bitcoin;const{Point:o}=n;function c(e){return Buffer.from(e,"hex").toString().replace(/\0/g,"")}function s(e,t,r){if(e.length*Math.log2(t)>53)throw new Error(`Input too large ${e.length} ${Math.log2(t)}`);if(![2,10,16].includes(t)||![2,10,16].includes(r))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===t&&e.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===t&&e.length%2!=0)throw new Error("Hex strings must be of even length.");const n=parseInt(e,t).toString(r);return 2===r?n.padStart(8*Math.ceil(n.length/8),"0"):16===r?n.padStart(2*Math.ceil(n.length/2),"0"):n}function a(e,t){const r=new RegExp(`.{1,${t}}`,"g");return e.match(r)||[]}function i(e){return a(e,2).map((e=>s(e,16,2))).join("")}function f(e){return a(e,8).map((e=>s(e,2,16))).join("")}function p(e){if(62!==e.length)throw new Error("Input to hexToPublicKey must be of length 62");let t=!1;let n=0;let c;for(;!t;){if(n>=256)throw new Error("Something went wrong storing data");const r=n.toString(16).padStart(2,"0")+f((a=n,(s=i(e).padStart(64,"0")).slice(a)+s.slice(0,a)));try{c=o.fromX(!1,r),t=!0}catch(e){n+=1}}var s,a;if(!c)throw new Error("Something went wrong storing data");return new r(c)}function u(e){const t=e.point.getX().toString("hex").padStart(64,"0");const r=s(t.slice(0,2),16,10);return f((o=parseInt(r,10),(n=i(t.slice(2))).slice(-o)+n.slice(0,-o)));var n,o}const{PublicKey:l,Script:h}=t.Bitcoin;function d(e){const t=new h;return t.add("OP_1"),e.forEach((e=>{t.add(e)})),t.add(`OP_${e.length}`),t.add("OP_CHECKMULTISIG"),t}function S(e){return e.chunks.filter((e=>e.buf)).map((e=>e.buf))}function g(e){if(e.length>3)throw new Error("Too many owners");return d(e.map((e=>e.toBuffer())))}function m(e){return S(e).map((e=>l.fromBuffer(e)))}function b(e){var t;return function(e,t){const r=[];for(let t=0;t<e.length;t+=3)r.push(e.slice(t,t+3));return r}(a((t=e,Buffer.from(t).toString("hex")),62).map((e=>e.padStart(62,"0"))).map(p)).map((e=>g(e)))}function _(e){return e.map((e=>m(e))).flat().map(u).map(c).join("")}describe("Script",(()=>{describe("bufsToScript",(()=>{it("should create a script from an array of buffers when anyOneCanSpend is true",(()=>{const t=d([Buffer.from("1"),Buffer.from("2"),Buffer.from("3")]);e.expect(t.toASM()).eq("OP_1 31 32 33 OP_3 OP_CHECKMULTISIG")}))})),describe("scriptToBufs",(()=>{it("should create a an array of buffers from a script when anyOneCanSpend is false",(()=>{const t=[Buffer.from("1"),Buffer.from("2"),Buffer.from("3")];const r=S(d(t));e.expect(r).to.deep.eq(t)}))})),describe("publicKeysToScript",(()=>{it("should create a script from an array of buffers",(()=>{const t=g(["1","2","3"].map((e=>e.padStart(62,"0"))).map(p));e.expect(t.toASM()).eq("OP_1 020000000000000000000000000000000000000000000000000000000000000001 020000000000000000000000000000000000000000000000000000000000000002 020000000000000000000000000000000000000000000000000000000000000003 OP_3 OP_CHECKMULTISIG")}))})),describe("scriptToPublicKeys",(()=>{it("should create a script from an array of buffers",(()=>{const t=["1","2","3"].map((e=>e.padStart(62,"0"))).map(p);const r=m(g(t));e.expect(r).to.deep.eq(t)}))})),describe("dataToScripts",(()=>{it("should create a script from a json object",(()=>{const t={a:"1".repeat(85)};const r=b(JSON.stringify(t));e.expect(r.length).eq(1);const[n]=r;e.expect(n.toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 02003131313131313131313131313131313131313131313131313131313131227d OP_3 OP_CHECKMULTISIG")})),it("should create a script from a large json object",(()=>{const t={a:"1".repeat(86)};const r=b(JSON.stringify(t));e.expect(r.length).eq(2),e.expect(r[0].toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 020162626262626262626262626262626262626262626262626262626262626244 OP_3 OP_CHECKMULTISIG"),e.expect(r[1].toASM()).eq("OP_1 0201000000000000000000000000000000000000000000000000000000000000fa OP_1 OP_CHECKMULTISIG")}))})),describe("scriptsToData",(()=>{it("should create a json object from a script",(()=>{const t={a:"1".repeat(85)};const r=b(JSON.stringify(t));e.expect(r.length).eq(1);const n=_(r);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)})),it("should create a large json object from an array of script",(()=>{const t={a:"1".repeat(86)};const r=b(JSON.stringify(t));e.expect(r.length).eq(2);const n=_(r);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)}))}))}));
