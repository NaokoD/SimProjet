/* eslint-env es6*/
class ModalsController {
  /** @ngInject */
  constructor($mdDialog, $document, $http) {
    this.$mdDialog=$mdDialog;
    this.$document=$document;
    this.$http=$http;
    this.status ='';
    this.customFullscreen = false;
    this.categories = ['Education', 'Sante', 'Securite', 'Mission', 'All'];
    console.log("constructor modalscontroller");
  }
    // status = '';
    // customFullscreen = false;
    // $http.get('/categories').then(function(response){
    //   this.categorie=response.data.categories;
    // });
    // categories = ['Education', 'Sante', 'Securite', 'Mission', 'All'];
    showAdvanced (ev, obj) {
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
      // .then(function (answer) {
      //   this.status = 'You said the information was "' + answer + '".';
      // }, function () {
      //   this.status = 'You cancelled the dialog.';
      // });
    }

}

class DialogController {
  constructor($mdDialog, categorie) {
    this.categorie = categorie;
    this.budgets = 25;
    this.$mdDialog = $mdDialog;
    // $http.get('/categories').then(function(response){
    //   this.categorie=response.data.categories;
    // });
    this.categories = [{
      libelle: 'Education',
      budget: 50
    }, {
      libelle: 'Sante',
      budget: 20
    }, {
      libelle: 'Securite',
      budget: 20
    }];
    console.log("Contruction DialogController");
    console.log(categorie);
  }
    hide () {
      this.$mdDialog.hide();
    }
    cancel () {
      this.$mdDialog.cancel();
    }
    answer (answer) {
      this.$mdDialog.hide(answer);
    }
}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
