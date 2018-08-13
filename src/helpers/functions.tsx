// tslint:disable:no-any
// tslint:disable:no-parameter-reassignment
// tslint:disable:no-magic-numbers
// tslint:disable:forin
// tslint:disable:prefer-template
// tslint:disable:one-variable-per-declaration
// tslint:disable:binary-expression-operand-order

export const ExpandedLog = ((MAX_DEPTH) =>
  (item: any, depth?: any) => {

    depth = depth || 2;
    const isString = typeof item === 'string';
    const isDeep = depth > MAX_DEPTH

    if (isString || isDeep) {
      console.log(item);

      return;
    }

    for (const key in item) {
      console.group(key + ' : ' + (typeof item[key]));
      ExpandedLog(item[key], depth + 1);
      console.groupEnd();
    }
  }
)(100)

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
