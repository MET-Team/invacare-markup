<?php

  require_once 'common.php';

  $partnerId = '1-178YO4Z';
  $secretPhrase = '321ewq';

  $orderNumber = $_GET['orderNumber'];
  $product = json_decode(stripslashes($_GET['product']));

  $order = array(
    'items' => array(
      0 => array(
        'title' => $product->name,
        'category' => '',
        'qty' => 1,
        'price' => $product->price
      ),

    ),
    'details' => array(
      'firstname' => '',
      'lastname' => '',
      'middlename' => '',
      'email' => '',
      'cellphone' => '',
    ),
    'partnerId' => $partnerId,
    'partnerOrderId' => $orderNumber,
    'deliveryType' => ''
  );

  /* Получение base64-строки из массива заказа */
  $json = json_encode($order);
  $base64 = base64_encode($json);

  /* Получение подписи сообщения */
  $sig = signMessage($base64, $secretPhrase);

  $result = array(
    'order' => $base64,
    'sig' => $sig
  );

  echo json_encode($result);
  exit;