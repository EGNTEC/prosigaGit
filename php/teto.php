<?php
session_start();
require("session.php");
include("conn.php");

$tiptrp = $_POST['id'];

$queryString = "SELECT p.vlrprm,p.datvig as inicio
             FROM tPROSparm p 
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q 
                              where p.numprm=q.numprm
                              and q.datvig < getdate() 
                              and q.numprm =";

if($tiptrp==1){

   $queryString = $queryString."2)"; 

}else{

   $queryString = $queryString."4)";     
}

$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];

echo json_encode($vlrprm);
