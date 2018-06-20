<?php
session_start();
require("../session.php");
ob_start();
include('../conn.php');

$col = $_SESSION['matricula'];

$info = $_POST['data'];
$data = json_decode($info);

foreach ($data as $key) {

 $numseq=$key->numseq;
 $seqpre=$key->seqpre;
 $tiptrp=$key->tiptrp;
 $datpre=$key->datpre;

 $moddate = explode("/",$datpre);
 $datpre  = $moddate[2]."-".$moddate[1]."-".$moddate[0];

 $query   = "Insert Into tPROSprde (
	seqpre,	matsol, datpre, datcad, tiptrp,	numevt,	qtdkm, vlrdes, juspre, odoini, odofim)
  Values(
  $seqpre, $col, '$datpre', getdate(), $tiptrp, 1, 0, 0.00, '', 0, 0.00)";
   //var_dump($query);
  $dados = mssql_query($query) or die('Erro');
  $delete = mssql_query("Delete tPROSprnd Where numseq=$numseq");

}

#=========================================================================================================
 if($dados){

    echo "{success:0}"; //sucesso

 }else{

    echo "{success:1}"; //falha
 }
