<?php
  function signMessage($message, $secretPhrase){
    $message = $message.$secretPhrase;
    $result = md5($message).sha1($message);
    for ($i = 0; $i < 1102; $i++) {
      $result = md5($result);
    }
    return $result;
  }

  $productId = $_GET['product_id'];
  $submit_url = "http://white-m.ru/api/v1/products/".$productId;

//  $ch = curl_init();
//  curl_setopt($ch, CURLOPT_URL, $submit_url);
//  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//  $server_output = curl_exec($ch);
  $server_output = file_get_contents($submit_url);
  $product = json_decode($server_output);

  $partnerId = '1-178YO4Z';
  $secretPhrase = '321ewq';

  $date = new DateTime();
  $orderNumber = $date->getTimestamp();

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
?>

<!DOCTYPE html>
<html>
	<head>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
		<title>КупиВкредит</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://kupivkredit-test-fe.tcsbank.ru/widget/vkredit.js"></script>

		<script>
			$(function(){

        var callback_close = function(decision) {
          var result = '';
          switch(decision) {
            case 'ver':
              result = 'Ваша заявка предварительно одобрена.';
              break;
            case 'agr':
              result = 'Ваша заявка одобрена! Поздравляем!';
              break;
            case 'rej':
              result = 'К сожалению, заявка отклонена банком.';
              break;
            case '':
              result = 'Вы не заполнили заявку до конца';
              break;
            default:
              //result = 'Ваша заявка находится на рассмотрении';
              break;
          }

          console.log(result);

          window.close();
        };

        var callback_decision = function(decision) {
          console.log('Пришел статус: ' + decision);
        };

        var callback_before_close = function(wantClose) {
          console.log('Клиент нажал крестик, потом (1-Да, 0-Нет): ' + wantClose);
        };

        var callback_form_complete = function(value) {
          console.log('Клиент заполнил форму');
        };

        var callback_accept = function(value) {
          console.log('Клиент принял решение по заявке: ' + value);
        };

				vkredit = new VkreditWidget(1,/*цвет кнопки*/ 155555, /*цена в месяц*/  {
					order: "<?php echo($base64); ?>",
					sig: "<?php echo($sig); ?>",

					onClose: callback_close,
					onDecision: callback_decision,
					onBeforeClose: callback_before_close,
					onFormComplete: callback_form_complete,
					onAccept: callback_accept
				});
		});

    setTimeout(function(){
      vkredit.openWidget();
    }, 1000);
  </script>
</head>

<body>
	
</body>	
</html>
