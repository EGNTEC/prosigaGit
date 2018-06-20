<?php
session_start();
require("../session.php");
include("../conn.php");

$numseq = $_POST['id'];

$Query = mssql_query("SELECT vlrdes,qtdkm,valpass FROM tPROSplde WHERE numseq='$numseq'");

$QueryArray = mssql_fetch_array($Query);

$valor = $QueryArray['vlrdes'];
$qtdkm = $QueryArray['qtdkm'];
$valpass = $QueryArray['valpass'];

$p = array(
    array(
        'valor'=> $valor,
        'km'=> $qtdkm,
        'valpass'=> $valpass
    )
);

foreach( $p as $t ) {
    $t['km'] = abs($t['km']);
    $r[] = $t;
}

echo json_encode($r); 