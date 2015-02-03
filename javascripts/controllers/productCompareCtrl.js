angular.module('productCompareCtrl', [])
.controller('productCompareCtrl', function($scope, $rootScope, $location, localStorageService){

  $scope.comparedProducts = localStorageService.get('comparedProducts');

  $scope.compareList = [];

  var compareListExists = function(characterItem){
    for(var index in $scope.compareList){
      var listItem = $scope.compareList[index];

      if(listItem.title == characterItem.name){
        return listItem;
      }
    }
    return false;
  };

  if($scope.comparedProducts.length > 0){
    for(var comparedItem in $scope.comparedProducts){
      var characters = $scope.comparedProducts[comparedItem].characters;

      for(var characterIndex in characters){
        var characterItem = characters[characterIndex],
            compareListItem = {
              title: characterItem.name,
              list: []
            };

        for(var characterIndexInner in $scope.comparedProducts){
          compareListItem.list[characterIndexInner] = {
            value: '&mdash;'
          };
        }

        var existedItem = compareListExists(characterItem);

        if($scope.compareList.length && existedItem){
          existedItem.list[comparedItem].value = characterItem.value;
        }else{
          compareListItem.list[comparedItem].value = characterItem.value;
          $scope.compareList.push(compareListItem);
        }
      }
    }
  }

  $scope.clearCompare = function(){
    $rootScope.comparedProducts = [];
    localStorageService.set('comparedProducts', $rootScope.comparedProducts);

    $location.path("/catalog");
  };
});
