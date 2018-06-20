<?php
	//chama o arquivo de conexão com o bd
session_start();
require("../session.php");
include("../conn.php");
    	
	$queryString = "SELECT * FROM tPROStpev";

	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar evento');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());
	while($evento = mssql_fetch_array($query)) {
	    $rows['data'][] = $evento;
	}

	//encoda para formato JSON
	echo json_encode($rows);
