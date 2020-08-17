function mapObjs<T>(instance: any): T {
  let result: T = Object.keys(instance).reduce(
    (acc: any, key: any) => {
      acc[key] = instance[key];
      return acc;
    },
    {},
  ) as T;
  return result;
}
export default mapObjs;
