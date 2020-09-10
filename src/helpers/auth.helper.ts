const AuthHelper = {
  isAuthenticated(input: any): boolean {
    if(input) {
      return input ? new Date(input) > new Date() : false
    }
    return false;
  }
};

export default AuthHelper;
