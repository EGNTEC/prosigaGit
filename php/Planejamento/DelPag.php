<?php
session_start();
//require("../session.php");
include("../conn.php");

$data = $_POST['data'];

$selec = json_decode($data);

foreach($selec as $key){

    $numlot = $key->numlot;

     $strCalcLot = "Select numcad From tPROSlote Where numlot ='$numlot'";
     $qryCalcLot = mssql_query($strCalcLot);

     while($arrCalcLot = mssql_fetch_array($qryCalcLot)) {

        $numcad = $arrCalcLot['numcad'];
        $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $numcad");
     }

     $String = "delete tproslote where numlot='$numlot'";
      //var_dump($String);
     $query = mssql_query($String) or die('Erro ao deletar registro.');
}

echo json_encode(0);
