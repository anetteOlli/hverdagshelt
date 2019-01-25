// @flow

/**
 * @fileOverview Formats dates
 * @author Sindre H. Paulshus
 * Note: Courtesy of https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
 * */

Number.prototype.padLeft = function(base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

export function easyDateFormat(myString: string) {
  let d = new Date(myString);
  let dformat =
    [(d.getMonth() + 1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/') +
    ' ' +
    [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
  return dformat;
}
