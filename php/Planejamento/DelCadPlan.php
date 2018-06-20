<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

if($_SESSION['codniv']==4 ){

   $mat = $_SESSION['matricula'];
}else{

   $mat=$e;
}

$datcad = date('Y/m/d H:i:s'); 

$info = $_POST['records'];
$data = json_decode($info);

foreach ($data as $key) {
 $result = 0;

 $numseq=$key->numseq;
 
 if(isset($numseq) == false){
 
    $numseq = 0;    
 }else{
  
   $numseq =$numseq; 
 } 

 $query = "DELETE FROM tPROSplde WHERE numseq=$numseq";

 $dados = mssql_query($query) or die('Erro ao deletar planejamento');
 #var_dump($query);	
}

echo json_encode($result);
#=========================================================================================================
 


