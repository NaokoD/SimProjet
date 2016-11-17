/* eslint-env es6*/
class ModalsController {
  /** @ngInject */
  constructor($mdDialog, $document, $scope, $http) {
    this.status = '  ';
    this.customFullscreen = false;
    // $http.get('/categories').then(function(response){
    //   this.categorie=response.data.categories;
    // });
    this.categories = ['Education', 'Sante', 'Securite', 'Mission', 'All'];
    $scope.showAdvanced = function(ev, obj) {
      $mdDialog.show({
        locals: {
          categorie: obj
        },
        controller: DialogController,
        templateUrl: 'game/modals/modal.html',
        parent: $document[0].body,
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
      // .then(function (answer) {
      //   this.status = 'You said the information was "' + answer + '".';
      // }, function () {
      //   this.status = 'You cancelled the dialog.';
      // });
    };
  }
}

class DialogController {
  constructor($scope, $mdDialog, categorie) {
    $scope.categorie = categorie;
    $scope.budget = 14000;
    // $http.get('/categories').then(function(response){
    //   this.categorie=response.data.categories;
    // });
    $scope.categories = [{
      libelle: 'Education',
      budget: 50
    }, {
      libelle: 'Sante',
      budget: 20
    }, {
      libelle: 'Securite',
      budget: 20
    }];
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
