<?php
session_start();
require("../session.php");
include("../conn.php");

$id=$_POST['id'];
$btn=$_POST['btn'];

if($btn==0){

  $queryUpdt = "UPDATE tPROSabpl SET stspla=2 WHERE numseq = '$id' ";
}else{

  $queryUpdt = "UPDATE tPROSabpl SET stspla=0 WHERE numseq = '$id' "; 	
}
        
$query = mssql_query($queryUpdt) or die('Erro ao alterar registro.');

if($query){

    echo json_encode(0);

}else{
  
    echo json_encode(1);
}
