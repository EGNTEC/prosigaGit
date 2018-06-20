<?php
session_start();
//require("../session.php");
include("../conn.php");

$codreg = $_GET['reg'];
$codunid= $_GET['unid'];
$check  = $_GET['check'];

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


/*if($check=='false' || $check=="" || $check==null){

   $condicao_check = " And dbo.fn_buscar_saldo (abpl.matfun) > 0";
}else{

   $condicao_check = " And dbo.fn_buscar_saldo (abpl.matfun) <= 0";
}*/

if($codreg!="" and $codunid==""){

  $condicao = "  And abpl.numreg =$codreg ";
}else
if($codreg!="" and $codunid!=""){

  $condicao = "  And abpl.numloc = $codunid ";
}

$queryString = $String.$condicao_check.$condicao ;

//var_dump($queryString);

$query = mssql_query($queryString) or die('Erro ao filtrar aberturas');

// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-lotes.xlsx';
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
$html .= '<td><b>Transporte</b></td>';
$html .= '<td><b>Planejado</b></td>';
$html .= '<td><b>Saldo</b></td>';
$html .= '<td><b>A depositar</b></td>';
$html .= '<td><b>Banco</b></td>';
$html .= '<td><b>Agencia</b></td>';
$html .= '<td><b>Conta</b></td>';
$html .= '<td><b>Local</b></td>';
$html .= '</tr>';


while ($array = mssql_fetch_array($query)) {

$html.="<tr>";
$html.="<td>".$array['mesref']."</td>";
$html.="<td>".$array['numcad']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['destrp']."</td>";
$html.="<td>".$array['vlrpla']."</td>";
$html.="<td>".$array['vlrsld']."</td>";
$html.="<td>".$array['vlrpag']."</td>";
$html.="<td>".$array['codban']."</td>";
$html.="<td>".$array['codage']."</td>";
$html.="<td>".$array['numcta']."</td>";
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
