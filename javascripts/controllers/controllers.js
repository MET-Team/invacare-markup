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
  $scope.enableCompareShortcut = true;
  $scope.orderCallData = {};

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

});