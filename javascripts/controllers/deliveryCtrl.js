angular.module('DeliveryCtrl', []).controller('DeliveryCtrl', function($scope, $filter){

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

  $scope.cityList = [];

  $('#recommended .column li a').each(function(i){
    var cityItem = {
      id: i+1,
      value: $(this).html()
    };

    $scope.cityList.push(cityItem);
  });

  $scope.cityListResult = $scope.cityList;

  $scope.deliveryEnabled = false;
  $scope.deliveryCitySelected = false;

  $scope.SearchListIsOpen = false;
  $scope.toggleSearchList = function(){
    $scope.SearchListIsOpen = $scope.SearchListIsOpen ? false : true;
  };

  $scope.deliveryCity = '';

  $scope.selectDeliveryCity = function(item){
    $scope.deliveryCity = item.value;
    $scope.deliveryCitySelected = true;
    $scope.deliveryEnabled = true;

    $scope.toggleSearchList();
  };

  $scope.searchDeliveryCity = function(){
    if($scope.deliveryCity == ''){
      $scope.deliveryCitySelected = false;
    }else{

      $scope.cityListResult = $filter('filter')($scope.cityList, $scope.deliveryCity);

      if($scope.cityListResult.length == 0){
        $scope.deliveryCitySelected = true;
        $scope.deliveryEnabled = false;

        $scope.cityListResult = $scope.cityList;
      }else{
        $scope.SearchListIsOpen = true;
      }
    }
  };

});