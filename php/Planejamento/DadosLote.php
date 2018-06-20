<?php
session_start();
require("../session.php");
include("../conn.php");

$programa= $_SESSION['programa'];
$codreg = $_GET['reg'];
$codunid= $_GET['unid'];
$check  = $_GET['check'];//valores zerados.
$checkSld  = $_GET['checkSld'];//valores saldo positivo.
$checkPos = $_GET['checkPos'];//valores saldo negativos.
$mes = $_GET['mes'];
$ano = $_GET['ano'];
$bt = $_GET['btn'];
$info = $_POST['data'];

//Adicionar filtro por programa
$queryPrograma = " And func.codprg = $programa ";

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
            ";

$queryString = $String.$queryPrograma;

}else{

     $String = "SELECT Substring (Convert(Varchar(10), abpl.datpla, 103),4,7) as mesref,
        func.numcad as numcad,
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
                                End, 101) as ventit,
        func.codban,
        func.codage,
        Convert(Varchar(10),func.conban) + CONVERT(Varchar(01), digban) as numcta,
        abpl.numseq,
        abpl.matfun,
        abpl.tiptrp,
        Case abpl.tiptrp When 1 Then 'Proprio' Else 'Coletivo' End as destrans,
        Getdate() as datger,
        abpl.datpla,0

   From    tPROSabpl abpl

                       Inner Join tVTRHfunc func On
                   func.numcad = abpl.matfun

   Where    Not Exists (Select 1 From tPROSlote lote
                           Where lote.numseq = abpl.numseq)

  And       Not Exists(Select 1 From tPROSabpr abpr
                      Where  abpr.matfun = abpl.matfun
                      And  abpr.stspre <> 4)
  And  func.sitafa <> 7
  And  abpl.stspla = 3";


   if($check=='false' || $check=="" || $check==null){

      $condicao_check = " And abpl.vlrpla + dbo.fn_buscar_lote (abpl.matfun) > 0";
   }else{

      $condicao_check = " And abpl.vlrpla + dbo.fn_buscar_lote (abpl.matfun) <= 0";
   }

   if($codreg!="" and $codunid==""){

     $condicao = "  And abpl.numreg =$codreg ";
   }else
   if($codreg!="" and $codunid!=""){

     $condicao = "  And abpl.numloc = $codunid ";
   }

   if($mes!="" && $ano==""){

       $ref =  " AND DATEPART(MONTH,abpl.datpla) ='$mes' ";
   }else
   if($ano!="" && $mes==""){

   	$ref =  " AND DATEPART(YEAR,abpl.datpla)  ='$ano' ";
   }else
   if($ano!="" && $mes!=""){

   	$ref =  " AND DATEPART(YEAR,abpl.datpla)  ='$ano' AND DATEPART(MONTH,abpl.datpla) ='$mes'";
   }

   $queryString = $String.$condicao_check.$condicao.$ref.$queryPrograma;

}
//var_dump($queryString);
//consulta sql
$query = mssql_query($queryString) or die('Erro ao filtrar planejamentos');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($cadplan = mssql_fetch_assoc($query)) {
    //Executar procedure que cálcula o saldo.
    $col    = $cadplan['numcad'];
    $prSldo =mssql_query("Exec dbo.pr_calcular_saldo $col");
    //Enviar informação para a grid
    $rows['data'][] = $cadplan;
}

//encoda para formato JSON
echo json_encode($rows);
