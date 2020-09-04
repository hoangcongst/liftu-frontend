import ValidateHelper from "./validate.helper";

const StorageHelper = {
  get (key: string) {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    return ValidateHelper.isJson(item) ? JSON.parse(item) : item;
  },

  set (key: string, value: any) {
    return localStorage.setItem(key, (typeof(value) !== 'string' ? JSON.stringify(value) : value));
  },

  clear () {
    return localStorage.clear()
  },

  remove (key: string) {
    return localStorage.removeItem(key);
  },

  save (key: string, value: any): any {
    this.set(key, value);
    return value;
  },

  init (key: string, initState: any) {
    const data = this.get(key);
    return {
      ...initState,
      ...(data ? data : {})
    }
  }
};

export default StorageHelper;
