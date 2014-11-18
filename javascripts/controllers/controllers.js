appControllers = angular.module("appControllers", [
  'catalogCtrl',
  'productCtrl',
  'productCompareCtrl',
  'buyCtrl',
  'infoCtrl',

  'googlemap-ng',
  'LocalStorageModule',
  'stickyfloat-ng',
  'iso.directives'
]);

appControllers.controller('ApplicationCtrl', function($rootScope, $scope, $location, $document, localStorageService){

  $scope.pageIsMain = false;
  $scope.enableCompareShortcut = true;
  $scope.orderCallData = {};

  var Today = new Date();
  $scope.currentDate = Today.getTime();

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.orderCall = function(){
    console.log($scope.orderCallData)
  };

  $scope.$on('$routeChangeStart', function() {
    $scope.pageIsMain = $location.path() == "/";
    $scope.enableCompareShortcut = $location.path() != "/product_compare";
  });

  $scope.searchFormActive = false;
  $scope.searchString = '';

  $scope.toggleSearchForm = function(){
    if($scope.searchString != ''){
      if(event.type != 'blur'){
        console.log($scope.searchString);
      }
    }else{
      $scope.searchFormActive = $scope.searchFormActive ? false : true;
      if(!$scope.searchFormActive) {
        $scope.searchString = '';
      }
    }
  };

  $rootScope.comparedProducts = localStorageService.get('comparedProducts');

});

appControllers.controller('ContactsCtrl', function($scope, $http){
  $scope.mapMarkers = [
    {
      "name": "Invacare",
      "address": "г. Москва, Ленинский проспект, 500м от МКАД, Бизнес-парк «Румянцево», корпус «Г», 11 подъезд, офис 521г",
      "location": {
        "latitude": "55.634317",
        "longitude": "37.439019"
      }
    }
  ]
});