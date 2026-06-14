import require$$0$1 from "events";
import require$$1$1 from "util/types";
import require$$0 from "dns";
import require$$0$2 from "net";
import require$$1$3 from "tls";
import { c as commonjsGlobal, b as getAugmentedNamespace, g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requirePgTypes } from "./pg-types.mjs";
import require$$0$3 from "util";
import require$$1$2 from "crypto";
import { r as requirePgConnectionString } from "./pg-connection-string.mjs";
import { r as requireDist } from "./pg-protocol.mjs";
import { r as requireEmpty } from "./pg-cloudflare.mjs";
import { r as requireLib$1 } from "./pgpass.mjs";
import { r as requirePgPool } from "./pg-pool.mjs";
var lib = { exports: {} };
var defaults = { exports: {} };
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults.exports;
  hasRequiredDefaults = 1;
  (function(module) {
    let user;
    try {
      user = process.platform === "win32" ? process.env.USERNAME : process.env.USER;
    } catch {
    }
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    const pgTypes = requirePgTypes();
    const parseBigInteger = pgTypes.getTypeParser(20, "text");
    const parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  })(defaults);
  return defaults.exports;
}
var utils$1;
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  const defaults2 = requireDefaults();
  const { isDate } = require$$1$1;
  function escapeElement(elementRepresentation) {
    const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + escaped + '"';
  }
  function arrayString(val) {
    let result2 = "{";
    for (let i = 0; i < val.length; i++) {
      if (i > 0) {
        result2 += ",";
      }
      let item = val[i];
      if (item == null) {
        result2 += "NULL";
      } else if (Array.isArray(item)) {
        result2 += arrayString(item);
      } else if (ArrayBuffer.isView(item)) {
        if (!(item instanceof Buffer)) {
          item = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
        }
        result2 += "\\\\x" + item.toString("hex");
      } else {
        result2 += escapeElement(prepareValue(item));
      }
    }
    result2 += "}";
    return result2;
  }
  const prepareValue = function(val, seen) {
    if (val == null) {
      return null;
    }
    if (typeof val === "object") {
      if (val instanceof Buffer) {
        return val;
      }
      if (ArrayBuffer.isView(val)) {
        return Buffer.from(val.buffer, val.byteOffset, val.byteLength);
      }
      if (isDate(val)) {
        if (defaults2.parseInputDatesAsUTC) {
          return dateToStringUTC(val);
        } else {
          return dateToString(val);
        }
      }
      if (Array.isArray(val)) {
        return arrayString(val);
      }
      return prepareObject(val, seen);
    }
    return val.toString();
  };
  function prepareObject(val, seen) {
    if (val && typeof val.toPostgres === "function") {
      seen = seen || [];
      if (seen.indexOf(val) !== -1) {
        throw new Error('circular reference detected while preparing "' + val + '" for query');
      }
      seen.push(val);
      return prepareValue(val.toPostgres(prepareValue), seen);
    }
    return JSON.stringify(val);
  }
  function dateToString(date) {
    let offset = -date.getTimezoneOffset();
    let year = date.getFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1;
    let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
    if (offset < 0) {
      ret += "-";
      offset *= -1;
    } else {
      ret += "+";
    }
    ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
    if (isBCYear) ret += " BC";
    return ret;
  }
  function dateToStringUTC(date) {
    let year = date.getUTCFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1;
    let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
    ret += "+00:00";
    if (isBCYear) ret += " BC";
    return ret;
  }
  function normalizeQueryConfig(config, values, callback) {
    config = typeof config === "string" ? { text: config } : config;
    if (values) {
      if (typeof values === "function") {
        config.callback = values;
      } else {
        config.values = values;
      }
    }
    if (callback) {
      config.callback = callback;
    }
    return config;
  }
  const escapeIdentifier = function(str) {
    return '"' + str.replace(/"/g, '""') + '"';
  };
  const escapeLiteral = function(str) {
    let hasBackslash = false;
    let escaped = "'";
    if (str == null) {
      return "''";
    }
    if (typeof str !== "string") {
      return "''";
    }
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "'") {
        escaped += c + c;
      } else if (c === "\\") {
        escaped += c + c;
        hasBackslash = true;
      } else {
        escaped += c;
      }
    }
    escaped += "'";
    if (hasBackslash === true) {
      escaped = " E" + escaped;
    }
    return escaped;
  };
  utils$1 = {
    prepareValue: function prepareValueWrapper(value) {
      return prepareValue(value);
    },
    normalizeQueryConfig,
    escapeIdentifier,
    escapeLiteral
  };
  return utils$1;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const nodeCrypto = require$$1$2;
  utils = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
  };
  const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
  const subtleCrypto = webCrypto.subtle;
  const textEncoder = new TextEncoder();
  function randomBytes(length) {
    return webCrypto.getRandomValues(Buffer.alloc(length));
  }
  async function md5(string) {
    try {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    } catch (e) {
      const data = typeof string === "string" ? textEncoder.encode(string) : string;
      const hash = await subtleCrypto.digest("MD5", data);
      return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  }
  async function postgresMd5PasswordHash(user, password, salt) {
    const inner = await md5(password + user);
    const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  async function sha256(text) {
    return await subtleCrypto.digest("SHA-256", text);
  }
  async function hashByName(hashName, text) {
    return await subtleCrypto.digest(hashName, text);
  }
  async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
  }
  async function deriveKey(password, salt, iterations) {
    const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
  }
  return utils;
}
var certSignatures;
var hasRequiredCertSignatures;
function requireCertSignatures() {
  if (hasRequiredCertSignatures) return certSignatures;
  hasRequiredCertSignatures = 1;
  function x509Error(msg, cert) {
    return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
  }
  function readASN1Length(data, index) {
    let length = data[index++];
    if (length < 128) return { length, index };
    const lengthBytes = length & 127;
    if (lengthBytes > 4) throw x509Error("bad length", data);
    length = 0;
    for (let i = 0; i < lengthBytes; i++) {
      length = length << 8 | data[index++];
    }
    return { length, index };
  }
  function readASN1OID(data, index) {
    if (data[index++] !== 6) throw x509Error("non-OID data", data);
    const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
    index = indexAfterOIDLength;
    const lastIndex = index + OIDLength;
    const byte1 = data[index++];
    let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
    while (index < lastIndex) {
      let value = 0;
      while (index < lastIndex) {
        const nextByte = data[index++];
        value = value << 7 | nextByte & 127;
        if (nextByte < 128) break;
      }
      oid += "." + value;
    }
    return { oid, index };
  }
  function expectASN1Seq(data, index) {
    if (data[index++] !== 48) throw x509Error("non-sequence data", data);
    return readASN1Length(data, index);
  }
  function signatureAlgorithmHashFromCertificate(data, index) {
    if (index === void 0) index = 0;
    index = expectASN1Seq(data, index).index;
    const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
    index = indexAfterCertInfoLength + certInfoLength;
    index = expectASN1Seq(data, index).index;
    const { oid, index: indexAfterOID } = readASN1OID(data, index);
    switch (oid) {
      // RSA
      case "1.2.840.113549.1.1.4":
        return "MD5";
      case "1.2.840.113549.1.1.5":
        return "SHA-1";
      case "1.2.840.113549.1.1.11":
        return "SHA-256";
      case "1.2.840.113549.1.1.12":
        return "SHA-384";
      case "1.2.840.113549.1.1.13":
        return "SHA-512";
      case "1.2.840.113549.1.1.14":
        return "SHA-224";
      case "1.2.840.113549.1.1.15":
        return "SHA512-224";
      case "1.2.840.113549.1.1.16":
        return "SHA512-256";
      // ECDSA
      case "1.2.840.10045.4.1":
        return "SHA-1";
      case "1.2.840.10045.4.3.1":
        return "SHA-224";
      case "1.2.840.10045.4.3.2":
        return "SHA-256";
      case "1.2.840.10045.4.3.3":
        return "SHA-384";
      case "1.2.840.10045.4.3.4":
        return "SHA-512";
      // RSASSA-PSS: hash is indicated separately
      case "1.2.840.113549.1.1.10": {
        index = indexAfterOID;
        index = expectASN1Seq(data, index).index;
        if (data[index++] !== 160) throw x509Error("non-tag data", data);
        index = readASN1Length(data, index).index;
        index = expectASN1Seq(data, index).index;
        const { oid: hashOID } = readASN1OID(data, index);
        switch (hashOID) {
          // standalone hash OIDs
          case "1.2.840.113549.2.5":
            return "MD5";
          case "1.3.14.3.2.26":
            return "SHA-1";
          case "2.16.840.1.101.3.4.2.1":
            return "SHA-256";
          case "2.16.840.1.101.3.4.2.2":
            return "SHA-384";
          case "2.16.840.1.101.3.4.2.3":
            return "SHA-512";
        }
        throw x509Error("unknown hash OID " + hashOID, data);
      }
      // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
      case "1.3.101.110":
      case "1.3.101.112":
        return "SHA-512";
      // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
      case "1.3.101.111":
      case "1.3.101.113":
        throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
    }
    throw x509Error("unknown OID " + oid, data);
  }
  certSignatures = { signatureAlgorithmHashFromCertificate };
  return certSignatures;
}
var sasl;
var hasRequiredSasl;
function requireSasl() {
  if (hasRequiredSasl) return sasl;
  hasRequiredSasl = 1;
  const crypto = requireUtils();
  const { signatureAlgorithmHashFromCertificate } = requireCertSignatures();
  function saslprep(password) {
    const nonAsciiSpace = /[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g;
    const mappedToNothing = /[\u00AD\u034F\u1806\u180B\u180C\u180D\u200C\u200D\u2060\uFE00-\uFE0F\uFEFF]/g;
    return password.replace(nonAsciiSpace, " ").replace(mappedToNothing, "").normalize("NFKC");
  }
  const DEFAULT_MAX_SCRAM_ITERATIONS = 1e5;
  function startSession(mechanisms, stream2, scramMaxIterations = DEFAULT_MAX_SCRAM_ITERATIONS) {
    const candidates = ["SCRAM-SHA-256"];
    if (stream2) candidates.unshift("SCRAM-SHA-256-PLUS");
    const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
    if (!mechanism) {
      throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
    }
    if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream2.getPeerCertificate !== "function") {
      throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
    }
    const clientNonce = crypto.randomBytes(18).toString("base64");
    const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream2 ? "y" : "n";
    return {
      mechanism,
      clientNonce,
      response: gs2Header + ",,n=*,r=" + clientNonce,
      message: "SASLInitialResponse",
      scramMaxIterations
    };
  }
  async function continueSession(session, password, serverData, stream2) {
    if (session.message !== "SASLInitialResponse") {
      throw new Error("SASL: Last message was not SASLInitialResponse");
    }
    if (typeof password !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    }
    if (password === "") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
    }
    if (typeof serverData !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    }
    const sv = parseServerFirstMessage(serverData);
    if (!sv.nonce.startsWith(session.clientNonce)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    } else if (sv.nonce.length === session.clientNonce.length) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    }
    const scramMaxIterations = typeof session.scramMaxIterations === "number" ? session.scramMaxIterations : DEFAULT_MAX_SCRAM_ITERATIONS;
    if (scramMaxIterations !== 0 && sv.iteration > scramMaxIterations) {
      throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration count " + sv.iteration + " exceeds scramMaxIterations of " + scramMaxIterations
      );
    }
    const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
    const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
    let channelBinding = stream2 ? "eSws" : "biws";
    if (session.mechanism === "SCRAM-SHA-256-PLUS") {
      const peerCert = stream2.getPeerCertificate().raw;
      let hashName = signatureAlgorithmHashFromCertificate(peerCert);
      if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
      const certHash = await crypto.hashByName(hashName, peerCert);
      const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
      channelBinding = bindingData.toString("base64");
    }
    const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
    const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
    const saltBytes = Buffer.from(sv.salt, "base64");
    const saltedPassword = await crypto.deriveKey(saslprep(password), saltBytes, sv.iteration);
    const clientKey = await crypto.hmacSha256(saltedPassword, "Client Key");
    const storedKey = await crypto.sha256(clientKey);
    const clientSignature = await crypto.hmacSha256(storedKey, authMessage);
    const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
    const serverKey = await crypto.hmacSha256(saltedPassword, "Server Key");
    const serverSignatureBytes = await crypto.hmacSha256(serverKey, authMessage);
    session.message = "SASLResponse";
    session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
    session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
  }
  function finalizeSession(session, serverData) {
    if (session.message !== "SASLResponse") {
      throw new Error("SASL: Last message was not SASLResponse");
    }
    if (typeof serverData !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    }
    const { serverSignature } = parseServerFinalMessage(serverData);
    if (serverSignature !== session.serverSignature) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
    }
  }
  function isPrintableChars(text) {
    if (typeof text !== "string") {
      throw new TypeError("SASL: text must be a string");
    }
    return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
  }
  function isBase64(text) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
  }
  function parseAttributePairs(text) {
    if (typeof text !== "string") {
      throw new TypeError("SASL: attribute pairs text must be a string");
    }
    return new Map(
      text.split(",").map((attrValue) => {
        if (!/^.=/.test(attrValue)) {
          throw new Error("SASL: Invalid attribute pair entry");
        }
        const name = attrValue[0];
        const value = attrValue.substring(2);
        return [name, value];
      })
    );
  }
  function parseServerFirstMessage(data) {
    const attrPairs = parseAttributePairs(data);
    const nonce = attrPairs.get("r");
    if (!nonce) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    } else if (!isPrintableChars(nonce)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    }
    const salt = attrPairs.get("s");
    if (!salt) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    } else if (!isBase64(salt)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    }
    const iterationText = attrPairs.get("i");
    if (!iterationText) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    }
    const iteration = parseInt(iterationText, 10);
    return {
      nonce,
      salt,
      iteration
    };
  }
  function parseServerFinalMessage(serverData) {
    const attrPairs = parseAttributePairs(serverData);
    const error = attrPairs.get("e");
    const serverSignature = attrPairs.get("v");
    if (error) {
      throw new Error(`SASL: SCRAM-SERVER-FINAL-MESSAGE: server returned error: "${error}"`);
    }
    if (!serverSignature) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    } else if (!isBase64(serverSignature)) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    }
    return {
      serverSignature
    };
  }
  function xorBuffers(a, b) {
    if (!Buffer.isBuffer(a)) {
      throw new TypeError("first argument must be a Buffer");
    }
    if (!Buffer.isBuffer(b)) {
      throw new TypeError("second argument must be a Buffer");
    }
    if (a.length !== b.length) {
      throw new Error("Buffer lengths must match");
    }
    if (a.length === 0) {
      throw new Error("Buffers cannot be empty");
    }
    return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
  }
  sasl = {
    startSession,
    continueSession,
    finalizeSession,
    DEFAULT_MAX_SCRAM_ITERATIONS
  };
  return sasl;
}
var typeOverrides;
var hasRequiredTypeOverrides;
function requireTypeOverrides() {
  if (hasRequiredTypeOverrides) return typeOverrides;
  hasRequiredTypeOverrides = 1;
  const types = requirePgTypes();
  function TypeOverrides(userTypes) {
    this._types = userTypes || types;
    this.text = {};
    this.binary = {};
  }
  TypeOverrides.prototype.getOverrides = function(format) {
    switch (format) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  TypeOverrides.prototype.setTypeParser = function(oid, format, parseFn) {
    if (typeof format === "function") {
      parseFn = format;
      format = "text";
    }
    this.getOverrides(format)[oid] = parseFn;
  };
  TypeOverrides.prototype.getTypeParser = function(oid, format) {
    format = format || "text";
    return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
  };
  typeOverrides = TypeOverrides;
  return typeOverrides;
}
var connectionParameters;
var hasRequiredConnectionParameters;
function requireConnectionParameters() {
  if (hasRequiredConnectionParameters) return connectionParameters;
  hasRequiredConnectionParameters = 1;
  const dns = require$$0;
  const defaults2 = requireDefaults();
  const parse = requirePgConnectionString().parse;
  const val = function(key, config, envVar) {
    if (config[key]) {
      return config[key];
    }
    if (envVar === void 0) {
      envVar = process.env["PG" + key.toUpperCase()];
    } else if (envVar === false) ;
    else {
      envVar = process.env[envVar];
    }
    return envVar || defaults2[key];
  };
  const readSSLConfigFromEnvironment = function() {
    switch (process.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return defaults2.ssl;
  };
  const quoteParamValue = function(value) {
    return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  };
  const add = function(params, config, paramName) {
    const value = config[paramName];
    if (value !== void 0 && value !== null) {
      params.push(paramName + "=" + quoteParamValue(value));
    }
  };
  class ConnectionParameters {
    constructor(config) {
      config = typeof config === "string" ? parse(config) : config || {};
      if (config.connectionString) {
        config = Object.assign({}, config, parse(config.connectionString));
      }
      this.user = val("user", config);
      this.database = val("database", config);
      if (this.database === void 0) {
        this.database = this.user;
      }
      this.port = parseInt(val("port", config), 10);
      this.host = val("host", config);
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: val("password", config)
      });
      this.binary = val("binary", config);
      this.options = val("options", config);
      this.ssl = typeof config.ssl === "undefined" ? readSSLConfigFromEnvironment() : config.ssl;
      if (typeof this.ssl === "string") {
        if (this.ssl === "true") {
          this.ssl = true;
        }
      }
      if (this.ssl === "no-verify") {
        this.ssl = { rejectUnauthorized: false };
      }
      if (this.ssl && this.ssl.key) {
        Object.defineProperty(this.ssl, "key", {
          enumerable: false
        });
      }
      this.client_encoding = val("client_encoding", config);
      this.replication = val("replication", config);
      this.isDomainSocket = !(this.host || "").indexOf("/");
      this.application_name = val("application_name", config, "PGAPPNAME");
      this.fallback_application_name = val("fallback_application_name", config, false);
      this.statement_timeout = val("statement_timeout", config, false);
      this.lock_timeout = val("lock_timeout", config, false);
      this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config, false);
      this.query_timeout = val("query_timeout", config, false);
      if (config.connectionTimeoutMillis === void 0) {
        this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
      } else {
        this.connect_timeout = Math.floor(config.connectionTimeoutMillis / 1e3);
      }
      if (config.keepAlive === false) {
        this.keepalives = 0;
      } else if (config.keepAlive === true) {
        this.keepalives = 1;
      }
      if (typeof config.keepAliveInitialDelayMillis === "number") {
        this.keepalives_idle = Math.floor(config.keepAliveInitialDelayMillis / 1e3);
      }
    }
    getLibpqConnectionString(cb) {
      const params = [];
      add(params, this, "user");
      add(params, this, "password");
      add(params, this, "port");
      add(params, this, "application_name");
      add(params, this, "fallback_application_name");
      add(params, this, "connect_timeout");
      add(params, this, "options");
      const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      add(params, ssl, "sslmode");
      add(params, ssl, "sslca");
      add(params, ssl, "sslkey");
      add(params, ssl, "sslcert");
      add(params, ssl, "sslrootcert");
      if (this.database) {
        params.push("dbname=" + quoteParamValue(this.database));
      }
      if (this.replication) {
        params.push("replication=" + quoteParamValue(this.replication));
      }
      if (this.host) {
        params.push("host=" + quoteParamValue(this.host));
      }
      if (this.isDomainSocket) {
        return cb(null, params.join(" "));
      }
      if (this.client_encoding) {
        params.push("client_encoding=" + quoteParamValue(this.client_encoding));
      }
      dns.lookup(this.host, function(err, address) {
        if (err) return cb(err, null);
        params.push("hostaddr=" + quoteParamValue(address));
        return cb(null, params.join(" "));
      });
    }
  }
  connectionParameters = ConnectionParameters;
  return connectionParameters;
}
var result;
var hasRequiredResult;
function requireResult() {
  if (hasRequiredResult) return result;
  hasRequiredResult = 1;
  const types = requirePgTypes();
  const matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
  class Result {
    constructor(rowMode, types2) {
      this.command = null;
      this.rowCount = null;
      this.oid = null;
      this.rows = [];
      this.fields = [];
      this._parsers = void 0;
      this._types = types2;
      this.RowCtor = null;
      this.rowAsArray = rowMode === "array";
      if (this.rowAsArray) {
        this.parseRow = this._parseRowAsArray;
      }
      this._prebuiltEmptyResultObject = null;
    }
    // adds a command complete message
    addCommandComplete(msg) {
      let match;
      if (msg.text) {
        match = matchRegexp.exec(msg.text);
      } else {
        match = matchRegexp.exec(msg.command);
      }
      if (match) {
        this.command = match[1];
        if (match[3]) {
          this.oid = parseInt(match[2], 10);
          this.rowCount = parseInt(match[3], 10);
        } else if (match[2]) {
          this.rowCount = parseInt(match[2], 10);
        }
      }
    }
    _parseRowAsArray(rowData) {
      const row = new Array(rowData.length);
      for (let i = 0, len = rowData.length; i < len; i++) {
        const rawValue = rowData[i];
        if (rawValue !== null) {
          row[i] = this._parsers[i](rawValue);
        } else {
          row[i] = null;
        }
      }
      return row;
    }
    parseRow(rowData) {
      const row = { ...this._prebuiltEmptyResultObject };
      for (let i = 0, len = rowData.length; i < len; i++) {
        const rawValue = rowData[i];
        const field = this.fields[i].name;
        if (rawValue !== null) {
          const v = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
          row[field] = this._parsers[i](v);
        } else {
          row[field] = null;
        }
      }
      return row;
    }
    addRow(row) {
      this.rows.push(row);
    }
    addFields(fieldDescriptions) {
      this.fields = fieldDescriptions;
      if (this.fields.length) {
        this._parsers = new Array(fieldDescriptions.length);
      }
      const row = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < fieldDescriptions.length; i++) {
        const desc = fieldDescriptions[i];
        row[desc.name] = null;
        if (this._types) {
          this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
        } else {
          this._parsers[i] = types.getTypeParser(desc.dataTypeID, desc.format || "text");
        }
      }
      this._prebuiltEmptyResultObject = { ...row };
    }
  }
  result = Result;
  return result;
}
var query$1;
var hasRequiredQuery$1;
function requireQuery$1() {
  if (hasRequiredQuery$1) return query$1;
  hasRequiredQuery$1 = 1;
  const { EventEmitter } = require$$0$1;
  const Result = requireResult();
  const utils2 = requireUtils$1();
  class Query extends EventEmitter {
    constructor(config, values, callback) {
      super();
      config = utils2.normalizeQueryConfig(config, values, callback);
      this.text = config.text;
      this.values = config.values;
      this.rows = config.rows;
      this.types = config.types;
      this.name = config.name;
      this.queryMode = config.queryMode;
      this.binary = config.binary;
      this.portal = config.portal || "";
      this.callback = config.callback;
      this._rowMode = config.rowMode;
      if (process.domain && config.callback) {
        this.callback = process.domain.bind(config.callback);
      }
      this._result = new Result(this._rowMode, this.types);
      this._results = this._result;
      this._canceledDueToError = false;
    }
    requiresPreparation() {
      if (this.queryMode === "extended") {
        return true;
      }
      if (this.name) {
        return true;
      }
      if (this.rows) {
        return true;
      }
      if (!this.text) {
        return false;
      }
      if (!this.values) {
        return false;
      }
      return this.values.length > 0;
    }
    _checkForMultirow() {
      if (this._result.command) {
        if (!Array.isArray(this._results)) {
          this._results = [this._result];
        }
        this._result = new Result(this._rowMode, this._result._types);
        this._results.push(this._result);
      }
    }
    // associates row metadata from the supplied
    // message with this query object
    // metadata used when parsing row results
    handleRowDescription(msg) {
      this._checkForMultirow();
      this._result.addFields(msg.fields);
      this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(msg) {
      let row;
      if (this._canceledDueToError) {
        return;
      }
      try {
        row = this._result.parseRow(msg.fields);
      } catch (err) {
        this._canceledDueToError = err;
        return;
      }
      this.emit("row", row, this._result);
      if (this._accumulateRows) {
        this._result.addRow(row);
      }
    }
    handleCommandComplete(msg, connection2) {
      this._checkForMultirow();
      this._result.addCommandComplete(msg);
      if (this.rows) {
        connection2.sync();
      }
    }
    // if a named prepared statement is created with empty query text
    // the backend will send an emptyQuery message but *not* a command complete message
    // since we pipeline sync immediately after execute we don't need to do anything here
    // unless we have rows specified, in which case we did not pipeline the initial sync call
    handleEmptyQuery(connection2) {
      if (this.rows) {
        connection2.sync();
      }
    }
    handleError(err, connection2) {
      if (this._canceledDueToError) {
        err = this._canceledDueToError;
        this._canceledDueToError = false;
      }
      if (this.callback) {
        return this.callback(err);
      }
      this.emit("error", err);
    }
    handleReadyForQuery(con) {
      if (this._canceledDueToError) {
        return this.handleError(this._canceledDueToError, con);
      }
      if (this.callback) {
        try {
          this.callback(null, this._results);
        } catch (err) {
          process.nextTick(() => {
            throw err;
          });
        }
      }
      this.emit("end", this._results);
    }
    submit(connection2) {
      if (typeof this.text !== "string" && typeof this.name !== "string") {
        return new Error("A query must have either text or a name. Supplying neither is unsupported.");
      }
      const previous = connection2.parsedStatements[this.name];
      if (this.text && previous && this.text !== previous) {
        return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
      }
      if (this.values && !Array.isArray(this.values)) {
        return new Error("Query values must be an array");
      }
      if (this.requiresPreparation()) {
        connection2.stream.cork && connection2.stream.cork();
        try {
          this.prepare(connection2);
        } finally {
          connection2.stream.uncork && connection2.stream.uncork();
        }
      } else {
        connection2.query(this.text);
      }
      return null;
    }
    hasBeenParsed(connection2) {
      return this.name && connection2.parsedStatements[this.name];
    }
    handlePortalSuspended(connection2) {
      this._getRows(connection2, this.rows);
    }
    _getRows(connection2, rows) {
      connection2.execute({
        portal: this.portal,
        rows
      });
      if (!rows) {
        connection2.sync();
      } else {
        connection2.flush();
      }
    }
    // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
    prepare(connection2) {
      if (!this.hasBeenParsed(connection2)) {
        connection2.parse({
          text: this.text,
          name: this.name,
          types: this.types
        });
      }
      try {
        connection2.bind({
          portal: this.portal,
          statement: this.name,
          values: this.values,
          binary: this.binary,
          valueMapper: utils2.prepareValue
        });
      } catch (err) {
        this.handleError(err, connection2);
        return;
      }
      connection2.describe({
        type: "P",
        name: this.portal || ""
      });
      this._getRows(connection2, this.rows);
    }
    handleCopyInResponse(connection2) {
      connection2.sendCopyFail("No source stream defined");
    }
    handleCopyData(msg, connection2) {
    }
  }
  query$1 = Query;
  return query$1;
}
var stream;
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream) return stream;
  hasRequiredStream = 1;
  const { getStream, getSecureStream } = getStreamFuncs();
  stream = {
    /**
     * Get a socket stream compatible with the current runtime environment.
     * @returns {Duplex}
     */
    getStream,
    /**
     * Get a TLS secured socket, compatible with the current environment,
     * using the socket and other settings given in `options`.
     * @returns {Duplex}
     */
    getSecureStream
  };
  function getNodejsStreamFuncs() {
    function getStream2(ssl) {
      const net = require$$0$2;
      return new net.Socket();
    }
    function getSecureStream2(options) {
      const tls = require$$1$3;
      return tls.connect(options);
    }
    return {
      getStream: getStream2,
      getSecureStream: getSecureStream2
    };
  }
  function getCloudflareStreamFuncs() {
    function getStream2(ssl) {
      const { CloudflareSocket } = requireEmpty();
      return new CloudflareSocket(ssl);
    }
    function getSecureStream2(options) {
      options.socket.startTls(options);
      return options.socket;
    }
    return {
      getStream: getStream2,
      getSecureStream: getSecureStream2
    };
  }
  function isCloudflareRuntime() {
    if (typeof navigator === "object" && navigator !== null && typeof navigator.userAgent === "string") {
      return navigator.userAgent === "Cloudflare-Workers";
    }
    if (typeof Response === "function") {
      const resp = new Response(null, { cf: { thing: true } });
      if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
        return true;
      }
    }
    return false;
  }
  function getStreamFuncs() {
    if (isCloudflareRuntime()) {
      return getCloudflareStreamFuncs();
    }
    return getNodejsStreamFuncs();
  }
  return stream;
}
var connection;
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection) return connection;
  hasRequiredConnection = 1;
  const EventEmitter = require$$0$1.EventEmitter;
  const { parse, serialize } = requireDist();
  const { getStream, getSecureStream } = requireStream();
  const flushBuffer = serialize.flush();
  const syncBuffer = serialize.sync();
  const endBuffer = serialize.end();
  class Connection extends EventEmitter {
    constructor(config) {
      super();
      config = config || {};
      this.stream = config.stream || getStream(config.ssl);
      if (typeof this.stream === "function") {
        this.stream = this.stream(config);
      }
      this._keepAlive = config.keepAlive;
      this._keepAliveInitialDelayMillis = config.keepAliveInitialDelayMillis;
      this.parsedStatements = {};
      this.ssl = config.ssl || false;
      this._ending = false;
      this._emitMessage = false;
      const self = this;
      this.on("newListener", function(eventName) {
        if (eventName === "message") {
          self._emitMessage = true;
        }
      });
    }
    connect(port, host) {
      const self = this;
      this._connecting = true;
      this.stream.setNoDelay(true);
      this.stream.connect(port, host);
      this.stream.once("connect", function() {
        if (self._keepAlive) {
          self.stream.setKeepAlive(true, self._keepAliveInitialDelayMillis);
        }
        self.emit("connect");
      });
      const reportStreamError = function(error) {
        if (self._ending && (error.code === "ECONNRESET" || error.code === "EPIPE")) {
          return;
        }
        self.emit("error", error);
      };
      this.stream.on("error", reportStreamError);
      this.stream.on("close", function() {
        self.emit("end");
      });
      if (!this.ssl) {
        return this.attachListeners(this.stream);
      }
      this.stream.once("data", function(buffer) {
        const responseCode = buffer.toString("utf8");
        switch (responseCode) {
          case "S":
            break;
          case "N":
            self.stream.end();
            return self.emit("error", new Error("The server does not support SSL connections"));
          default:
            self.stream.end();
            return self.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        const options = {
          socket: self.stream
        };
        if (self.ssl !== true) {
          Object.assign(options, self.ssl);
          if ("key" in self.ssl) {
            options.key = self.ssl.key;
          }
        }
        const net = require$$0$2;
        if (net.isIP && net.isIP(host) === 0) {
          options.servername = host;
        }
        try {
          self.stream = getSecureStream(options);
        } catch (err) {
          return self.emit("error", err);
        }
        self.attachListeners(self.stream);
        self.stream.on("error", reportStreamError);
        self.emit("sslconnect");
      });
    }
    attachListeners(stream2) {
      parse(stream2, (msg) => {
        const eventName = msg.name === "error" ? "errorMessage" : msg.name;
        if (this._emitMessage) {
          this.emit("message", msg);
        }
        this.emit(eventName, msg);
      });
    }
    requestSsl() {
      this.stream.write(serialize.requestSsl());
    }
    startup(config) {
      this.stream.write(serialize.startup(config));
    }
    cancel(processID, secretKey) {
      this._send(serialize.cancel(processID, secretKey));
    }
    password(password) {
      this._send(serialize.password(password));
    }
    sendSASLInitialResponseMessage(mechanism, initialResponse) {
      this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
    }
    sendSCRAMClientFinalMessage(additionalData) {
      this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
    }
    _send(buffer) {
      if (!this.stream.writable) {
        return false;
      }
      return this.stream.write(buffer);
    }
    query(text) {
      this._send(serialize.query(text));
    }
    // send parse message
    parse(query2) {
      this._send(serialize.parse(query2));
    }
    // send bind message
    bind(config) {
      this._send(serialize.bind(config));
    }
    // send execute message
    execute(config) {
      this._send(serialize.execute(config));
    }
    flush() {
      if (this.stream.writable) {
        this.stream.write(flushBuffer);
      }
    }
    sync() {
      this._ending = true;
      this._send(syncBuffer);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      this._ending = true;
      if (!this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(endBuffer, () => {
        this.stream.end();
      });
    }
    close(msg) {
      this._send(serialize.close(msg));
    }
    describe(msg) {
      this._send(serialize.describe(msg));
    }
    sendCopyFromChunk(chunk) {
      this._send(serialize.copyData(chunk));
    }
    endCopyFrom() {
      this._send(serialize.copyDone());
    }
    sendCopyFail(msg) {
      this._send(serialize.copyFail(msg));
    }
  }
  connection = Connection;
  return connection;
}
var client$1;
var hasRequiredClient$1;
function requireClient$1() {
  if (hasRequiredClient$1) return client$1;
  hasRequiredClient$1 = 1;
  const EventEmitter = require$$0$1.EventEmitter;
  const utils2 = requireUtils$1();
  const nodeUtils = require$$0$3;
  const sasl2 = requireSasl();
  const TypeOverrides = requireTypeOverrides();
  const ConnectionParameters = requireConnectionParameters();
  const Query = requireQuery$1();
  const defaults2 = requireDefaults();
  const Connection = requireConnection();
  const crypto = requireUtils();
  const activeQueryDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "Client.activeQuery is deprecated and will be removed in pg@9.0"
  );
  const queryQueueDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "Client.queryQueue is deprecated and will be removed in pg@9.0."
  );
  const pgPassDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."
  );
  const byoPromiseDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."
  );
  const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
  );
  function coerceNumberOrDefault(value, defaultValue) {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : defaultValue;
    }
    if (typeof value === "string" && value.trim() !== "") {
      const n = Number(value);
      return Number.isFinite(n) ? n : defaultValue;
    }
    return defaultValue;
  }
  class Client extends EventEmitter {
    constructor(config) {
      super();
      this.connectionParameters = new ConnectionParameters(config);
      this.user = this.connectionParameters.user;
      this.database = this.connectionParameters.database;
      this.port = this.connectionParameters.port;
      this.host = this.connectionParameters.host;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: this.connectionParameters.password
      });
      this.replication = this.connectionParameters.replication;
      const c = config || {};
      if (c.Promise) {
        byoPromiseDeprecationNotice();
      }
      this._Promise = c.Promise || commonjsGlobal.Promise;
      this._types = new TypeOverrides(c.types);
      this._ending = false;
      this._ended = false;
      this._connecting = false;
      this._connected = false;
      this._connectionError = false;
      this._queryable = true;
      this._activeQuery = null;
      this._txStatus = null;
      this.enableChannelBinding = Boolean(c.enableChannelBinding);
      this.scramMaxIterations = coerceNumberOrDefault(c.scramMaxIterations, sasl2.DEFAULT_MAX_SCRAM_ITERATIONS);
      this.connection = c.connection || new Connection({
        stream: c.stream,
        ssl: this.connectionParameters.ssl,
        keepAlive: c.keepAlive || false,
        keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
        encoding: this.connectionParameters.client_encoding || "utf8"
      });
      this._queryQueue = [];
      this.binary = c.binary || defaults2.binary;
      this.processID = null;
      this.secretKey = null;
      this.ssl = this.connectionParameters.ssl || false;
      if (this.ssl && this.ssl.key) {
        Object.defineProperty(this.ssl, "key", {
          enumerable: false
        });
      }
      this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
    }
    get activeQuery() {
      activeQueryDeprecationNotice();
      return this._activeQuery;
    }
    set activeQuery(val) {
      activeQueryDeprecationNotice();
      this._activeQuery = val;
    }
    _getActiveQuery() {
      return this._activeQuery;
    }
    _errorAllQueries(err) {
      const enqueueError = (query2) => {
        process.nextTick(() => {
          query2.handleError(err, this.connection);
        });
      };
      const activeQuery = this._getActiveQuery();
      if (activeQuery) {
        enqueueError(activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    }
    _connect(callback) {
      const self = this;
      const con = this.connection;
      this._connectionCallback = callback;
      if (this._connecting || this._connected) {
        const err = new Error("Client has already been connected. You cannot reuse a client.");
        process.nextTick(() => {
          callback(err);
        });
        return;
      }
      this._connecting = true;
      if (this._connectionTimeoutMillis > 0) {
        this.connectionTimeoutHandle = setTimeout(() => {
          con._ending = true;
          con.stream.destroy(new Error("timeout expired"));
        }, this._connectionTimeoutMillis);
        if (this.connectionTimeoutHandle.unref) {
          this.connectionTimeoutHandle.unref();
        }
      }
      if (this.host && this.host.indexOf("/") === 0) {
        con.connect(this.host + "/.s.PGSQL." + this.port);
      } else {
        con.connect(this.port, this.host);
      }
      con.on("connect", function() {
        if (self.ssl) {
          con.requestSsl();
        } else {
          con.startup(self.getStartupConf());
        }
      });
      con.on("sslconnect", function() {
        con.startup(self.getStartupConf());
      });
      this._attachListeners(con);
      con.once("end", () => {
        const error = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle);
        this._errorAllQueries(error);
        this._ended = true;
        if (!this._ending) {
          if (this._connecting && !this._connectionError) {
            if (this._connectionCallback) {
              this._connectionCallback(error);
            } else {
              this._handleErrorEvent(error);
            }
          } else if (!this._connectionError) {
            this._handleErrorEvent(error);
          }
        }
        process.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve(this);
          }
        });
      });
    }
    _attachListeners(con) {
      con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
      con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
      con.on("authenticationSASL", this._handleAuthSASL.bind(this));
      con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
      con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
      con.on("backendKeyData", this._handleBackendKeyData.bind(this));
      con.on("error", this._handleErrorEvent.bind(this));
      con.on("errorMessage", this._handleErrorMessage.bind(this));
      con.on("readyForQuery", this._handleReadyForQuery.bind(this));
      con.on("notice", this._handleNotice.bind(this));
      con.on("rowDescription", this._handleRowDescription.bind(this));
      con.on("dataRow", this._handleDataRow.bind(this));
      con.on("portalSuspended", this._handlePortalSuspended.bind(this));
      con.on("emptyQuery", this._handleEmptyQuery.bind(this));
      con.on("commandComplete", this._handleCommandComplete.bind(this));
      con.on("parseComplete", this._handleParseComplete.bind(this));
      con.on("copyInResponse", this._handleCopyInResponse.bind(this));
      con.on("copyData", this._handleCopyData.bind(this));
      con.on("notification", this._handleNotification.bind(this));
    }
    _getPassword(cb) {
      const con = this.connection;
      if (typeof this.password === "function") {
        this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((pass) => {
          if (pass !== void 0) {
            if (typeof pass !== "string") {
              con.emit("error", new TypeError("Password must be a string"));
              return;
            }
            this.connectionParameters.password = this.password = pass;
          } else {
            this.connectionParameters.password = this.password = null;
          }
          cb();
        }).catch((err) => {
          con.emit("error", err);
        });
      } else if (this.password !== null) {
        cb();
      } else {
        try {
          const pgPass = requireLib$1();
          pgPass(this.connectionParameters, (pass) => {
            if (void 0 !== pass) {
              pgPassDeprecationNotice();
              this.connectionParameters.password = this.password = pass;
            }
            cb();
          });
        } catch (e) {
          this.emit("error", e);
        }
      }
    }
    _handleAuthCleartextPassword(msg) {
      this._getPassword(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(msg) {
      this._getPassword(async () => {
        try {
          const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
          this.connection.password(hashedPassword);
        } catch (e) {
          this.emit("error", e);
        }
      });
    }
    _handleAuthSASL(msg) {
      this._getPassword(() => {
        try {
          this.saslSession = sasl2.startSession(
            msg.mechanisms,
            this.enableChannelBinding && this.connection.stream,
            this.scramMaxIterations
          );
          this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      });
    }
    async _handleAuthSASLContinue(msg) {
      try {
        await sasl2.continueSession(
          this.saslSession,
          this.password,
          msg.data,
          this.enableChannelBinding && this.connection.stream
        );
        this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
      } catch (err) {
        this.connection.emit("error", err);
      }
    }
    _handleAuthSASLFinal(msg) {
      try {
        sasl2.finalizeSession(this.saslSession, msg.data);
        this.saslSession = null;
      } catch (err) {
        this.connection.emit("error", err);
      }
    }
    _handleBackendKeyData(msg) {
      this.processID = msg.processID;
      this.secretKey = msg.secretKey;
    }
    _handleReadyForQuery(msg) {
      if (this._connecting) {
        this._connecting = false;
        this._connected = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          this._connectionCallback(null, this);
          this._connectionCallback = null;
        }
        this.emit("connect");
      }
      const activeQuery = this._getActiveQuery();
      this._activeQuery = null;
      this._txStatus = msg?.status ?? null;
      this.readyForQuery = true;
      if (activeQuery) {
        activeQuery.handleReadyForQuery(this.connection);
      }
      this._pulseQueryQueue();
    }
    // if we receive an error event or error message
    // during the connection process we handle it here
    _handleErrorWhileConnecting(err) {
      if (this._connectionError) {
        return;
      }
      this._connectionError = true;
      clearTimeout(this.connectionTimeoutHandle);
      if (this._connectionCallback) {
        return this._connectionCallback(err);
      }
      this.emit("error", err);
    }
    // if we're connected and we receive an error event from the connection
    // this means the socket is dead - do a hard abort of all queries and emit
    // the socket error on the client as well
    _handleErrorEvent(err) {
      if (this._connecting) {
        return this._handleErrorWhileConnecting(err);
      }
      this._queryable = false;
      this._errorAllQueries(err);
      this.emit("error", err);
    }
    // handle error messages from the postgres backend
    _handleErrorMessage(msg) {
      if (this._connecting) {
        return this._handleErrorWhileConnecting(msg);
      }
      const activeQuery = this._getActiveQuery();
      if (!activeQuery) {
        this._handleErrorEvent(msg);
        return;
      }
      this._activeQuery = null;
      activeQuery.handleError(msg, this.connection);
    }
    _handleRowDescription(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected rowDescription message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleRowDescription(msg);
    }
    _handleDataRow(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected dataRow message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleDataRow(msg);
    }
    _handlePortalSuspended(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected portalSuspended message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected emptyQuery message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected commandComplete message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleCommandComplete(msg, this.connection);
    }
    _handleParseComplete() {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected parseComplete message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      if (activeQuery.name) {
        this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
      }
    }
    _handleCopyInResponse(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected copyInResponse message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(msg) {
      const activeQuery = this._getActiveQuery();
      if (activeQuery == null) {
        const error = new Error("Received unexpected copyData message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      activeQuery.handleCopyData(msg, this.connection);
    }
    _handleNotification(msg) {
      this.emit("notification", msg);
    }
    _handleNotice(msg) {
      this.emit("notice", msg);
    }
    getStartupConf() {
      const params = this.connectionParameters;
      const data = {
        user: params.user,
        database: params.database
      };
      const appName = params.application_name || params.fallback_application_name;
      if (appName) {
        data.application_name = appName;
      }
      if (params.replication) {
        data.replication = "" + params.replication;
      }
      if (params.statement_timeout) {
        data.statement_timeout = String(parseInt(params.statement_timeout, 10));
      }
      if (params.lock_timeout) {
        data.lock_timeout = String(parseInt(params.lock_timeout, 10));
      }
      if (params.idle_in_transaction_session_timeout) {
        data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
      }
      if (params.options) {
        data.options = params.options;
      }
      return data;
    }
    cancel(client2, query2) {
      if (client2.activeQuery === query2) {
        const con = this.connection;
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          con.cancel(client2.processID, client2.secretKey);
        });
      } else if (client2._queryQueue.indexOf(query2) !== -1) {
        client2._queryQueue.splice(client2._queryQueue.indexOf(query2), 1);
      }
    }
    setTypeParser(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    }
    getTypeParser(oid, format) {
      return this._types.getTypeParser(oid, format);
    }
    // escapeIdentifier and escapeLiteral moved to utility functions & exported
    // on PG
    // re-exported here for backwards compatibility
    escapeIdentifier(str) {
      return utils2.escapeIdentifier(str);
    }
    escapeLiteral(str) {
      return utils2.escapeLiteral(str);
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) {
        this._activeQuery = this._queryQueue.shift();
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
          this.readyForQuery = false;
          this.hasExecuted = true;
          const queryError = activeQuery.submit(this.connection);
          if (queryError) {
            process.nextTick(() => {
              activeQuery.handleError(queryError, this.connection);
              this.readyForQuery = true;
              this._pulseQueryQueue();
            });
          }
        } else if (this.hasExecuted) {
          this._activeQuery = null;
          this.emit("drain");
        }
      }
    }
    query(config, values, callback) {
      let query2;
      let result2;
      if (config == null) {
        throw new TypeError("Client was passed a null or undefined query");
      }
      if (typeof config.submit === "function") {
        result2 = query2 = config;
        if (!query2.callback) {
          if (typeof values === "function") {
            query2.callback = values;
          } else if (callback) {
            query2.callback = callback;
          }
        }
      } else {
        query2 = new Query(config, values, callback);
        if (!query2.callback) {
          result2 = new this._Promise((resolve, reject) => {
            query2.callback = (err, res) => err ? reject(err) : resolve(res);
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
        } else if (typeof query2.callback !== "function") {
          throw new TypeError("callback is not a function");
        }
      }
      const readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
      if (readTimeout) {
        const queryCallback = query2.callback || (() => {
        });
        const readTimeoutTimer = setTimeout(() => {
          const error = new Error("Query read timeout");
          process.nextTick(() => {
            query2.handleError(error, this.connection);
          });
          queryCallback(error);
          query2.callback = () => {
          };
          const index = this._queryQueue.indexOf(query2);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query2.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (this.binary && !query2.binary) {
        query2.binary = true;
      }
      if (query2._result && !query2._result._types) {
        query2._result._types = this._types;
      }
      if (!this._queryable) {
        process.nextTick(() => {
          query2.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        });
        return result2;
      }
      if (this._ending) {
        process.nextTick(() => {
          query2.handleError(new Error("Client was closed and is not queryable"), this.connection);
        });
        return result2;
      }
      if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
      }
      this._queryQueue.push(query2);
      this._pulseQueryQueue();
      return result2;
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    getTransactionStatus() {
      return this._txStatus;
    }
    end(cb) {
      this._ending = true;
      if (!this.connection._connecting || this._ended) {
        if (cb) {
          cb();
          return;
        } else {
          return this._Promise.resolve();
        }
      }
      if (this._getActiveQuery() || !this._queryable) {
        this.connection.stream.destroy();
      } else {
        this.connection.end();
      }
      if (cb) {
        this.connection.once("end", cb);
      } else {
        return new this._Promise((resolve) => {
          this.connection.once("end", resolve);
        });
      }
    }
    get queryQueue() {
      queryQueueDeprecationNotice();
      return this._queryQueue;
    }
  }
  Client.Query = Query;
  client$1 = Client;
  return client$1;
}
var client = { exports: {} };
const __viteOptionalPeerDep_pgNative_pg_true = {};
const __viteOptionalPeerDep_pgNative_pg_true$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: __viteOptionalPeerDep_pgNative_pg_true
});
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteOptionalPeerDep_pgNative_pg_true$1);
var query = { exports: {} };
var hasRequiredQuery;
function requireQuery() {
  if (hasRequiredQuery) return query.exports;
  hasRequiredQuery = 1;
  const EventEmitter = require$$0$1.EventEmitter;
  const util = require$$0$3;
  const utils2 = requireUtils$1();
  const NativeQuery = query.exports = function(config, values, callback) {
    EventEmitter.call(this);
    config = utils2.normalizeQueryConfig(config, values, callback);
    this.text = config.text;
    this.values = config.values;
    this.name = config.name;
    this.queryMode = config.queryMode;
    this.callback = config.callback;
    this.state = "new";
    this._arrayMode = config.rowMode === "array";
    this._emitRowEvents = false;
    this.on(
      "newListener",
      (function(event) {
        if (event === "row") this._emitRowEvents = true;
      }).bind(this)
    );
  };
  util.inherits(NativeQuery, EventEmitter);
  const errorFieldMap = {
    sqlState: "code",
    statementPosition: "position",
    messagePrimary: "message",
    context: "where",
    schemaName: "schema",
    tableName: "table",
    columnName: "column",
    dataTypeName: "dataType",
    constraintName: "constraint",
    sourceFile: "file",
    sourceLine: "line",
    sourceFunction: "routine"
  };
  NativeQuery.prototype.handleError = function(err) {
    const fields = this.native.pq.resultErrorFields();
    if (fields) {
      for (const key in fields) {
        const normalizedFieldName = errorFieldMap[key] || key;
        err[normalizedFieldName] = fields[key];
      }
    }
    if (this.callback) {
      this.callback(err);
    } else {
      this.emit("error", err);
    }
    this.state = "error";
  };
  NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
  };
  NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
  };
  NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise(
      (function(resolve, reject) {
        this._once("end", resolve);
        this._once("error", reject);
      }).bind(this)
    );
    return this._promise;
  };
  NativeQuery.prototype.submit = function(client2) {
    this.state = "running";
    const self = this;
    this.native = client2.native;
    client2.native.arrayMode = this._arrayMode;
    let after = function(err, rows, results) {
      client2.native.arrayMode = false;
      setImmediate(function() {
        self.emit("_done");
      });
      if (err) {
        return self.handleError(err);
      }
      if (self._emitRowEvents) {
        if (results.length > 1) {
          rows.forEach((rowOfRows, i) => {
            rowOfRows.forEach((row) => {
              self.emit("row", row, results[i]);
            });
          });
        } else {
          rows.forEach(function(row) {
            self.emit("row", row, results);
          });
        }
      }
      self.state = "end";
      self.emit("end", results);
      if (self.callback) {
        self.callback(null, results);
      }
    };
    if (process.domain) {
      after = process.domain.bind(after);
    }
    if (this.name) {
      if (this.name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", this.name, this.name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const values = (this.values || []).map(utils2.prepareValue);
      if (client2.namedQueries[this.name]) {
        if (this.text && client2.namedQueries[this.name] !== this.text) {
          const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return after(err);
        }
        return client2.native.execute(this.name, values, after);
      }
      return client2.native.prepare(this.name, this.text, values.length, function(err) {
        if (err) return after(err);
        client2.namedQueries[self.name] = self.text;
        return self.native.execute(self.name, values, after);
      });
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        const err = new Error("Query values must be an array");
        return after(err);
      }
      const vals = this.values.map(utils2.prepareValue);
      client2.native.query(this.text, vals, after);
    } else if (this.queryMode === "extended") {
      client2.native.query(this.text, [], after);
    } else {
      client2.native.query(this.text, after);
    }
  };
  return query.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  const nodeUtils = require$$0$3;
  var Native;
  try {
    Native = require$$1;
  } catch (e) {
    throw e;
  }
  const TypeOverrides = requireTypeOverrides();
  const EventEmitter = require$$0$1.EventEmitter;
  const util = require$$0$3;
  const ConnectionParameters = requireConnectionParameters();
  const NativeQuery = requireQuery();
  const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
    () => {
    },
    "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
  );
  const Client = client.exports = function(config) {
    EventEmitter.call(this);
    config = config || {};
    this._Promise = config.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides(config.types);
    this.native = new Native({
      types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    const cp = this.connectionParameters = new ConnectionParameters(config);
    if (config.nativeConnectionString) cp.nativeConnectionString = config.nativeConnectionString;
    this.user = cp.user;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    this.namedQueries = {};
  };
  Client.Query = NativeQuery;
  util.inherits(Client, EventEmitter);
  Client.prototype._errorAllQueries = function(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.native = this.native;
        query2.handleError(err);
      });
    };
    if (this._hasActiveQuery()) {
      enqueueError(this._activeQuery);
      this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
  };
  Client.prototype._connect = function(cb) {
    const self = this;
    if (this._connecting) {
      process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
      if (self.connectionParameters.nativeConnectionString) conString = self.connectionParameters.nativeConnectionString;
      if (err) return cb(err);
      self.native.connect(conString, function(err2) {
        if (err2) {
          self.native.end();
          return cb(err2);
        }
        self._connected = true;
        self.native.on("error", function(err3) {
          self._queryable = false;
          self._errorAllQueries(err3);
          self.emit("error", err3);
        });
        self.native.on("notification", function(msg) {
          self.emit("notification", {
            channel: msg.relname,
            payload: msg.extra
          });
        });
        self.emit("connect");
        self._pulseQueryQueue(true);
        cb(null, this);
      });
    });
  };
  Client.prototype.connect = function(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };
  Client.prototype.query = function(config, values, callback) {
    let query2;
    let result2;
    let readTimeout;
    let readTimeoutTimer;
    let queryCallback;
    if (config === null || config === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config.submit === "function") {
      readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config;
      if (typeof values === "function") {
        config.callback = values;
      }
    } else {
      readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
      query2 = new NativeQuery(config, values, callback);
      if (!query2.callback) {
        let resolveOut, rejectOut;
        result2 = new this._Promise((resolve, reject) => {
          resolveOut = resolve;
          rejectOut = reject;
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
        query2.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback || (() => {
      });
      readTimeoutTimer = setTimeout(() => {
        const error = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error, this.connection);
        });
        queryCallback(error);
        query2.callback = () => {
        };
        const index = this._queryQueue.indexOf(query2);
        if (index > -1) {
          this._queryQueue.splice(index, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (!this._queryable) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"));
      });
      return result2;
    }
    if (this._ending) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"));
      });
      return result2;
    }
    if (this._queryQueue.length > 0) {
      queryQueueLengthDeprecationNotice();
    }
    this._queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  };
  Client.prototype.end = function(cb) {
    const self = this;
    this._ending = true;
    if (this._connecting && !this._connected) {
      this.once("connect", () => {
        this.end(() => {
        });
      });
    }
    let result2;
    if (!cb) {
      result2 = new this._Promise(function(resolve, reject) {
        cb = (err) => err ? reject(err) : resolve();
      });
    }
    this.native.end(function() {
      self._connected = false;
      self._errorAllQueries(new Error("Connection terminated"));
      process.nextTick(() => {
        self.emit("end");
        if (cb) cb();
      });
    });
    return result2;
  };
  Client.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  Client.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
      return;
    }
    if (this._hasActiveQuery()) {
      return;
    }
    const query2 = this._queryQueue.shift();
    if (!query2) {
      if (!initialConnection) {
        this.emit("drain");
      }
      return;
    }
    this._activeQuery = query2;
    query2.submit(this);
    const self = this;
    query2.once("_done", function() {
      self._pulseQueryQueue();
    });
  };
  Client.prototype.cancel = function(query2) {
    if (this._activeQuery === query2) {
      this.native.cancel(function() {
      });
    } else if (this._queryQueue.indexOf(query2) !== -1) {
      this._queryQueue.splice(this._queryQueue.indexOf(query2), 1);
    }
  };
  Client.prototype.ref = function() {
  };
  Client.prototype.unref = function() {
  };
  Client.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  };
  Client.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
  };
  Client.prototype.isConnected = function() {
    return this._connected;
  };
  Client.prototype.getTransactionStatus = function() {
    return this.native.getTransactionStatus();
  };
  return client.exports;
}
var native;
var hasRequiredNative;
function requireNative() {
  if (hasRequiredNative) return native;
  hasRequiredNative = 1;
  native = requireClient();
  return native;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib.exports;
  hasRequiredLib = 1;
  (function(module) {
    const Client = requireClient$1();
    const defaults2 = requireDefaults();
    const Connection = requireConnection();
    const Result = requireResult();
    const utils2 = requireUtils$1();
    const Pool = requirePgPool();
    const TypeOverrides = requireTypeOverrides();
    const { DatabaseError } = requireDist();
    const { escapeIdentifier, escapeLiteral } = requireUtils$1();
    const poolFactory = (Client2) => {
      return class BoundPool extends Pool {
        constructor(options) {
          super(options, Client2);
        }
      };
    };
    const PG = function(clientConstructor2) {
      this.defaults = defaults2;
      this.Client = clientConstructor2;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection;
      this.types = requirePgTypes();
      this.DatabaseError = DatabaseError;
      this.TypeOverrides = TypeOverrides;
      this.escapeIdentifier = escapeIdentifier;
      this.escapeLiteral = escapeLiteral;
      this.Result = Result;
      this.utils = utils2;
    };
    let clientConstructor = Client;
    let forceNative = false;
    try {
      forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
    } catch {
    }
    if (forceNative) {
      clientConstructor = requireNative();
    }
    module.exports = new PG(clientConstructor);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        let native2 = null;
        try {
          native2 = new PG(requireNative());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native2
        });
        return native2;
      }
    });
  })(lib);
  return lib.exports;
}
var libExports = requireLib();
const pg = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
pg.Client;
pg.Pool;
pg.Connection;
pg.types;
pg.Query;
pg.DatabaseError;
pg.escapeIdentifier;
pg.escapeLiteral;
pg.Result;
pg.TypeOverrides;
pg.defaults;
export {
  pg as p,
  requireLib as r
};
