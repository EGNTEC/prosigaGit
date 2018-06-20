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


//Select utilizado para o filtro.
 $queryString = "SELECT distinct Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS datpla,
			func.nomloc AS nomloc,
			func.numcad AS numcad,
			func.nomfun AS nomfun,
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

switch ($niv) {
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

            $queryCond = $queryCond."  AND abpl.stspla not in(4) ";
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
            $queryCond = $queryCond."  AND abpl.stspla not in(4)";
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

            $queryCond = $queryCond."  AND abpl.stspla not in(4) ";
	    }

	  	break;

}

if($sts!="" && $sts!=99){
    $queryCond = $queryCond."  AND abpl.stspla = '$sts'";
}
if($mes!=""){


    $queryCond =  $queryCond." AND DATEPART(MONTH,datpla) ='$mes' ";
}
if($ano!=""){

	$queryCond =  $queryCond." AND DATEPART(YEAR,datpla) ='$ano'";
}

#$queryOrder = "  ORDER by abpl.datpla desc";

$querySelect = $queryString.$queryCond;
#var_dump($querySelect);

//consulta sql

$query = mssql_query($querySelect) or die('Erro ao filtrar aberturas');


// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-gerencial.xls';
// Criamos uma tabela HTML com o formato da planilha

$html = '';
$html .= '<table>';
$html .= '<tr>';
$html .= '<td colspan="7"><b>Gerenciar Planejamentos</b></tr>';
$html .= '</tr>';
$html .= '<tr>';
$html .= '<td><b>Referencia</b></td>';
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
$html.="<td>".$array['datpla']."</td>";
$html.="<td>".$array['numcad']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['cargo']."</td>";
$html.="<td>".$array['destrp']."</td>";
$html.="<td>".$array['vlrpla']."</td>";
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
//header ("Content-Type: text/plain");
header ("Content-Disposition: attachment; filename=\"{$arquivo}\"" );
header ("Content-Description: PHP Generated Data" );
// Envia o conteúdo do arquivo
echo $html;

exit;
