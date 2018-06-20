<?php
session_start();
require("../session.php");
include("../conn.php");

//variavel global
$col = $_SESSION['matricula'];
$info = $_POST['data'];

$datHor = date('Y-m-d H:i:s');
$dataHoje = date('Y-m-d');

#comando para montar pasta compartilhada linux/windows na pasta etc/init.d/rc.local
#mount -t cifs //m002025/Deslocamentos /mnt/Deslocamentos -o uid=33,gid=33,user=10794,password=******

$data = json_decode($info);

//==================================================================================================================
 //Atualizar a tabela de lotes
   
   $queryLote = mssql_query("SELECT seqlot FROM tPROSulot WHERE datlot ='$dataHoje' ");
   $arrayLote = mssql_fetch_array($queryLote);
   $seqlote = $arrayLote['seqlot'];

   if($seqlote=="" || $seqlote==0){

       $inserLot = mssql_query("INSERT INTO tPROSulot values ('$dataHoje',1)"); 
   }else{

       $updtLot  = mssql_query("UPDATE tPROSulot Set seqlot = seqlot + 1
              WHERE datlot ='$dataHoje' ");
   }

//Obter Lote Atualizado

   $numLote = mssql_query("SELECT Convert (Varchar(10), datlot ,112) + '.' 
                     + Replicate ('0', 3-Len(seqlot)) + Convert(Varchar(03), seqlot) as Lote
                    From tPROSulot Where datlot = '$dataHoje' ");

   $arraynumLot = mssql_fetch_array($numLote);
   $idnumLot = $arraynumLot['Lote'];

//Local do arquivo a ser salvo

$text = "Prossiga - ".$idnumLot."-".$col.".txt";

$arquivo = fopen ("/home/gomes/Documentos/arquivo/".$text, "w+");
#$arquivo = fopen ("/mnt/Deslocamentos/".$text, "w+");


//Tratamento para geração do arquivo
 
foreach ($data as $key) {

   $numcad =$key->numcad;  #matricula do colaborador
   $vlrpag =$key->vlrpag;  #valor a ser pago
   $numemp =$key->numemp;  #Empresa
   $codprg =$key->codprg;  #código do programa
   $numtit =$key->numtit;
   $codfor =$key->codfor;
   $codccu =$key->codccu;
   $ventit =$key->ventit;
   $codban =$key->codban;
   $codage =$key->codage;
   $numcta =$key->numcta;
   $numseq =$key->numseq;
   $datger =$key->datger;
   $datpla =$key->datpla;

   $vlrp = $vlrpag*100;
   $datg = date('d/m/Y'); 

  //Inseri a informação na tabela tProslote(tabela de lote)
   
   $string="INSERT INTO tProslote values('$idnumLot',$numemp,$codprg,'$numtit',$codfor,
                      $vlrpag,$codccu,'$ventit',$codban,$codage,$numcta,$numseq,
                      $numcad,'$datger','$datpla',0) "; 

  #var_dump($string);
  $query = mssql_query($string);

  //Monta linha do arquivo
  

   //Tratamento de data de vencimento 01/18/2017
     $newVen = explode('/',$ventit); 
     $newD   = $newVen[1]; 
     $newM   = $newVen[0];
     $newA   = $newVen[2];
     
     $ventit = $newD.'/'.$newM.'/'.$newA;
    
  $txt = "T".";".$numemp.";".$codprg.";".$numtit.";".$codfor.";".$codccu.";".$vlrp.";".$datg.";".$ventit.";".$codban.";".$codage.";".$numcta."\r\n"."R"."\r\n";    

  if ($arquivo) {

     if (!fwrite($arquivo, $txt));
        //echo 'Arquivo atualizado com sucesso';
        //fclose($arquivo);
   }

}

if($query){
   
    echo "{success:true}"; //sucesso
    #var_dump($string);
        
 }else{

    echo "{success:false}"; //falha
    #var_dump($string);
 }

 
 //==================================================================================================================
 

  