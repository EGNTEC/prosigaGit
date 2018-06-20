<?php
session_start();
require("../session.php");
include("../conn.php");
include("../Funcoes/function.php");

$info = $_POST['records'];
$dataHoje = date('Y-m-d');

$data = json_decode($info);

foreach ($data as $key) {

   $numseq =$key->numseq ;

   $datpre1 =$key->datpre ;
   $datpreExplod = explode("-",$datpre1);
   $datpre = $datpreExplod[0]."-".$datpreExplod[1]."-".$datpreExplod[2];

   $seqpre =$key->seqpre;
   $qtdcli =$key->qtdcli ;
   $qtdkm  =$key->quilometro;
   $vlrdes =$key->vlrdes ;
   $juspre =$key->juspre ;
   $numevt =$key->numevt ;
   $tiptrp =$key->destrp ;

   //Função para edição do trajeto.
   $juspre = editTrajeto($juspre);   

  if($tiptrp =="Proprio" || $tiptrp ==1){

     $tiptrp=1;
     $odoini =$key->odoini ;
     $odofim =$key->odofim ;

  }else
    if($tiptrp =="Coletivo" || $tiptrp ==2){

     $tiptrp =2;
     $odoini =$key->odoini ;
     $odofim =$key->odofim ;

  }


  $mat = $_SESSION['matricula'];

  //Tratamento para verificar se existem divergências na grid.
   if($vlrdes<0){

     $result = 2;
   }
   else
   if(
       (
          ($odoini != 0 && $odofim==0) || ($odoini == 0 && $odofim!=0)) ||
          (($juspre==" " || $juspre=="")&&($odoini != 0 || $odofim!=0)) ||
          (($juspre!="" && $juspre!=" ") && ($odoini == 0 || $odofim==0)
       )

    ){

      $result = 1;
   }else{
      $result = 0;

    $queryUpdt="UPDATE tPROSprde
    set datpre='$datpre',datcad='$dataHoje',qtdkm=$qtdkm,vlrdes=$vlrdes,juspre='$juspre',numevt='$numevt',tiptrp='$tiptrp',seqpre='$seqpre',matsol='$mat',odoini='$odoini',odofim='$odofim' WHERE numseq=$numseq ";

    $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');
    //var_dump($queryUpdt);
   }

  //Fim tratamento
}

echo json_encode($result);
