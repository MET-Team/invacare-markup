angular.module('catalogCtrl', []).controller('CatalogCtrl', function($rootScope, $scope, $http, $location){

  $scope.isoOptions = {
    layoutMode: 'fitRows'
  };

  $scope.carriageTypes = [
    {
      'type': 'electric',
      'title': 'Электрические'
    },
    {
      'type': 'mechanic',
      'title': 'Механические'
    },
    {
      'type': 'active',
      'title': 'Активные'
    }
  ];

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

  $scope.getCarriageOptions = function(){
    $scope.carriageOptionsByType = $scope.carriageOptions[$scope.carriageTypeSelected];
  };

  $scope.getProducts = function(){
    var carriageType = $scope.carriageTypeSelected;

    $http.get($rootScope.domain +'/api/v1/products')
      .success(function(data){
        $scope.productsList = data;

//        for(item in $scope.productsList){
//          var productItem = $scope.productsList[item];
//
//          productItem.visible = true;
//
//          if(productItem.options.length > 0 && $scope.activeOptionsFilter.length > 0){
//            productItem.visible = false;
//
//            for(option in productItem.options){
//              if($scope.activeOptionsFilter.indexOf(productItem.options[option]) > -1){
//                productItem.visible = true;
//              }
//            }
//          }
//        }
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

    $scope.getProducts();

  };

  $scope.priceOrderProperty = 'price';

  $scope.togglePriceOrderProperty = function(){
    $scope.priceOrderProperty = $scope.priceOrderProperty == 'price' ? '-price' : 'price';
    $scope.getProducts();
  };

});