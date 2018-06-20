<?php
session_start();
require("../session.php");
include("../conn.php");

//variavel global

  $col    =$_SESSION['matricula'];
  $numcad =$_POST["numcad"] ;
  $numseq =$_POST["numseq"] ;
  $tiptrp =$_POST["tiptrp"] ; 
  
  
  $queryVar = "SELECT * FROM tPROSabpr WHERE seqpla=$numseq";
  $queryR = mssql_query($queryVar); 
  $row = mssql_num_rows($queryR);
  
  if($row > 0){
      
     $queryResult = 0;     
  }else{
  
  $queryString = "pr_CadastrarPrestacao $numseq,$numcad,$tiptrp,$col";

  $queryResult = 1; 
  }

  $query= mssql_query($queryString);
 


if($queryResult == 1){
   
    echo "{success:true}"; //sucesso
         
 }else{

    echo "{success:false}"; //falha
    
 }


