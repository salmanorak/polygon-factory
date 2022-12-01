export const updateArrayItem = <T>(
  arr: T[],
  updatedItem: T,
  index: number
): T[] => [...arr.slice(0, index), updatedItem, ...arr.slice(index + 1)];
