'use strict';
let user = new UserForm();
user.loginFormCallback = function(data) {
  ApiConnector.login(data, (serverResponse) => {
    if (serverResponse.success) {
      location.reload();
    } else {
      
      this.setLoginErrorMessage(serverResponse.error);
    }
  }
)};
user.registerFormCallback = data => {
  ApiConnector.register(data, (serverResponse) => {
    if (serverResponse.success) {
      location.reload();
    } else {
      this.setRegisterErrorMessage(serverResponse.error);
    }
  }
)};