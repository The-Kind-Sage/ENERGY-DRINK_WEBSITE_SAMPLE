import { r as requireSafeBuffer } from "./safe-buffer.mjs";
import require$$3 from "stream";
import require$$0 from "util";
import { r as requireJwa } from "./jwa.mjs";
import require$$0$1 from "buffer";
var jws = {};
var dataStream;
var hasRequiredDataStream;
function requireDataStream() {
  if (hasRequiredDataStream) return dataStream;
  hasRequiredDataStream = 1;
  var Buffer = requireSafeBuffer().Buffer;
  var Stream = require$$3;
  var util = require$$0;
  function DataStream(data) {
    this.buffer = null;
    this.writable = true;
    this.readable = true;
    if (!data) {
      this.buffer = Buffer.alloc(0);
      return this;
    }
    if (typeof data.pipe === "function") {
      this.buffer = Buffer.alloc(0);
      data.pipe(this);
      return this;
    }
    if (data.length || typeof data === "object") {
      this.buffer = data;
      this.writable = false;
      process.nextTick((function() {
        this.emit("end", data);
        this.readable = false;
        this.emit("close");
      }).bind(this));
      return this;
    }
    throw new TypeError("Unexpected data type (" + typeof data + ")");
  }
  util.inherits(DataStream, Stream);
  DataStream.prototype.write = function write(data) {
    this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
    this.emit("data", data);
  };
  DataStream.prototype.end = function end(data) {
    if (data)
      this.write(data);
    this.emit("end", data);
    this.emit("close");
    this.writable = false;
    this.readable = false;
  };
  dataStream = DataStream;
  return dataStream;
}
var tostring;
var hasRequiredTostring;
function requireTostring() {
  if (hasRequiredTostring) return tostring;
  hasRequiredTostring = 1;
  var Buffer = require$$0$1.Buffer;
  tostring = function toString(obj) {
    if (typeof obj === "string")
      return obj;
    if (typeof obj === "number" || Buffer.isBuffer(obj))
      return obj.toString();
    return JSON.stringify(obj);
  };
  return tostring;
}
var signStream;
var hasRequiredSignStream;
function requireSignStream() {
  if (hasRequiredSignStream) return signStream;
  hasRequiredSignStream = 1;
  var Buffer = requireSafeBuffer().Buffer;
  var DataStream = requireDataStream();
  var jwa = requireJwa();
  var Stream = require$$3;
  var toString = requireTostring();
  var util = require$$0;
  function base64url(string, encoding) {
    return Buffer.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function jwsSecuredInput(header, payload, encoding) {
    encoding = encoding || "utf8";
    var encodedHeader = base64url(toString(header), "binary");
    var encodedPayload = base64url(toString(payload), encoding);
    return util.format("%s.%s", encodedHeader, encodedPayload);
  }
  function jwsSign(opts) {
    var header = opts.header;
    var payload = opts.payload;
    var secretOrKey = opts.secret || opts.privateKey;
    var encoding = opts.encoding;
    var algo = jwa(header.alg);
    var securedInput = jwsSecuredInput(header, payload, encoding);
    var signature = algo.sign(securedInput, secretOrKey);
    return util.format("%s.%s", securedInput, signature);
  }
  function SignStream(opts) {
    var secret = opts.secret;
    secret = secret == null ? opts.privateKey : secret;
    secret = secret == null ? opts.key : secret;
    if (/^hs/i.test(opts.header.alg) === true && secret == null) {
      throw new TypeError("secret must be a string or buffer or a KeyObject");
    }
    var secretStream = new DataStream(secret);
    this.readable = true;
    this.header = opts.header;
    this.encoding = opts.encoding;
    this.secret = this.privateKey = this.key = secretStream;
    this.payload = new DataStream(opts.payload);
    this.secret.once("close", (function() {
      if (!this.payload.writable && this.readable)
        this.sign();
    }).bind(this));
    this.payload.once("close", (function() {
      if (!this.secret.writable && this.readable)
        this.sign();
    }).bind(this));
  }
  util.inherits(SignStream, Stream);
  SignStream.prototype.sign = function sign() {
    try {
      var signature = jwsSign({
        header: this.header,
        payload: this.payload.buffer,
        secret: this.secret.buffer,
        encoding: this.encoding
      });
      this.emit("done", signature);
      this.emit("data", signature);
      this.emit("end");
      this.readable = false;
      return signature;
    } catch (e) {
      this.readable = false;
      this.emit("error", e);
      this.emit("close");
    }
  };
  SignStream.sign = jwsSign;
  signStream = SignStream;
  return signStream;
}
var verifyStream;
var hasRequiredVerifyStream;
function requireVerifyStream() {
  if (hasRequiredVerifyStream) return verifyStream;
  hasRequiredVerifyStream = 1;
  var Buffer = requireSafeBuffer().Buffer;
  var DataStream = requireDataStream();
  var jwa = requireJwa();
  var Stream = require$$3;
  var toString = requireTostring();
  var util = require$$0;
  var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
  function isObject(thing) {
    return Object.prototype.toString.call(thing) === "[object Object]";
  }
  function safeJsonParse(thing) {
    if (isObject(thing))
      return thing;
    try {
      return JSON.parse(thing);
    } catch (e) {
      return void 0;
    }
  }
  function headerFromJWS(jwsSig) {
    var encodedHeader = jwsSig.split(".", 1)[0];
    return safeJsonParse(Buffer.from(encodedHeader, "base64").toString("binary"));
  }
  function securedInputFromJWS(jwsSig) {
    return jwsSig.split(".", 2).join(".");
  }
  function signatureFromJWS(jwsSig) {
    return jwsSig.split(".")[2];
  }
  function payloadFromJWS(jwsSig, encoding) {
    encoding = encoding || "utf8";
    var payload = jwsSig.split(".")[1];
    return Buffer.from(payload, "base64").toString(encoding);
  }
  function isValidJws(string) {
    return JWS_REGEX.test(string) && !!headerFromJWS(string);
  }
  function jwsVerify(jwsSig, algorithm, secretOrKey) {
    if (!algorithm) {
      var err = new Error("Missing algorithm parameter for jws.verify");
      err.code = "MISSING_ALGORITHM";
      throw err;
    }
    jwsSig = toString(jwsSig);
    var signature = signatureFromJWS(jwsSig);
    var securedInput = securedInputFromJWS(jwsSig);
    var algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
  }
  function jwsDecode(jwsSig, opts) {
    opts = opts || {};
    jwsSig = toString(jwsSig);
    if (!isValidJws(jwsSig))
      return null;
    var header = headerFromJWS(jwsSig);
    if (!header)
      return null;
    var payload = payloadFromJWS(jwsSig);
    if (header.typ === "JWT" || opts.json)
      payload = JSON.parse(payload, opts.encoding);
    return {
      header,
      payload,
      signature: signatureFromJWS(jwsSig)
    };
  }
  function VerifyStream(opts) {
    opts = opts || {};
    var secretOrKey = opts.secret;
    secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
    secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
    if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
      throw new TypeError("secret must be a string or buffer or a KeyObject");
    }
    var secretStream = new DataStream(secretOrKey);
    this.readable = true;
    this.algorithm = opts.algorithm;
    this.encoding = opts.encoding;
    this.secret = this.publicKey = this.key = secretStream;
    this.signature = new DataStream(opts.signature);
    this.secret.once("close", (function() {
      if (!this.signature.writable && this.readable)
        this.verify();
    }).bind(this));
    this.signature.once("close", (function() {
      if (!this.secret.writable && this.readable)
        this.verify();
    }).bind(this));
  }
  util.inherits(VerifyStream, Stream);
  VerifyStream.prototype.verify = function verify() {
    try {
      var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
      var obj = jwsDecode(this.signature.buffer, this.encoding);
      this.emit("done", valid, obj);
      this.emit("data", valid);
      this.emit("end");
      this.readable = false;
      return valid;
    } catch (e) {
      this.readable = false;
      this.emit("error", e);
      this.emit("close");
    }
  };
  VerifyStream.decode = jwsDecode;
  VerifyStream.isValid = isValidJws;
  VerifyStream.verify = jwsVerify;
  verifyStream = VerifyStream;
  return verifyStream;
}
var hasRequiredJws;
function requireJws() {
  if (hasRequiredJws) return jws;
  hasRequiredJws = 1;
  var SignStream = requireSignStream();
  var VerifyStream = requireVerifyStream();
  var ALGORITHMS = [
    "HS256",
    "HS384",
    "HS512",
    "RS256",
    "RS384",
    "RS512",
    "PS256",
    "PS384",
    "PS512",
    "ES256",
    "ES384",
    "ES512"
  ];
  jws.ALGORITHMS = ALGORITHMS;
  jws.sign = SignStream.sign;
  jws.verify = VerifyStream.verify;
  jws.decode = VerifyStream.decode;
  jws.isValid = VerifyStream.isValid;
  jws.createSign = function createSign(opts) {
    return new SignStream(opts);
  };
  jws.createVerify = function createVerify(opts) {
    return new VerifyStream(opts);
  };
  return jws;
}
export {
  requireJws as r
};
