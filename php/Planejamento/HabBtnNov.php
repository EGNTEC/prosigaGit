<?php
session_start();
require("../session.php");
include("../conn.php");

$niv = $_SESSION['codniv'];
$dataHj=date('Y-m-d');

if($niv == 4){

   $col = $_SESSION['matricula'];

}else{

   $col = $_GET['mat'];
}

//Tratamento para pegar colaborador demitido
$strDem   = "SELECT sitafa FROM tVTRHfunc WHERE numcad = $col";
$queryDem = mssql_query($strDem);
$arrayDem = mssql_fetch_array($queryDem);
$sitafa   = $arrayDem['sitafa'];
//Tratamento para encerramentos dos depósitos.

$strQuery = "SELECT vlrprm FROM tPROSparm WHERE numprm=6";

$query =mssql_query($strQuery);

$array =mssql_fetch_array($query);

$dataPar = $array['vlrprm'];

 $queryAbpr = mssql_query("Select Count(1) As result
From   tPROSabpl abpl
Where  abpl.matfun = $col
And          (
                 (abpl.stspla <> 4)
             Or  (Exists (Select 1 From tPROSabpr abpr
                                 Where  abpr.matfun = abpl.matfun
                                 And    abpr.stspre <> 4))
             )") or die('erro na consulta planejamento');

 #$rowAbpr = mssql_num_rows($queryAbpr);
 $rowAbpr = mssql_fetch_array($queryAbpr);
 $result  = $rowAbpr['result'];
//habilita - 0
//Não habilita - 1

 #echo $dataHj;
 echo  $result;

//if( ( (strtotime($dataHj) >= strtotime($dataPar)) && $result==1) || $sitafa<>1 ){
//if ( (strtotime($dataHj) >= strtotime($dataPar) && $result==0 ) || ( (strtotime($dataHj) < strtotime($dataPar) ) && $result==1 ) ){
if($result==0){
    echo json_encode(1);//Habilita

} else{

   echo json_encode(0);//não habilita
}
