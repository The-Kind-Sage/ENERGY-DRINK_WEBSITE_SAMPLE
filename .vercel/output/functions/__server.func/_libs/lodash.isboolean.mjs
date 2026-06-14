var lodash_isboolean;
var hasRequiredLodash_isboolean;
function requireLodash_isboolean() {
  if (hasRequiredLodash_isboolean) return lodash_isboolean;
  hasRequiredLodash_isboolean = 1;
  var boolTag = "[object Boolean]";
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  lodash_isboolean = isBoolean;
  return lodash_isboolean;
}
export {
  requireLodash_isboolean as r
};
