type SomeObject = {
  [key: string]: any;
};

export function clearNullish<T extends SomeObject>(obj: T) {
  const newObj: SomeObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      newObj[key] = value;
    }
  });

  return newObj as Partial<T>;
}
