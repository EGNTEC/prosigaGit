<?php
session_start();
require("../session.php");
include("../conn.php");

//$id     = $_POST['id'];
$col    = $_SESSION['matricula'];
$just   = $_POST['just'];
$data   = date('Y-m-d H:s');
$info   = $_POST['data'];
$record = json_decode($info);

foreach ($record as $key) {
 $numseq=$key->numseq;
 $queryString ="INSERT INTO tproslipr VALUES($numseq,$col,'$data','$just')";
 //var_dump($queryString);
 $query = mssql_query($queryString) or die("Erro ao inserir no banco");
}

if($query){

  echo "{success:true}";

}else{

  echo "{success:false}";
}
