<?php
	//chama o arquivo de conexão com o bd
        session_start();
        require("session.php");
	include("conn.php");
    	
	$queryString = "SELECT * FROM tPROSstts WHERE numsts in(0,1,2,3,4)";

	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar Situação');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());
	while($situ = mssql_fetch_array($query)) {
	    $rows['data'][] = $situ;
	}

	//encoda para formato JSON
	echo json_encode($rows);
