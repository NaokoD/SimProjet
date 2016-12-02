/* eslint-env es6*/
class ModalsController {
  /** @ngInject */
  constructor($mdDialog, $document, $http) {
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.$http = $http;
    this.status = '';
    this.customFullscreen = false;
    this.categories = this.getAll();
    console.log("constructor modalscontroller");
  }

  getAll() {
    return $http.get(url + "/categories").then(function (response) {
      return response.data.success;
    })
  };

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
    this.categorie = {};
    this.categorie = get(categorie);
    this.budgets = 25;
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.categories = ModalsController.getAll();
    console.log("Construction DialogController");
    console.log(categorie);
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
    return $http.get(url + "/" + x).then(function (response) {
      return response.data.success;
    })
  };

  total(x) {

  }

  getBudget(x) {
    return $http.get(url + "/backupconstructions?constructions=" + categorie.id).then(function (response) {
      return response.data.success;
    })
  };
}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
