<?php
	session_start();
  require("session.php");
	include("conn.php");

  $niv      =   $_SESSION['codniv'];
	$regId    =   $_GET['regId'];

	$regIdLoc = $_SESSION['codreg'];

  if($niv==2){

		$queryString = " SELECT numreg,numloc,nomloc
											FROM tVTRHhior
											WHERE numloc NOT IN(SELECT numloc FROM tVTRHhior WHERE numloc=numreg)
											AND numreg = ". $regIdLoc."order by nomloc";
 	}
	else
	if($niv==1){

	 $queryString = " SELECT numreg,numloc,nomloc
                     FROM tVTRHhior
                     WHERE numloc NOT IN(SELECT numloc FROM tVTRHhior WHERE numloc=numreg)
                     AND numreg = ". $regId."order by nomloc";
   }else{

     $queryString = " SELECT numreg,numloc,nomloc
                     FROM tVTRHhior
                     WHERE numloc NOT IN(SELECT numloc FROM tVTRHhior WHERE numloc=numreg)
                     AND numloc = ". $regId."order by nomloc";

   }

    //var_dump($queryString);
	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar unidades');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());
	while($city = mssql_fetch_assoc($query)) {
	    $rows['data'][] = $city;
	}

	//encoda para formato JSON
	echo json_encode($rows);
