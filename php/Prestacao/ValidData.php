<?php
session_start();
require("../session.php");
include("../conn.php");

$dt=$_GET['dt'];
$id=$_GET['id'];


$queryString = "SELECT count(*) AS result FROM tPROSprde
                WHERE datpre='$dt' AND seqpre=$id ";

$query = mssql_query($queryString);

$array = mssql_fetch_array($query);

$result=$array['result'];

echo json_encode($result);
                
