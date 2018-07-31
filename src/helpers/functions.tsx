export const ExpandedLog = ((MAX_DEPTH) => {

  return (item: any, depth?: any) => {

    depth = depth || 2;
    const isString = typeof item === 'string';
    const isDeep = depth > MAX_DEPTH

    if (isString || isDeep) {
      console.log(item);
      return;
    }

    // tslint:disable-next-line:forin
    for (const key in item) {
      console.group(key + ' : ' + (typeof item[key]));
      ExpandedLog(item[key], depth + 1);
      console.groupEnd();
    }
  }

})(100)
