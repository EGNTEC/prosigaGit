<?php
session_start(); 
include("php/conn.php");

$programa     = $_GET['programa'];
$numcad   	  = $_SESSION['matricula'];
$password 	  = $_SESSION['password'];


header("location:/php/autent.php?username=".$numcad.'&programa='.$programa);

