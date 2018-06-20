<?php
session_start();
//require("../session.php");
include("../conn.php");

$col    = $_SESSION['matricula'];
$datHor = date('Y-m-d H:i:s');
$dataHoje = date('Y-m-d');

$data      = $_POST['data'];
$checkSld  = $_POST['checkSaldo'];//valores saldo positivo.

$selec = json_decode($data);

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

$text = "Prossiga - ".$idnumLot.".txt";
#comando para montar pasta compartilhada linux/windows na pasta etc/init.d/rc.local
#mount -t cifs //m002025/Deslocamentos /mnt/Deslocamentos -o uid=33,gid=33,user=10794,password=******

$arquivo = fopen ("/mnt/PagamentoProssiga/".$text, "w+");

foreach ($selec as $key) {

  //matricula do colaborador
    $mat = $key;


    if($checkSld=="true"){

      $String =  "SELECT Substring (Convert(Varchar(10), (Select Max (lote.datpla) From tPROSlote lote), 103),4,7) as mesref,
  	            func.numcad,
  	            func.nomfun,
  	            func.nomloc,
  	            func.numemp,
  	            func.codprg,
  	            'DES' + dbo.fn_retornar_estado_new(func.numreg) +
  	            Replicate ('0', 2-Len(Datepart (Month, Getdate()))) + Convert (Varchar(02), Datepart (Month, Getdate()))+
  	            Substring (Convert (Varchar(04), Datepart (Year, Getdate())),3,2) +
  	            Case func.codprg When 4002 Then 'C' Else 'A' End as numtit,
  	            func.codfor,
  	            0 As vlrpla,
  	            dbo.fn_buscar_saldo (func.numcad) as vlrsld,
  	            dbo.fn_buscar_saldo (func.numcad) as vlrpag,
  	            func.codccu,
                Convert (Varchar(10), Case When Convert (varchar(10), Getdate(), 108) > '12:00:00'
                                           Then
                                              Case When Datepart (dw,Getdate())+2 >= 7
                             Then Getdate()+5
                                                Else Getdate()+3
                                              End
                                        Else

                                            Case When Convert (varchar(10), Getdate(), 108) < '12:00:00'
                                           Then
                                              Case When Datepart (dw,Getdate())+2  > 7
                             Then Getdate()+4
                                                Else Getdate()+2
                                              End
                                           End
                                        End, 101) as ventit,
  	            func.codban,
  	            func.codage,
  	            Convert(Varchar(10),func.conban) + CONVERT(Varchar(01), digban) as numcta,
  	            9999 As numseq,
  	            func.numcad,
  	            1 As tiptrp,
  	            'Pag.Saldo' as destrans,
  	             Getdate() as datger,
  	            (Select Max (lote.datpla) From tPROSlote lote) As datpla,
  				0

  From	vPROSsldo sldo

  			Inner Join tVTRHfunc func On func.numcad = sldo.matfun

  Where	sldo.vlrsld > 0
  And  func.sitafa <> 7
  And		Not Exists (Select 1 From tPROSabpl abpl
  						Where	abpl.matfun = sldo.matfun
  						And		abpl.datpla = (Select Max (lote.datpla) From tPROSlote lote))

  And   Not Exists (Select 1 From tPROSlote lote
                    Where  lote.numcad = sldo.matfun
                    And    lote.datpla = (Select Max (datpla) From tPROSlote))";

 }else {

      $String = "Select Substring (Convert(Varchar(10), abpl.datpla, 103),4,7) as mesref,
         func.numcad,
         func.nomfun,
         func.nomloc,
         func.numemp,
         func.codprg,
         'DES' + dbo.fn_retornar_estado_new(func.numreg) +
         Replicate ('0', 2-Len(Datepart (Month, datpla))) + Convert (Varchar(02), Datepart (Month, datpla))+
         Substring (Convert (Varchar(04), Datepart (Year, abpl.datpla)),3,2) +
         Case func.codprg When 4002 Then 'C' Else 'A' End as numtit,
         func.codfor,
         abpl.vlrpla,
         dbo.fn_buscar_lote (abpl.matfun) as vlrsld,
         case when abpl.vlrpla + dbo.fn_buscar_lote (abpl.matfun) < 0 then 0 else abpl.vlrpla + dbo.fn_buscar_lote (abpl.matfun) End as vlrpag,
         func.codccu,
         Convert (Varchar(10), Case When Convert (varchar(10), Getdate(), 108) > '12:00:00'
                                    Then
                                       Case When Datepart (dw,Getdate())+2 >= 7
 									    Then Getdate()+4
                                         Else Getdate()+2
                                       End
                                 Else

                                     Case When Convert (varchar(10), Getdate(), 108) < '12:00:00'
                                    Then
                                       Case When Datepart (dw,Getdate())+2 > 7
 									    Then Getdate()+3
                                         Else Getdate()+1
                                       End
                                    End
                                 End, 101) as ventit,
         func.codban,
         func.codage,
         Convert(Varchar(10),func.conban) + CONVERT(Varchar(01), digban) as numcta,
         abpl.numseq,
         abpl.matfun,
         abpl.tiptrp,
         Case abpl.tiptrp When 1 Then 'Proprio' Else 'Coletivo' End as destrans,
         Convert (varchar(10), Getdate(), 103) as datger,
         abpl.datpla,'T' as tipo,0

    From    tPROSabpl abpl

                        Inner Join tVTRHfunc func On
                    func.numcad = abpl.matfun

    Where    Not Exists (Select 1 From tPROSlote lote
                            Where lote.numseq = abpl.numseq)

    And  func.sitafa <> 7
    And  abpl.stspla = 3
    And func.numcad=$mat";

  }

$queryString = $String.$condicao_check.$condicao.$ref;

$query = mssql_query($queryString) or die('Erro ao filtrar planejamentos');

//Tratamento para montar o arquivo.

while ($arrayLote = mssql_fetch_array($query)) {

   //header("Content-type: application/force-download");
   //header("Cache-Control: no-cache, must-revalidate");
   //header("Pragma: no-cache");
   //header("Content-type: application/txt");
   //header("Content-Disposition: attachment; filename=\"{$text}\"" );

   $numcad    =$arrayLote['numcad'];  #matricula do colaborador
   $vlrpag    =$arrayLote['vlrpag'];  #valor a ser pago
   $numemp    =$arrayLote['numemp'];  #Empresa
   $codprg    =$arrayLote['codprg'];  #código do programa
   $numtit    =$arrayLote['numtit'];
   $codfor    =$arrayLote['codfor'];
   $codccu    =$arrayLote['codccu'];
   $venArq    =$arrayLote['ventit'];
   $ven       = explode('/',$venArq);
   $ventitArq = $ven[1].'/'.$ven[0].'/'.$ven[2];

   $ventit    =date('Y-m-d',strtotime($arrayLote['ventit']));
   //$ventitArq =date('d/m/Y',strtotime($arrayLote['ventit']));
   $codban =$arrayLote['codban'];
   $codage =$arrayLote['codage'];
   $numcta =$arrayLote['numcta'];
   $numseq =$arrayLote['numseq'];
   //$datger =$arrayLote['datger'];
   //$datger =date('Y-m-d',$arrayLote['datger']);
   $exp = explode('/',$datger);
   //$dtger = $exp[2].'-'.$exp[1].'-'.$exp[0];
   $dtger  =date('Y-m-d');
   $datpla =date('Y-m-d', strtotime($arrayLote['datpla']));
   $destrp =$arrayLote['destrans'];

   $vlrp = $vlrpag*100;
   $datg = date('d/m/Y');

   //Inseri a informação na tabela tProslote(tabela de lote)

   $string="INSERT INTO tProslote values('$idnumLot',$numemp,$codprg,'$numtit',$codfor,
                     $vlrpag,$codccu,'$ventit',$codban,$codage,$numcta,$numseq,
                     $numcad,'$dtger','$datpla',0) ";

  //Cálcular saldo para as pessoas do lote
  //$prSldo = mssql_query("Exec dbo.pr_calcular_saldo $numcad");

  //var_dump($string);
  $queryIns = mssql_query($string);

  //Tratamento de data de vencimento 01/18/2017
     $newVen = explode('/',$ventit);
     $newD   = $newVen[1];
     $newM   = $newVen[0];
     $newA   = $newVen[2];

     $ventit = $newD.'/'.$newM.'/'.$newA;   //";".$destrp"

 //Monta linha do arquivo

  $txt = "T".";".$numemp.";".$codprg.";".$numtit.";".$codfor.";".$codccu.";".$vlrp.";".$datg.";".$ventitArq.";".$codban.";".
  $codage.";".$numcta.";".$destrp."\r\n"."R"."\r\n";

   //echo $txt;
   if ($arquivo) {
   if (!fwrite($arquivo, $txt));
        //echo 'Arquivo atualizado com sucesso';
        //fclose($arquivo);
   }
 }

}

echo json_encode(0);
