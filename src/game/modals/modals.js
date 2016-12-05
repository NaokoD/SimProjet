/* eslint-env es6*/
class ModalsController {
  /** @ngInject */
  constructor($mdDialog, $document, $http, $rootScope) {
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.status = '';
    this.customFullscreen = false;
    this.categories = [];
    this.getAll();
    // [{
    //         libelle : "Sante",
    //         budget : 50
    //       },{
    //         libelle : "Education",
    //         budget : 40
    //       },{
    //         libelle : "Securite",
    //         budget : 10
    // }];
    console.log(this.categories);
    console.log("constructor modalscontroller");

  }


  getAll() {
    let that = this;
    console.log("in getAll()");
    this.$http.get(url + "/categories" + caturl).then(function(response) {
      that.categories = response.data.succes;
      console.log(that.categories);
    });
    console.log(this.categories);
    // .then(function (response) {
    //   console.log(response);
    //   console.log(response.data.succes);
    //   return response.data.succes;
    // });
  }

  showAdvanced(ev, obj) {
    this.$mdDialog.show({
      locals: {
        categorie: obj
      },
      controller: DialogController,
      controllerAs: 'mod',
      templateUrl: 'game/modals/modal.html',
      parent: this.$document[0].body,
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }
}

class DialogController {
  constructor($mdDialog, categorie, $http) {
    console.log(categorie);
    this.categorie = categorie;
    this.modCategorie = {};
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.categories = ModalsController.categories;
    console.log("Construction DialogController");
    console.log(categorie);
    this.get(categorie);
  }

  hide() {
    this.$mdDialog.hide();
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  answer(answer) {
    this.$mdDialog.hide(answer);
  }

  get(x) {
    let that = this;
    if (x.libelle == "securite") {
      this.$http.get(url + "/" + "criminalites" + caturl).then(function(response) {
        that.modCategorie = response.data.success;
        console.log(that.modCategorie);
      }, function(response) {
        console.log(error);
      });
    } else if (x.libelle == "economie") {
      this.$http.get(url + "/" + "budgets" + caturl).then(function(response) {
        that.modCategorie = response.data.success;
        console.log(that.modCategorie);
      }, function(response) {
        console.log(error);
      });
    } else {
      this.$http.get(url + "/" + x.libelle + "s" + caturl).then(function(response) {
        that.modCategorie = response.data.success;
        console.log(that.modCategorie);
      }, function(response) {
        console.log(error);
      });
    }
  }

  // total(x) {
  //
  // }
  //
  // getBudget(x) {
  //   return this.$http.get(url + "/backupconstructions?constructions=" + categorie.id).then(function (response) {
  //     return response.data.success;
  //   });
  // }
}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
