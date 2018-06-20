<?php
session_start();
require("../session.php");
include("../conn.php");

$seqpla = $_GET['numseq'];

$tiptrp = $_GET['tiptrp'];

if($tiptrp==1){

  $queryString = "SELECT numseq,Convert (Varchar(10),datdes, 103) AS datdes,qtdcli,qtdkm,vlrdes,destra 
     FROM tPROSplde WHERE seqpla = '$seqpla' ORDER BY datdes";
}else{   

 $queryString= "SELECT numseq,Convert (Varchar(10),datdes, 103) AS datdes,qtdcli,qtdkm,vlrdes,destra,valpass 
   FROM tPROSplde 
 WHERE seqpla = '$seqpla'"; 
}
//sum(vlrdes / qtdkm) AS valpass,  group by numseq,datdes,qtdcli,qtdkm,vlrdes,destra

//consulta sql

$query = mssql_query($queryString) or die('Erro ao filtrar planejamentos');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($cadplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $cadplan;
}

//encoda para formato JSON
echo json_encode($rows);
