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
    this.categorie = categorie;
    this.budgets = 25;
    this.$mdDialog = $mdDialog;
    this.$http=$http;
    this.categories = ModalsController.getAll();
    console.log("Contruction DialogController");
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


}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
