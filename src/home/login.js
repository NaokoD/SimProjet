class LoginController {
  constructor($http, $location) {
    this.$http = $http;
    this.user = {};
  }

  send() {
    this.user = $http.post(url + "/users?login=" + user.login + "&token=" + user.password).then(function (response) {
      user=response.headers().success;
    });
    $location.path('/'+appurl).replace();
  }
}

angular
  .module('app')
  .component('homeLogin', {
    templateUrl: 'home/login.html',
    controller: LoginController
  });
