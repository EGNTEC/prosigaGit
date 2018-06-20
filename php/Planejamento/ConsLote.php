<?php
session_start();
require("../session.php");
include("../conn.php");

$numlot = $_GET['numlot'];
//$nomfun = $_GET[''];

$StringR = "SELECT numseq FROM tproslote WHERE numlot='$numlot'";
//var_dump($StringR);
$queryStringR = mssql_query($StringR);
$array   = mssql_fetch_array($queryStringR);
$numseq  = $array['numseq'];

if($numseq==9999){

  $String="SELECT
         lot.numlot,
         lot.numemp,
         lot.codfil,
         lot.numtit,
         lot.codfor,
         lot.vlrpag,
         lot.codccu,
         Convert (Varchar(10),lot.ventit, 103) AS ventit,
         lot.codban,
         lot.codage,
         lot.numcta,
         lot.numseq,
         lot.numcad,
         func.nomfun,
         lot.datger,
         Convert (Varchar(10),lot.datpla, 103) AS datpla,
         1 As tiptrp,
         lot.stslot
       FROM tproslote lot

        INNER JOIN tVTRHfunc func ON lot.numcad = func.numcad

        WHERE numlot ='$numlot'";

}else{

  if($numlot==""){

       $String ="Select	Distinct lot.numlot
      From	tPROSlote lot
        WHERE	lot.stslot = 0";
  }else{

    $String = "SELECT distinct
         lot.numlot,
         lot.numemp,
         lot.codfil,
         lot.numtit,
         lot.codfor,
         lot.vlrpag,
         lot.codccu,
         Convert (Varchar(10),lot.ventit, 103) AS ventit,
         lot.codban,
         lot.codage,
         lot.numcta,
         lot.numseq,
         lot.numcad,
         func.nomfun,
         lot.datger,
         Convert (Varchar(10),lot.datpla, 103) AS datpla,
         abpl.tiptrp,
         lot.stslot
       FROM tproslote lot

        INNER JOIN tVTRHfunc func ON lot.numcad = func.numcad
        INNER JOIN tPROSabpl abpl ON lot.numseq = abpl.numseq
       ";

   if($numlot!=""){


     $condicao=" WHERE numlot ='$numlot' And stslot=0 ";
   }else{

     $condicao=" WHERE numlot ='000'";
    }
  }

}

 $queryString = $String.$condicao ;

 //var_dump($queryString);

//consulta sql

$query = mssql_query($queryString) or die('Erro ao filtrar lotes gerados');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($cadplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $cadplan;
}

//encoda para formato JSON
echo json_encode($rows);
