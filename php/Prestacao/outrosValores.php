<?php
session_start();
require("../session.php");
include('../conn.php');

$dia = 01;
$id      =$_POST["id"];
$mat     =$_SESSION['matricula'];
$vlradd  =$_POST["vlradd"];
$tiptrp  =$_POST["tiptra"];
$seqpre  =$_POST["numseq"];
$datpre  =$_POST["dtdes"];
//$mesref  =$_POST["mesref"];
$vlrad   =$_POST["vlrad"];
$btn     =$_POST["btn"];
$qtdcli  =0;

$datcad = date('Y-m-d H:i:s');

//Tratamento de data para valor de deslocamento
//Tratamento para validação da data de cadastro
$mes = date('m', strtotime($datpre));
$ano = date('Y', strtotime($datpre));
$Dtcad = $ano.'/'.$mes.'/'.$dia;



//Tratamento para descrição do transporte

if($tiptrp=="Coletivo"){

    $tiptrp=2;
}else
if($tiptrp=="Proprio"){

   $tiptrp=1;
}

$queryString = "SELECT vlrtrp FROM tPROSprtr WHERE tiptrp='$tiptrp' and datvig = (select max(datvig) FROM tPROSprtr where datvig <= '$Dtcad') ";

$query = mssql_query($queryString);
$arrayString = mssql_fetch_array($query);
$tetotrpr = $arrayString['vlrtrp'];

//Tratamento para verificar se existe  prestação na mesma data e mesmo transporte.
$qryString = mssql_query("SELECT count(tiptrp) as conta FROM tPROSprde where datpre ='$datpre' AND tiptrp=$tiptrp AND seqpre=$seqpre");

$arrayQry = mssql_fetch_array($qryString);
$count = $arrayQry['conta'];

$queryRef = mssql_query("SELECT Substring (Convert (Varchar(10), abpl.datpla, 103),4,7)
   AS mesref from tPROSabpr abpr
   INNER JOIN tPROSabpl abpl ON abpr.seqpla = abpl.numseq
   where abpr.numseq = $seqpre");

$arrayRef = mssql_fetch_array($queryRef);
$mesref   = $arrayRef['mesref'];

//botão 0- Alteração 1- Adicional

//evento 1- Normal 2- Outros


if($btn==0){ //botão editar valor da grid

   if($tiptrp==1){

      $numevt = 1;
      $odoini = $_POST["hdini"];
      $odofim = $_POST["hdfim"];
      $juspre = $_POST["trajeto"];
      $qtdkm  = $odofim - $odoini;
      $vlrdes = $tetotrpr * $qtdkm;

      $queryS= "UPDATE tPROSprde SET tiptrp=1,numevt=$numevt,odoini=$odoini,odofim=$odofim,qtdkm=$qtdkm
      ,vlrdes=$vlrdes,juspre='$juspre' WHERE numseq = $id";

      $dadosT = mssql_query($queryS) or die('Erro ao Inserir cadastro de prestação1');

      $result = 0;

   }else{

     $numevt = 1;
     $valpsg =$_POST["valpsg"];
     $qtdkm  =$_POST["qtdpsg"];
     $vlrdes =$qtdkm * $valpsg;
     $juspre =$_POST["trajeto"];
     $odoini = 0;
     $odofim = 0;

     $queryS= "UPDATE tPROSprde SET tiptrp=2,numevt=$numevt,odoini=$qtdkm,odofim=$valpsg,qtdkm=0
     ,vlrdes=$vlrdes,juspre='$juspre' WHERE numseq = $id";

     $dadosT = mssql_query($queryS) or die('Erro ao Inserir cadastro de prestação2');

     $result = 0;
  }/*else{

    $numevt = 2;
    $tiptrp = 3;
    $vlrdes = $_POST["vlrad"];
    $juspre = $_POST["trajeto"];
    $odoini = 0;
    $odofim = 0;
    $qtdkm  = 0;

    $queryS ="INSERT INTO tPROSprde
    (matsol,seqpre,datpre,datcad,tiptrp,qtdcli,qtdkm,vlrdes,juspre,numevt,odofim,odoini)
    VALUES
    ($mat,$seqpre,'$datpre','$datcad',$tiptrp,$qtdcli,$qtdkm,$vlrdes,'$juspre',$numevt,$odofim,$odoini)";

   $dadosT = mssql_query($queryS) or die('Erro ao Inserir cadastro de prestação');

   $result = 0;
  }*/

 }else{ //Botão Adicional

  $odi  = $_POST["hdini"];
  $odf  = $_POST["hdfim"];
  $traj = $_POST["trajeto"];
  $ped  = $_POST["pedagio"];
  $qtp  = $_POST["qtdpsg"];
  $vlp  = $_POST["valpsg"];
  $vlad  = $_POST["vlrad"];
  //Tratamento para validação da data de cadastro
  $mes = date('m', strtotime($datpre));
  $ano = date('Y', strtotime($datpre));
  $Dtcad = $mes.'/'.$ano;

  //if($tiptrp!="" && $datpre!="")
  //{  //retorno para msg de outros campos vazios.

     if($tiptrp==1 && ($odi=="" || $odf=="" || $traj=="" || $datpre=="")){

          $result = 5;
     }else
     if($tiptrp==2 && ($traj=="" || $qtp=="" || $vlp=="" || $datpre=="" || $vlp==0.00)){

         $result = 5;

      }else
       if($tiptrp==3 &&($ped=="" || $vlad=="" || $datpre=="" || $vlad==0.00)){

         $result = 5;
      }

   //}
   else
   if($tiptrp==""){//retorno para msg de transporte.

     $result = 4;
  }else
  if($count > 0 && $tiptrp==3){//msg para pedagio.

      $result = 6;

  }else
  if($count > 0 && $tiptrp!=3){//msg para Próprio/coletivo.

      $result = 2;

  }else
  if($mesref!=$Dtcad){

     $result = 1;

  }else{ //Tratamento inserir

  //Para Tipo Próprio
    if($tiptrp==1){

      $numevt = 2;
      $odoini = $_POST["hdini"];
      $odofim = $_POST["hdfim"];
      $juspre = $_POST["trajeto"];
      $qtdkm  = $odofim - $odoini;
      $vlrdes = $tetotrpr * $qtdkm;

   }else
   //Para Tipo coletivo
    if($tiptrp==2){

     $numevt = 2;
     #$valpsg =$_POST["valpsg"];
     $qtdkm  = 0;
     $juspre = $_POST["trajeto"];
     $odoini = $_POST["qtdpsg"];
     $odofim = $_POST["valpsg"];
     $vlrdes = $odoini * $odofim;


   }else{
  //Para outro tipo de transporte
   $numevt = 2;
   $tiptrp = 3;
   $vlrdes = $_POST["vlrad"];
   $juspre = $_POST["pedagio"];
   $odoini = 0;
   $odofim = 0;
   $qtdkm  = 0;

  }

    $queryS ="INSERT INTO tPROSprde(matsol,seqpre, datpre, datcad, tiptrp, qtdkm, vlrdes, juspre,numevt,odofim,odoini)
      VALUES($mat,$seqpre,'$datpre','$datcad',$tiptrp,$qtdkm,$vlrdes,'$juspre',$numevt,$odofim,$odoini)";
      //var_dump($queryS);
    $dadosT = mssql_query($queryS) or die('Erro ao Inserir cadastro de prestação3');


    $result = 0;
  }//Fim do tratamento inserir

}//Fim do botão adicional.

#========================================================================================================
 echo json_encode($result);
