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

appControllers.controller('ApplicationCtrl', ['$rootScope', '$scope', '$location', '$document', '$http', 'localStorageService', function($rootScope, $scope, $location, $document, $http, localStorageService){

  $scope.pageIsMain = false;
  $scope.pageIsInfo = false;

  $scope.enableCompareShortcut = true;

  $scope.orderTestDriveData = {};
  $scope.orderCallbackData = {};

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

  $scope.OrderCallbackFormIsOpen = false;
  $scope.toggleOrderCallbackForm = function(){
    $scope.OrderCallbackFormIsOpen = $scope.OrderCallbackFormIsOpen ? false : true;
    $scope.orderCallbackData = {};
    if($scope.OrderCallbackFormIsOpen){
      ga('send', 'event', 'callback', 'click', 'open callback form');
    }
  };

  $scope.orderCallback = function(){
    $scope.sendMail('callback', $scope.orderCallbackData);

    ga('send', 'event', 'callback', 'click', 'send callback form');

    $scope.toggleOrderCallbackForm();
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

  $scope.pagesMetaTags = [
    {
      url: '/',
      title: 'Инвалидные коляски Invacare Магазин инвалидных колясок',
      keywords: 'инвалидные коляски, купить инвалидную коляску, кресло коляска инвалидная, инвалидное кресло, invacare, коляски invacare, магазины инвалидных колясок, инвалидные коляски с электроприводом, активные инвалидные коляски,  инвалидное кресло купить, кресло коляска , инвалидная коляска, инвалидные кресла',
      description: 'Инвалидные коляски Invacare из Германии, США и Швеции. С ручным и электроприводом, вертикализаторы, коляски активного типа. Официальный магазин, гарантия до 3х лет. Бесплатная доставка по РФ. Запишитесь на бесплатный тест-драйв коляски!'
    },
    {
      url: '/delivery',
      title: 'Бесплатная доставка колясок Invacare по России',
      keywords: 'инвалидная коляска москва, инвалидная коляска, инвалидные коляски спб, магазины инвалидных колясок, купить инвалидную коляску в москве, инвалидные коляски минск, инвалидные коляски екатеринбург, инвалидные коляски челябинск, инвалидные коляски воронеж,  инвалидные кресла, invacare ',
      description: 'Бесплатная доставка инвалидных колясок Invacare по России. Официальный дилер Invacare в Москве, гарантия до 3-х лет! Инвалидные кресла из США, Германии и Швеции. Звоните +7-495-777-39-18. Запишитесь на бесплатный тест-драйв коляски!'
    },
    {
      url: '/payment',
      title: 'Купить инвалидную коляску с оплатой картой, наличными',
      keywords: 'купить инвалидную коляску, где купить инвалидную коляску, купить инвалидное кресло коляску, инвалидное кресло купить, купить коляску для инвалида, Invacare, магазины инвалидных колясок, продажа инвалидных колясок, инвалидная коляска москва, инвалидная коляска, инвалидное кресло, коляска для инвалида',
      description: 'Официальный магазин инвалидных колясок Invacare с любой формой оплаты. Инвалидные коляски с электроприводом и ручным приводом, активного типа. Гарантия до 3-х лет, бесплатная доставка по России'
    },
    {
      url: '/return_guarantee',
      title: 'Гарантия на инвалидные коляски Invacare 3 лет',
      keywords: 'инвалидное кресло, кресло коляска инвалидная, инвалидные коляски , Inavacare, инвалидная коляска москва, где купить инвалидную коляску, продажа инвалидных колясок, коляски Invacare, магазин инвалидных колясок, кресло коляска для инвалидов, инвалидные коляски сша, инвалидные коляски германия',
      description: 'Гарантия на инвалидные коляски Invacare до 3-х лет, официальный магазин, сертификаты. Инвалидные коляски в Москве от производителей Германии, США и Швеции. Все формы оплаты, бесплатная доставка по России.'
    },
    {
      url: '/faq',
      title: 'Вопросы продажи инвалидных колясок Invacare',
      keywords: 'инвалидные коляски, где купить инвалидную коляску, магазин инвалидных колясок, производство инвалидных колясок, где можно купить инвалидную коляску, производители инвалидных колясок, как выбрать инвалидную коляску, компенсация за инвалидную коляску, виды инвалидных колясок, модели инвалидных колясок, типы инвалидных колясок',
      description: 'Статьи о том как выбрать инвалидную коляску и получить компенсацию. Виды инвалидных колясок с описанием возможных функций. Каталог инвалидных колясок из Германии, США и Швеции.'
    },
    {
      url: '/about',
      title: 'Магазин инвалидных колясок Invacare',
      keywords: 'магазин инвалидных колясок, купить инвалидную коляску в москве, где купить инвалидную коляску, invacare, коляски invacare, инвалидные коляски сша, инвалидные коляски германия, производство инвалидных колясок, заказать инвалидную коляску, инвалидные коляски, купить инвалидную коляску',
      description: 'Магазин инвалидных колясок Invacare. Производство инвалидных колясок в Германии, США и Швеции. Официальный дилер в Москве, бесплатная доставка по России. Гарантия до 3-х лет, консультации по подбору. У нас вы можете купить инвалидную коляску в любой день!'
    },
    {
      url: '/contacts',
      title: 'Магазин инвалидных колясок Invacare',
      keywords: 'магазин инвалидных колясок, инвалидные коляски интернет магазин, где можно купить инвалидную коляску, invacare, где купить инвалидную коляску, купить инвалидную коляску в москве, инвалидная коляска москва, инвалидная коляска, инвалидные коляски спб, инвалидное кресло, коляски Invacare',
      description: 'Официальный дилер Invacare в Москве. Производство инвалидных колясок в Германии, США и Швеции. Инвалидные коляски Invacare с гарантией до 3 лет и бесплатной доставкой по России. Консультации по подбору. У нас вы можете купить инвалидную коляску в любой день!'
    },
    {
      url: '/info',
      title: 'Типы инвалидных колясок',
      keywords: 'инвалидные коляски, где купить инвалидную коляску, магазин инвалидных колясок, производство инвалидных колясок, где можно купить инвалидную коляску, производители инвалидных колясок, как выбрать инвалидную коляску, компенсация за инвалидную коляску, виды инвалидных колясок, модели инвалидных колясок, типы инвалидных колясок',
      description: 'Советы по выбору инвалидных колясок. Компенсация за инвалидную коляску в рамках ИПР. Законодательство и описание видов инвалидных колясок. Запишитесь на бесплатный тест-драйв кресла-коляски!'
    },
    {
      url: '/catalog/mechanic',
      title: 'Инвалидные коляски с ручным приводом',
      keywords: 'инвалидная коляска ручная, кресло коляска с ручным приводом, инвалидные коляски, инвалидные каталки, каталка для инвалидов, invacare, коляски invacare, инвалидная коляска с ручным приводом, механическая инвалидная коляска, инвалидная коляска с ручным приводом, инвалидные коляски для дцп, кресло коляска для больных дцп',
      description: 'Инвалидные коляски с ручным приводом Invacare. Производство Германия, США и Швеция. Официальный магазин инвалидных колясок Invacare в Москве, гарантия до 3 лет. Бесплатная доставка по России, консультации по подбору. Запишитесь на бесплатный тест-драйв!'
    },
    {
      url: '/catalog/electric',
      title: 'Инвалидные коляски с электроприводом',
      keywords: 'инвалидные коляски с электроприводом, инвалидные коляски с электроприводом цена, электрические инвалидные коляски, инвалидная коляска с приводом, инвалидное кресло с электроприводом, кресло коляска с электроприводом, кресло коляска электрическая, купить инвалидную коляску с электроприводом, invacare, коляски invacare',
      description: 'Инвалидные коляски с электроприводом Invacare. Произведено в Германии, США и Швеции. Официальный дилер Invacare в Москве, бесплатная доставка по России. Гарантия, сертификаты. Запишитесь на бесплатный тест-драйв!'
    },
    {
      url: '/catalog/active',
      title: 'Активные инвалидные коляски',
      keywords: 'активные инвалидные коляски, активная кресло коляска, инвалидная коляска активного типа, инвалидные спортивные коляски, купить активную инвалидную коляску, облегченные инвалидные коляски, узкие инвалидные коляски, инвалидная коляска активного типа купить, invacare, коляски invacare, кресло коляска активного типа, активные коляски для инвалидов',
      description: 'Активные инвалидные коляски Invacare для занятий спортом, танцами и активного образа жизни. Произведены в Германии, США и Швеции. Официальный дилер Invacare в Москве, доставка по России бесплатная. Запишитесь на тест-драйв'
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

  $scope.$on('$routeChangeSuccess', function() {

    //проверка $location.path() и вывод мета-тегов при совпадении
    var currentPage = null;
    for(index in $scope.pagesMetaTags){
      if($scope.pagesMetaTags.hasOwnProperty(index)){
        if($scope.pagesMetaTags[index].url == $location.path()){
          currentPage = $scope.pagesMetaTags[index];
        }
      }
    }

    if($location.path() == "/"){
      currentPage = $scope.pagesMetaTags[0];
    }

    if(currentPage){
      $rootScope.metaTags.pageTitle = currentPage.title;
      $rootScope.metaTags.pageKeyWords = currentPage.keywords;
      $rootScope.metaTags.pageDescription = currentPage.description;
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

  $scope.carriageTypeIdToCaption = {
    6: 'active',
    1: 'mechanic',
    2: 'electric'
  };

  $scope.searchString = $location.search().query;

  $scope.searchProducts = function(){
    if($scope.searchString){
      $http.get($rootScope.domain +'/api/v1/sites/4/products', {
        params: {
          name_cont: $scope.searchString
        }
      }).success(function(data){
        $scope.productsList = data;

        if($scope.productsList.length > 0){
          for(index in $scope.productsList){
            $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productsList[index].id)
              .success(function(data){
                if(data){
                  $scope.productsList[index].type = $scope.carriageTypeIdToCaption[data.kind_id];
                }
              }).error(function(){
                console.error('Произошла ошибка');
              });
          }
        }
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