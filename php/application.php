<?php
  $dblocation = "localhost";
  $dbname = "invacare_db";
  $dbuser = "root";
  $dbpasswd = "";

  $db_connect = @mysql_connect($dblocation, $dbuser, $dbpasswd);
  if(! @mysql_select_db($dbname, $db_connect)){
    exit("<P>В настоящий момент база данных не доступна.</P>");
  }