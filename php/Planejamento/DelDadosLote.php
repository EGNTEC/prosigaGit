<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

$col  =$_SESSION['matricula'];

$info = $_POST['data'];
$data = json_decode($info);
$btn  = $_POST['btn'];
//$numlot = $_POST['numlot'];
$dataH = date('Y-m-d');
$mes   = date('m');
$mesPos = $mes + 1;
$ano   = date('Y');
$d     = 7 ;

$parfim = $d.$mesPos.$ano;

foreach ($data as $key) {
 $result = 0;
 $numlot=$key->numlot;
 $numsq=$key->numseq;

 if($btn==0){

   $delStr = "DELETE FROM tproslote WHERE numseq=$numsq";
    //var_dump($delStr);
   $query  = mssql_query($delStr);

 }else
   if($btn==1){//Botão validar lote

     $strLote   = "SELECT numseq,numcad FROM tproslote WHERE numlot='$numlot'";
      //var_dump($strLote);
     $queryLote = mssql_query($strLote);

     while($arrayLote = mssql_fetch_array($queryLote)){

     $numseq = $arrayLote['numseq'];
     $numcad = $arrayLote['numcad'];

     //Tratamento para resgatar o tipo de transporte
     $strTipTran = "SELECT tiptrp FROM tPROSabpl WHERE numseq=$numseq";
      //var_dump($strTipTran);
     $queryTipTran = mssql_query($strTipTran);

     $arrayTipTran = mssql_fetch_array($queryTipTran);
     $tiptrp = $arrayTipTran['tiptrp'];

    if($numseq==9999){
       $prSldo    = "Exec dbo.pr_calcular_saldo $numcad";#atualiza o saldo
       //var_dump($prSldo);
       $querySldo = mssql_query($prSldo);

    }else{
       $strquery = "UPDATE tproslote set stslot=1 WHERE numlot='$numlot'";
 	      //var_dump($strquery);
       $query = mssql_query($strquery);#alterar situação do lote

      //-----------------------------------------------------------------------------
      $strSit = "UPDATE tprosabpl SET stspla=4 WHERE numseq=$numseq";
        //var_dump($strSit);
      $querySit = mssql_query($strSit);#altera situação do planejamento
      //-----------------------------------------------------------------------------
      $prSldo    = "Exec dbo.pr_calcular_saldo $numcad";#atualiza o saldo
       //var_dump($prSldo);
      $querySldo = mssql_query($prSldo);
      //-----------------------------------------------------------------------------
 	    $queryString = "Exec dbo.pr_CadastrarPrestacao $numseq,$numcad,$tiptrp,$col";#cria uma prestação
       //var_dump($queryString);
 	    $abPrest= mssql_query($queryString);

 	    }

     }//Fim do while
  }

}//Fim do foreach

echo json_encode($result);
#=========================================================================================================
