<?php
session_start();
//require("../session.php");
include("../conn.php");

$checkSld  = $_POST['checkSld'];//valores saldo positivo.//O method foi alterado para POST
$data      = $_POST['data'];

$selecionado = json_decode($data);

foreach ($selecionado as $key) {
    //$numcad =$key->numcad;

    $numcad = $key;

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
                   And    lote.datpla = (Select Max (datpla) From tPROSlote))

  And func.numcad=$numcad";

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
                                       Case When Datepart (dw,Getdate())+2  > 7
 									    Then Getdate()+3
                                         Else Getdate()+1
                                       End
                                    End
                                 End, 103) as ventit,
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
    And func.numcad=$numcad";

  }

   /* tratamento antigo vencimento arquivo
   Convert (Varchar(10), Case When Convert (varchar(10), Getdate(), 108) > '12:00:00' Then
   Case When Datepart (dw,Getdate()+1) = 7 Then Getdate()+3
   Else Getdate()+1
   End
   Else Getdate()
   End, 101) as ventit
   */

$queryString = $String;

//var_dump($queryString);

$query = mssql_query($queryString) or die('Erro ao filtrar planejamentos');

//Tratamento para montar o arquivo.

   //$vlrp = $vlrpag*100;
   //$datg = date('d/m/Y');

//Tratamento de data de vencimento 01/18/2017(formato)
     $newVen = explode('/',$ventit);
     $newD   = $newVen[1];
     $newM   = $newVen[0];
     $newA   = $newVen[2];

     $ventit = $newD.'/'.$newM.'/'.$newA;

 while($previsu = mssql_fetch_assoc($query)) {
     $rows['data'][] = $previsu;
 }

 }//fim foreach

 //encoda para formato JSON
 echo json_encode($rows);
