angular.module('buyCtrl', []).controller('BuyCtrl', function($rootScope, $scope, $http, localStorageService, $location){

  $scope.checkoutData = localStorageService.get('checkoutData') || {
    name: '',
    email: '',
    phone: '',
    delivery: 0,
    payment: 0,
    products: []
  };
  $scope.selectedPayment = localStorageService.get('selectedPayment') || null;
  $scope.selectedDelivery = localStorageService.get('selectedDelivery') || null;

  $scope.registerSuccess = false;
  $scope.orderSuccess = false;

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
      price: 'Бесплатно по РФ. До Беларуси и Казахстана - по тарифам Транспортной компании.'
    }
  ];

  $scope.toggleDeliveryItem = function(item){
    if($scope.selectedDelivery != item){
      $scope.selectedDelivery = item;

      $scope.deliveryError = '';
      $scope.checkoutComplete = true;
    }else{
      $scope.selectedDelivery = null;
    }
    localStorageService.set('selectedDelivery', $scope.selectedDelivery);
  };

  // false – наличные, true - безналичные
  $scope.paymentItems = [
    {
      title: 'Банковской картой',
      cash: true,
      value: 2
    },
    {
      title: 'Наличными',
      cash: false,
      value: 1
    },
    {
      title: 'Электронные деньги',
      cash: true,
      value: 0
    }
  ];

  $scope.EMoneyTypeListSelected = {
    name: 'PC'
  };
  $scope.EMoneyTypeList = [
    {
      title: 'Кошелек в Яндекс.Деньгах',
      name: 'PC'
    },
    {
      title: 'Кошелек в системе WebMoney',
      name: 'WM'
    },
    {
      title: 'Сбербанк: оплата по SMS или Сбербанк Онлайн',
      name: 'SB'
    },
    {
      title: 'Альфа-Клик',
      name: 'AB'
    }
  ];

  $scope.togglePaymentItem = function(item){
    if($scope.selectedPayment != item){
      $scope.selectedPayment = item;

      $scope.paymentError = '';
      $scope.checkoutComplete = true;
    }else{
      $scope.selectedPayment = null;
    }

    localStorageService.set('selectedPayment', $scope.selectedPayment);
  };

  $scope.checkoutSteps = [
    {
      title: 'Контакты',
      href: 'contacts'
    },{
      title: 'Доставка',
      href: 'delivery'
    },{
      title: 'Оплата',
      href: 'payment'
    }
  ];

  $scope.checkoutStepSelected = 0;

  $scope.setCheckoutStepByHash = function(currentStep){

    //TO-DO: сделать проверку заполненности шагов и авторизацию при заполненности данных пользователя

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
          $scope.orderSuccess = true;
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
        email: $scope.checkoutData.email,
        password: $rootScope.userPassword
      }
    }).success(function(data){
        $rootScope.userData.id = data.user_id;
        $rootScope.userData.token = data.token;
        $scope.registerSuccess = true;

        $scope.sendMail('registration', $scope.checkoutData);

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
        email: $scope.checkoutData.email,
        password: $rootScope.userPassword,
        password_confirmation: $rootScope.userPassword,
        login: $scope.checkoutData.email,
        phone: $scope.checkoutData.phone || '+7 999 999 99-99',
        name: $scope.checkoutData.name || 'noname',
        site_id: $rootScope.site_id
      }
    }).success(function(data){
        $rootScope.userData = data.user;
        $rootScope.userData.token = data.token;

        $scope.registerSuccess = true;
        $scope.sendMail('registration', $rootScope.userData.user);

      }).error(function(data){
        console.error('Регистрация не удалась, жаль', data);
      });
  };

  $scope.checkUserData = function(){
    var flag = true;

    $scope.userDataErrors.email = '';

    if($scope.checkoutData.email == ''){
      $scope.userDataErrors.email = 'Поле обязательно для заполнения';
      flag = false;
      $scope.checkoutComplete = false;
    }

    return flag;
  };

  $scope.checkCurrentStep = function(index){
    switch(index){
      case 0:
        //проверка полей формы
//        if($scope.checkUserData() && !$scope.registerSuccess){
        if($scope.checkUserData()){
          $scope.userDataErrors.email = '';

          // 1. авторизация
          if(!$scope.registerSuccess){
            $scope.authoriseUser();
          }

        }else{
          return false;
        }

        break;
      case 1:
        // проверяем выбор доставки
        if(!$scope.selectedDelivery){
          $scope.deliveryError = 'Укажите тип доставки';
          $scope.checkoutComplete = false;
          return false;
        }

        break;
      case 2:
        // проверяем выбор оплаты
        if(!$scope.selectedPayment){
          $scope.paymentError = 'Укажите тип оплаты';
          $scope.checkoutComplete = false;
          return false;
        }

        break;
      default :
        break;
    }

    return true;
  };

  $scope.isMakeOrder = false;

  $scope.changeCheckoutStep = function(index){

    if(index){
      $scope.isMakeOrder = false;
    }

    if(index == $scope.checkoutStepSelected){
      return false;
    }

    if($scope.checkoutSteps[$scope.checkoutStepSelected]){
      $scope.checkoutSteps[$scope.checkoutStepSelected].completed = false;
    }

    if($scope.checkCurrentStep($scope.checkoutStepSelected) && !$scope.isMakeOrder){

      $scope.checkoutComplete = true;

      if($scope.checkoutSteps[$scope.checkoutStepSelected]){
        $scope.checkoutSteps[$scope.checkoutStepSelected].completed = true;
      }

      if(arguments.length > 0){
        $scope.checkoutStepSelected = index;
      }else{
        $scope.checkoutStepSelected++;
      }

      if($scope.checkoutSteps[$scope.checkoutStepSelected]){
        $location.hash($scope.checkoutSteps[$scope.checkoutStepSelected].href);
      }
    }
  };

  $scope.nextStep = function(){

    $scope.isMakeOrder = $scope.checkoutStepSelected >= $scope.checkoutSteps.length - 1;
    $scope.changeCheckoutStep();

    if($scope.isMakeOrder){

      /* оформление покупки */
      $scope.checkoutData.delivery = $scope.selectedDelivery;
      $scope.checkoutData.payment = $scope.selectedPayment;
      $scope.checkoutData.product = $scope.productItem;

      if($rootScope.userData && $scope.registerSuccess && !$scope.orderSuccess){
        if(!$scope.checkoutComplete){
          return false;
        }

        // 3. отправка заказа
        $http.post($rootScope.domain+ '/api/v1/users/'+ $rootScope.userData.id +'/orders', {
          user_id: $rootScope.userData.id,
          site_id: $rootScope.site_id,
          order: {
            shipment_method_id: $scope.checkoutData.delivery.id,
            payment_method: $scope.checkoutData.payment.cash,
            address: 'Test',
            comment: 'Test',
            order_products_attributes: [{
              orderable_id: $scope.checkoutData.product.id,
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
              if($scope.checkoutData.payment.cash && $scope.checkoutData.payment.value == 0){

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

              if($scope.checkoutData.payment.cash){
                /* делаем запрос на оформление оплаты */

                var requestParams = {
                  scid: '19148',
                  ShopID: '25500',
                  CustomerNumber: $scope.checkoutData.email,
                  Sum: 1,
                  custName: $scope.checkoutData.name,
                  custEMail: $scope.checkoutData.email,
                  cps_email: $scope.checkoutData.email,
                  cps_phone: $scope.checkoutData.phone,
                  shopSuccessURL: 'http://yandex.ru/'
                };

                if ($scope.checkoutData.payment.value == 0) {
                  requestParams.paymentType = $scope.EMoneyTypeListSelected.name;
                } else {
                  if ($scope.checkoutData.payment.value == 2) {
                    requestParams.paymentType = 'AC';
                  }
                }

                var requestString = $.param(requestParams);

                window.location.href = 'https://money.yandex.ru/eshop.xml?' + requestString;

              }

              $location.hash('thank_you');

              $scope.orderThanks = 'Ваш заказ принят. В ближайшее время наш менеджер с Вами свяжется для уточнения деталей доставки.';

              $scope.sendMail('order', $scope.checkoutData);

              $scope.orderSuccess = true;

              localStorageService.set('productToBuy', null);
              localStorageService.set('checkoutData', null);
            }
          })
          .error(function(data){
            console.error(data);
          });
      }
    }
  };

  $scope.$on('$locationChangeStart', function(newState, oldState){
    localStorageService.set('checkoutData', $scope.checkoutData);
  });

  $scope.$on('$locationChangeSuccess', function(newState, oldState){
    $scope.setCheckoutStepByHash($location.hash());
  });

});