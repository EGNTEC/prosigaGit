<?php
session_start();
require("../session.php");
include("../conn.php");

$col  = $_SESSION['matricula'];
$niv  = $_SESSION['codniv'];

$mat  = $_GET['mat'];
$und  = $_GET['und'];
$reg  = $_GET['reg'];
$act  = $_GET['act'];
$mes  = $_GET['mes'];
$ano  = $_GET['ano'];
$dtf  = $_GET['dtf'];
$trp  = $_GET['trp'];

if($act==3){

 $queryString = "SELECT Substring (Convert(Varchar(10), (Select Max (lote.datpla) From tPROSlote lote), 103),4,7) as datpla,
	            func.numcad,
	            func.nomfun,
	            func.nomloc,
				func.numreg AS numreg,
			    func.numloc AS numloc,
	            func.numemp,
	            func.codprg,
				func.titred AS cargo,
				'---------' AS dessts,
				'---------' As destrp,
	            'DES' + dbo.fn_retornar_estado_new(func.numreg) +
	            Replicate ('0', 2-Len(Datepart (Month, Getdate()))) + Convert (Varchar(02), Datepart (Month, Getdate()))+
	            Substring (Convert (Varchar(04), Datepart (Year, Getdate())),3,2) +
	            Case func.codprg When 4002 Then 'C' Else 'A' End as numtit,
	            func.codfor,
	            0 As vlrpla,
	            dbo.fn_buscar_saldo_negativo (func.numcad) as  vlrpla,
	            func.codccu,
	            Convert (Varchar(10), Case When Convert (varchar(10), Getdate(), 108) > '12:00:00' Then
	            							Case When Datepart (dw,Getdate()+1) = 7 Then Getdate()+3
	            							Else Getdate()+1
	            							End
	            					  Else Getdate()
	            					  End, 101) as ventit,
	            func.codban,
	            func.codage,
	            Convert(Varchar(10),func.conban) + CONVERT(Varchar(01), digban) as numcta,
	            9999 As numseq,
	            func.numcad,
	            1 As tiptrp,
	            'Pag.Saldo' as destrans,
	            Getdate() as datger,
	            0

From	vPROSsldo sldo

			Inner Join tVTRHfunc func On func.numcad = sldo.matfun

Where	sldo.vlrsld < 0

And		Not Exists (Select 1 From tPROSabpl abpl
						Where	abpl.matfun = sldo.matfun
						And		abpl.datpla = (Select Max (lote.datpla) From tPROSlote lote))";

}else{

  $queryString = "SELECT distinct Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS datpla,
			func.nomloc AS nomloc,
			func.numcad AS numcad,
			func.nomfun AS nomfun,
			func.numreg AS numreg,
			func.numloc AS numloc,
			func.titred AS cargo,
			abpl.qtdcli AS qtdcli,
			abpl.qtdkm  AS qtdkm,
			abpl.vlrpla AS vlrpla,
			tptr.destrp AS destrp,
			abpl.stspla AS stspla,
			stts.dessts AS dessts,
			abpl.numseq AS numseq,
			abpl.tiptrp AS tiptrp,
	   (select vlrtrp from tPROSprtr prtr
			where prtr.tiptrp = abpl.tiptrp
			and		prtr.datvig = (select max(datvig) from tPROSprtr prtr2
									where prtr2.tiptrp = prtr.tiptrp
									and	  prtr2.datvig <= abpl.datpla)) as vlrtrp,
		Convert (Varchar(10),abpl.datpla, 103) AS data

	FROM tPROSabpl abpl

		INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
		INNER JOIN tPROSstts stts ON abpl.stspla = stts.numsts
		INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
		INNER JOIN tPROSprtr prtr ON prtr.tiptrp = abpl.tiptrp ";


	if($mat!="" && $reg!="" && $und!=""){

		$queryCond = " WHERE func.numreg = $reg AND abpl.matfun = '$mat'";
	 }else
	 if($und!="" && $reg!=""){

	    $queryCond = " WHERE func.numreg = $reg AND func.numloc = '$und'";
	 }else
	 if($reg!=""){

     $queryCond = " WHERE func.numreg = $reg";
	 }

   if($mat=="" && $reg=="" && $und==""){

     if($niv==1){

      }else{

        $queryCond = " WHERE func.numreg = $reg";
     }

	 }

    if($mes!=""){

      $queryCond =  $queryCond." AND DATEPART(MONTH,datpla) ='$mes' ";
    }

    if($ano!=""){

	  $queryCond =  $queryCond." AND DATEPART(YEAR,datpla) ='$ano'";
    }

   if($niv!=1){
      $extra = "AND abpl.stspla=0";
   }

}
    $querySelect = $queryString.$queryCond.$extra;

	 //var_dump($querySelect);

    $query = mssql_query($querySelect) or die('Erro ao filtrar planejamentos');

    $rows = array('data' => array());
    while($admplancon = mssql_fetch_assoc($query)) {
      $rows['data'][] = $admplancon;
    }

    echo json_encode($rows);
