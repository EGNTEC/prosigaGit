<?php
session_start();
require("session.php");
include("conn.php");

$descTrp = $_POST['tipTrp'];
$dataprestacao = $_POST['datpres'];

$dia=1;
$mes = date('m', strtotime($dataprestacao));
$ano = date('Y', strtotime($dataprestacao));
$Dtcad = $ano.'/'.$mes.'/'.$dia;

//echo $Dtcad;echo'<br>';

if($descTrp=="Proprio"){

   $idTrp = 1;
}else{

   $idTrp = 2;
}

$valKm = mssql_query("SELECT p.vlrtrp as vlrtrp FROM tPROSprtr p
                  WHERE p.datvig=(select max(q.datvig)
                     from tPROSprtr q where
                  p.tiptrp = q.tiptrp
                  and q.datvig <= '$Dtcad'
                  and p.tiptrp = $idTrp)")

  or die('Erro ao carregar o valor do quilometro');

$arrayKm = mssql_fetch_array($valKm);
$result  = $arrayKm['vlrtrp'];

//encoda para formato JSON
echo json_encode($result);
