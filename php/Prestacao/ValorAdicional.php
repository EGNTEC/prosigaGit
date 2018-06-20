<?php
session_start();
require("../session.php");
include("../conn.php");

$seqpre = $_GET['numseq'];

$querySelect="SELECT 
			prde.numseq AS numseq,
			prde.seqpre AS seqpre,
			Convert (Varchar(10),prde.datpre, 103) AS datpre,
			prde.tiptrp AS tiptrp,
			prde.odoini AS odoini,
			prde.odofim AS odofim,
			tptr.destrp AS destrp,
			prde.qtdkm 	AS quilometro,
			prde.vlrdes AS vlrdes,
			evt.numevt 	AS numevt,
			evt.desevt 	AS desevt,
			prde.juspre AS juspre
          FROM tPROSprde prde
	        INNER JOIN tPROStptr tptr ON prde.tiptrp=tptr.tiptrp
	        INNER JOIN tPROStpev evt  ON evt.numevt=prde.numevt
	      WHERE seqpre = $seqpre AND evt.numevt=2 order by prde.datpre";

//var_dump($querySelect);
$query = mssql_query($querySelect) or die('Erro ao filtrar prestações');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
echo json_encode($rows);
