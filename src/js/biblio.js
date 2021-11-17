/* eslint no-extend-native: ["error", { "exceptions": ["Object", "Array", "String", "Number"] }] */
/* // eslint-disable-next-line no-extend-native */
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

Object.defineProperty(Object.prototype, 'countKeys', {
  value: function () { return Object.keys(this).length },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Object.prototype, 'trim', {
  value: function () {
    for (const [key, value] of Object.entries(this)) {
      // delete this[key]
      if (typeof value === "string") { this[key] = value.trim() } else if (typeof value === "object") {
        this[key] = value ? value.trim() : ""
      }
    }
    return this
  },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Object.prototype, 'filter', {
  value: function (filtro) {
    const result = {};

    if (!Array.isArray(filtro))
      filtro = Array(filtro);

    for (const [key, value] of Object.entries(this)) {
      if (filtro.indexOf(key) >= 0)
        result[key] = value;
    }
    return result;
    },
  writable: false,
  enumerable: false,
  configurable: false
});
/* 
Object.prototype.filter = function(filtro) {
  const result = {};

  if (!Array.isArray(filtro))
    filtro = Array(filtro);

  for (const [key, value] of Object.entries(this)) {
    if (filtro.indexOf(key) >= 0)
      result[key] = value;
  }
  return result;
}; */

Array.prototype.pushIfNoExist = function () {
  var self = this
  // for (const [value] of Object.values(arguments))
  for (const [, value] of Object.entries(arguments)) {
    if (self.indexOf(value) < 0) { self.push(value) }
  }

  return Object(self)
};

Array.prototype.last = function (x = 1) {
  const max = this.length,
        start = max - x
  const r = []

  for (let i = start; i < max; i++) {
    if (this[i] !== undefined) { r.push(this[i]) }
  }
  return r
};

Array.prototype.delete = function (start = 0) {
  this.splice(start, this.length)
};

Array.prototype.unpush = function(item) {
    const i = this.indexOf(item);

	if (i > 0)
    	this.splice(i, 1);
    return Object(this);
};


Number.prototype.toFloat = String.prototype.toFloat = function (decimals = 2, toStr = false) {
  var str = this;
  str = str.toString().replace(/,/g, ".").split(".").splice(0, 2).join(".");
  str = decimals ? (parseFloat(str) || 0).toFixed(decimals) : (parseFloat(str) || 0);
  if (toStr) {
    return str.toString().replace(".", ",");
  }
  else { 
    return parseFloat(str) || 0;
  }
}
Number.prototype.toInt = String.prototype.toInt = function () { return parseInt(this) || 0 }


String.prototype.printf = function () {
  function form (str, arr) {
    var i = -1
    function callback (exp, p0, p1, p2, p3, p4) {
      if (exp === '%%') return '%'
      if (arr[++i] === undefined) return undefined
      exp = p2 ? parseInt(p2.substr(1)) : undefined
      var base = p3 ? parseInt(p3.substr(1)) : undefined
      var val
      switch (p4) {
      case 's': val = arr[i]; break
      case 'c': val = arr[i][0]; break
      case 'f': val = parseFloat(arr[i]).toFixed(exp); break
      case 'p': val = parseFloat(arr[i]).toPrecision(exp); break
      case 'e': val = parseFloat(arr[i]).toExponential(exp); break
      case 'x': val = parseInt(arr[i]).toString(base || 16); break
      case 'd': val = parseFloat(parseInt(arr[i], base || 10).toPrecision(exp)).toFixed(0); break
      }
      val = typeof (val) === 'object' ? JSON.stringify(val) : val.toString(base)
      var sz = parseInt(p1) /* padding size */
      var ch = p1 && p1[0] === '0' ? '0' : ' ' /* isnull? */
      while (val.length < sz) val = p0 !== undefined ? val + ch : ch + val /* isminus? */
      return val
    }
    var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g
    return str.replace(regex, callback)
  }

  return form(this, Array.prototype.slice.call(arguments))
  /*
		console.log("%s %s".$("This is a string", 11))
		var arr = [ "12.3", 13.6 ]; console.log("Array: %s".$(arr));
		var obj = { test:"test", id:12 }; console.log("Object: %s".$(obj));
		console.log("%c", "Test");
		console.log("%5d".$(12)); // '   12'
		console.log("%05d".$(12)); // '00012'
		console.log("%-5d".$(12)); // '12   '
		console.log("%5.2d".$(123)); // '  120'
		console.log("%5.2f".$(1.1)); // ' 1.10'
		console.log("%10.2e".$(1.1)); // '   1.10e+0'
		console.log("%5.3p".$(1.12345)); // ' 1.12'
		console.log("%5x".$(45054)); // ' affe'
		console.log("%20#2x".$("45054")); // '    1010111111111110'
		console.log("%6#2d".$("111")); // '     7'
		console.log("%6#16d".$("affe")); // ' 45054'
	*/
}
String.prototype.$ = String.prototype.printf

String.prototype.removeSpaces = function () {
  return this.replace(/ /g, "")
}

String.prototype.capitalize = function () {
  return this.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}
