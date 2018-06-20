<?php
session_start();
require("../session.php");
include("../conn.php");

$seqpre = $_GET['numseq'];

$tiptrp = $_GET['tiptrp'];

if($tiptrp==1){

  $queryString = "SELECT
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
			prde.juspre AS juspre,
			Case
				When prde.Tiptrp = 1 Then 'Km Inicial:'
				When prde.tiptrp = 2 Then 'Qtd. Passagem:'
				Else '-'
			End as 'Coluna1',
			Case
				When prde.Tiptrp = 1 Then 'Km Final:'
				When prde.tiptrp = 2 Then 'Vlr. Passagem:'
				Else '-'
			End as 'Coluna2'
     FROM tPROSprde prde
	 INNER JOIN tPROStptr tptr ON prde.tiptrp=tptr.tiptrp
	 INNER JOIN tPROStpev evt  ON evt.numevt=prde.numevt
	 WHERE   seqpre = '$seqpre'
	 order by prde.datpre";
}else{

 $queryString= "SELECT
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
			prde.juspre AS juspre,
			Case
				When prde.Tiptrp = 1 Then 'Km Inicial:'
				When prde.tiptrp = 2 Then 'Qtd. Passagem:'
				Else '-'
			End as 'Coluna1',
			Case
				When prde.Tiptrp = 1 Then 'Km Final:'
				When prde.tiptrp = 2 Then 'Vlr. Passagem:'
				Else '-'
			End as 'Coluna2',
            sum(prde.vlrdes / prde.qtdkm) AS valpass
 FROM tPROSprde prde
	 INNER JOIN tPROStptr tptr ON prde.tiptrp=tptr.tiptrp
	 INNER JOIN tPROStpev evt  ON evt.numevt=prde.numevt
	 WHERE   seqpre = '$seqpre'
 group by prde.numseq,prde.datpre,prde.qtdkm,prde.vlrdes,evt.numevt,evt.desevt,prde.juspre,prde.tiptrp,tptr.destrp,prde.seqpre,prde.odoini,prde.odofim
 order by prde.datpre ";
}

//var_dump($queryString);
//consulta sql

$query = mssql_query($queryString) or die('Erro ao filtrar prestação');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($cadpre = mssql_fetch_assoc($query)) {
    $rows['data'][] = $cadpre;
}

//encoda para formato JSON
echo json_encode($rows);
