<?php
  $serv ="server";
  $us="Prossiga";
  $pass="*********";
  $sqlconnect=mssql_connect($serv, $us, $pass);
  $sqldb=mssql_select_db("Prossiga",$sqlconnect) or die('Erro no Banco');

  
  