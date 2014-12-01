angular.module('productCtrl', [
  'spritespin-ng',
  'angular-object2vr'
])
.controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location, $routeParams, $rootScope){

  $scope.productId = $routeParams.productId;

  $scope.product = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

  $scope.optionsCountLabel = '';

  $scope.carriageTypeIdToCaption = {
    6: 'active',
    1: 'mechanic',
    2: 'electric'
  };

  $rootScope.comparedProducts = $rootScope.comparedProducts || [];

  $scope.compareDisabled = false;
  $scope.compareTechSpecs = [];

  $scope.photoMoreVisible = false;
  $scope.charactersMoreVisible = false;

  $scope.comparedProductsExists = function(product){
    if($scope.compareDisabled){
      return true;
    }

    for(item in $rootScope.comparedProducts){
      if($rootScope.comparedProducts.hasOwnProperty(item)) {
        if ($rootScope.comparedProducts[item].id == product.id) {
          return true;
        }
      }
    }
    return false;
  };

  $scope.recalcTotalPrice = function(){

    $scope.totalPrice = $scope.product.price;

    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
        $scope.totalPrice = $scope.totalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.optionsCountLabel = $filter('declOfNum')($scope.functionsSelected.length, ['опция', 'опции', 'опций']);

  };

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId)
    .success(function(data){
      $scope.product = data;
      $scope.totalPrice = $scope.product.price;
      $scope.recalcTotalPrice();

      $scope.compareDisabled = $scope.comparedProductsExists($scope.product);

      if($rootScope.comparedProducts.length == 2){
        $scope.compareDisabled = true;
      }

      $scope.threedConfig = {
        input: {
          width: 506,
          height: 506,
          columns: 16,
          rows: 6,
          states: 1,
          fileextension: 'jpg',
          images: $scope.product.images
//          imagepath: "http://fast.met.ru/3dnew/images/1254"
        },
        control: {
          wrapx: "1",
          wrapy: "0",
          revx: "0",
          revy: "0",
          swapxy: "0",
          controller: "1",
          sensitivity: "10",
          lockedmouse: "0",
          lockedkeyboard: "1",
          lockedwheel: "1",
          invertwheel: "0",
          speedwheel: "0.05",
          dblclickfullscreen: "1",
          automovemode: "1"
        },
        view: {
          start: {
            column: 14,
            row: 4,
            state: 0
          },
          zoom: {
            min: "1",
            default: "1",
            max: "2",
            centerx: "0",
            centery: "0"
          },
          viewer: {
            background: 1,
            backgroundcolor: "0xffffff",
            imagescaling: 1
          }
        },
        autorotate: {
          speed: 0.05,
          start: 0,
          delay: 5
        }
      };
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/tech_specs')
    .success(function(data){
      if(data.length) {
        $scope.characters = data;
        $scope.compareTechSpecs = data;
      }else{
        $scope.compareDisabled = true;
      }
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/features')
    .success(function(data){
      $scope.components = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/photo_elements')
    .success(function(data){
      $scope.photo_elements = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/transformations')
    .success(function(data){
      $scope.transformations = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/ad_blocks')
    .success(function(data){
      $scope.ad_blocks = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

  $scope.configureOptions = null;

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

  $scope.buyProduct = function(){
    var productToBuy = {
      id: $scope.product.id,
      name: $scope.product.name,
      art: $scope.product.art,
      price: $scope.product.price,
      photo: $scope.product.photo
    };

    localStorageService.set('productToBuy', productToBuy);
    $location.path('/buy');
  };

  $scope.compareProduct = function(product){
    if(!$scope.compareDisabled){
      if(!$scope.comparedProductsExists(product)){
        if($scope.compareTechSpecs && $scope.compareTechSpecs.length) {
          product.characters = $scope.compareTechSpecs;
          $scope.compareTechSpecs = [];

          $rootScope.comparedProducts.push(product);
          $scope.compareDisabled = true;
        }
      }
      localStorageService.set('comparedProducts', $rootScope.comparedProducts);
    }
  };

  $scope.viewItems = ['360&deg;', '3D'];
  $scope.viewItemSelected = 0;
  $scope.hintEnabled = false;

  $scope.changeView = function(index){
    $scope.viewItemSelected = index;
    $scope.hintEnabled = $scope.viewItemSelected == 1 ? true : false;
  };

  $scope.continueView = function(){
    $scope.hintEnabled = false;
  };

  $scope.transformationsSpinConfig = {
    disableAnimation: true
  };

  $scope.spinObj = {
    spinReady: false
  };

  $scope.togglePhotoMoreVisible = function(){
    $scope.photoMoreVisible = $scope.photoMoreVisible ? false : true;
  };

  $scope.toggleCharactersMoreVisible = function(){
    $scope.charactersMoreVisible = $scope.charactersMoreVisible ? false : true;
  };

});
