<?php
session_start();
require("../session.php");
ob_start();
include('../conn.php');

$datcad = date('Y/m/d H:i:s'); 

$info = $_POST['data'];
$data = json_decode($info);

foreach ($data as $key) {

 $numseq=$key->numseq;

 $query = "DELETE FROM tPROSprde WHERE numseq ='$numseq'";

 $dados = mssql_query($query) or die('Erro ao deletar prestacao');
	
}

#=========================================================================================================
 if($dados){
   
    echo "{success:0}"; //sucesso

 }else{

    echo "{success:1}"; //falha
 }


