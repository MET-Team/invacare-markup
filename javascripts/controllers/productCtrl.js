angular.module('productCtrl', []).controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location, $routeParams, $rootScope){

  $scope.productId = $routeParams.productId;

  $scope.product = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

  $scope.optionsCountLabel = '';

  $scope.recalcTotalPrice = function(){

    $scope.totalPrice = $scope.product.price;

    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
        $scope.totalPrice = $scope.totalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.optionsCountLabel = $filter('declOfNum')($scope.functionsSelected.length, ['опция', 'опции', 'опций']);

  };

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId)
    .success(function(data){
      $scope.product = data;
      $scope.totalPrice = $scope.product.price;
      $scope.recalcTotalPrice();
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/tech_specs')
    .success(function(data){
      $scope.characters = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/components')
    .success(function(data){
      $scope.components = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/photo_elements')
    .success(function(data){
      $scope.photo_elements = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/transformations')
    .success(function(data){
      $scope.transformations = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/ad_blocks')
    .success(function(data){
      $scope.ad_blocks = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

  $scope.configureOptions = null;

  $scope.toggleFunction = function(functionItem){

    var functionSelectedIndex = $scope.functionsSelected.indexOf(functionItem);

    if(functionSelectedIndex > -1){
      $scope.functionsSelected.splice(functionSelectedIndex, 1)
    }else{
      $scope.functionsSelected.push(functionItem);
    }

    if($scope.functionsSelected.length == 0){
      $scope.functionTotalOpened = false;
    }

    $scope.recalcTotalPrice();

  };

  $scope.toggleSelectedFunctionsList = function(){
    $scope.functionTotalOpened = $scope.functionTotalOpened ? false : true;
  };

  $scope.buyProduct = function(){

    var productToBuy = {
      name: $scope.product.name,
      artikul: $scope.product.artikul,
      price: $scope.product.price,
      priceAdditional: $scope.additionalPrice,
      functions: $scope.functionsSelected
    };

    localStorageService.set('productToBuy', productToBuy);

    $location.path('/buy').replace();

  };

});
