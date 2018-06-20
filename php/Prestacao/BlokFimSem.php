<?php
session_start();
require("../session.php");
include('../conn.php');

$data  = $_POST["dtdes"];

$dia = date('w', strtotime($data));

//6 - Sábado| 0 - Domingo 

if($dia==0 or $dia==6)
{
    
   $result = 0;
}else{

   $result = 1;	 
}

echo json_encode($result);