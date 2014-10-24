angular.module('productCtrl', []).controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location){

  $scope.productsItemData = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

  $scope.optionsCountLabel = '';

  $scope.recalcTotalPrice = function(){

    $scope.totalPrice = $scope.productsItemData.price;

    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
        $scope.totalPrice = $scope.totalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.optionsCountLabel = $filter('declOfNum')($scope.functionsSelected.length, ['опция', 'опции', 'опций']);

  };

  $http.get('javascripts/factories/carriage/item.json')
    .success(function(data){

      $scope.productsItemData = data;

      $scope.totalPrice = $scope.productsItemData.price;

      $scope.carriageFunctions = $scope.productsItemData.functions;

      for(item in $scope.carriageFunctions){
        if($scope.carriageFunctions.hasOwnProperty(item)){

          $scope.functionTypes.push({
            "name" : $scope.carriageFunctions[item].title,
            "value" : item
          });

        }
      }

      $scope.showOptionsByType($scope.functionTypeSelected);

      $scope.recalcTotalPrice();

    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

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
      name: $scope.productsItemData.name,
      artikul: $scope.productsItemData.artikul,
      price: $scope.productsItemData.price,
      priceAdditional: $scope.additionalPrice,
      functions: $scope.functionsSelected
    };

    localStorageService.set('productToBuy', productToBuy);

    $location.path('/buy').replace();

  };

});
