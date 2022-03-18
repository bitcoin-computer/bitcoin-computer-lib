"use strict";var e=require("tweetnacl");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("tweetnacl-util"),require("eccrypto"),require("bitcoin-computer-bitcore");var r=t(e);describe("Crypto",(()=>{describe("getNewSecret()",(()=>{it("returns new secret",(()=>{const e=r.default.randomBytes(32);expect(e).toBeInstanceOf(Uint8Array),expect(e.byteLength).toBe(32)}))})),describe("getNewNonce()",(()=>{it("returns new nonce",(()=>{const e=r.default.randomBytes(24);expect(e).toBeInstanceOf(Uint8Array),expect(e.byteLength).toBe(24)}))}))}));
