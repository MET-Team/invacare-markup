angular.module('buyCtrl', []).controller('BuyCtrl', function($scope, $http, localStorageService){

  $scope.productItem = localStorageService.get('productToBuy');

  if($scope.productItem) {
    $scope.additionalPrice = $scope.productItem.priceAdditional;
    $scope.functionsSelected = $scope.productItem.functions;
  }

  $scope.functionsListOpened = true;

  $scope.recalcFunctionsPrice = function(){
    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.productItem.priceAdditional = $scope.additionalPrice;

  };

  $scope.removeFunction = function(functionItem){

    var functionSelectedIndex = $scope.functionsSelected.indexOf(functionItem);

    if(functionSelectedIndex > -1){
      $scope.functionsSelected.splice(functionSelectedIndex, 1)
    }

    $scope.recalcFunctionsPrice();

    $scope.productItem.functions = $scope.functionsSelected;
    localStorageService.set('productToBuy', $scope.productItem);

  };

  $scope.removeItem = function(){
    $scope.productItem = null;
    localStorageService.set('productToBuy', $scope.productItem);
  };

  $scope.toggleFunctionList = function(){
    $scope.functionsListOpened = $scope.functionsListOpened ? false : true;
  };

  $scope.deliveryItems = [
    {
      title: 'Самовывоз по Москве',
      price: 'Бесплатно'
    },
    {
      title: 'Курьероaм по Москве и области',
      priceRange: {
        from: 0,
        to: 900
      }
    },
    {
      title: 'Доставка по России, Казахстану, Белоруссии транспортной компанией',
      priceRange: {
        from: 0,
        to: 500
      }
    }
  ];

  $scope.selectedDelivery = null;

  $scope.toggleDeliveryItem = function(item){
    if($scope.selectedDelivery != item){
      $scope.selectedDelivery = item;
    }else{
      $scope.selectedDelivery = null;
    }

  };

});