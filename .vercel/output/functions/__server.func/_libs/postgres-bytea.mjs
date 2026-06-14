var postgresBytea;
var hasRequiredPostgresBytea;
function requirePostgresBytea() {
  if (hasRequiredPostgresBytea) return postgresBytea;
  hasRequiredPostgresBytea = 1;
  var bufferFrom = Buffer.from || Buffer;
  postgresBytea = function parseBytea(input) {
    if (/^\\x/.test(input)) {
      return bufferFrom(input.substr(2), "hex");
    }
    var output = "";
    var i = 0;
    while (i < input.length) {
      if (input[i] !== "\\") {
        output += input[i];
        ++i;
      } else {
        if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
          output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
          i += 4;
        } else {
          var backslashes = 1;
          while (i + backslashes < input.length && input[i + backslashes] === "\\") {
            backslashes++;
          }
          for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
            output += "\\";
          }
          i += Math.floor(backslashes / 2) * 2;
        }
      }
    }
    return bufferFrom(output, "binary");
  };
  return postgresBytea;
}
export {
  requirePostgresBytea as r
};
