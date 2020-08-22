const regRepeat3 = /(\w)\1\1/;

const ValidateHelper = {
  isJson(text: string) {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  },

  isLoginId(loginId: string) {
    const pattern_num = /[0-9]/;
    const pattern_eng = /[a-zA-Z]/;
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    return !pattern_kor.test(loginId) && !pattern_spc.test(loginId) && (pattern_num.test(loginId) || pattern_eng.test(loginId));
  },

  isPhone(number: string) {
    const dashFormat = number.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3'),
      regExpCellPhone = /^\d{3}-\d{3,4}-\d{4}$/,
      regExpPhone = /^\d{2,3}-\d{3,4}-\d{4}$/;

    return regExpPhone.test(dashFormat) || regExpCellPhone.test(dashFormat);
  },

  isPassword(password: string, passwordConfirm: string, { loginId, phone }: any): boolean {
    return (
      password === passwordConfirm &&
      !regRepeat3.test(password) &&
      password.split('').every((_, i) => {
        const checkStr = password.substring(i, i + 4);
        return checkStr.length !== 4 || (checkStr.length === 4 && !loginId.includes(checkStr) && !phone.includes(checkStr));
      })
    );
  }
};

export default ValidateHelper;
