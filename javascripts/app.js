var App = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize']);

App.config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider
    .when("/", {
      templateUrl: "javascripts/templates/home.html"
    })
    .otherwise({
      templateUrl: 'javascripts/templates/404.html'
    });
  }
]);


App.controller('ApplicationCtrl', function($scope, $location, $document){

  $scope.sidebarMenuIsOpen = false;

  if($location.path() == "/"){
    $scope.sidebarMenuIsOpen = true;
  }

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

});