<?php
session_start();
require("../session.php");
include("../conn.php");
include("../Funcoes/function.php");

$numseq = $_POST['id'];
$just   = $_POST['just'];

//Função para edição do trajeto.
 $just = editTrajeto($just);


if($just==""){

  $result=1;
}else{

  $result=0;

  $queryUpdt="UPDATE tPROSabpr set juspre='$just',stspre=1 WHERE numseq=$numseq ";

  $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');

}

echo json_encode($result);
