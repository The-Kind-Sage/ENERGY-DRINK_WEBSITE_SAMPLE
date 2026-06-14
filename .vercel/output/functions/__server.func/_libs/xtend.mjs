var mutable;
var hasRequiredMutable;
function requireMutable() {
  if (hasRequiredMutable) return mutable;
  hasRequiredMutable = 1;
  mutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return mutable;
}
export {
  requireMutable as r
};
