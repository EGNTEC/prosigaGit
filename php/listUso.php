<?php
	//chama o arquivo de conexão com o bd
  require("session.php");
  include("conn.php");

  $regId = $_GET['regId'];
  $uniId = $_GET['uniId'];
  $niv   = $_SESSION['codniv'];
  $locAdd= $_GET['locAdd'];

  if($niv == 1){

      $queryString = "SELECT numcad,nomfun,numloc,numreg FROM tVTRHfunc WHERE numloc = $uniId order by nomfun";
  }else{
      $queryString = "SELECT numcad,nomfun,numloc,numreg FROM tVTRHfunc WHERE numloc = $uniId and codcar not in(7300,7500,6600,7800) order by nomfun";
  }

  if($locAdd != ""){

  	 $queryString = "SELECT numcad,nomfun,numloc,numreg From tVTRHfunc Where numreg = $regId And codcar = 6700 order by nomfun";

  }


  //var_dump($queryString);
	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar colabordores');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());

	while($uso = mssql_fetch_array($query)) {
	    $rows['data'][] = $uso;
	}

	//encoda para formato JSON
	echo json_encode($rows);

	//and codcar not in(7700,6600)
