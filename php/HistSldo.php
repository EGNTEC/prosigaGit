<?php
session_start();
require("session.php");
include("conn.php");
    
$niv =   $_SESSION['codniv'];
$mat =   $_SESSION['matricula'];

$Sldo="SELECT top 6 matfun,datref,vlrpla,vlrrec,vlrpre,vlrsld 
        FROM tprossldo 
       WHERE matfun=$mat ORDER BY datpla DESC";

$query = mssql_query($Sldo);
   
//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    $rows['data'][] = $state;
}
    
//encoda para formato JSON
echo json_encode($rows);
