angular.module('buyCtrl', []).controller('BuyCtrl', function($rootScope, $scope, $http, localStorageService){

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
      id: 0,
      title: 'Самовывоз по Москве',
      price: 'Бесплатно'
    },
    {
      id: 1,
      title: 'Курьером по Москве и области',
      priceRange: {
        from: 0,
        to: 900
      }
    },
    {
      id: 2,
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

  // false – наличные, true - безналичные
  $scope.paymentItems = [
    {
      title: 'Яндекс Деньги',
      cash: true
    },
    {
      title: 'Наличными',
      cash: false
    },
    {
      title: 'Банковской картой',
      cash: true
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

  $scope.registerSuccess = false;

  $scope.saveUserLocal = function(){

    $http({
      method: 'post',
      url: '/send_mail/',
      params:{
        type: 'registration',
        userData: $rootScope.userData
      }
    })
      .success(function (data) {
        if(data.success){
          console.log(data.success);
        }

        if(data.errors){
          console.error(data.errors);
        }
      }).error(function (){
        console.error('Произошла ошибка');
      });

  };

  $scope.registerUser = function(){
    $http.post($rootScope.domain + '/api/v1/users.json', {
      user: {
        email: $scope.checkoutData.email,
        password: $rootScope.userPassword,
        password_confirmation: $rootScope.userPassword,
        login: $scope.checkoutData.email,
        phone: $scope.checkoutData.phone,
        name: $scope.checkoutData.name,
        site_id: $rootScope.site_id
      }
    }).success(function(data){
        $rootScope.userData = data;
//      localStorageService.set('userData', data);

        $scope.registerSuccess = true;
        $scope.saveUserLocal();

      }).error(function(data){
        console.error('Регистрация не удалась, жаль', data);
      });
  };

  $scope.nextStep = function(){
    if($scope.checkoutStepSelected < $scope.checkoutSteps.length-1){
      $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;

      if($scope.checkoutStepSelected == 0 && !$scope.registerSuccess){

        //1. авторизация
        $http.post($rootScope.domain+ '/api/v1/users/sign_in', {
          user: {
            email: $scope.checkoutData.email,
            password: $rootScope.userPassword
          }
        }).success(function(data){
          $rootScope.userData.id = data.id;
        })
        .error(function(data){
            console.error('Авторизация не удалась, пробуем зарегистрироваться', data);

            // в случае провальной авторизации регистрируем пользователя
            $scope.registerUser();
        });
      }

      $scope.checkoutStepSelected++;
    }else{
      $scope.checkoutData.delivery = $scope.selectedDelivery;
      $scope.checkoutData.payment = $scope.selectedPayment;
      $scope.checkoutData.products = $scope.productItem;

      if($rootScope.userData && $scope.registerSuccess){

        //TO-DO: 2. отправка заказа
        console.log($rootScope.userData, $scope.checkoutData);

        $http.post($rootScope.domain+ '/users/'+ $rootScope.userData.id +'/orders', {
          user_id: $rootScope.userData.id,
          site_id: $rootScope.site_id,
          order: {
            shipment_method_id: $scope.checkoutData.selectedDelivery.id,
            payment_method: $scope.selectedPayment.cash,
            address: '',
            comment: 'Test',
            order_products: [{
              orderable_id: $scope.checkoutData.products.id,
              orderable_type: 'Product',
              quantity: 1
            }]
          }
        }).success(function(data){
            console.log(data);

            //если безналичный расчет
            if($scope.selectedPayment.cash == true){

            }
          })
          .error(function(data){
            console.error(data);
          });
      }
    }
  };

});