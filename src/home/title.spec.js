describe('title component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('homeTitle', () => {
      return {
        templateUrl: 'home/title.html'
      };
    });
  }));
  beforeEach(angular.mock.module('app'));
  it('should render page d\'accuei en construction', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<home-title></home-title>')($rootScope);
    $rootScope.$digest();
    const title = element.find('h1');
    expect(title.html().trim()).toEqual('page d\'accuei en construction');
  }));
});
