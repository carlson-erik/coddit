export function replaceAll(str, searchStr, replaceStr) {
  // no match exists in string?
  if(str.indexOf(searchStr) === -1) {
      // return string
      return str;
  }
  // replace and remove first match, and do another recursirve search/replace
  return replaceAll( str.replace(searchStr, replaceStr),searchStr, replaceStr);
}