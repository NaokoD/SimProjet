class LoginController {
  constructor($http, $window, $q) {
    this.$http = $http;
    this.user = {};
    this.$window = $window;
    this.$q = $q;
  }



  send(x) {
    console.log("in send() :" + x);
    let that = this;
    x.then(function(succes){
      console.log(succes);
      if ((succes.login == that.user.login) && (succes.password == that.user.password)) {
        console.log("User confirmed");
        that.relocation();
      } else {
        console.log("error");
        that.$window.alert("Veuillez reesayer");
      }
    });
  }

  checkUser() {
    let that = this;
    return this.$http.get(url + "/users?login=" + this.user.login + "&token=" + this.user.password + "&backup=1").then(function(response) {
      console.log("in checkUser() :" +response.data.succes);
      return response.data.succes;
    }).catch(function(response) {
      return that.$q.reject.response;
    });
  }

  relocation() {
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
