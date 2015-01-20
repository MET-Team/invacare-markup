var App = angular.module('App', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',

  'LocalStorageModule',

  'appControllers'
]);

App.config(['$routeProvider', '$locationProvider', function($routes, $location) {

  $routes.when("/", {
    templateUrl: "/javascripts/templates/home.html",
    reloadOnSearch: false
  })

  .when("/catalog", {
    templateUrl: "/javascripts/templates/catalog.html"
  })

  .when("/catalog/:carriageType", {
    templateUrl: "/javascripts/templates/catalog.html"
  })

  .when("/catalog/:carriageType/:productId", {
    templateUrl: "/javascripts/templates/product.html",
    reloadOnSearch: false,
    caseInsensitiveMatch: false
  })

  .when("/buy", {
    templateUrl: "/javascripts/templates/buy.html"
  })

  .when("/delivery", {
    templateUrl: "/javascripts/templates/delivery.html"
  })
  .when("/payment", {
    templateUrl: "/javascripts/templates/payment.html"
  })
  .when("/about", {
    templateUrl: "/javascripts/templates/about.html"
  })
  .when("/contacts", {
    templateUrl: "/javascripts/templates/contacts.html"
  })
  .when("/info", {
    templateUrl: "/javascripts/templates/info.html"
  })

  .when("/faq", {
    templateUrl: "/javascripts/templates/faq.html"
  })
  .when("/return_guarantee", {
    templateUrl: "/javascripts/templates/return_guarantee.html"
  })

  .when("/product_compare", {
    templateUrl: "/javascripts/templates/product_compare.html"
  })

  .when("/search", {
    templateUrl: "/javascripts/templates/search.html"
  })

  .otherwise({
    templateUrl: '/javascripts/templates/404.html'
  });

  $location.html5Mode(true);

}]).run(function($rootScope){
  $rootScope.domain = "http://white-m.ru";
  $rootScope.site_id = 4;

  $rootScope.mainPhone = '+7 495 777-39-18';
  $rootScope.mainEmail = 'info@invacare.com.ru';

  $rootScope.userPassword = 'q1w2e3r4t5y6';

  $rootScope.comparedProducts = [];
  $rootScope.searchString = null;

  $rootScope.userData = $rootScope.userData || {};

  $rootScope.metaTags = {
    pageTitle: 'Invacare',
    pageKeyWords: '',
    pageDescription: ''
  };

  $rootScope.checkoutData = {
    name: '',
    email: '',
    phone: '',
    delivery: 0,
    payment: 0,
    products: []
  };
  $rootScope.selectedPayment = null;
  $rootScope.selectedDelivery = null;

  $rootScope.registerSuccess = false;
  $rootScope.orderSuccess = false;

});

App.filter("declOfNum", function() {
  return function(number, textVariants) {
    var cases = [2, 0, 1, 1, 1, 2];
    return textVariants[(number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)])];
  };
});

$(function(){
  var userAgent = detect.parse(navigator.userAgent);
  $(window).load(function(){
    if(userAgent.device.type == 'Mobile' || userAgent.device.type == 'Tablet'){
      $('meta[name=viewport]').attr('content','width=1024, user-scalable=no');
    }
  });
});