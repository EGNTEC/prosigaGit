<?php
session_start();
require("session.php");
include("conn.php");

$dataHj=date('Y-m-d');
$mesH = date('m');

$strQuery = "SELECT vlrprm FROM tPROSparm WHERE numprm=6";

$query =mssql_query($strQuery);

$array =mssql_fetch_array($query);

$dataPar = $array['vlrprm'];

$quebraData = explode('-',$dataPar);  
$mesPar = $quebraData[1];
//echo $mesH;
//echo $mesPar;

if((strtotime($dataHj) >= strtotime($dataPar)) and ($mesPar == $mesH) ){

   echo json_encode(0); //abrir tela.
}else{

   echo json_encode(1); //não abrir.
}



