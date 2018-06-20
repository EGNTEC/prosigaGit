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
 $String =" SELECT func.numcad as numcad,func.nomfun as nomfun,func.nomloc as nomloc,func.titred as titred,
 Case func.sitafa
 When 1 Then 'Trabalhando'
 When 2 Then 'Ferias'
 When 3 Then 'Auxilio Doenca'
 When 4 Then 'Acidente de Trabalho'
 When 6 Then 'Licença Maternidade'
 When 7 Then  'Demitido'
 When 14 Then 'Licença Medica'
 Else 'Outros'
 End as sitafa

  FROM tVTRHfunc func
 WHERE NOT EXISTS (Select 1 From tPROSabpl abpl Where
                  abpl.matfun = func.numcad
                  AND DATEPART(MONTH,abpl.datpla) = $mes
                  AND DATEPART(YEAR,abpl.datpla) = $ano)
 ---AND func.numreg=$regional
 --AND func.codniv in(4,3)
 AND func.codcar in(6700,7700,7100)";

 if($reg!=""){

    $String = $String." AND func.numreg=$reg";
 }else{

    if($niv==1){

    }else{

      $String = $String." AND func.numreg=$codreg";
    }

 }

 #WHERE sldo.matfun=243
 if($und!="" && $mat==""){

    $queryCond =" AND func.numloc=$und";
 }else
 if($und!="" && $mat!=""){

    $queryCond =" AND func.numloc=$und AND sldo.matfun=$mat";
 }

$queryString = $String.$queryCond;

//var_dump($queryString);
$query = mssql_query($queryString);

// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-gerencial-Nao Realizados.xls';
// Criamos uma tabela HTML com o formato da planilha

$html  = '';
$html .= '<table>';
$html .= '<tr>';
$html .= '<td colspan="7"><b>Planejamentos Nao Realizados</b></tr>';
$html .= '</tr>';
$html .= '<tr>';
$html .= '<td><b>Matricula</b></td>';
$html .= '<td><b>Nome</b></td>';
$html .= '<td><b>Cargo</b></td>';
$html .= '<td><b>Situacao</b></td>';
$html .= '<td><b>Local</b></td>';
$html .= '</tr>';

while ($array = mssql_fetch_array($query)) {

$html.="<tr>";
$html.="<td>".$array['numcad']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['titred']."</td>";
$html.="<td>".$array['sitafa']."</td>";
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
