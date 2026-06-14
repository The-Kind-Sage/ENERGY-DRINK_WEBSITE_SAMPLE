import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireJws } from "./jws.mjs";
import { r as requireMs } from "./ms.mjs";
import { r as requireSemver } from "./semver.mjs";
import require$$1 from "crypto";
import { r as requireLodash_includes } from "./lodash.includes.mjs";
import { r as requireLodash_isboolean } from "./lodash.isboolean.mjs";
import { r as requireLodash_isinteger } from "./lodash.isinteger.mjs";
import { r as requireLodash_isnumber } from "./lodash.isnumber.mjs";
import { r as requireLodash_isplainobject } from "./lodash.isplainobject.mjs";
import { r as requireLodash_isstring } from "./lodash.isstring.mjs";
import { r as requireLodash_once } from "./lodash.once.mjs";
var decode;
var hasRequiredDecode;
function requireDecode() {
  if (hasRequiredDecode) return decode;
  hasRequiredDecode = 1;
  var jws = requireJws();
  decode = function(jwt2, options) {
    options = options || {};
    var decoded = jws.decode(jwt2, options);
    if (!decoded) {
      return null;
    }
    var payload = decoded.payload;
    if (typeof payload === "string") {
      try {
        var obj = JSON.parse(payload);
        if (obj !== null && typeof obj === "object") {
          payload = obj;
        }
      } catch (e) {
      }
    }
    if (options.complete === true) {
      return {
        header: decoded.header,
        payload,
        signature: decoded.signature
      };
    }
    return payload;
  };
  return decode;
}
var JsonWebTokenError_1;
var hasRequiredJsonWebTokenError;
function requireJsonWebTokenError() {
  if (hasRequiredJsonWebTokenError) return JsonWebTokenError_1;
  hasRequiredJsonWebTokenError = 1;
  var JsonWebTokenError = function(message, error) {
    Error.call(this, message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "JsonWebTokenError";
    this.message = message;
    if (error) this.inner = error;
  };
  JsonWebTokenError.prototype = Object.create(Error.prototype);
  JsonWebTokenError.prototype.constructor = JsonWebTokenError;
  JsonWebTokenError_1 = JsonWebTokenError;
  return JsonWebTokenError_1;
}
var NotBeforeError_1;
var hasRequiredNotBeforeError;
function requireNotBeforeError() {
  if (hasRequiredNotBeforeError) return NotBeforeError_1;
  hasRequiredNotBeforeError = 1;
  var JsonWebTokenError = requireJsonWebTokenError();
  var NotBeforeError = function(message, date) {
    JsonWebTokenError.call(this, message);
    this.name = "NotBeforeError";
    this.date = date;
  };
  NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
  NotBeforeError.prototype.constructor = NotBeforeError;
  NotBeforeError_1 = NotBeforeError;
  return NotBeforeError_1;
}
var TokenExpiredError_1;
var hasRequiredTokenExpiredError;
function requireTokenExpiredError() {
  if (hasRequiredTokenExpiredError) return TokenExpiredError_1;
  hasRequiredTokenExpiredError = 1;
  var JsonWebTokenError = requireJsonWebTokenError();
  var TokenExpiredError = function(message, expiredAt) {
    JsonWebTokenError.call(this, message);
    this.name = "TokenExpiredError";
    this.expiredAt = expiredAt;
  };
  TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
  TokenExpiredError.prototype.constructor = TokenExpiredError;
  TokenExpiredError_1 = TokenExpiredError;
  return TokenExpiredError_1;
}
var timespan;
var hasRequiredTimespan;
function requireTimespan() {
  if (hasRequiredTimespan) return timespan;
  hasRequiredTimespan = 1;
  var ms = requireMs();
  timespan = function(time, iat) {
    var timestamp = iat || Math.floor(Date.now() / 1e3);
    if (typeof time === "string") {
      var milliseconds = ms(time);
      if (typeof milliseconds === "undefined") {
        return;
      }
      return Math.floor(timestamp + milliseconds / 1e3);
    } else if (typeof time === "number") {
      return timestamp + time;
    } else {
      return;
    }
  };
  return timespan;
}
var asymmetricKeyDetailsSupported;
var hasRequiredAsymmetricKeyDetailsSupported;
function requireAsymmetricKeyDetailsSupported() {
  if (hasRequiredAsymmetricKeyDetailsSupported) return asymmetricKeyDetailsSupported;
  hasRequiredAsymmetricKeyDetailsSupported = 1;
  const semver = requireSemver();
  asymmetricKeyDetailsSupported = semver.satisfies(process.version, ">=15.7.0");
  return asymmetricKeyDetailsSupported;
}
var rsaPssKeyDetailsSupported;
var hasRequiredRsaPssKeyDetailsSupported;
function requireRsaPssKeyDetailsSupported() {
  if (hasRequiredRsaPssKeyDetailsSupported) return rsaPssKeyDetailsSupported;
  hasRequiredRsaPssKeyDetailsSupported = 1;
  const semver = requireSemver();
  rsaPssKeyDetailsSupported = semver.satisfies(process.version, ">=16.9.0");
  return rsaPssKeyDetailsSupported;
}
var validateAsymmetricKey;
var hasRequiredValidateAsymmetricKey;
function requireValidateAsymmetricKey() {
  if (hasRequiredValidateAsymmetricKey) return validateAsymmetricKey;
  hasRequiredValidateAsymmetricKey = 1;
  const ASYMMETRIC_KEY_DETAILS_SUPPORTED = requireAsymmetricKeyDetailsSupported();
  const RSA_PSS_KEY_DETAILS_SUPPORTED = requireRsaPssKeyDetailsSupported();
  const allowedAlgorithmsForKeys = {
    "ec": ["ES256", "ES384", "ES512"],
    "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
    "rsa-pss": ["PS256", "PS384", "PS512"]
  };
  const allowedCurves = {
    ES256: "prime256v1",
    ES384: "secp384r1",
    ES512: "secp521r1"
  };
  validateAsymmetricKey = function(algorithm, key) {
    if (!algorithm || !key) return;
    const keyType = key.asymmetricKeyType;
    if (!keyType) return;
    const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
    if (!allowedAlgorithms) {
      throw new Error(`Unknown key type "${keyType}".`);
    }
    if (!allowedAlgorithms.includes(algorithm)) {
      throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
    }
    if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
      switch (keyType) {
        case "ec":
          const keyCurve = key.asymmetricKeyDetails.namedCurve;
          const allowedCurve = allowedCurves[algorithm];
          if (keyCurve !== allowedCurve) {
            throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
          }
          break;
        case "rsa-pss":
          if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
            const length = parseInt(algorithm.slice(-3), 10);
            const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
            if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
              throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
            }
            if (saltLength !== void 0 && saltLength > length >> 3) {
              throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
            }
          }
          break;
      }
    }
  };
  return validateAsymmetricKey;
}
var psSupported;
var hasRequiredPsSupported;
function requirePsSupported() {
  if (hasRequiredPsSupported) return psSupported;
  hasRequiredPsSupported = 1;
  var semver = requireSemver();
  psSupported = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  return psSupported;
}
var verify;
var hasRequiredVerify;
function requireVerify() {
  if (hasRequiredVerify) return verify;
  hasRequiredVerify = 1;
  const JsonWebTokenError = requireJsonWebTokenError();
  const NotBeforeError = requireNotBeforeError();
  const TokenExpiredError = requireTokenExpiredError();
  const decode2 = requireDecode();
  const timespan2 = requireTimespan();
  const validateAsymmetricKey2 = requireValidateAsymmetricKey();
  const PS_SUPPORTED = requirePsSupported();
  const jws = requireJws();
  const { KeyObject, createSecretKey, createPublicKey } = require$$1;
  const PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
  const EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
  const RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
  const HS_ALGS = ["HS256", "HS384", "HS512"];
  if (PS_SUPPORTED) {
    PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
  }
  verify = function(jwtString, secretOrPublicKey, options, callback) {
    if (typeof options === "function" && !callback) {
      callback = options;
      options = {};
    }
    if (!options) {
      options = {};
    }
    options = Object.assign({}, options);
    let done;
    if (callback) {
      done = callback;
    } else {
      done = function(err, data) {
        if (err) throw err;
        return data;
      };
    }
    if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
      return done(new JsonWebTokenError("clockTimestamp must be a number"));
    }
    if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
      return done(new JsonWebTokenError("nonce must be a non-empty string"));
    }
    if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
      return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
    }
    const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
    if (!jwtString) {
      return done(new JsonWebTokenError("jwt must be provided"));
    }
    if (typeof jwtString !== "string") {
      return done(new JsonWebTokenError("jwt must be a string"));
    }
    const parts = jwtString.split(".");
    if (parts.length !== 3) {
      return done(new JsonWebTokenError("jwt malformed"));
    }
    let decodedToken;
    try {
      decodedToken = decode2(jwtString, { complete: true });
    } catch (err) {
      return done(err);
    }
    if (!decodedToken) {
      return done(new JsonWebTokenError("invalid token"));
    }
    const header = decodedToken.header;
    let getSecret;
    if (typeof secretOrPublicKey === "function") {
      if (!callback) {
        return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
      }
      getSecret = secretOrPublicKey;
    } else {
      getSecret = function(header2, secretCallback) {
        return secretCallback(null, secretOrPublicKey);
      };
    }
    return getSecret(header, function(err, secretOrPublicKey2) {
      if (err) {
        return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
      }
      const hasSignature = parts[2].trim() !== "";
      if (!hasSignature && secretOrPublicKey2) {
        return done(new JsonWebTokenError("jwt signature is required"));
      }
      if (hasSignature && !secretOrPublicKey2) {
        return done(new JsonWebTokenError("secret or public key must be provided"));
      }
      if (!hasSignature && !options.algorithms) {
        return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
      }
      if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
        try {
          secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
        } catch (_) {
          try {
            secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
          } catch (_2) {
            return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
          }
        }
      }
      if (!options.algorithms) {
        if (secretOrPublicKey2.type === "secret") {
          options.algorithms = HS_ALGS;
        } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
          options.algorithms = RSA_KEY_ALGS;
        } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
          options.algorithms = EC_KEY_ALGS;
        } else {
          options.algorithms = PUB_KEY_ALGS;
        }
      }
      if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
        return done(new JsonWebTokenError("invalid algorithm"));
      }
      if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
        return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
        return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey2(header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
      }
      let valid;
      try {
        valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
      } catch (e) {
        return done(e);
      }
      if (!valid) {
        return done(new JsonWebTokenError("invalid signature"));
      }
      const payload = decodedToken.payload;
      if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
        if (typeof payload.nbf !== "number") {
          return done(new JsonWebTokenError("invalid nbf value"));
        }
        if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
          return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
        }
      }
      if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
        if (typeof payload.exp !== "number") {
          return done(new JsonWebTokenError("invalid exp value"));
        }
        if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
          return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
        }
      }
      if (options.audience) {
        const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
        const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
        const match = target.some(function(targetAudience) {
          return audiences.some(function(audience) {
            return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
          });
        });
        if (!match) {
          return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
        }
      }
      if (options.issuer) {
        const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
        if (invalid_issuer) {
          return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
        }
      }
      if (options.subject) {
        if (payload.sub !== options.subject) {
          return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
        }
      }
      if (options.jwtid) {
        if (payload.jti !== options.jwtid) {
          return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
        }
      }
      if (options.nonce) {
        if (payload.nonce !== options.nonce) {
          return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
        }
      }
      if (options.maxAge) {
        if (typeof payload.iat !== "number") {
          return done(new JsonWebTokenError("iat required when maxAge is specified"));
        }
        const maxAgeTimestamp = timespan2(options.maxAge, payload.iat);
        if (typeof maxAgeTimestamp === "undefined") {
          return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
        if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
          return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
        }
      }
      if (options.complete === true) {
        const signature = decodedToken.signature;
        return done(null, {
          header,
          payload,
          signature
        });
      }
      return done(null, payload);
    });
  };
  return verify;
}
var sign;
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign) return sign;
  hasRequiredSign = 1;
  const timespan2 = requireTimespan();
  const PS_SUPPORTED = requirePsSupported();
  const validateAsymmetricKey2 = requireValidateAsymmetricKey();
  const jws = requireJws();
  const includes = requireLodash_includes();
  const isBoolean = requireLodash_isboolean();
  const isInteger = requireLodash_isinteger();
  const isNumber = requireLodash_isnumber();
  const isPlainObject = requireLodash_isplainobject();
  const isString = requireLodash_isstring();
  const once = requireLodash_once();
  const { KeyObject, createSecretKey, createPrivateKey } = require$$1;
  const SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
  if (PS_SUPPORTED) {
    SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
  }
  const sign_options_schema = {
    expiresIn: { isValid: function(value) {
      return isInteger(value) || isString(value) && value;
    }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
    notBefore: { isValid: function(value) {
      return isInteger(value) || isString(value) && value;
    }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
    audience: { isValid: function(value) {
      return isString(value) || Array.isArray(value);
    }, message: '"audience" must be a string or array' },
    algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
    header: { isValid: isPlainObject, message: '"header" must be an object' },
    encoding: { isValid: isString, message: '"encoding" must be a string' },
    issuer: { isValid: isString, message: '"issuer" must be a string' },
    subject: { isValid: isString, message: '"subject" must be a string' },
    jwtid: { isValid: isString, message: '"jwtid" must be a string' },
    noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
    keyid: { isValid: isString, message: '"keyid" must be a string' },
    mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
    allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
    allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
  };
  const registered_claims_schema = {
    iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
    exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
    nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
  };
  function validate(schema, allowUnknown, object, parameterName) {
    if (!isPlainObject(object)) {
      throw new Error('Expected "' + parameterName + '" to be a plain object.');
    }
    Object.keys(object).forEach(function(key) {
      const validator = schema[key];
      if (!validator) {
        if (!allowUnknown) {
          throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
        }
        return;
      }
      if (!validator.isValid(object[key])) {
        throw new Error(validator.message);
      }
    });
  }
  function validateOptions(options) {
    return validate(sign_options_schema, false, options, "options");
  }
  function validatePayload(payload) {
    return validate(registered_claims_schema, true, payload, "payload");
  }
  const options_to_payload = {
    "audience": "aud",
    "issuer": "iss",
    "subject": "sub",
    "jwtid": "jti"
  };
  const options_for_objects = [
    "expiresIn",
    "notBefore",
    "noTimestamp",
    "audience",
    "issuer",
    "subject",
    "jwtid"
  ];
  sign = function(payload, secretOrPrivateKey, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    } else {
      options = options || {};
    }
    const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
    const header = Object.assign({
      alg: options.algorithm || "HS256",
      typ: isObjectPayload ? "JWT" : void 0,
      kid: options.keyid
    }, options.header);
    function failure(err) {
      if (callback) {
        return callback(err);
      }
      throw err;
    }
    if (!secretOrPrivateKey && options.algorithm !== "none") {
      return failure(new Error("secretOrPrivateKey must have a value"));
    }
    if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
      try {
        secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
      } catch (_) {
        try {
          secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
        } catch (_2) {
          return failure(new Error("secretOrPrivateKey is not valid key material"));
        }
      }
    }
    if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
      return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
    } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
      if (secretOrPrivateKey.type !== "private") {
        return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
      }
      if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
      secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
        return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
      }
    }
    if (typeof payload === "undefined") {
      return failure(new Error("payload is required"));
    } else if (isObjectPayload) {
      try {
        validatePayload(payload);
      } catch (error) {
        return failure(error);
      }
      if (!options.mutatePayload) {
        payload = Object.assign({}, payload);
      }
    } else {
      const invalid_options = options_for_objects.filter(function(opt) {
        return typeof options[opt] !== "undefined";
      });
      if (invalid_options.length > 0) {
        return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
      }
    }
    if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
      return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
    }
    if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
      return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
    }
    try {
      validateOptions(options);
    } catch (error) {
      return failure(error);
    }
    if (!options.allowInvalidAsymmetricKeyTypes) {
      try {
        validateAsymmetricKey2(header.alg, secretOrPrivateKey);
      } catch (error) {
        return failure(error);
      }
    }
    const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
    if (options.noTimestamp) {
      delete payload.iat;
    } else if (isObjectPayload) {
      payload.iat = timestamp;
    }
    if (typeof options.notBefore !== "undefined") {
      try {
        payload.nbf = timespan2(options.notBefore, timestamp);
      } catch (err) {
        return failure(err);
      }
      if (typeof payload.nbf === "undefined") {
        return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
      }
    }
    if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
      try {
        payload.exp = timespan2(options.expiresIn, timestamp);
      } catch (err) {
        return failure(err);
      }
      if (typeof payload.exp === "undefined") {
        return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
      }
    }
    Object.keys(options_to_payload).forEach(function(key) {
      const claim = options_to_payload[key];
      if (typeof options[key] !== "undefined") {
        if (typeof payload[claim] !== "undefined") {
          return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
        }
        payload[claim] = options[key];
      }
    });
    const encoding = options.encoding || "utf8";
    if (typeof callback === "function") {
      callback = callback && once(callback);
      jws.createSign({
        header,
        privateKey: secretOrPrivateKey,
        payload,
        encoding
      }).once("error", callback).once("done", function(signature) {
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
        callback(null, signature);
      });
    } else {
      let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
      if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
        throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
      }
      return signature;
    }
  };
  return sign;
}
var jsonwebtoken;
var hasRequiredJsonwebtoken;
function requireJsonwebtoken() {
  if (hasRequiredJsonwebtoken) return jsonwebtoken;
  hasRequiredJsonwebtoken = 1;
  jsonwebtoken = {
    decode: requireDecode(),
    verify: requireVerify(),
    sign: requireSign(),
    JsonWebTokenError: requireJsonWebTokenError(),
    NotBeforeError: requireNotBeforeError(),
    TokenExpiredError: requireTokenExpiredError()
  };
  return jsonwebtoken;
}
var jsonwebtokenExports = requireJsonwebtoken();
const jwt = /* @__PURE__ */ getDefaultExportFromCjs(jsonwebtokenExports);
export {
  jwt as j
};
