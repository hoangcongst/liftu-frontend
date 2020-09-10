const AuthHelper = {
  isAuthenticated(input: string): boolean {
    return input ? new Date(input) > new Date() : false
  }
};

export default AuthHelper;
