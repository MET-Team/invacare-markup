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

  $scope.checkoutData = {
    name: '',
    email: '',
    phone: '',
    delivery: 0,
    payment: 0,
    products: []
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
      title: 'Курьером по Москве и области',
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

  $scope.paymentItems = [
    {
      title: 'Яндекс Деньги'
    },
    {
      title: 'Наличными'
    },
    {
      title: 'Банковской картой'
    }
  ];

  $scope.selectedPayment = null;

  $scope.togglePaymentItem = function(item){
    if($scope.selectedPayment != item){
      $scope.selectedPayment = item;
    }else{
      $scope.selectedPayment = null;
    }
  };

  $scope.checkoutSteps = [
    {
      title: 'Контакты'
    },{
      title: 'Доставка'
    },{
      title: 'Оплата'
    }
  ];

  $scope.checkoutStepSelected = 0;

  $scope.changeCheckoutStep = function(index){
    $scope.checkoutStepSelected = index;
    $scope.checkoutSteps[$scope.checkoutStepSelected].completed = false;
  };

  $scope.nextStep = function(){
    if($scope.checkoutStepSelected < $scope.checkoutSteps.length-1){
      $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;
      $scope.checkoutStepSelected++;
    }else{
      $scope.checkoutData.delivery = $scope.selectedDelivery;
      $scope.checkoutData.payment = $scope.selectedPayment;
      $scope.checkoutData.products = $scope.productItem;


      console.log($scope.checkoutData)
    }
  };

});