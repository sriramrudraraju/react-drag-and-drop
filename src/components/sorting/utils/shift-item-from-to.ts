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

  const checkSanity = () => {
      if (to === from) {
          newArray = arr;
          console.warn(`⚠️ insertAndShift() | This doesn't do anything since ${to} === ${from}`);
      }

      if (to >= arr.length) {
          console.warn(`⚠️ insertAndShift() | This element is going to be at the end of the array, but not in the position you might expect since the array has ${arr.length} items, and you're trying to put in position ${to}. Note: Array positions are 0 based`);
      }

      if (from >= arr.length) {
          newArray = arr;
          console.warn(`⚠️ insertAndShift() | You're trying to take an item from position ${from}, but that doesn't exist in this array. You're getting back the original array for safety. Note: Array positions are 0 based`);
      }

      if (arr.length === 0) {
          newArray = [];
          console.warn(`⚠️ insertAndShift() | Your original array was empty, so nothing was done`);
      }
  };

  checkSanity();

  return newArray;
}
