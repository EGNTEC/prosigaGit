<?php
  $serv ="server"; #informar o servidor de banco
  $us	="Prossiga";  
  $pass	="*********"; #informar a senha
  $sqlconnect=mssql_connect($serv, $us, $pass);
  $sqldb=mssql_select_db("Prossiga",$sqlconnect) or die('Erro no Banco');

  
  