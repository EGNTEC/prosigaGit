<?php
session_start();
//require("../session.php");
include("../conn.php");

//Variaveis utilizadas para o filtro.
$nomecol = $_GET['colaborador'];
$niv     = $_GET['codniv'];
$col     = $_GET['matricula'];
$codreg  = $_GET['codreg'];
$codund  = $_GET['codund'];

$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];
$mes    = $_GET['mes'];
$ano    = $_GET['ano'];

$queryString = "Select Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS mesref,

	   (Select Coalesce ((Select	max(Convert(Varchar(10), datlim, 103))
	   From		tPROSlipr lipr
	   Where	lipr.numseq = abpr.numseq),
	   Convert(Varchar(10), abpr.datlim, 103) )) as dtfim,

	   func.nomloc AS nomloc,
	   func.numcad AS numcad,
	   func.nomfun AS nomfun,
	   func.titred AS titred,
	   abpr.qtdkm  AS qtdkm,
	   abpr.juspre AS juspre,
	   abpr.vlrpre AS vlrpre,
	   tptr.destrp AS destrp,
	   abpr.stspre AS stspre,
	   stts.dessts AS dessts,
	   abpr.numseq AS numseq,
	   abpr.seqpla AS seqpla,
	   abpl.tiptrp AS tiptrp,
	   (select vlrtrp from tPROSprtr prtr
			where prtr.tiptrp = abpl.tiptrp
			and		prtr.datvig = (select max(datvig) from tPROSprtr prtr2
									where prtr2.tiptrp = prtr.tiptrp
									and	  prtr2.datvig <= abpl.datpla)) as vlrtrp

	FROM tPROSabpr abpr
			INNER JOIN tPROSabpl abpl ON abpr.seqpla = abpl.numseq
			INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
			INNER JOIN tPROSstts stts ON abpr.stspre = stts.numsts
			INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
";

switch($niv){

   case 4:
		$queryCond = "  WHERE abpl.matfun = '$col'";
		break;

	case 3:
	    $queryCond = "  WHERE func.numloc = '$codund'";
        if($mat!=""){
	    	$queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
	    }
	    else
	    if($mat=="" && $reg=="" && $und=="" && $sts=="" && $mes=="" && $ano==""){

           $queryCond = $queryCond."  AND abpr.stspre not in(4) ";
	    }
	    /*if($sts==""){
            $queryCond =  $queryCond." AND abpl.stspla = 1";
	    }*/
	    break;
    case 2:
		$queryCond = "  WHERE func.numreg = '$codreg'";
		if($mat!=""){
			$queryCond = $queryCond."  AND abpl.matfun = '$mat'";

		}else
	    if($und!=""){
	    	$queryCond = $queryCond."  AND func.numloc = '$und'";

	    }
	    if($sts==""){
            $queryCond = $queryCond."  AND abpr.stspre not in(4)";
	    }

	  	break;
	case 1:
	   $queryCond ="";

	    if($mat!="" && $reg!="" && $und!=""){
			$queryCond = " WHERE func.numreg = $reg AND abpl.matfun = '$mat'";
		}else
		if($und!="" && $reg!=""){
	    	$queryCond = " WHERE func.numreg = $reg AND func.numloc = '$und'";
	    }else
	    if($reg!=""){
	        $queryCond = " WHERE func.numreg = $reg";
	    }else
	    if($mat=="" && $reg=="" && $und=="" && $sts=="" && $mes=="" && $ano==""){

           $queryCond = $queryCond."  AND abpr.stspre not in(4) ";
	    }

	  	break;
}

if($sts!="" && $sts!=99){
    $queryCond = $queryCond."  AND abpr.stspre = '$sts'";
}
if($mes!=""){


    $queryCond =  $queryCond." AND DATEPART(MONTH,datpla) ='$mes' ";
}
if($ano!=""){

	$queryCond =  $queryCond." AND DATEPART(YEAR,datpla) ='$ano'";
}

$querySelect = $queryString.$queryCond;
//var_dump($querySelect);

$query = mssql_query($querySelect) or die('Erro ao filtrar aberturas');

// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-gerencial-prestacao.xls';
//$arquivo = 'prossiga-gerencial-prestacao.pdf';
//$arquivo = 'prossiga-gerencial-prestacao.txt';
// Criamos uma tabela HTML com o formato da planilha

$html = '';
$html .= '<table>';
$html .= '<tr>';
$html .= '<td colspan="7"><b>Gerenciar Prestacoes</b></tr>';
$html .= '</tr>';
$html .= '<tr>';
$html .= '<td><b>Referencia</b></td>';
$html .= '<td><b>Data limite</b></td>';
$html .= '<td><b>Matricula</b></td>';
$html .= '<td><b>Nome</b></td>';
$html .= '<td><b>Cargo</b></td>';
$html .= '<td><b>Transporte</b></td>';
$html .= '<td><b>Valor</b></td>';
$html .= '<td><b>Situacao</b></td>';
$html .= '<td><b>Local</b></td>';
$html .= '</tr>';


while ($array = mssql_fetch_array($query)) {

$html.="<tr>";
$html.="<td>".$array['mesref']."</td>";
$html.="<td>".$array['dtfim']."</td>";
$html.="<td>".$array['numcad']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['titred']."</td>";
$html.="<td>".$array['destrp']."</td>";
$html.="<td>".$array['vlrpre']."</td>";
$html.="<td>".$array['dessts']."</td>";
$html.="<td>".$array['nomloc']."</td>";
$html.="</tr>";

}

$html .= '</table>';

// Configurações header para forçar o download
//header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
header ("Cache-Control: no-cache, must-revalidate");
header ("Pragma: no-cache");
header ("Content-type: application/x-msexcel");
//header ("Content-Type: application/text/plain");
//header ("Content-Type: application/pdf");
header ("Content-Disposition: attachment; filename=\"{$arquivo}\"" );
header ("Content-Description: PHP Generated Data" );
// Envia o conteúdo do arquivo
echo $html;

exit;
