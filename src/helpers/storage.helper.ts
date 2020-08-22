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
    // ignore data
    const roomKnowList = this.get('roomKnowList');
    const searchConfigs = this.get('@search_configs');

    const isChatRoomNew = this.get('@isChatRoomNew');
    const isChatBotOptionsOpen = this.get('@isChatBotOptionsOpen');
    const isAnswersOptionsOpen = this.get('@isAnswersOptionsOpen');
    const tab = this.get('@tab');
    // localStorage.clear();

    // re-set ignore data
    this.set('roomKnowList', roomKnowList);
    this.set('@search_configs', searchConfigs);
    this.set('@isChatRoomNew', isChatRoomNew);
    this.set('@isChatBotOptionsOpen', isChatBotOptionsOpen);
    this.set('@isAnswersOptionsOpen', isAnswersOptionsOpen);
    this.set('@tab', tab);
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
