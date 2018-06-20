<?php
session_start();
require("session.php");
include("conn.php");


$descTrp = $_POST['tipTrp'];
$data =  $_POST['data'];
$seqpre =  $_POST['seqpre'];

if($descTrp=="Proprio"){

   $idTrp = 1;
}else{

   $idTrp = 2;
}

$strExist = "SELECT * FROM tPROSprde WHERE datpre='$data' AND seqpre=$seqpre AND tiptrp=$idTrp";
  //var_dump($strExist);
$Exist = mssql_query($strExist) or die('Erro no select.');

$arrayExt = mssql_num_rows($Exist);
$arrayVar = mssql_fetch_array($Exist);
$tiptrp   = $arrayVar['tiptrp'];


//encoda para formato JSON
if($arrayExt > 0){
  
    echo json_encode(0); //existe dia cadastrado. 
}else{
    echo json_encode(1); //não existe dia cadastrado.
}


