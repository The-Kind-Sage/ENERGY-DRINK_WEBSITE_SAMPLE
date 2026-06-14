var empty = {};
var hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  Object.defineProperty(empty, "__esModule", { value: true });
  empty.default = {};
  return empty;
}
export {
  requireEmpty as r
};
