module.exports.flattenJSON = data => {
  var result = {};
  function recurse(cur, prop) {
    if (cur instanceof File) {
      result[prop] = cur;
    } else if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop ? prop + "." + i : "" + i);
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty) result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
};

module.exports.unflattenJSON = data => {
  "use strict";
  if (Object(data) !== data || Array.isArray(data)) return data;
  var result = {},
    cur,
    prop,
    idx,
    last,
    temp;
  for (var p in data) {
    (cur = result), (prop = ""), (last = 0);
    do {
      idx = p.indexOf(".", last);
      temp = p.substring(last, idx !== -1 ? idx : undefined);
      cur = cur[prop] || (cur[prop] = !isNaN(parseInt(temp)) ? [] : {});
      prop = temp;
      last = idx + 1;
    } while (idx >= 0);
    cur[prop] = data[p];
  }
  return result[""];
};
