<?php
session_start();
require("session.php");
include("conn.php");
    
$niv =   $_SESSION['codniv'];
$mat =   $_SESSION['matricula'];
$local = $_SESSION['nomund'];
$codloc= $_SESSION['codund'];
$codreg= $_SESSION['codreg'];
$codprg= $_SESSION['usu_codprg'];
$programa = $_SESSION['programa'];  

if($niv == 1){

  switch ($programa) {
     case 4002:
       $codprg = 1; 

       break;
     
     case 4003:
        $codprg = 2;

       break;
  }		

  $reg="SELECT numloc,nomloc AS regional FROM tVTRHhior WHERE numloc=numreg And usu_codprg=$codprg ORDER BY nomloc";

}else{

  if($codprg==1){
   
  $reg="SELECT numloc,nomloc AS unidade,
  (SELECT nomloc FROM tVTRHhior WHERE numloc=numreg AND usu_codprg=1 AND numreg='$codreg') AS regional
   FROM tVTRHhior
  WHERE usu_codprg=1  AND numloc='$codloc'";
}else
 if($codprg==2){
   
  $reg="SELECT numloc,nomloc AS unidade,
  (SELECT nomloc FROM tVTRHhior WHERE numloc=numreg AND usu_codprg=2 AND numreg='$codreg') AS regional
   FROM tVTRHhior
  WHERE usu_codprg=2 AND numloc='$codloc'";

  }

}

$query = mssql_query($reg);
   
//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    $rows['data'][] = $state;
}
    
//encoda para formato JSON
echo json_encode($rows);
