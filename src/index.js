angular
  .module('app', ['ui.router', 'ngMaterial', 'chart.js'])
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
    });



var url = "http://localhost:8080/serverSimPol";
// "http://vps337131.ovh.net:8080/serverSimPol";
var appurl = "game/";

var caturl = "?login=user1&token=0000&backup=1&all=1";

var histurl = "?login=user1&token=0000&backup=1&all=0";
