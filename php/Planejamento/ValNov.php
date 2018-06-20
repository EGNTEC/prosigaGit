<?php
session_start();
require("../session.php");
include("../conn.php");

$niv = $_SESSION['codniv'];
$dataHj=date('Y-m-d');

if($niv == 4){

   $col = $_SESSION['matricula'];

}else{

   $col = $_POST['mat'];
}

//Tratamento coordenador cadastrando o seu planejamento.
$ResgMat = "SELECT numcad From tVTRHfunc Where nomfun='$col'";
#var_dump($ResgMat);
$qryResgMat = mssql_query($ResgMat);
$rowResgMat = mssql_num_rows($qryResgMat);
$arrResgMat = mssql_fetch_array($qryResgMat);
$mat = $arrResgMat['numcad'];

if($rowResgMat > 0){

    $col = $mat;

}
#Fim do tratamento

//Tratamento para resgatar afastamentos

$strQuery = "SELECT numcad,datter FROM vetorh.vetorh.R038AFA WHERE datter >= '$dataHj' AND datafa <= '$dataHj' AND numcad=$col";

//var_dump($strQuery);
$query =mssql_query($strQuery);
$rows  =mssql_num_rows($query);
//echo $rows;
//echo $dtafa;

if( $rows > 0 ){

    echo json_encode(0);//não habilita
} else{

	echo json_encode(1);//Habilita
}
