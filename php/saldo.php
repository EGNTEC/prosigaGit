<?php
session_start();
require("session.php");
include("conn.php");

$mat= $_SESSION['matricula'];

#$saldo = mssql_query("Select dbo.fn_calcular_saldo ($mat) as saldo") or die('Erro ao carregar o saldo');
$saldo = mssql_query("select dbo.fn_buscar_saldo ($mat) as saldo") or die('Erro ao carregar o saldo');

//$rows = array('data' => array());
$sald = mssql_fetch_array($saldo);
$rows = $sald['saldo'];
	

//encoda para formato JSON
echo json_encode($rows);
