<?php
session_start();
require("../session.php");
include("../conn.php");
include("../Funcoes/function.php");

$info = $_POST['records'];
$dataHoje = date('Y-m-d');
$TotGrid  =  $_POST['totgrid'];
$tiptrp   =  $_POST['tiptrp'];
$seqpla  = $_POST['seqpla'];
$data = json_decode($info);


foreach ($data as $key) {

   $numseq =$key->numseq ;

   $datdes1 =$key->datdes ;
   $datdesExplod = explode("-",$datdes1);
   $datdes = $datdesExplod[0]."-".$datdesExplod[1]."-".$datdesExplod[2];

   $qtdcli =$key->qtdcli ;
   $qtdkm  =$key->qtdkm  ;
   $vlrdes =$key->vlrdes ;
   $destra =$key->destra ;
   $valpass =$key->valpass;

   $dataTeto = $datdesExplod[0]."-".$datdesExplod[1]."-"."01";

   //Função para edição do trajeto.
   $$destra = editTrajeto($destra);

   if($vlrdes==null){

      $vlrdes=0;
   }

   if($qtdkm==null){

      $qtdkm=0;
   }

   if($valpass==null || $valpass==''){

      $valpass=0;
   }

   //Tratamento pegar valor do KM

    $queryKm = mssql_query("SELECT p.vlrtrp FROM tPROSprtr p
      WHERE p.datvig=(select max(q.datvig)
       from tPROSprtr q where
      p.tiptrp = q.tiptrp
      and q.datvig <= '$dataTeto'
      and p.tiptrp = $tiptrp)");

   $arrayKM = mssql_fetch_array($queryKm);
   $vlrkm   = $arrayKM['vlrtrp'];

   //Fim
   
  //Tratamento para pegar total do planejamento
  $valMax = mssql_query("SELECT vlrpla,tiptrp FROM tPROSabpl WHERE numseq = $numseq");
  $arrayValMax = mssql_fetch_array($valMax);
  $vlrpla = $arrayValMax['vlrpla'];
  //$tiptrp = $arrayValMax['tiptrp'];
  //Fim Tratamento

//Tratamento para o valor teto

$queryString = "SELECT p.vlrprm,p.datvig as inicio
             FROM tPROSparm p
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q
                              where p.numprm=q.numprm
                              and q.datvig <= '$dataTeto'
                              and q.numprm =";

if($tiptrp==1){

   $queryString = $queryString."2)";

}else{

   $queryString = $queryString."4)";
}

$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];

//Fim tratamento

#$tot = $vlrpla + $vlrdes;

  //Tratamento para verificar se existe inconsistências na grid.
  if($tiptrp==2){ //Para coletivo

    /*if(($qtdkm != 0 && $valpass==0) || ($qtdkm == 0 && $valpass!=0) || ($qtdkm != 0 && $valpass!=0 && $destra=="") ||
       ($qtdkm != 0 && $valpass!=0 && $destra==" ") || ($qtdkm == 0 && $valpass==0 &&(/*$destra=="." || $destra!=""))){*/
if(
    (($qtdkm != 0 && $valpass==0) || ($qtdkm == 0 && $valpass!=0)) ||
    (($destra==" " || $destra=="")&&($qtdkm != 0 && $valpass!=0)) ||
    (($vlrdes==0)&&($valpass!=0 || $qtdkm != 0))

){
       $result = 3;

     }else
     if($TotGrid > $vlrprm){

       $result =0;

     }else{
      $result =2;

      $queryUpdt="UPDATE tPROSplde set datdes='$datdes',datcad='$dataHoje',qtdcli=$qtdcli,qtdkm=$qtdkm,vlrdes=$vlrdes,
       destra='$destra',valpass=$valpass WHERE numseq=$numseq ";

       $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de planejamento.');
       #var_dump($queryUpdt);
  }

 }else
   if($tiptrp==1){ //Para Próprio


       if(
           (($qtdkm != 0 && $vlrdes==0) || ($qtdkm == 0 && $vlrdes!=0)) ||
           (($destra==" " || $destra=="")&&($qtdkm != 0 || $vlrdes!=0)) ||
           (($destra!="" && $destra!=" ") && ($qtdkm == 0 || $vlrdes==0))

       ){

        $result = 3;
     }else
     if($TotGrid > $vlrprm){

        $result =0;

    }else{
      $result =2;

      $queryUpdt="UPDATE tPROSplde set datdes='$datdes',datcad='$dataHoje',qtdcli=$qtdcli,qtdkm=$qtdkm,vlrdes=$vlrdes,
      destra='$destra',valpass=$valpass WHERE numseq=$numseq ";

      $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de planejamento.');
      #var_dump($queryUpdt);
     }

   }
  //Fim do Tratamento

  //$sqlTot = mssql_query("SELECT sum(vlrdes) as tot FROM tPROSplde WHERE seqpla='$seqpla'");
  //$sqlTotArray = mssql_fetch_array($sqlTot);
  //$TotGrid = $sqlTotArray['tot'];
}

echo json_encode($result);
