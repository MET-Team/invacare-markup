<?php
  require_once 'class.phpmailer.php';

  $messageType = $_GET['type'];
  $sendData = json_decode(stripslashes($_GET['sendData']));

  $userAgents = $_SERVER['HTTP_USER_AGENT'];
  $ipAddress = $_SERVER['REMOTE_ADDR'];

  function writesomething(){
    echo 123;
  };

  if($messageType == 'call'){
    $subject = 'Заявка на перезвон с сайта Invacare.com.ru';

    $name = $_GET['name'];
    $phone = $_GET['phone'];

    $mess = '';

    if(!empty($name)){
      $mess .= '<b>Имя:</b> '.$name;
    }

    $mess .= '<br /><b>Телефон:</b> '.$phone;
  }

  if($messageType == 'feedback'){
    $subject = 'Сообщение с сайта f43.met.ru';

    $email = $_GET['email'];
    $mess = '<b>E-mail:</b> '. $email;

    $mess .= '<br /><b>Сообщение:</b><br/> '. htmlspecialchars_decode($_GET['message']);
  }

  if($messageType == 'order'){
    $subject = 'Заказ с сайта Invacare.com.ru';

    $userInfo = '
      <b>имя</b> - '.$sendData->name.'<br />
      <b>телефон</b> - '.$sendData->phone.'<br />
      <b>e-mail</b> - '.$sendData->email.'<br /><br />
    ';

    $orderInfo = '
      <b>тип доставки</b> - '.$sendData->delivery->title.'<br />
      <b>тип оплаты</b> - '.$sendData->payment->title.'<br /><br />

      <b>заказ</b> - '.$sendData->product->name.'<br />
      <b>артикул</b> - '.$sendData->product->art.'<br />
      <b>стоимость</b> - '.$sendData->product->price.'<br />
    ';

    $mess .= $userInfo.$orderInfo;
  }

  if($messageType == 'registration'){
    $subject = 'Контакты с сайта Invacare.com.ru';

    $mess = '<b>Имя:</b> '.$sendData->name.'<br /><b>Почта:</b> '.$sendData->email.'<br /><b>Телефон:</b> '.$sendData->phone;
  }

  if($messageType == 'test-drive'){
    $subject = 'Заявка на тест-драйв с сайта Invacare.com.ru';

    $mess = '';
    if($sendData->name){
      $mess .= '<b>Имя:</b> '.$sendData->name.'<br />';
    }
  }

  $result = new stdClass();

  $mail = new PHPMailer();
  $mail->CharSet = 'utf-8';
  $mail->Subject = 'Test - '.$subject;
  $mail->FromName = 'info@invacare.com.ru';
  $mail->From = 'info@invacare.com.ru';
  $mail->AddAddress('info@invacare.com.ru');
  $mail->addBCC('tilvan@ya.ru');

  $mail->IsHTML(true);

  $mess .= '<br/><b>Client:</b> '. $ipAddress .' - '. $userAgents;
  $mail->Body = $mess;

  // отправляем наше письмо
  if(!$mail->Send()){
    $result->error = 'Mailer Error: '.$mail->ErrorInfo;
  }else{
    $result->success = array('success' => 'Сообщение отправлено');
  }

  /* отправляем письма пользователю */
  if($messageType == 'registration___'){
    $userMail = new PHPMailer();

    $userMail->CharSet = 'utf-8';
    $userMail->Subject = 'Оформление заказа на invacare.com.ru';
    $userMail->FromName = 'info@invacare.com.ru';
    $userMail->From = 'info@invacare.com.ru';
    $userMail->AddAddress($sendData->email);

    $userMail->IsHTML(true);

    $userMail->Body = '

      Здравствуйте, '. $sendData->name .'!<br/>

      Вы начали оформление покупки на сайте invacare.com.ru , в настаящий момент процедура не завершена.
      Чтобы продолжить, перейдите по <a href="http://invacare.com.ru/buy" target="_blank">ссылке</a>.
      Если у вас возникли какие-то вопросы по товарам или оформлению, наши менеджеры с удовольствием вам помогут!
      Звоните - 8 (495) 777-39-18.

      С наилучшими пожеланиями,
      компания МЕТ.
    ';

    $userMail->Send();
  }

  if($messageType == 'order'){
    $userMail = new PHPMailer();

    $userMail->CharSet = 'utf-8';
    $userMail->Subject = 'Заказ оформлен';
    $userMail->FromName = 'info@invacare.com.ru';
    $userMail->From = 'info@invacare.com.ru';
    $userMail->AddAddress($sendData->email);

    $userMail->IsHTML(true);

    $userMail->Body = '
        Здравствуйте, '. $sendData->name .'!<br/>
        Вы оформили покупку на сайте invacare.com.ru. Информация о заказае:<br/><br/>

        <b>Товар</b> - '. $sendData->product->name .'<br/>
        <b>Артикул</b> - '. $sendData->product->art .'<br/>
        <b>Стоимость</b> - '. $sendData->product->price .' руб.<br/><br/>

        Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.<br/><br/>

        Спасибо, что выбрали invacare.com.ru!<br/>
        С наилучшими пожеланиями,<br/>
        компания МЕТ.
      ';

    $userMail->Send();
  }

  echo json_encode($result);
  exit;