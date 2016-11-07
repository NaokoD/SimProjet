angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
  $stateProvider
    .state('app', {
      url: '/app',
      component: 'app'
    });
  $stateProvider
    .state('game', {
      url: '/game',
      component: 'game'
    });
}
