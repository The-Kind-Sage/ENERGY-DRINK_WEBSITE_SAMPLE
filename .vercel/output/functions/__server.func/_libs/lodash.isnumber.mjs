var lodash_isnumber;
var hasRequiredLodash_isnumber;
function requireLodash_isnumber() {
  if (hasRequiredLodash_isnumber) return lodash_isnumber;
  hasRequiredLodash_isnumber = 1;
  var numberTag = "[object Number]";
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function isNumber(value) {
    return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
  }
  lodash_isnumber = isNumber;
  return lodash_isnumber;
}
export {
  requireLodash_isnumber as r
};
