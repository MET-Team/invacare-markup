var App = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize']);

App.config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider
    .when("/", {
      templateUrl: "javascripts/templates/home.html",
      reloadOnSearch: false
    })
    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });
  }
]);


App.controller('ApplicationCtrl', function($scope, $location, $document){

  $scope.sidebarMenuIsOpen = false;
  $scope.OrderCallFormIsOpen = false;
  $scope.HeaderOrderCallFormIsOpen = false;

  $scope.orderCallData = {};

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.toggleOrderCallForm = function(){
    $scope.OrderCallFormIsOpen = $scope.OrderCallFormIsOpen ? false : true;
  };

  $scope.toggleHeaderOrderCallForm = function(){
    $scope.HeaderOrderCallFormIsOpen = $scope.HeaderOrderCallFormIsOpen ? false : true;
  };

  $scope.orderCall = function(){
    console.log($scope.orderCallData)
  };

  $scope.$on('$routeChangeStart', function() {
    if($location.path() == "/"){
      $scope.sidebarMenuIsOpen = true;
    }else{
      $scope.sidebarMenuIsOpen = false;
    }
  });

});