class LocalData {
  public static get<T>(name: string): Array<T> {
    let data = localStorage.getItem(name);
    if (!data) return [];
    else return JSON.parse(data);
  }

  public static save(name: string, data: any): boolean {
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
export default LocalData;
