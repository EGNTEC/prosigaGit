<?php
session_start();
//require("../session.php");
include("conn.php");

$String ="SELECT  FUNC.numcad AS numcad,
       FUNC.nomfun AS nomfun,
       FUNC.nomloc AS nomloc,
       Convert (Varchar(10),ABPL.datpla, 103) AS datpla,

     (Select Coalesce ((Select    Convert(Varchar(10), datlim, 103)
      From        tPROSlipr lipr
      Where    lipr.numseq = abpr.numseq),
      Convert(Varchar(10), abpr.datlim, 103) )) as dtfim,

         ABPR.numseq AS numseq

FROM  tPROSabpl ABPL

           INNER JOIN tPROSabpr ABPR ON ABPR.seqpla = ABPL.NUMSEQ
           INNER JOIN tVTRHfunc FUNC ON FUNC.NUMCAD = ABPL.MATFUN

--WHERE ABPR.STSPRE = 0 -> situação em aberto.
WHERE ABPR.STSPRE Not In (4)
AND   ABPR.DATLIM < Getdate()
AND   NOT EXISTS (SELECT 1 FROM TPROSLIPR LIPR
                 WHERE    LIPR.NUMSEQ = ABPR.NUMSEQ
                 AND      LIPR.DATLIM >= Convert (Datetime, (Convert (Varchar(10), Getdate(), 101))))";

$queryString = $String;

//var_dump($queryString);

$query = mssql_query($queryString);

// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-gerencial-liberacao.xls';
// Criamos uma tabela HTML com o formato da planilha

$html = '';
$html .= '<table>';
$html .= '<tr>';
$html .= '<td colspan="8"><b>Relatorio Liberar Prestacao</b></tr>';
$html .= '</tr>';
$html .= '<tr>';
$html .= '<td><b>Matricula</b></td>';
$html .= '<td><b>Nome</b></td>';
$html .= '<td><b>Local</b></td>';
$html .= '<td><b>Referencia</b></td>';
$html .= '<td><b>Data Limite</b></td>';
$html .= '</tr>';


while ($array = mssql_fetch_array($query)) {

$html.="<tr>";
$html.="<td>".$array['numcad']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['nomloc']."</td>";
$html.="<td>".$array['datpla']."</td>";
$html.="<td>".$array['dtfim']."</td>";

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
