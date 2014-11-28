<?php
  require_once('./application.php');

  var_dump($_POST);
  exit;

  $postRequest = json_decode($_POST, true);

  $requestType = $postRequest->type;

  if($requestType == 'save'){
    $user = $postRequest->userData;

    $query = "
      INSERT INTO users
        (name, user_id, email, data)
      VALUES
        ($user->name, $user->id, $user->email, $user)
    ";

    mysql_query($query) or (die(mysql_error()));
  }