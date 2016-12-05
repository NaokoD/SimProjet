class LoginController {
  constructor($http, $window) {
    this.$http = $http;
    this.user = {};
    this.$window = $window;
  }



  send() {
    let that = this;
    this.$http.get(url + "/users?login=" + this.user.login + "&token=" + this.user.password + "&backup=1").then(function(response) {
      that.setUserId(response.data.succes.id);
      that.relocation();
    }, function(response) {
      console("failed");
    });
  }

relocation(){
  this.$window.location.href = "/game";
}
  setUserId(obj) {
    this.user.id = obj;
  }
}

angular
  .module('app')
  .component('homeLogin', {
    templateUrl: 'home/login.html',
    controller: LoginController
  });
