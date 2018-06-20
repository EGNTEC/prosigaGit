<?php
session_start();
ob_start();
//require("../session.php");
include("../conn.php");

$col  = $_SESSION['matricula'];

$data = $_POST['data'];

$selec = json_decode($data);

foreach($selec as $key){

   $numlot = $key->numlot;

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
     #=========================================================================
     $strquery = "UPDATE tproslote set stslot=1 WHERE numlot='$numlot'";
      //var_dump($strquery);
     $query = mssql_query($strquery);#alterar situação do lote

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

}//Fim do foreach

echo json_encode(0);
