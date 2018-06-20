<?php
session_start();
require("../session.php");
include("../conn.php");

//variavel global
$col = $_SESSION['matricula'];

$info = $_POST['data'];
$btnRbr = $_POST['btnRbr'];

$mesH = date('m');
$diaH = date('d');

$dataHoje = date('Y-m-d H:i:s');

#$text = "Solicitacao -".$dataHoje.".json";

#comando para montar pasta compartilhada linux/windows na pasta etc/init.d/rc.local
#mount -t cifs //m002025/Deslocamentos /mnt/Deslocamentos -o uid=33,gid=33,user=10794,password=******

#$arquivo = fopen ("/home/gomes/Documentos/arquivo/".$text, "w+");
#$arquivo = fopen ("/mnt/Deslocamentos/".$text, "w+");

$data = json_decode($info);

if($btnRbr!=2 && $btnRbr!=3){

foreach ($data as $key) {
   
   $sitOri=$key->stspla;
   $sit=$key->stspla;
   $id=$key->numseq;
   $datpla =$key->datpla;

  $explode= explode("/", $datpla);
  $mes = $explode[0];
  $ano = $explode[1];
   
   switch ($sit) {
   	case 0:
   		$sit = 1;
   		break;

   	case 1:
   		$sit = 2;
   		break;

   	case 2:
   		$sit = 3;
   		break;

   }

   if($btnRbr==1){

     $queryUpdt = "UPDATE tPROSabpl SET stspla=0 WHERE numseq = '$id' ";
      
   }else{

     if($sitOri==2 && $mes!=$mesH && $ano!=$anoH){
       
      $queryUpdt = "UPDATE tPROSabpl SET stspla=3 WHERE numseq = '$id' ";
    }else
     if($sitOri==2 && $mes==$mesH && $ano==$anoH){

      $queryUpdt = "UPDATE tPROSabpl SET stspla='$sit' WHERE numseq = '$id' ";
    }else{

      $queryUpdt = "UPDATE tPROSabpl SET stspla='$sit' WHERE numseq = '$id' ";
      
    }

  }

   $query = mssql_query($queryUpdt) or die('Erro ao alterar registro.');
}

if($query){
   
    echo "{success:true}"; //sucesso
    #var_dump($queryUpdt);
    
 }else{

    echo "{success:false}"; //falha
    #var_dump($queryUpdt);        
 }

}
 //==================================================================================================================
 /*if($btnRbr==2){ //Tratamento para geração do arquivo
 
  foreach ($data as $key) {

  $numcad =$key->numcad ;
  $vlrpla =$key->vlrpla ;
  $destrp =$key->destrp;
  $datpla =$key->datpla;

  $queryString = "SELECT numemp,codfor,codprg,codban,codage,conban,digban,codccu FROM tVTRHfunc WHERE numcad=$numcad";  
  $query= mssql_query($queryString);

  $array = mssql_fetch_array($query);
   
  //variaveis array

  $codprg = $array['codprg'];
  $codban = $array['codban']; 
  $codage = $array['codage'];
  $conban = $array['conban'];
  $numemp = $array['numemp'];
  $codfor = $array['codfor'];
  $digban = $array['digban'];
  $codccu = $array['codccu'];
  
  //variavel descrição
  $explode= explode("/", $datpla);
  $mes = $explode[0];
  $ano = $explode[1];

  if($codprg==4002){
    
      $prog = "CRE";
  }else{
      $prog = "AGR";
  } 

  $desc = "DES".$prog.$mes.$ano;

  //Monta linha do arquivo

  $txt = "T".";".$numemp.";".$codprg.";".$desc.";".$codfor.";".$codccu.";".$vlrpla.";".$dataHoje.";".$codban.";".$codage.";".$conban.$digban.";".$destrp."\r\n"."R"."\r\n";    

  if ($arquivo) {
  if (!fwrite($arquivo, $info));
        //echo 'Arquivo atualizado com sucesso';
        //fclose($arquivo);
  }


}

if($query){
   
    echo "{success:true}"; //sucesso
        
 }else{

    echo "{success:false}"; //falha
 }

 }*/
 //==================================================================================================================
 
