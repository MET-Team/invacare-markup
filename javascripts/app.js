var App = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize']);

App.config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider
    .when("/", {
      templateUrl: "javascripts/templates/home.html",
      reloadOnSearch: false
    })
    .when("/catalog", {
      templateUrl: "javascripts/templates/catalog.html",
      reloadOnSearch: false
    })
    .when("/catalog/:productId", {
      templateUrl: "javascripts/templates/product.html",
      reloadOnSearch: false
    })
    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });
  }
]);


App.controller('ApplicationCtrl', function($scope, $location, $document){

  $scope.sidebarMenuIsOpen = false;
  $scope.OrderCallFormIsOpen = false;
  $scope.HeaderOrderCallFormIsOpen = false;

  $scope.orderCallData = {};

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.toggleOrderCallForm = function(){
    $scope.OrderCallFormIsOpen = $scope.OrderCallFormIsOpen ? false : true;
  };

  $scope.toggleHeaderOrderCallForm = function(){
    $scope.HeaderOrderCallFormIsOpen = $scope.HeaderOrderCallFormIsOpen ? false : true;
  };

  $scope.orderCall = function(){
    console.log($scope.orderCallData)
  };

  $scope.$on('$routeChangeStart', function() {
    if($location.path() == "/"){
      $scope.sidebarMenuIsOpen = true;
    }else{
      $scope.sidebarMenuIsOpen = false;
    }
  });

});

App.controller('CatalogCtrl', function($scope, $http, $location){

  $scope.carriageTypes = {
    0 : {
      'type': 'electric',
      'title': 'Электрические'
    },
    1 : {
      'type': 'mechanic',
      'title': 'Механические'
    }
  };

  $scope.carriageOptions = {
    'electric' : {
      0: 'Складные',
      1: 'Большой запас хода',
      2: 'Вертикализатор'
    },
    'mechanic' : {
      0: 'Домашние',
      1: 'Для улицы',
      2: 'Высокая спинка'
    }
  };

  $scope.sortType = [
    {
      'name': 'name',
      'title': 'По названию'
    },
    {
      'name': 'price',
      'title': 'По ценам'
    }
  ];

  $scope.carriageTypeSelected = 'mechanic';

  if($location.search().type) {
    $scope.carriageTypeSelected = $location.search().type;
  }

  $scope.activeOptionsFilter = [];

  $scope.productsList = [];

  $scope.getCarriageOptions = function(){
    $scope.carriageOptionsByType = $scope.carriageOptions[$scope.carriageTypeSelected];
  };

  $scope.getProducts = function(){
    var carriageType = $scope.carriageTypeSelected;
    $http.get('javascripts/factories/carriage/'+ carriageType +'.json')
      .success(function(data){
        $scope.productsList = data;
      }).error(function(){
        console.error('Произошла ошибка');
      });
  };

  $scope.getProducts();

  $scope.$on('$routeUpdate', function() {
    if($location.search().type) {
      $scope.carriageTypeSelected = $location.search().type;
      $scope.getProducts();
    }
  });

  $scope.getCarriageOptions();

  $scope.changeType = function(type){
    $scope.carriageTypeSelected = type;
    $scope.getCarriageOptions();
    $scope.activeOptionsFilter = [];
    $scope.getProducts();
  };

  $scope.filterOptions = function (filter_item) {
    var index = $scope.activeOptionsFilter.indexOf(filter_item);
    if (index > -1) {
      $scope.activeOptionsFilter.splice(index, 1);
    }else {
      $scope.activeOptionsFilter.push(filter_item);
    }
  };

});

App.controller('ProductCtrl', function($scope, $http, $location){

  $scope.productsItemData = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

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

    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

  $scope.recalcTotalPrice = function(){

    $scope.totalPrice = $scope.productsItemData.price;

    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
        $scope.totalPrice = $scope.totalPrice + $scope.functionsSelected[item].price;
      }
    }
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

});