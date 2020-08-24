function get<T>(name: string): Array<T> {
  const data = localStorage.getItem(name);
  if (!data) return [];
  return JSON.parse(data);
}

function save(name: string, data: any): boolean {
  try {
    localStorage.setItem(name, JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

export default { get, save };