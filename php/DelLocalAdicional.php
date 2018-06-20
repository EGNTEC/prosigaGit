<?php
session_start(); 
include("conn.php");

$numcad = $_GET['numcad'];

$stringDelete = mssql_query("DELETE tPROSprad Where numcad=$numcad");

if($stringDelete){

	echo json_encode(0);

}else{
    
    echo json_encode(1);
}


