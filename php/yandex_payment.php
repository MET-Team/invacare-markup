<?php

  require_once 'yandexAPI/lib/api.php';
  require_once 'yandexAPI/lib/external_payment.php';

  use \YandexMoney\API;

  $redirect_uri = 'http://invacare.itilikin.ru/yandex_payment';
  $client_id = 'F670019BAC2346DF155BBDAA27B7914202884B01A5AB66E1ED7D0DB0F96B7876';
  $scope = array();

  $auth_url = API::buildObtainTokenUrl($client_id, $redirect_uri, $scope);

  var_dump($auth_url);
  exit;