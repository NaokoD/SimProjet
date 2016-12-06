/* eslint-env es6*/
class ModalsController {
  /** @ngInject */
  constructor($mdDialog, $document, $http, $rootScope, $q) {
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.status = '';
    this.customFullscreen = false;
    this.$q = $q;
    this.categories = [];
    this.setCategories(this.getAll());
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

  setCategories(x) {
    let that = this;
    console.log(x);
    x.then(function(succes) {
      console.log(succes);
      that.categories = succes;
    });
  }

  getAll() {
    console.log("in getAll()");
    return this.$http.get(url + "/categories" + caturl).then(function(response) {
      return response.data.succes;
    }).catch(function(response) {
      return that.$q.reject.response;
    });
  }

  // .then(function (response) {
  //   console.log(response);
  //   console.log(response.data.succes);
  //   return response.data.succes;
  // });


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
    this.dialCategorie = {};
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.labels = [];
    this.series = [];
    this.data = [];
    // this.categories = ModalsController.setCategories(ModalsController.getAll());
    console.log("Construction DialogController");
    console.log(this.categories);
    this.setDialCategorie(this.get(categorie));
    console.log(categorie);
    this.getSeries(this.get(categorie));
    console.log(this.series);
    this.categorie.budget = 50;
    this.datasetOverride = [{
      yAxisID: 'y-axis-1'
    }, {
      yAxisID: 'y-axis-2'
    }];
    this.options = {
      scales: {
        yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }, {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }]
      }
    };
  }
  onClick(points, evt) {
    console.log(points, evt);
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

  setLabels(x) {
    console.log("set Labels");
    this.labels = x;
    console.log(this.labels);
  }

  setDialCategorie(x) {
    let that = this;
    console.log("setDialCategorie");
    x.then(function(succes) {
      that.dialCategorie = succes;
      console.log(succes);
    });
  }

  get(x) {
    let that = this;
    console.log("get");
    if (x.libelle == "securite") {
      return this.$http.get(url + "/" + "criminalites" + caturl).then(function(response) {
        console.log(response.data.succes);
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    } else if (x.libelle == "economie") {
      return this.$http.get(url + "/" + "budgets" + caturl).then(function(response) {
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    } else {
      return this.$http.get(url + "/" + x.libelle + "s" + caturl).then(function(response) {
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    }
  }

  getHisto(x) {
    let that = this;
    if (x.libelle == "securite") {
      return this.$http.get(url + "/" + "criminalites" + histurl).then(function(response) {
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    } else if (x.libelle == "economie") {
      return this.$http.get(url + "/" + "budgets" + histurl).then(function(response) {
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    } else {
      return this.$http.get(url + "/" + x.libelle + "s" + histurl).then(function(response) {
        return response.data.succes;
      }).catch(function(response) {
        return that.$q.reject.response;
      });
    }
  }

  getSeries(x) {
    let that = this;
    x.then(function(succes) {
      // console.log("getKeysFrom" + succes);
      // console.log(succes);
      console.log(Object.keys(succes));
      that.series = Object.keys(succes);
      let id = that.series.indexOf("id");
      that.series.splice(id, 1);
      console.log(id);
      let backup = that.series.indexOf("backup");
      that.series.splice(backup, 1);
      console.log(that.series);
    });
  }

}

angular
  .module('app')
  .component('gameModals', {
    templateUrl: 'game/modals/modals.html',
    controller: ModalsController
  });
