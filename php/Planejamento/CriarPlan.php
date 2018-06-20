<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

//variaveis de sistema
$dia = 01;

//variaveis de formulario
$referencia = $_POST['datpla'];
$mat    = $_POST['numcad'];
$numseq = $_POST['numseq'];

$expRef = explode("/",$referencia);

$montRef = $expRef[1].'/'.$expRef[0].'/'.$dia;

$exec = "Exec dbo.Pr_CadastrarPlanejamento $numseq,'$montRef',$mat";
   //var_dump($exec);
$gerPlan = mssql_query($exec);
 

#=========================================================================================================
if($gerPlan){

  echo json_encode(0);
  #var_dump($exec);   
}


 
