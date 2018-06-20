<?php
session_start();
require("../session.php");
include("../conn.php");

$col    = $_SESSION['matricula'];
$numseq = $_GET['numseq'];
$mat    = $_GET['mat'];
$tiptrp = $_GET['trans'];

//Deleta os registros do dia-a-dia do planejamento
$queryAbpr = mssql_query("UPDATE tPROSplde set qtdcli=0,qtdkm=0,vlrdes=0,destra=0,valpass=0 WHERE seqpla=$numseq")
                      or die('erro ao zerar planejamento');

//Altera a situação do planejamento zerado para concluído.
$queryUpdt = mssql_query("UPDATE tPROSabpl set stspla=4 WHERE numseq=$numseq");

//Criar uma prestação
$queryString = mssql_query("Exec dbo.pr_CadastrarPrestacao $numseq,$mat,$tiptrp,$col");

//Atualiza registros de saldo
$prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");

if($queryAbpr){

  echo json_encode(0); //certo
}else{

  echo json_encode(1); //errado
}
