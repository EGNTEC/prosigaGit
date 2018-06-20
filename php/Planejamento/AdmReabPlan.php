<?php
session_start();
//require("../session.php");
include("../conn.php");

$col    = $_SESSION['matricula'];
$datHor = date('Y-m-d H:i:s');
$dataHoje = date('Y-m-d');

//$data = $_GET['data'];
//$selec = json_decode($data);

$data  = $_POST['data'];
$selec = json_decode($data);


foreach($selec as $key){

  //$numcad=$key->numcad;
  $numseq =$key->numseq;

  //$String = "Select numseq From tPROSabpl Where matfun=$numcad";
  ////var_dump($String);
  //$query  = mssql_query($String) or die('Erro ao filtrar planejamentos');
  //$array  = mssql_fetch_array($query);
  //$numseq = $array['numseq'];

  //Altera a situação do planejamento para aberto, stspla=0
  $updateSit = "update tPROSabpl set stspla=0 where numseq=$numseq";
  $querySit  = mssql_query($updateSit);
}

if($querySit){

    echo "{success:true}"; //sucesso
    #var_dump($queryUpdt);

 }else{

    echo "{success:false}"; //falha
    #var_dump($queryUpdt);
 }
