<?php
session_start();
require("session.php");
include("conn.php");

$mat= $_SESSION['matricula'];

#$saldo = mssql_query("Select dbo.fn_calcular_saldo ($mat) as saldo") or die('Erro ao carregar o saldo');
$situacao = mssql_query("Select dbo.fn_Consultar_Situacao ($mat) as situacao") or die('Erro ao carregar o status');

//$rows = array('data' => array());
$situ = mssql_fetch_array($situacao);
$rows = $situ['situacao'];
//$rows['data'][] = $situ;
	

//encoda para formato JSON
echo json_encode($rows);

