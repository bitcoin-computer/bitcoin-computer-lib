"use strict";var e=require("tweetnacl");var t=require("eccrypto");var n=require("bitcoin-computer-bitcore");var o=require("tweetnacl-util");function c(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=c(e);var r=c(t);var s=c(o);function p(e,t,n,o){return new(n||(n=Promise))((function(c,i){function r(e){try{p(o.next(e))}catch(e){i(e)}}function s(e){try{p(o.throw(e))}catch(e){i(e)}}function p(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}p((o=o.apply(e,t||[])).next())}))}const{PublicKey:u}=n.Bitcoin;function a({iv:e,ephemPublicKey:t,ciphertext:n,mac:o}){return{iv:e,publicKey:t,cipherText:n,mac:o}}function f(e,t){return p(this,void 0,void 0,(function*(){const n=i.default.randomBytes(32);const o=i.default.randomBytes(24);const c=i.default.secretbox(s.default.decodeUTF8(e),o,n);const f=Buffer.concat([Buffer.from(o),Buffer.from(n)]);const l=t.map((e=>p(this,void 0,void 0,(function*(){return a(yield r.default.encrypt(u.fromString(e).toBuffer(),f))}))));return{cipherText:c,envelopes:yield Promise.all(l)}}))}function l(e,t,n){return p(this,void 0,void 0,(function*(){let o;try{o=yield r.default.decrypt(n.toBuffer(),function({iv:e,publicKey:t,cipherText:n,mac:o}){return{iv:e,ephemPublicKey:t,ciphertext:n,mac:o}}(t))}catch(e){throw new Error("Decryption failed.")}const c=o.subarray(0,i.default.secretbox.nonceLength);const p=o.subarray(i.default.secretbox.nonceLength);const u=i.default.secretbox.open(e.cipherText,new Uint8Array(c),new Uint8Array(p));if(null===u)throw new Error("Decryption failed.");return s.default.encodeUTF8(u)}))}const{PrivateKey:d}=n.Bitcoin;describe("Crypto",(()=>{describe("encrypt() and decrypt()",(()=>{it("encrypts a message",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;const n=yield f("42",[e.toPublicKey().toString(),t.toPublicKey().toString()]);expect(n.cipherText).toBeDefined(),expect(n.cipherText).toBeInstanceOf(Uint8Array),expect(n.envelopes).toBeDefined(),expect(n.envelopes.length).toBe(2),expect(n.envelopes[0].cipherText).toBeDefined(),expect(n.envelopes[0].cipherText).toBeInstanceOf(Buffer),expect(n.envelopes[0].iv).toBeDefined(),expect(n.envelopes[0].iv).toBeInstanceOf(Buffer),expect(n.envelopes[0].mac).toBeDefined(),expect(n.envelopes[0].mac).toBeInstanceOf(Buffer),expect(n.envelopes[0].publicKey).toBeDefined(),expect(n.envelopes[0].publicKey).toBeInstanceOf(Buffer),expect(n.envelopes[1].cipherText).toBeDefined(),expect(n.envelopes[1].cipherText).toBeInstanceOf(Buffer),expect(n.envelopes[1].iv).toBeDefined(),expect(n.envelopes[1].iv).toBeInstanceOf(Buffer),expect(n.envelopes[1].mac).toBeDefined(),expect(n.envelopes[1].mac).toBeInstanceOf(Buffer),expect(n.envelopes[1].publicKey).toBeDefined(),expect(n.envelopes[1].publicKey).toBeInstanceOf(Buffer)})))),it("decrypts a message with other's key",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;const n=yield f("some super secret message",[e.toPublicKey().toString(),t.toPublicKey().toString()]);const o=yield l(n,n.envelopes[1],t);expect(o).toBe("some super secret message")})))),it("decrypts a message with my key",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;const n=yield f("some super secret message",[e.toPublicKey().toString(),t.toPublicKey().toString()]);const o=yield l(n,n.envelopes[0],e);expect(o).toBe("some super secret message")})))),it("throws when using a wrong secret key",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;const n=yield f("some super secret message",[e.toPublicKey().toString(),t.toPublicKey().toString()]);l(n,n.envelopes[1],e).then((()=>{fail("Did not throw an error.")})).catch((e=>{expect(e).toBeInstanceOf(Error),expect(e.message).toBe("Decryption failed.")}))})))),it("throws when decrypting a wrong cipher text",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;const n=yield f("some super secret message",[e.toPublicKey().toString(),t.toPublicKey().toString()]);l({cipherText:new Uint8Array(16),envelopes:[]},n.envelopes[1],e).then((()=>{fail("Did not throw an error.")})).catch((e=>{expect(e).toBeInstanceOf(Error),expect(e.message).toBe("Decryption failed.")}))})))),it("throws when using a wrong symmetric key",(()=>p(void 0,void 0,void 0,(function*(){const e=new d;const t=new d;l(yield f("some super secret message",[e.toPublicKey().toString(),t.toPublicKey().toString()]),a(yield r.default.encrypt(t.toPublicKey().toBuffer(),Buffer.alloc(i.default.secretbox.nonceLength+i.default.secretbox.keyLength))),t).then((()=>{fail("Did not throw an error.")})).catch((e=>{expect(e).toBeInstanceOf(Error),expect(e.message).toBe("Decryption failed.")}))}))))}))}));
