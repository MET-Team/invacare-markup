<?php
  require_once('class.phpmailer.php');

  $messageType = $_GET['type'];

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
    
    $name = $_GET['name'];
    $phone = $_GET['phone'];
    $address = $_GET['address'];
    $comment = $_GET['comment'];

    $bed = $_GET['bed'];

    $mess = '<b>Имя:</b> '.$name.'<br /><b>Телефон:</b> '.$phone;
    if(!empty($address)){
      $mess .= '<br /><b>Адрес:</b> '.$address;
    }

    $mess .= '<br /><b>Кровать:</b> '.$bed;

    if(!empty($comment)){
      $mess .= '<br /><b>Комментарий:</b> '.htmlspecialchars_decode($comment);
    }
  }

  if($messageType == 'registration'){
    $subject = 'Контакты с сайта Invacare.com.ru';

    $name = $_GET['name'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];

    $mess = '<b>Имя:</b> '.$name.'<br /><b>Почта:</b> '.$email.'<br /><b>Телефон:</b> '.$phone;
  }

  $result = new stdClass();

    $mail = new PHPMailer();
    $mail->CharSet = 'utf-8';
    $mail->Subject = $subject;
    $mail->FromName = 'met@met.ru';
    $mail->From = 'met@met.ru';
//    $mail->AddAddress('met@met.ru');
    $mail->AddAddress('tilvan@ya.ru');

    $mail->IsHTML(true);
    $mail->Body = $mess;
    // отправляем наше письмо
    if (!$mail->Send()){
        $result->error = 'Mailer Error: '.$mail->ErrorInfo;
    }

    if(!$result->error){
      $result->success = array('success' => 'Сообщение отправлено');
    }

    echo json_encode($result);
    exit;