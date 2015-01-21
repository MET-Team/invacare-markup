appControllers = angular.module("appControllers", [
  'catalogCtrl',
  'productCtrl',
  'productCompareCtrl',
  'buyCtrl',
  'infoCtrl',
  'DeliveryCtrl',

  'googlemap-ng',
  'iso.directives'
])
  .directive('slickSlider', function(){
    return{
      restrict: "EAC",
      link: function(scope, elements){
        var element = $(elements[0]);
        element.slick();
      }
    }
  });

appControllers.controller('ApplicationCtrl', ['$rootScope', '$scope', '$location', '$document', '$http', function($rootScope, $scope, $location, $document, $http){

  $scope.pageIsMain = false;
  $scope.pageIsInfo = false;

  $scope.enableCompareShortcut = true;

  $scope.orderTestDriveData = {};

  $scope.searchFormActive = false;

  $scope.searchString = $location.search().query || '';
  if($scope.searchString){
    $scope.searchFormActive = true;
  }

  $scope.toggleSearchForm = function(){

    if($scope.searchString != ''){
      $rootScope.searchString = $scope.searchString;
      $location.search('query', $scope.searchString).path("/search").replace();
    }else{
      $scope.searchFormActive = $scope.searchFormActive ? false : true;
      if(!$scope.searchFormActive) {
        $scope.searchString = '';
      }
    }
  };

  $scope.toggleSearchFormBlur = function(){
    if($scope.searchString == ''){
      $scope.searchFormActive = false;
    }
  };

  $scope.goToCatalog = function(){
    ga('send', 'event', 'button-catalog', 'click', 'button-catalog-main');
    $location.path('/catalog');
  };

  $scope.sendMail = function(type, sendData){
    $http({
      method: 'post',
      url: '/send_mail/',
      params: {
        type: type,
        sendData: sendData
      }
    })
      .success(function (data) {
        if(data.error){
          console.error(data.error);
          return false;
        }
        if(data.success){
          console.log(data.success);
        }
      }).error(function (){
        console.error('Произошла ошибка');
      });
  };

  $scope.OrderTestDriveFormIsOpen = false;
  $scope.toggleOrderTestDriveForm = function(){
    $scope.OrderTestDriveFormIsOpen = $scope.OrderTestDriveFormIsOpen ? false : true;
    if($scope.OrderTestDriveFormIsOpen){
      ga('send', 'event', 'test-drive', 'click', 'open test-drive homepage form');
    }
  };

  var Today = new Date();
  $scope.currentDate = Today.getTime();

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.orderTestDrive = function(){
    $scope.sendMail('test-drive', $scope.orderTestDriveData);

    ga('send', 'event', 'test-drive', 'click', 'send test-drive homepage form');

    $scope.toggleOrderTestDriveForm();
  };

  $scope.infoNavMenu = [
    {
      title: 'Доставка',
      url: '/delivery'
    },
    {
      title: 'Оплата',
      url: '/payment'
    },
    {
      title: 'Возврат и гарантии',
      url: '/return_guarantee'
    },
    {
      title: 'Частые вопросы',
      url: '/faq'
    },
    {
      title: 'Контакты',
      url: '/contacts'
    }
  ];

  $scope.$on('$routeChangeStart', function() {
    $scope.pageIsMain = $location.path() == "/";
    $scope.enableCompareShortcut = $location.path() != "/product_compare";

    $scope.pageIsInfo = false;
    for(index in $scope.infoNavMenu){
      if($scope.infoNavMenu.hasOwnProperty(index)){
        $scope.infoNavMenu[index].active = false;
        if($location.path() == $scope.infoNavMenu[index].url){
          $scope.pageIsInfo = true;
          $scope.infoNavMenu[index].active = true;
        }
      }
    }

  });

//  $rootScope.comparedProducts = localStorageService.get('comparedProducts');

}]);

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

appControllers.controller('SearchCtrl', function($scope, $location, $http, $rootScope){

  $scope.searchString = $location.search().query;

  $scope.searchProducts = function(){
    if($scope.searchString){
      $http.get($rootScope.domain +'/api/v1/sites/4/products', {
        params: {
          name_cont: $scope.searchString
        }
      }).success(function(data){
        $scope.productsList = data;
      }).error(function(){
        console.error('Произошла ошибка');
      });
    }
  };

  $scope.searchProducts();

  $scope.$on('$locationChangeSuccess', function() {
    $rootScope.searchString = $rootScope.searchString || '';

    $scope.searchString = $rootScope.searchString;
    $scope.searchProducts();
  });

  $scope.isoOptions = {
    layoutMode: 'fitRows'
  };

});