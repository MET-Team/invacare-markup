angular.module('buyCtrl', []).controller('BuyCtrl', function($rootScope, $scope, $http, localStorageService, $location){

  $scope.productItem = localStorageService.get('productToBuy');

  $scope.userDataErrors = {
    name: '',
    email: '',
    phone: ''
  };
  $scope.deliveryError = '';
  $scope.paymentError = '';

  $scope.checkoutComplete = false;

  $scope.removeItem = function(){
    $scope.productItem = null;
    localStorageService.set('productToBuy', $scope.productItem);
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
      price: 'Бесплатно'
    },
    {
      id: 2,
      title: 'Доставка по России, Казахстану, Белоруссии транспортной компанией',
      price: 'Бесплатно'
    }
  ];

  $scope.toggleDeliveryItem = function(item){
    if($rootScope.selectedDelivery != item){
      $rootScope.selectedDelivery = item;

      $scope.deliveryError = '';
      $scope.checkoutComplete = true;
    }else{
      $rootScope.selectedDelivery = null;
    }
  };

  // false – наличные, true - безналичные
  $scope.paymentItems = [
    {
      title: 'Электронные деньги',
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

  $scope.togglePaymentItem = function(item){
    if($rootScope.selectedPayment != item){
      $rootScope.selectedPayment = item;

      $scope.paymentError = '';
      $scope.checkoutComplete = true;
    }else{
      $rootScope.selectedPayment = null;
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

  $scope.setCheckoutStepByHash = function(currentStep){
    if(currentStep){
      switch(currentStep){
        case 'contacts':
          $scope.checkoutStepSelected = 0;
          break;
        case 'delivery':
          $scope.checkoutStepSelected = 1;
          break;
        case 'payment':
          $scope.checkoutStepSelected = 2;
          break;
        case 'thank_you':
          $scope.checkoutStepSelected = 3;
          break;
        default:
          $scope.checkoutStepSelected = 0;
          break;
      }
    }
  };

  $scope.setCheckoutStepByHash($location.hash());

  $scope.authoriseUser = function(){
    $http.post($rootScope.domain+ '/api/v1/users/sign_in', {
      user: {
        email: $rootScope.checkoutData.email,
        password: $rootScope.userPassword
      }
    }).success(function(data){
        $rootScope.userData.id = data.user_id;
        $rootScope.userData.token = data.token;
        $rootScope.registerSuccess = true;

        $scope.sendMail('registration', $rootScope.checkoutData);

      })
      .error(function(data){
        console.error('Авторизация не удалась, пробуем зарегистрироваться', data);

        // 2. в случае провальной авторизации регистрируем пользователя
        $scope.registerUser();
      });
  };

  $scope.registerUser = function(){
    $http.post($rootScope.domain + '/api/v1/users.json', {
      user: {
        email: $rootScope.checkoutData.email,
        password: $rootScope.userPassword,
        password_confirmation: $rootScope.userPassword,
        login: $rootScope.checkoutData.email,
        phone: $rootScope.checkoutData.phone || '+7 999 999 99-99',
        name: $rootScope.checkoutData.name || 'noname',
        site_id: $rootScope.site_id
      }
    }).success(function(data){
        $rootScope.userData = data.user;
        $rootScope.userData.token = data.token;

        $rootScope.registerSuccess = true;
        $scope.sendMail('registration', $rootScope.userData.user);

      }).error(function(data){
        console.error('Регистрация не удалась, жаль', data);
      });
  };

  $scope.checkUserData = function(){
    var flag = true;

    $scope.userDataErrors.email = '';

    if($rootScope.checkoutData.email == ''){
      $scope.userDataErrors.email = 'Поле обязательно для заполнения';
      flag = false;
      $scope.checkoutComplete = false;
    }

    return flag;
  };

  $scope.changeCheckoutStep = function(index){
    if($scope.checkoutComplete){
      $scope.checkoutStepSelected = index;
      $scope.checkoutSteps[$scope.checkoutStepSelected].completed = false;
    }
  };

  $scope.nextStep = function(){

    if($scope.checkoutStepSelected < $scope.checkoutSteps.length - 1){
      /* заполнение форм */

      if($scope.checkoutStepSelected == 0){
        $location.hash('contacts');
        //проверка полей формы
        var continueStep = $scope.checkUserData();

        if(continueStep && !$rootScope.registerSuccess){
          $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;

          $scope.userDataErrors.email = '';

          // 1. авторизация
          $scope.authoriseUser();

        }else{
          return false;
        }
      }

      if($scope.checkoutStepSelected == 1){
        // проверяем выбор доставки
        if(!$rootScope.selectedDelivery){
          $scope.deliveryError = 'Укажите тип доставки';
          $scope.checkoutComplete = false;
          return false;
        }else{
          $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;
        }
      }

      if($scope.checkoutStepSelected == 2){
        // проверяем выбор оплаты
        if(!$rootScope.selectedPayment){
          $scope.paymentError = 'Укажите тип оплаты';
          $scope.checkoutComplete = false;
          return false;
        }else{
          $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;
        }
      }

      $scope.checkoutStepSelected++;

      switch($scope.checkoutStepSelected){
        case 0:
          $location.hash('contacts');
          break;
        case 1:
          $location.hash('delivery');
          break;
        case 2:
          $location.hash('payment');
          break;
//        case 3:
//          console.log('thank_you.........end');
//          return false;
//
//          $location.hash('thank_you');
//          break;
        default:
          $location.hash('contacts');
          break;
      }
    }else{

      console.log('make order', $rootScope.checkoutData, $rootScope.userData, $rootScope.registerSuccess, $rootScope.orderSuccess);

      /* оформление покупки */

      $rootScope.checkoutData.delivery = $rootScope.selectedDelivery;
      $rootScope.checkoutData.payment = $rootScope.selectedPayment;
      $rootScope.checkoutData.product = $scope.productItem;

      if($rootScope.userData && $rootScope.registerSuccess && !$rootScope.orderSuccess){

        console.log('send order');


        if(!$scope.checkoutComplete){
          return false;
        }

        // 3. отправка заказа
        $http.post($rootScope.domain+ '/api/v1/users/'+ $rootScope.userData.id +'/orders', {
          user_id: $rootScope.userData.id,
          site_id: $rootScope.site_id,
          order: {
            shipment_method_id: $rootScope.checkoutData.delivery.id,
            payment_method: $rootScope.checkoutData.payment.cash,
            address: 'Test',
            comment: 'Test',
            order_products_attributes: [{
              orderable_id: $rootScope.checkoutData.product.id,
              orderable_type: 'Product',
              quantity: 1
            }]
          }
        },{
          headers: {
            'Authorization': 'Bearer ' + $rootScope.userData.token
          }
        }).success(function(data){

            var orderResponse = data;
            if(orderResponse){
              if($rootScope.checkoutData.payment.cash && $rootScope.checkoutData.payment.title == 'Электронные деньги'){

                // 4. подтверждаем оплату безналом
                $http.post($rootScope.domain+ '/api/v1/users/'+ $rootScope.userData.id +'/orders/'+ orderResponse.id +'/set_reserve_pay_online_money_ext',{
                  headers: {
                    'Authorization': 'Bearer ' + $rootScope.userData.token
                  }
                })
                  .success(function(data){
                    console.log(data);
                  })
                  .error(function(data){
                    console.error(data);
                  });
              }

              console.log('orderSuccess');
              $location.hash('thank_you');

              $scope.orderThanks = 'Ваш заказ принят. В ближайшее время наш менеджер с Вами свяжется для уточнения деталей доставки.';

              $scope.sendMail('order', $rootScope.checkoutData);

              $rootScope.orderSuccess = true;
              localStorageService.set('productToBuy', null);
            }
          })
          .error(function(data){
            console.error(data);
          });

      }
    }

    $scope.$on('$locationChangeSuccess', function(newState, oldState){
      $scope.setCheckoutStepByHash($location.hash());
    });
  };

});