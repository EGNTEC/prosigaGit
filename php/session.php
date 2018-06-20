<?php
session_start();

if(!$_SESSION['matricula']){

     header("Location: ../index.php");
}

if($_SESSION['registro']){

	$min = time() - $_SESSION['registro'] ;
}


if($min > $_SESSION['limite']){
   session_destroy();
   //header("Location: ../ext/index.php");
   echo "<script type='text/javascript'>alert('O sistema ficou ocioso. Por gentileza acesse novamente.'); window.location.href='../index.php'</script>";
}else{

   $_SESSION['registro'] = time();
}
