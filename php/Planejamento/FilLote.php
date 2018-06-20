<?php
session_start();
require("../session.php");
include("../conn.php");

$reg="SELECT distinct
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

      WHERE lot.stslot = 0";

$query = mssql_query($reg);
   
//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    $rows['data'][] = $state;
}
    
//encoda para formato JSON
echo json_encode($rows);
