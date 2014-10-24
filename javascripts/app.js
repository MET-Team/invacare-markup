var App = angular.module('App', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',

  'appControllers',

  'googlemap-ng',
  'LocalStorageModule',
  'stickyfloat-ng',
  'iso.directives'
]);

App.config(['$routeProvider', '$locationProvider', function($routes, $location) {

  $location.hashPrefix('!');

  $routes.when("/", {
    templateUrl: "javascripts/templates/home.html",
    reloadOnSearch: false
  })
    .when("/catalog", {
      templateUrl: "javascripts/templates/catalog.html",
      reloadOnSearch: false
    })
    .when("/catalog/:productId", {
      templateUrl: "javascripts/templates/product.html",
      reloadOnSearch: false
    })
    .when("/buy", {
      templateUrl: "javascripts/templates/buy.html",
      reloadOnSearch: false
    })

    .when("/delivery-payment", {
      templateUrl: "javascripts/templates/delivery-payment.html",
      reloadOnSearch: false
    })
    .when("/about", {
      templateUrl: "javascripts/templates/about.html",
      reloadOnSearch: false
    })
    .when("/contacts", {
      templateUrl: "javascripts/templates/contacts.html",
      reloadOnSearch: false
    })
    .when("/info", {
      templateUrl: "javascripts/templates/info.html",
      reloadOnSearch: false
    })

    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });

}]);

App.filter("declOfNum", function() {
  return function(number, textVariants) {
    var cases = [2, 0, 1, 1, 1, 2];
    return textVariants[(number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)])];
  };
});