export function shiftItemFromTo<T>(from: number, to: number, arr: T[]) {
  let newArray: T[] = [];
  const fromItem = arr[from];

  if (from > to) {
      const startToTo = (to > 0) ? arr.slice(0, to) : [];
      const toToFrom = arr.slice(to, from);
      const fromToEnd = arr.slice(from + 1, arr.length);
      newArray = newArray.concat(startToTo, [fromItem], toToFrom, fromToEnd);
  }

  if (to > from) {
      const startToFrom = (from > 0) ? arr.slice(0, from) : [];
      const fromToTo = arr.slice(from + 1, to + 1);
      const toToEnd = arr.slice(to + 1, arr.length);
      newArray = newArray.concat(startToFrom, fromToTo, fromItem, toToEnd);
  }
  return newArray;
}
