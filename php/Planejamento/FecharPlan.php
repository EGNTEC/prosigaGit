<?php
session_start();
require("../session.php");
include("../conn.php");

$idAbr  =$_POST['numseq'];
$mat    =$_SESSION['matricula'];

$txtQuery ="SELECT matfun FROM tPROSabpl where numseq = '$idAbr'";
//var_dump($txtQuery);
$strQuery = mssql_query($txtQuery);
$strArray = mssql_fetch_array($strQuery);
$col = $strArray['matfun'];

$txtUpdt   ="UPDATE tPROSabpl SET stspla=1 WHERE numseq = '$idAbr' ";
//var_dump($txtUpdt);
$queryUpdt =mssql_query($txtUpdt);

$txtSldo   ="Exec dbo.pr_calcular_saldo $col";
//var_dump($txtSldo);
$prSldo    =mssql_query($txtSldo);

$stringSitpla = mssql_query("Select dbo.fn_Consultar_Situacao ($col) as situacao");


if($queryUpdt){

   echo json_encode(0);
}else{

   echo json_encode(1);

}
