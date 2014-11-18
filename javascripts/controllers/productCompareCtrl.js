angular.module('productCompareCtrl', [])
.controller('productCompareCtrl', function($scope, $rootScope, $location, localStorageService){

  $scope.comparedProducts = localStorageService.get('comparedProducts');

  $scope.compareList = [];

  var compareListExists = function(characterItem){
    for(var index in $scope.compareList){
      var listItem = $scope.compareList[index];

      if(listItem.title == characterItem.name){
        return true;
      }
    }
    return false;
  };

  if($scope.comparedProducts.length > 0){

    for(var comparedItem in $scope.comparedProducts){
      var characters = $scope.comparedProducts[comparedItem].characters;
      var compareListItem = {
        list: []
      };

      compareListItem.list.push({
        value: ''
      });

      for(var characterIndex in characters){
        var characterItem = characters[characterIndex];

        if($scope.compareList.length && compareListExists(characterItem)){
          for(var index in $scope.compareList){
            var listItem = $scope.compareList[index];

            if(listItem.title == characterItem.name){
              listItem.list[comparedItem] = {
                value: characterItem.value
              };
            }
          }
        }else{
          var compareListItem = {
            title: characterItem.name,
            list: []
          };

          compareListItem.list[comparedItem] = {
            value: characterItem.value
          };

          $scope.compareList.push(compareListItem);
        }
      }

    }
  }

  console.log($scope.compareList);

  $scope.clearCompare = function(){
    $rootScope.comparedProducts = [];
    localStorageService.set('comparedProducts', $rootScope.comparedProducts);

    $location.path("/catalog");
  };
});
