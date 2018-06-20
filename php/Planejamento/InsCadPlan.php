<?php
session_start();
ob_start();
require("../session.php");
include('../conn.php');

$idAbr    =  $_POST['numseq'];
$tiptrp   =  $_POST['tiptrp'];
$TotGrid  =  $_POST['totgrid'];
$dataHoje = date('Y-m-d');

//Resgata a data de competência.

$sqlData = mssql_query("Select datpla From tPROSabpl Where numseq=$idAbr");
$arrayData= mssql_fetch_array();
$getData = $arrayData['datpla'];

//Tratamento para o valor teto

$queryString = "SELECT p.vlrprm,p.datvig as inicio
             FROM tPROSparm p
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q
                              where p.numprm=q.numprm
                              and q.datvig <= '$getData'
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

//Tratamento pegar valor do KM

$queryKm = mssql_query("SELECT vlrtrp FROM tPROSprtr WHERE tiptrp = $tiptrp");
$arrayKM = mssql_fetch_array($queryKm);
$vlrkm   = $arrayKM['vlrtrp'];

//Fim

if($_SESSION['codniv']==4 ){

   $mat = $_SESSION['matricula'];
}else{

  $sql   = mssql_query("SELECT matfun FROM tPROSabpl WHERE numseq = $idAbr");

  $array = mssql_fetch_array($sql);

  $mat=$array['matfun'];
}

$datcad = date('Y/m/d H:i:s');

$info = $_POST['records'];
$data = json_decode($info);

foreach ($data as $key) {

  $seqpla=$idAbr;
  #tratamento data para envio do banco
  $datdes=$key->datdes;
  $datdesExplod = explode("/",$datdes);
  #$datdes = $datdesExplod[2]."/".$datdesExplod[1]."/".$datdesExplod[0];
  #####################
  $qtdcli=$key->qtdcli;
  $qtdkm =$key->qtdkm ;
  $vlrdes=$key->vlrdes;
  $destra=$key->destra;

  //Tratamento para valor igual a zero
  if($vlrdes==0){

     $vlrdes= $qtdkm * $vlrkm;

  }
  //echo $datdes;
  //echo $idAbr;
  //Tratamento para verificar se existe dias duplicados
  $row="SELECT count(*) AS result FROM tPROSplde WHERE datdes='$datdes' AND seqpla=$idAbr";
  $duplicData = mssql_query($row);
  $rowData = mssql_fetch_array($duplicData);
  $resultRow = $rowData['result'];
  //Fim Tratamento

  //Tratamento para pegar total do planejamento
  #$valMax = mssql_query("SELECT vlrpla FROM tPROSabpl WHERE numseq=$idAbr");
  #$arrayValMax = mssql_fetch_array($valMax);
  #$vlrpla = $arrayValMax['vlrpla'];
  //Fim Tratamento

  // variavel total
  #$tot = $vlrpla + $vlrdes;

  if($TotGrid > $vlrprm){

      $result =0;
      break;
  }else
  if($resultRow == 1){

      $result =1;
  }
  else{
    $result =2;
    $query  = "INSERT INTO  tPROSplde(matsol,seqpla, datdes,  datcad, qtdcli, qtdkm, vlrdes, destra)
                              VALUES('$mat','$seqpla','$datdes','$datcad','$qtdcli','$qtdkm','$vlrdes','$destra')";

    $dados = mssql_query($query) or die('Erro ao inserir cadastro de planejamento');

  }
}
 #var_dump($row);
 #echo $resultRow;
 echo json_encode($result);
