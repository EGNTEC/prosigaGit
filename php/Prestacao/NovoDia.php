<?php
session_start();
require("../session.php");
include("../conn.php");

$seqpre = $_GET['numseq'];

//Executa procedure dos dias
$prNovoDia = "Exec dbo.pr_CadastrarDias $seqpre";
$resultNovoDia = mssql_query($prNovoDia);

$querySelect="Select numseq,seqpre,tiptrp,Convert (Varchar(10),datpre, 103) AS datpre From tPROSprnd Where seqpre=$seqpre";

//var_dump($querySelect);
$query = mssql_query($querySelect) or die('Erro ao filtrar os dias.');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
echo json_encode($rows);
