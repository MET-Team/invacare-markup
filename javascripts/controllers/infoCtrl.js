angular.module('infoCtrl', []).controller('InfoCtrl', function($scope, $http, $document, $window, $templateCache, $sce, $location){

  $scope.sidebarDefaults = function(){
    $scope.menuItemIsOpen = false;
    $scope.menuItem = undefined;

    $scope.sidebarTitle = "";
    $scope.sidebarTitle = "";
  };

  $scope.sidebarIco = {
    img: 'images/ico_default.png'
  };

  $scope.sidebarDefaults();

  $scope.mainMenu = [
    {
      id: 1,
      'title' : 'Оформление ИПР',
      'summary' : 'Подробная информация о возврате денег за вашу покупку'
    },
    {
      id: 2,
      'title' : 'Как подобрать кресло-коляску',
      'summary' : 'Узнайте, как пользоваться нашими крутыми колясками'
    },
    {
      id: 3,
      'title' : 'История компании Invacare',
      'summary' : 'Как это делают миллионы инвалидов по всему миру'
    }
  ];

  $scope.openMenuItem = function(index){

////    $scope.sidebarIco.class = 'scaleDown';
//
//    setTimeout(function(){
//      $scope.$apply(function(){
////        $scope.sidebarIco = {
////          img: 'images/ico_opened.png'
////        };
//
//      });
//    }, 150);

    $scope.menuItemIsOpen = true;

    $scope.menuItem = $scope.mainMenu[index];
    $http.get('javascripts/templates/info/'+ $scope.mainMenu[index].id +'.html', {cache: $templateCache}).success(function(data){
      $scope.menuItem.content = $sce.trustAsHtml(data);
    });

    $location.search('part', $scope.mainMenu[index].id);

////    setTimeout(function(){
////      $scope.$apply(function(){
////        $scope.sidebarIco.class = 'scaleUp';
////      });
////    }, 150);

    $scope.sidebarTitle = $scope.menuItem.title;

    $document.on('keyup', function(e){
      if(e.keyCode == 27 && $scope.menuItemIsOpen == true){
        $scope.$apply(function(){
          $scope.closeMenuItem();
        });
      }
    });
  };

  var partId = $location.search().part;
  if(partId){
    for(var index in $scope.mainMenu){
      if($scope.mainMenu[index].id == partId){
        $scope.openMenuItem(index);
      }
    }
  }

  $scope.closeMenuItem = function(){
//    $scope.sidebarIco.class = 'scaleDown';
//
//    setTimeout(function () {
//      $scope.$apply(function () {
//        $scope.sidebarIco = {
//          img: 'images/ico_default.png',
//          class: 'scaleUp'
//        };
//
//      });
//    }, 150);

    $scope.sidebarDefaults();

    $location.search('part', null);
  };

  $scope.closeMenuItemByImage = function(){
    if($scope.menuItemIsOpen){
      $scope.closeMenuItem();
    }
  };

});