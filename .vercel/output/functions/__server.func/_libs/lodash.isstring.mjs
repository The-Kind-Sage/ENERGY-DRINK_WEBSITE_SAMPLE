var lodash_isstring;
var hasRequiredLodash_isstring;
function requireLodash_isstring() {
  if (hasRequiredLodash_isstring) return lodash_isstring;
  hasRequiredLodash_isstring = 1;
  var stringTag = "[object String]";
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var isArray = Array.isArray;
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function isString(value) {
    return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
  }
  lodash_isstring = isString;
  return lodash_isstring;
}
export {
  requireLodash_isstring as r
};
