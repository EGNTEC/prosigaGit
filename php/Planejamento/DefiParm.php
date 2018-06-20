<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

$numprm = $_POST['tipparm'];
$datvig = $_POST['dtvig'];
$numprg = $_POST['tipprg'];

$vlrteto = $_POST['vlrteto'];
$vlrdia  = $_POST['vlrdia'];

if($vlrteto!=""){

    $vlrprm=$vlrteto;
}else{
    $vlrprm=$vlrdia;

}

switch($numprm){

  case 1:
    $desprm ='Dia Limite Para Prestação de contas';
   break;
  case 2:
    $desprm ='Limite Maximo para Deslocamento (R$) - Proprio';
   break;
  case 3:
    $desprm ='Limite Maximo para Deslocamento (R$) - Coletivo';
   break;  
}

$datinc = date('Y-m-d H:i:s');
$numcad = $_SESSION['matricula'];

$query = "INSERT INTO tPROSparm(numprm,desprm,vlrprm,numprg,datvig,datinc,numcad) 
                        VALUES($numprm,'$desprm',$vlrprm,$numprg,'$datvig','$datinc',$numcad)";

$dados = mssql_query($query) or die('Erro ao Inserir parâmetro');

if($dados){
   
    echo "{success:1}"; //sucesso
    #var_dump($query);
}else{
    #var_dump($query); 
    echo "{success:0}"; //falha
 }


