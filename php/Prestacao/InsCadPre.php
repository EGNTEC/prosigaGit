<?php
session_start();
require("../session.php");
ob_start();
include('../conn.php');
include("../Funcoes/function.php");

$idAbr =  $_POST['numseq'];
$tiptrp = $_POST['tiptrp'];
$dataHoje = date('Y-m-d');

if($tiptrp == 1 || $tiptrp == 2 || $tiptrp =='Proprio' || $tiptrp =='Coletivo'){

    $evt = 1;
}

//Tratamento para o valor teto

$queryString = "SELECT p.vlrprm,p.datvig as inicio
             FROM tPROSparm p 
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q 
                              where p.numprm=q.numprm
                              and q.datvig < getdate() 
                              and q.numprm =";

if($tiptrp==1 || $tiptrp =='Proprio'){

   $queryString = $queryString."2)"; 

}else{

   $queryString = $queryString."4)";     
}


$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];
$dtInicio = $arrayValTeto['inicio'];


//Fim tratamento

$mat = $_SESSION['matricula'];

$datcad = date('Y/m/d H:i:s'); 

$info = $_POST['data'];
$data = json_decode($info);

foreach ($data as $key) {

  
  #tratamento data para envio do banco
  $seqpre = $idAbr;
  $tiptrp =$key->destrp;
  $datpre1=$key->datpre;
  $numevt=$evt;
  $datpreExplod = explode("/",$datpre1);
  $datpre = $datpreExplod[2]."/".$datpreExplod[1]."/".$datpreExplod[0];
  #####################
  $qtdcli=0;
  $qtdkm =$key->quilometro ;
  $vlrdes=$key->vlrdes;
  $juspre=$key->juspre;
  if($tiptrp==1 || $tiptrp=="Proprio"){
    $tiptrp=1;
    $odoini=$key->odoini;
    $odofim=$key->odofim;
  }else{
    $tiptrp=2;
    $odoini=0;
    $odofim=0;

  }

  //Tratamento para verificar se existe dias duplicados
  $row="SELECT datpre FROM tPROSprde WHERE datpre='$datpre' AND seqpre =$idAbr";
  $duplicData = mssql_query($row);
  $rowData = mssql_num_rows($duplicData);
  //Fim Tratamento
  //Tratamento para pegar total do planejamento
  $valMax = mssql_query("SELECT vlrpre FROM tPROSabpr WHERE numseq = $idAbr");
  $arrayValMax = mssql_fetch_array($valMax);
  $vlrpre = $arrayValMax['vlrpre'];
  
$query = "INSERT INTO  tPROSprde(matsol,seqpre, datpre, datcad, tiptrp, qtdcli, qtdkm, vlrdes, juspre,numevt,odofim,odoini)
                VALUES('$mat','$seqpre','$datpre','$datcad',$tiptrp,'$qtdcli','$qtdkm','$vlrdes','$juspre',$numevt,$odofim,$odoini)";
    
$dados = mssql_query($query) or die('Erro ao Inserir cadastro de prestação');
}
#=========================================================================================================
 if($dados){
   
    echo "{success:true}"; //sucesso
    #var_dump($query);
         
 }else{

    echo "{success:false}"; //falha 
    #var_dump($query);   
 }
