<?php

  function signMessage($message, $secretPhrase){
    $message = $message.$secretPhrase;
    $result = md5($message).sha1($message);
    for ($i = 0; $i < 1102; $i++) {
      $result = md5($result);
    }
    return $result;
  }