<?php
	//chama o arquivo de conexão com o bd
    session_start();
    require("session.php");
	include("conn.php");
    	
	$queryString = "SELECT * FROM tPROStptr WHERE tiptrp in(1,2)";

	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar Transporte');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());
	while($trans = mssql_fetch_array($query)) {
	    $rows['data'][] = $trans;
	}

	//encoda para formato JSON
	echo json_encode($rows);
