class BarCtrl {
  constructor($http){
    this.$http=$http;
    this.$http.get("")
                  .then(function(response) {
                      $scope.content = response.data;
                      $scope.statuscode = response.status;
                      $scope.statustext = response.statustext;
                    });
    this.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.series = ['Series A', 'Series B'];

    this.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  }
}


angular
  .module('app')
  .component('modalBargraph', {
    templateUrl: 'game/bargraph.html'
  });
