<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

//variaveis de sistema
$dia = 01;

$niv = $_SESSION['codniv'];

//variaveis de formulario
$referencia = $_POST['refplandt'];
$expRef = explode("/",$referencia);

$montRef = $expRef[1].'/'.$expRef[0].'/'.$dia;
$mes  = $expRef[0];
$ano  = $expRef[1];
$tiptrans = $_POST['tiptrans'];


if($niv==4){

   $mat = $_SESSION['matricula'];
   //variaveis globais
   //$col = $_SESSION['colaborador'];
   $numreg = $_SESSION['codreg'];
   $numloc = $_SESSION['codund'];

}else{

   $mat    = $_POST['mat'];
   $numreg = $_POST['reg'];
   $numloc = $_POST['unid'];

   //Tratamento nome(substituição matricula)
   /*if($mat==$col){
       $mat=$_SESSION['matricula'];
   }else{
       $mat = $_POST['mat'];
   }*/
   //Tratamento coordenador cadastrando o seu planejamento.
   $ResgMat = "SELECT numcad,numreg,numloc From tVTRHfunc Where nomfun='$mat'";
   #var_dump($ResgMat);
   $qryResgMat = mssql_query($ResgMat);
   $rowResgMat = mssql_num_rows($qryResgMat);
   $arrResgMat = mssql_fetch_array($qryResgMat);

   if($rowResgMat > 0){

      $mat    = $arrResgMat['numcad'];
      $numreg = $arrResgMat['numreg'];
      $numloc = $arrResgMat['numloc'];
   }
   #Fim do tratamento
}

//Tratamento para encerramentos dos depósitos.
$strQuery = "SELECT vlrprm FROM tPROSparm WHERE numprm=6";
$query =mssql_query($strQuery);
$array =mssql_fetch_array($query);
$dataPar = $array['vlrprm'];

//Tratamento para saber se existe registro para aquele mês

 $stringRow = mssql_query("SELECT count(*) AS result FROM tPROSabpl WHERE matfun=$mat AND DATEPART(MONTH,datpla)=$mes AND DATEPART(YEAR,datpla)=$ano
");
 
 $arrayRow  = mssql_fetch_array($stringRow);
 $result    = $arrayRow['result'];


if( $result==0 && (strtotime($montRef) >= strtotime($dataPar) ) ){

  $query = "INSERT INTO tPROSabpl(
				numreg,		numloc,		matfun,		datpla,		tiptrp,		stspla,
				qtdcli,		qtdkm,		vlrpla)
			VALUES (
				'$numreg',	'$numloc',	'$mat',		'$montRef',	$tiptrans,0,
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

//Fim montagem

 $var = 0;
}else{

 $var = 1 ;

}

#=========================================================================================================
 if($var==0){

    echo "{success:1}"; //sucesso
    #var_dump($query);
 }else{
    #var_dump($query);
    echo "{success:0}"; //falha
 }
