class LineCtrl {

  constructor($http, categorie) {
    this.$http=$http;
    this.categorie = categorie;
    this.$http.get("")
                  .then(function(response) {
                      $scope.content = response.data;
                      $scope.statuscode = response.status;
                      $scope.statustext = response.statustext;
                    });
    // this.nb
    this.labels = ["January", "February", "March", "April", "May", "June", "July"];
    this.series = ['Series A', 'Series B'];
    this.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
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
  onClick(points, evt){
    console.log(points, evt);
  }
}

angular
  .module('app')
  .component('modalGraph', {
    templateUrl: 'game/graph.html'
  });
