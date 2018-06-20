<?php
session_start();
require("../session.php");

$mes = date('m');
$ano = date('Y');

$mesProx = $mes + 1; 

if($mesProx == 13){

   $mesProx = 01;   
}

$ref = $mes.'/'. $ano;
$proxRef = $mesProx.'/'$ano; 

$arrayRef = array('ref' => $ref,'ref' => $proxRef); 

$rows = array('data' => array());

 while($uso = mssql_fetch_array($arrayRef)) {
	$rows['data'][] = $uso;
 }

echo json_encode($rows);
