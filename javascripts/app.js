var App = angular.module('App', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',

  'LocalStorageModule',

  'appControllers'
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

    .when("/delivery", {
      templateUrl: "javascripts/templates/delivery.html",
      reloadOnSearch: false
    })
    .when("/payment", {
      templateUrl: "javascripts/templates/payment.html",
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

    .when("/faq", {
      templateUrl: "javascripts/templates/faq.html",
      reloadOnSearch: false
    })
    .when("/return_guarantee", {
      templateUrl: "javascripts/templates/return_guarantee.html",
      reloadOnSearch: false
    })

    .when("/product_compare", {
      templateUrl: "javascripts/templates/product_compare.html",
      reloadOnSearch: false
    })

    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });

}]).run(function($rootScope){
  $rootScope.domain = "http://white-m.ru";
  $rootScope.comparedProducts = [];
});

App.filter("declOfNum", function() {
  return function(number, textVariants) {
    var cases = [2, 0, 1, 1, 1, 2];
    return textVariants[(number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)])];
  };
});