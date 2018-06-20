<?php
session_start(); 
include("conn.php");

$numcad = $_GET['numcad'];

$stringSelect = "SELECT	prad.numcad,prad.nomfun,prad.numloc, hior.nomloc
					From	tPROSprad prad
							Inner Join tVTRHhior hior On hior.numloc = prad.numloc ";

if($numcad != null || $numcad != ''){

     $variavel = " Where	prad.numcad = $numcad ";

}

$stringSelect = $stringSelect.$variavel;

//var_dump($stringSelect);

$stringQuery = mssql_query($stringSelect);

$retorno = array('data' => array());
while($locad = mssql_fetch_array($stringQuery)) {
    $retorno['data'][] = $locad;
}
    
//encoda para formato JSON
echo json_encode($retorno);







































