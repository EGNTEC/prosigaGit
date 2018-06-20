<?php
session_start(); 
include("conn.php");

$numcad  = $_GET['numcad'];
$codunid = $_GET['unid'];
$codreg  = $_GET['reg'];


$stringSelect = mssql_query("SELECT	func.nomfun, func.numcpf
							From	tVTRHfunc func
							Where	func.numcad =$numcad");

$stringArray  = mssql_fetch_array($stringSelect);

$nomfun = $stringArray['nomfun'];
$numcpf = $stringArray['numcpf'];


$stringCount = mssql_query("SELECT	prad.numcad,prad.nomfun,prad.numloc, hior.nomloc
					From	tPROSprad prad
							Inner Join tVTRHhior hior On hior.numloc = prad.numloc
				Where	prad.numcad = $numcad");

$count = mssql_num_rows($stringCount);

if($count > 0){

	echo json_encode(0);

}else{
    $string = "INSERT into tPROSprad values($numcad,'$nomfun',$numcpf,$codunid,$codreg)";
    //var_dump($string);
    $stringInsert = mssql_query($string);
    echo json_encode(1);
}


