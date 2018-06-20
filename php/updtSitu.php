<?php
session_start();
require("session.php");
include("conn.php");

$user = $_POST['user'];
$mat  =   $_SESSION['matricula'];

$queryString = mssql_query("Select dbo.fn_Consultar_Situacao ($mat) as situacao");

//$arraySitpla = mssql_fetch_array($queryString);
//$rows = $arraySitpla['situacao'];

$rows = array('data' => array());
while($state = mssql_fetch_array($queryString)) {
    $rows['data'][] = $state;
}
    
//encoda para formato JSON
echo json_encode($rows);