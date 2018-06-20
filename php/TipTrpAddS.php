<?php
	//chama o arquivo de conexão com o bd
    session_start();
    require("session.php");
	include("conn.php");
    
    $tiptrp = $_GET['tiptra'];

    if($tiptrp==1){//Quando Próprio a combo carrega coletivo e outros

       $queryString = "SELECT * FROM tPROStptr WHERE tiptrp in(2,3)";   

    }else{//Quando coletivo a combo carrega Próprio e outros 

       $queryString = "SELECT * FROM tPROStptr WHERE tiptrp in(1,3)";

    }	

	//consulta sql
	$query = mssql_query($queryString) or die('Erro ao filtrar Transporte');

	//faz um looping e cria um array com os campos da consulta
	$rows = array('data' => array());
	while($trans = mssql_fetch_array($query)) {
	    $rows['data'][] = $trans;
	}

	//encoda para formato JSON
	echo json_encode($rows);
