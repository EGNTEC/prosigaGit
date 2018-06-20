<?php
session_start();
require("../session.php");
include("../conn.php");

$info = $_POST['records'];
$data = json_decode($info);
$col    = $_SESSION['matricula'];
$dia =01;

foreach ($data as $key){

  $mat = $key->numcad;
  $numreg= $key->numreg;
  $numloc= $key->numloc;
  $datRef=$key->datpla;
  $ref = explode("/",$datRef);
  $mes = $ref[0];
  $ano = $ref[1];

  $montRef = $ano."/".$mes."/".$dia;

  $trans=$key->trpt;

  if($trans=="Proprio"){

     $tiptrans = 1;
  }else{

     $tiptrans = 2;
  }

  //Verifica se existe algum processo pendente para o Colaborador
  $queryAbpr = mssql_query("Select Count(1) As result
  From   tPROSabpl abpl
  Where  abpl.matfun = $mat
  And          (
                   (abpl.stspla <> 4)
               Or  (Exists (Select 1 From tPROSabpr abpr
                                   Where  abpr.matfun = abpl.matfun
                                   And    abpr.stspre <> 4))
               )") or die('erro na consulta planejamento');

   $rowAbpr = mssql_fetch_array($queryAbpr);
   $exist  = $rowAbpr['result'];


if($exist != 0){

    $result=99;

}else{
  $query = "INSERT INTO tPROSabpl(
				numreg,		numloc,		matfun,		datpla,		tiptrp,		stspla,
				qtdcli,		qtdkm,		vlrpla)
			VALUES (
				'$numreg',	'$numloc',	'$mat',		'$montRef',	$tiptrans,4,
				0,			0,			0)";

  //var_dump($query);
  $dados = mssql_query($query) or die('Erro ao Inserir Abertura de planejamento');


  //Monta o dia-dia do planejamento.

  $strReturn    = "SELECT numseq FROM tPROSabpl
                             WHERE matfun=$mat
                      AND DATEPART(MONTH,datpla)=$mes
                      AND DATEPART(YEAR,datpla)=$ano";

 //var_dump($strReturn);
$queryRetorno = mssql_query($strReturn);

$arrayRetorno = mssql_fetch_array($queryRetorno);
$numseq = $arrayRetorno['numseq'];

$exec = "Exec dbo.Pr_CadastrarPlanejamento $numseq,'$montRef',$mat";
  //var_dump($exec);
$gerPlan = mssql_query($exec);

//Criar uma prestação
 $strString   = "Exec dbo.pr_CadastrarPrestacao $numseq,$mat,$tiptrans,$col";
  //var_dump($strString);
 $queryString = mssql_query($strString);

 $result=0;

 }

}

echo json_encode($result);
