appControllers = angular.module("appControllers", [
  'catalogCtrl',
  'productCtrl',
  'productCompareCtrl',
  'buyCtrl',
  'infoCtrl',

  'googlemap-ng',
  'LocalStorageModule',
  'iso.directives'
]);

appControllers.controller('ApplicationCtrl', function($rootScope, $scope, $location, $document, localStorageService){

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

  $scope.OrderTestDriveFormIsOpen = false;
  $scope.toggleOrderTestDriveForm = function(){
    $scope.OrderTestDriveFormIsOpen = $scope.OrderTestDriveFormIsOpen ? false : true;
  };

  var Today = new Date();
  $scope.currentDate = Today.getTime();

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.orderTestDrive = function(){
    console.log($scope.orderTestDriveData)
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

appControllers.controller('DeliveryCtrl', function($scope){

  $('.delivery-navigation').waypoint('sticky');

  var itemsOffset = [];
  $(".delivery-item").each(function(){
    var offsetTop = $(this).offset().top;
    itemsOffset.push(offsetTop);
  });

  $(document).on('scroll', function(){
    var scrollTop = $('body').scrollTop();

    var winHeight = $(window).height();

    if(scrollTop <= itemsOffset[0]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(0).addClass('active');
    }else if(scrollTop > itemsOffset[0] && scrollTop <= itemsOffset[1]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(1).addClass('active');
    }else if(scrollTop > itemsOffset[1] && scrollTop <= itemsOffset[2]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(2).addClass('active');
    }else if(scrollTop > itemsOffset[2] && scrollTop <= itemsOffset[3]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(3).addClass('active');
    }

    if(scrollTop <= 400){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(0).addClass('active');
    }
  });

  $('.delivery-navigation li').click(function(){
    $('.delivery-navigation li').removeClass('active');
    $(this).addClass('active');

    var index = $(this).index();

    $("html, body").animate({scrollTop: $(".delivery-item").eq(index).offset().top - 120}, 400);

  });

  $scope.cityList = [
    {
      id: 0,
      value: ''
    }
  ];
  $('#recommended .column li a').each(function(i){
    var cityItem = {
      id: i+1,
      value: $(this).html()
    };
    $scope.cityList.push(cityItem);
  });

  $scope.selectedCity = null;

  $(document).ready(function(){

    $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
      $.getScript('//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js',function(){

        $(".delivery-city-search select").select2({
          formatNoMatches: '',
          placeholder: "Выберите город",
          allowClear: true
        });

      });//script
    });//script

  });

});