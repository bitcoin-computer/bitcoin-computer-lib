import{expect as e}from"chai";const t=["_id","_rev","_owners","_amount","_readers","_url","__vouts","__func","__index","__args"];const o=e=>(Object.prototype.toString.call(e).match(/\s([a-zA-Z]+)/)||[])[1];const r=e=>"object"==typeof e?o(e):o(e).toLowerCase();const i=e=>["number","string","boolean","undefined","Null"].includes(r(e));const d=e=>"Array"===r(e);const a=e=>"Object"===r(e);const _=e=>i(e)||["Array","Object"].includes(r(e));const n=e=>"Object"===r(e)&&Object.keys(e).every((e=>!Number.isNaN(parseInt(e,10))));const s=(e,t)=>{if(!_(e)||!_(t))throw new Error(`Unsupported data types for deep equals: ${r(e)} & ${r(t)}`);if(r(e)!==r(t))return!1;if(i(e)&&i(t))return e===t;const o=(e,t)=>Object.entries(e).every((([e,o])=>s(t[e],o)));return e&&t&&o(e,t)&&o(t,e)};const c=e=>{if(i(e))return e;if(d(e))return e.map(c);if(a(e)){const t=Object.keys(e).reduce(((t,o)=>(t[o]=c(e[o]),t)),{});const o=Object.create(Object.getPrototypeOf(e));return Object.assign(o,t)}throw new Error(`Unsupported data type for clone: ${r(e)}`)};const b=(e,t)=>e.reduce((([e,o],r,i)=>t(r,i)?[[...e,r],o]:[e,[...o,r]]),[[],[]]);const v=(e,t)=>Object.fromEntries(Object.entries(e).map((e=>t(e))));const u=(e,t)=>v(e,(([e,o])=>[e,t(o)]));const l=(e,t)=>Object.fromEntries(Object.entries(e).filter((e=>t(e))));const h=(e,t)=>l(e,(([,e])=>t(e)));const p=(e,t)=>{if(!i(e)){if(d(e))return e.find((e=>p(e,t)));if(a(e))return e._rev===t?e:Object.values(e).find((e=>p(e,t)));throw new Error(`Unsupported type ${r(e)} in findByRev`)}};const f=(e,t,o,_)=>{if(i(e))return e;if(d(e))return e.map((e=>f(e,t,o,_)));if(a(e)){e._rev=`${_}/${o}`;const r=t[o];return Object.entries(e).forEach((([o,i])=>{"object"==typeof r&&Object.keys(r).includes(o)&&(e[o]=f(i,t,r[o],_))})),e}throw new Error(`Unsupported type ${r(e)} in deep.updateRev`)};const q=(e,t)=>{if(i(e))return e;if(d(e))return e.map((e=>q(e,t)));if(a(e))return e._id=!e._id||e._id.startsWith("__temp__")?e._rev:e._id,e._root=e._root||t,Object.entries(e).forEach((([o,r])=>{e[o]=q(r,t)})),e;throw new Error(`Unsupported type ${r(e)} in deep.addId`)};const w=e=>{if(i(e))return e;if(d(e))return e.map((e=>w(e)));if(a(e)){const t=`__temp__/${Math.random()}`;return e._id=e._id||t,e._rev=e._rev||t,Object.values(e).map((e=>w(e))),e}throw new Error(`Unsupported type ${r(e)} in addRandomId`)};const j=e=>{if(i(e))return e;if(d(e))return e.map((e=>j(e)));if(a(e))return v(e,(([e,t])=>["_owners","_readers"].includes(e)?[e,JSON.stringify(t)]:i(t)?[e,t]:[e,j(t)]));throw new Error(`Unexpected type ${r(e)} in stringifyOwners`)};const g=e=>(e._owners&&(e._owners=JSON.parse(e._owners)),e._readers&&(e._readers=JSON.parse(e._readers)),e);const m=e=>{if(i(e))return e;if(d(e)||a(e))return Object.entries(e).reduce(((e,[t,o])=>{const r=m(o);return n(r)?Object.entries(r).forEach((([o,r])=>{e[`${t}_${o}`]=r})):e[t]=r,e}),{});throw new Error(`Unsupported type ${r(e)} in encodeArraysAsObjects`)};const y=e=>{const o={[e._id]:Object.entries(e).reduce(((e,[o,r])=>t.includes(o)?Object.assign(Object.assign({},e),{[o]:r}):i(r)?Object.assign(Object.assign({},e),{[`__basic__${o}`]:r}):Object.assign(Object.assign({},e),{[o]:r._id})),{})};return Object.values(e).filter((e=>!i(e))).reduce(((e,t)=>Object.assign(Object.assign({},e),y(t))),o)};const O=e=>l(e,(([e])=>!e.startsWith("__basic__")));const k=(e,t)=>v(t,(([t,o])=>{const r=e[t];var i;return o.__change=(i=r)?s(i,o)?"same":"diff":"new",[t,o]}));const x=(e,o)=>{const r=e[o];return r.__contains=Object.entries(r).reduce(((o,[r,i])=>["__contains",...t].includes(r)?o:"__change"===r?"new"===i||"diff"===i||o:x(e,i)[i].__contains||o),!1),e};const S=e=>e.reduce(((e,t,o)=>Object.assign(Object.assign({},e),{[t._id]:o})),{});const E=(e,t)=>e.map((e=>Object.entries(e).reduce(((e,[o,i])=>{const d="string"==typeof i&&"undefined"!==r(t[i])?t[i]:i;return Object.assign(Object.assign({},e),{[o]:d})}),{})));const I=(e,o)=>{const r=w(o);const i=r._id;const d=c(e);const a=c(r);const _=j(d);const n=j(a);const s=m(_);const v=m(n);const p=y(s);const f=y(v);const q=k(p,f);const I=u(q,O);const $=x(I,i);const N=$[i];delete $[i];const A=u($,(e=>e._rev));const M=h($,(e=>e.__contains||Object.values(N).includes(e._id)));const R=Object.values(M);const[U,B]=b(R,(e=>"new"===e.__change));const J=[...B,...U];const P=S(J);const D=E(J,P);const[C]=E([N],P);const z=B.map((e=>e._rev));const[F,...K]=((e,o)=>[o,...e].map((e=>{const o=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(o[r[i]]=e[r[i]])}return o}(e,["_id","_rev","__change","__contains"]);return l(o,(([e,o])=>t.includes(e)||"number"==typeof o))})))(D,C);return[z,K.map(g).map((e=>Object.entries(e).reduce(((e,[t,o])=>Object.assign(Object.assign({},e),{[t]:A[o]||o})),{}))),F]};describe("deep",(()=>{describe("type",(()=>{it("should return the type of a variable",(()=>{e(r(void 0)).eq("undefined"),e(r(null)).eq("Null"),e(r(NaN)).eq("number"),e(r(4)).eq("number"),e(r(new Number(4))).eq("Number"),e(r("abc")).eq("string"),e(r(new String("abc"))).eq("String"),e(r(!0)).eq("boolean"),e(r(new Boolean(!0))).eq("Boolean"),e(r({a:4})).eq("Object"),e(r({a:{b:3}})).eq("Object"),e(r([1,2,3])).eq("Array"),e(r([1,2,[1,2,3]])).eq("Array"),e(r(new ReferenceError)).eq("Error"),e(r(new Date)).eq("Date"),e(r(new Map)).eq("Map"),e(r(new Set)).eq("Set"),e(r(new Set([1,2,3]))).eq("Set"),e(r(/a-z/)).eq("RegExp"),e(r(Math)).eq("Math"),e(r(JSON)).eq("JSON");const t=new class{constructor(e){this.val=e}setVal(e){this.val=e}}(3);e(r(t)).eq("Object")}))})),describe("isBasic",(()=>{it("should return true for values of basic type",(()=>{e(i(1)).eq(!0),e(i("1")).eq(!0),e(i(!0)).eq(!0),e(i(null)).eq(!0),e(i(void 0)).eq(!0),e(i({})).eq(!1),e(i([])).eq(!1)}))})),describe("isArray",(()=>{it("should return true for arrays",(()=>{e(d(1)).eq(!1),e(d("1")).eq(!1),e(d(!0)).eq(!1),e(d(null)).eq(!1),e(d(void 0)).eq(!1),e(d({})).eq(!1),e(d([])).eq(!0)}))})),describe("isObject",(()=>{it("should return true for objects",(()=>{e(a(1)).eq(!1),e(a("1")).eq(!1),e(a(!0)).eq(!1),e(a(null)).eq(!1),e(a(void 0)).eq(!1),e(a({})).eq(!0),e(a([])).eq(!1)}))})),describe("isSupported",(()=>{it("should return true for supported objects",(()=>{e(_(1)).eq(!0),e(_("1")).eq(!0),e(_(!0)).eq(!0),e(_(null)).eq(!0),e(_(void 0)).eq(!0),e(_({})).eq(!0),e(_([])).eq(!0),e(_(new Number)).eq(!1)}))})),describe("encodesArray",(()=>{it("should return true for objects that encode arrays",(()=>{e(n({a:1})).eq(!1),e(n({0:1,a:2})).eq(!1),e(n({0:1})).eq(!0),e(n({0:1,2345234:2})).eq(!0)}))})),describe("equals",(()=>{it("Should work for numbers",(()=>{e(s(1,1)).eq(!0),e(s(1,0)).eq(!1),e(s(1,null)).eq(!1),e(s(1,void 0)).eq(!1)})),it("Should work for strings",(()=>{e(s("a","a")).eq(!0),e(s("a","b")).eq(!1),e(s("a",null)).eq(!1),e(s("a",void 0)).eq(!1)})),it("Should work for booleans",(()=>{e(s(!0,!0)).eq(!0),e(s(!0,!1)).eq(!1),e(s(!0,null)).eq(!1),e(s(!0,void 0)).eq(!1)})),it("Should work for flat arrays",(()=>{e(s([1,2,3],[1,2,3])).eq(!0),e(s([1,2,3],[1,3,2])).eq(!1),e(s([1,2,3],null)).eq(!1),e(s(null,[1,2,3])).eq(!1),e(s([1,2,3],void 0)).eq(!1),e(s([1,2,3],[[1,2,3]])).eq(!1),e(s([1,2,3],{a:"a"})).eq(!1),e(s([1,2,3],[])).eq(!1),e(s([1,2,3],{})).eq(!1);const t=[1,2,3];t.yo="hi",e(s(t,[1,2,3])).eq(!1),e(s([1,2,3],t)).eq(!1)})),it("Should work for flat objects",(()=>{e(s({a:"a",b:"b"},{b:"b",a:"a"})).eq(!0),e(s({a:"a",b:"b"},{a:"a"})).eq(!1),e(s({a:"a"},[["a","a"]])).eq(!1),e(s({a:"a",b:"b"},null)).eq(!1),e(s({a:"a",b:"b"},void 0)).eq(!1),e(s({a:"a",b:"b"},{a:"a",b:{a:"a",b:"b"}})).eq(!1),e(s({a:"a",b:"b"},[])).eq(!1),e(s({a:"a",b:"b"},{})).eq(!1)})),it("Should work for nested objects",(()=>{e(s({a:{b:"b"}},{a:{b:"b"}})).eq(!0),e(s({a:{b:"b"}},{a:[["b","b"]]})).eq(!1),e(s({a:[["b","b"]]},{a:{b:"b"}})).eq(!1),e(s(["a",{b:"b"}],["a",{b:"b"}])).eq(!0),e(s(["a",{b:"b"}],[{b:"b"},"a"])).eq(!1),e(s(["a",{b:"b"}],["a",[["b","b"]]])).eq(!1),e(s(["a",[["b","b"]]],["a",{b:"b"}])).eq(!1)})),it("Should throw an error all other values",(()=>{e((()=>s(new Set,new Set))).throws(),e((()=>s(new Map,new Map))).throws(),e((()=>s(new Date,new Date))).throws()}))})),describe("clone",(()=>{it("should work for null and the empty object",(()=>{e(c(null)).eq(null),e(c({})).to.be.deep.eq({}),e(c(void 0)).to.be.deep.eq(void 0)})),it("should work for objects without functions",(()=>{const t={a:"a",b:"b"};const o=c(t);e(s(t,o)).eq(!0),e(o).to.deep.eq(t),e(o).not.eq(t),e(o.a).eq(t.a),e(o.b).eq(t.b),t.a="aa",o.b="bb",e(t.b).eq("b"),e(o.a).eq("a")})),it("should work for objects in arrays",(()=>{const t=[,{a:"a",b:"b"}];e(c(t)).to.deep.eq(t)})),it("should work for objects with functions",(()=>{class t{constructor(e){this.val=e}mult(e){this.val*=e}}const o=new class{constructor(e,t,o,r){this.x=e,this.y=t,this.xx=o,this.yy=r}appendX(e){this.x+=e}}("x","y",new t(3),new t(4));const r=c(o);e(o).to.deep.eq(r),e(s(o,r)).eq(!0),o.a="a",e(r.a).eq(void 0),o.xx.a="a",e(r.xx.a).eq(void 0),r.appendX("x"),e(r.x).eq("xx"),e(o.x).eq("x"),r.xx.mult(2),e(r.xx.val).eq(6),e(o.xx.val).eq(3)}))})),describe("partition",(()=>{it("should work",(()=>{e(b([1,2,3],(e=>e>2))).to.deep.eq([[3],[1,2]]),e(b([1,2,3],(e=>e>20))).to.deep.eq([[],[1,2,3]]),e(b([1,2,3],(e=>e>0))).to.deep.eq([[1,2,3],[]])}))})),describe("objectEntryMap",(()=>{it("should work for an object",(()=>{e(v({a:1,b:2},(e=>[e[0].repeat(2),2*e[1]]))).to.deep.eq({aa:2,bb:4})}))})),describe("objectMap",(()=>{it("should work for an object",(()=>{e(u({a:1,b:2},(e=>2*e))).to.deep.eq({a:2,b:4})}))})),describe("objectEntryFilter",(()=>{it("should work for an object",(()=>{e(l({a:1,b:2},(e=>e[1]>1))).to.deep.eq({b:2})}))})),describe("objectFilter",(()=>{it("should work",(()=>{e(h({a:1,b:2},(e=>e>1))).to.deep.eq({b:2})}))})),describe("findByRev",(()=>{it("should work for a flat object",(()=>{e(p({_id:"id",_rev:"rev",_root:"root"},"rev")).to.deep.eq({_id:"id",_rev:"rev",_root:"root"})})),it("should work for a nested object",(()=>{e(p({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"id2",_rev:"rev2",_root:"root"}},"rev1")).to.deep.eq({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"id2",_rev:"rev2",_root:"root"}})})),it("should work for a nested object",(()=>{e(p({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"id2",_rev:"rev2",_root:"root"}},"rev2")).to.deep.eq({_id:"id2",_rev:"rev2",_root:"root"})})),it("should return undefined if rev does not exist",(()=>{e(p({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"id2",_rev:"rev2",_root:"root"}},"rev3")).to.be.undefined})),it("should work if rev is undefined",(()=>{e(p({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"id2",_rev:"rev2",_root:"root"}},void 0)).to.be.undefined}))})),describe("updateRev",(()=>{it("should work for objects of basic type",(()=>{e(f(1,[{}],0,"txId")).to.deep.eq(1)})),it("should work for a flat object",(()=>{e(f({a:1,_id:"id",_rev:"rev"},[{}],0,"txId")).to.deep.eq({a:1,_id:"id",_rev:"txId/0"})})),it("should work for a nested object",(()=>{e(f({a1:1,_id:"id1",_rev:"rev1",a2:{_id:"id1",_rev:"rev1",b:2}},[{a2:1},{}],0,"txId")).to.deep.eq({a1:1,_id:"id1",_rev:"txId/0",a2:{_id:"id1",_rev:"txId/1",b:2}})})),it("should work for an array",(()=>{e(f([{a:1,_id:"id",_rev:"rev"}],[{}],0,"txId")).to.deep.eq([{_id:"id",_rev:"txId/0",a:1}])}))})),describe("addId",(()=>{it("should set an id that starts with __temp__ by the rev",(()=>{e(q({_id:"__temp__",_rev:"rev"},"root")).to.be.deep.eq({_id:"rev",_rev:"rev",_root:"root"})})),it("should leave an id that does not start with __temp__ as it is",(()=>{e(q({_id:"id",_rev:"rev"},"root")).to.be.deep.eq({_id:"id",_rev:"rev",_root:"root"})})),it("should work for a nested object",(()=>{e(q({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"__temp__",_rev:"rev2",_root:"root"}},"root")).to.be.deep.eq({_id:"id1",_rev:"rev1",_root:"root",a:{_id:"rev2",_rev:"rev2",_root:"root"}})})),it("should work with an array",(()=>{e(q([{_id:"__temp__",_rev:"rev1"},{_id:"__temp__",_rev:"rev2"}],"root")).to.be.deep.eq([{_id:"rev1",_rev:"rev1",_root:"root"},{_id:"rev2",_rev:"rev2",_root:"root"}])}))})),describe("addRandomId",(()=>{it("should modify a simple object",(()=>{const t={a:1};w(t),e(t._id).to.not.be.undefined})),it("should work for a nested object",(()=>{const t={a:{b:1}};w(t),e(t._id).to.be.a("string"),e(t._rev).to.be.a("string"),e(t.a.b).eq(1),e(t.a._id).to.be.a("string"),e(t.a._rev).to.be.a("string")})),it("should work for a nested object",(()=>{w({obj:{n:{m:1}},_id:"index"})})),it("should work for an array",(()=>{const t=[1,2,3];w(t),e(t).to.deep.eq([1,2,3])})),it("should work for an object containing an array",(()=>{const t={a:[1,2,3]};w(t),e(t._id).to.not.be.undefined,e(t.a._id).to.be.undefined})),it("should work for an object containing an array of objects",(()=>{const t={a:[{b:1},{c:2}]};w(t),e(t._id).to.not.be.undefined,e(t.a._id).to.be.undefined,e(t.a[0]._id).to.not.be.undefined,e(t.a[1]._id).to.not.be.undefined}))})),describe("stringifyOwners",(()=>{it("should work for an empty array",(()=>{e(j({_id:"id",_rev:"rev",_owners:[],_amount:0})).to.deep.eq({_id:"id",_rev:"rev",_owners:"[]",_amount:0})})),it("should work for a non empty array",(()=>{e(j({_id:"id",_rev:"rev",_owners:["publicKey"],_amount:0,a:{_id:"id",_rev:"rev",_owners:[],_amount:0}})).to.deep.eq({_id:"id",_rev:"rev",_owners:'["publicKey"]',_amount:0,a:{_id:"id",_rev:"rev",_owners:"[]",_amount:0}})}))})),describe("encodeArraysAsObjects",(()=>{it("should work on unnested objects",(()=>{e(m({a:1,b:2})).to.deep.eq({a:1,b:2})})),it("should work on nested objects",(()=>{e(m({a:{b:2}})).to.deep.eq({a:{b:2}})})),it("should work with an object inside an array",(()=>{e(m([{a:1}])).to.deep.eq({0:{a:1}})})),it("should work with an array inside an object",(()=>{e(m({a:[1,2,3]})).to.deep.eq({a_0:1,a_1:2,a_2:3})})),it("should work on multiple levels of nesting",(()=>{e(m({a:[{b:1}]})).to.deep.eq({a_0:{b:1}})})),it("should work with even more levels of nesting",(()=>{e(m({a:[[{b:1}]]})).to.deep.eq({a_0_0:{b:1}})})),it("should work if the object has keywords",(()=>{e(m({a:1,_id:"id",_rev:"rev",_owners:"[laks, lasjnd]"})).to.deep.eq({_id:"id",_rev:"rev",_owners:"[laks, lasjnd]",a:1})}))})),describe("groupById",(()=>{it("should work for a simple object",(()=>{e(y({_id:"id",_rev:"rev",a:1})).to.deep.eq({id:{_id:"id",_rev:"rev",__basic__a:1}})})),it("should work for a object with one child",(()=>{e(y({_id:"id0",b:{_id:"id1",a:1},c:2})).to.deep.eq({id0:{_id:"id0",b:"id1",__basic__c:2},id1:{_id:"id1",__basic__a:1}})})),it("should work for an object with two children",(()=>{e(y({_id:"id0",a:{_id:"id1",aa:1},b:{_id:"id2",bb:2}})).to.deep.eq({id0:{_id:"id0",a:"id1",b:"id2"},id1:{_id:"id1",__basic__aa:1},id2:{_id:"id2",__basic__bb:2}})})),it("should work for an object with a grandchild",(()=>{e(y({_id:"id0",a:{_id:"id1",b:{_id:"id2",c:1}}})).to.deep.eq({id0:{_id:"id0",a:"id1"},id1:{_id:"id1",b:"id2"},id2:{_id:"id2",__basic__c:1}})}))})),describe("getChange",(()=>{it("should work for json objects",(()=>{e(k({"id:0":{_id:"id:0",a:"id:1",__basic__aa:2},"id:1":{_id:"id:1",__basic__b:1,__basic__bb:2}},{"id:0":{_id:"id:0",a:"id:1",__basic__aa:2},"id:1":{_id:"id:1",__basic__b:2,__basic__bb:3}})).to.deep.eq({"id:0":{_id:"id:0",a:"id:1",__basic__aa:2,__change:"same"},"id:1":{_id:"id:1",__basic__b:2,__basic__bb:3,__change:"diff"}})}))})),describe("containsChange",(()=>{it("should work for a flat object that is not changed",(()=>{e(x({"id:1":{_rev:"rev:0",_owners:"['a', 'b']",_amount:1,__change:"same"}},"id:1")).to.deep.eq({"id:1":{_rev:"rev:0",_owners:"['a', 'b']",_amount:1,__change:"same",__contains:!1}})})),it("should work for an object that is not changed",(()=>{e(x({id1:{a:"id2",__change:"same"},id2:{__change:"same"}},"id1")).to.deep.eq({id1:{a:"id2",__change:"same",__contains:!1},id2:{__change:"same",__contains:!1}})})),it("should work for an object that is changed at the top level",(()=>{e(x({id1:{a:"id2",b:"id3",__change:"diff"},id2:{__change:"same"},id3:{__change:"same"}},"id1")).to.deep.eq({id1:{a:"id2",b:"id3",__change:"diff",__contains:!0},id2:{__change:"same",__contains:!1},id3:{__change:"same",__contains:!1}})})),it("should work for an object that is changed at a lower level",(()=>{e(x({id1:{a:"id2",b:"id3",__change:"same"},id2:{__change:"diff"},id3:{__change:"same"}},"id1")).to.deep.eq({id1:{a:"id2",b:"id3",__change:"same",__contains:!0},id2:{__change:"diff",__contains:!0},id3:{__change:"same",__contains:!1}})})),it.skip("should work for an object with a cycle",(()=>{e(x({id1:{a:"id2",__change:"same"},id2:{b:"id1",__change:"diff"}},"id1")).to.deep.eq({id1:{a:"id2",__change:"same",__contains:!0},id2:{b:"id1",__change:"diff",__contains:!0}})}))})),describe("parseOwners",(()=>{it("should work with a simple object",(()=>{const t="03bf2dc338dd8133a3184657eb67bed5f61647a8a7364bf2906e3db77bff89e241";e(g({a:1,_owners:`["${t}"]`})).to.deep.eq({a:1,_owners:[t]})}))})),describe("getIdPosMap",(()=>{it("should work",(()=>{e(S([{_id:"id:1",_rev:"rev:1",_root:"root",__change:"same",__contains:!1},{_id:"id:2",_rev:"rev:2",_root:"root",b:"__temp__:3",__change:"diff",__contains:!0},{_id:"__temp__:3",_rev:"__temp__:3",_root:"root",__change:"new",__contains:!0}])).to.deep.eq({"__temp__:3":2,"id:1":0,"id:2":1})}))})),describe("resolveIds",(()=>{it("should work",(()=>{const t=[{_id:"id:1",_rev:"rev:1",_root:"root",__change:"same",__contains:!1},{_id:"id:2",_rev:"rev:2",_root:"root",b:"__temp__:3",__change:"diff",__contains:!0},{_id:"__temp__:3",_rev:"__temp__:3",_root:"root",__change:"new",__contains:!0}];const o=S(t);e(o).to.deep.eq({"id:1":0,"id:2":1,"__temp__:3":2}),e(E(t,o)).to.deep.eq([{__change:"same",__contains:!1,_id:0,_rev:"rev:1",_root:"root"},{__change:"diff",__contains:!0,_id:1,_rev:"rev:2",_root:"root",b:2},{__change:"new",__contains:!0,_id:2,_root:"root",_rev:2}])}))})),describe("diff",(()=>{it("should not throw an error if an id is set",(()=>{e(I({_id:"1",_rev:"rev",_amount:1,_owners:[{}]},{_id:"1",_rev:"2"})).to.deep.eq([[],[],{}])})),it("should not throw an error if an id is set",(()=>{e(I({},{n:1})).to.deep.eq([[],[],{}])})),it("should update a root object even if it is not changed",(()=>{e(I({_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:1}},{_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:1}})).to.deep.eq([["rev:1"],[{}],{obj:0}])})),it("should update a root object that is changed",(()=>{e(I({_id:"id:0",_rev:"rev:0",0:{_id:"id:1",_rev:"rev:1",a:1}},{_id:"id:0",_rev:"rev:0",0:{_id:"id:1",_rev:"rev:1",a:2}})).to.deep.eq([["rev:1"],[{}],{0:0}])})),it("should update a root object that is changed on the top level but not any of its children",(()=>{e(I({_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:{_id:"id:2",_rev:"rev:2",aa:1},b:{_id:"id:3",_rev:"rev:3",bb:1},c:1}},{_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:{_id:"id:2",_rev:"rev:2",aa:1},b:{_id:"id:3",_rev:"rev:3",bb:1},c:2}})).to.deep.eq([["rev:1"],[{}],{obj:0}])})),it("should update a lower level object that is changed as well as all node on its root path",(()=>{e(I({_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:{_id:"id:2",_rev:"rev:2",b:{_id:"id:3",_rev:"rev:3",bb:1}}}},{_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:{_id:"id:2",_rev:"rev:2",b:{_id:"id:3",_rev:"rev:3",bb:2}}}})).to.deep.eq([["rev:1","rev:2","rev:3"],[{a:1},{b:2},{}],{obj:0}])})),it("should work for creating an object with arguments",(()=>{e(I({_id:"id:0",_rev:"rev:0",arg:{_id:"id:3",_rev:"rev:3"}},{_id:"id:0",_rev:"rev:0",obj:{_id:"id:1",_rev:"rev:1",a:{_id:"id:2",_rev:"rev:2",aa:2}},arg:{_id:"id:3",_rev:"rev:3"}})).to.deep.eq([["rev:3"],[{},{a:2},{}],{arg:0,obj:1}])})),it("should update a root object that is changed",(()=>{const t="03bf2dc338dd8133a3184657eb67bed5f61647a8a7364bf2906e3db77bff89e241";const o="02141c63825cad04ea507ea62464e926ed4cb4fbaef9eae5a3e8e1f0febcda2c77";const r=I({_id:"id:0",_rev:"rev:0",_owners:[t],0:{_id:"id:1",_rev:"rev:1",_owners:[o],a:1}},{_id:"id:0",_rev:"rev:0",_owners:[t],0:{_id:"id:1",_rev:"rev:1",_owners:[o],a:2}});e(r).to.be.an("array"),e(r[0]).to.deep.eq(["rev:1"]),e(r[1]).to.be.an("array"),e(r[1][0]).to.be.an("object"),e(r[1][0]._owners).to.be.an("array").that.has.lengthOf(1),e(r[2]).to.deep.eq({0:0,_owners:`["${t}"]`})}))}))}));
