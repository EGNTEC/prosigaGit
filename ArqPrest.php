<?php
//session_start();
//require("../session.php");
require("php/conn.php");
require("mpdf/mpdf.php");

$mesref = $_GET['mesref'];
$id = $_GET['id'];
$mat =$_GET['mat']; #matricula selecionado
$idtrans=$_GET['idtrans'];
$nom =$_GET['nom']; #colaboraddor selecionado
$qtdkm = $_GET['qtdkm'];
$totpre = number_format($_GET['totpre'], 2, '.', '');
$idpla = $_GET['idpla'];
$matLog = $_SESSION['matricula'];
$colLog = $_GET['colaborador'];
$cargoLog  = $_GET['cargo'];

$data = date('d/m/Y');

//Select que traz a justificativa.
$Just      = "SELECT * FROM tPROSabpr WHERE numseq=$id";
$queryJust = mssql_query($Just);
$arrayJust = mssql_fetch_array($queryJust);
$justificativa = $arrayJust['juspre'];

$QueryString = mssql_query("select func.numcad,
        func.nomloc as unidade,
        hior.nomloc as regional,
        func.emacom,
        func.codcar,
        func.titred,
        hior.usu_codprg as codprg
from    tVTRHfunc func

            inner join tVTRHhior hior on
                    hior.numloc = func.numreg

            inner join tPROStppe tppe on
                    tppe.codper = func.codniv

where   func.numcad = $mat");

$ArrayString = mssql_fetch_array($QueryString);

$unidade  = $ArrayString['unidade'];
$gerencia = $ArrayString['regional'];
$codpro   = $ArrayString['codprg'];
$titred   = $ArrayString['titred'];

if($codpro==1){

   $programa = "Crediamigo";
}else{

   $programa = "Agroamigo";
}

//select que traz o dia-a-dia da prestação
$sql_hist_pres= mssql_query("SELECT
            prde.numseq AS numseq,
            prde.seqpre AS seqpre,
            Convert (Varchar(10),prde.datpre, 103) AS datpre,
            prde.tiptrp AS tiptrp,
            prde.odoini AS odoini,
            prde.odofim AS odofim,
            tptr.destrp AS destrp,
            prde.qtdkm  AS quilometro,
            prde.vlrdes AS vlrdes,
            evt.numevt  AS numevt,
            evt.desevt  AS desevt,
            prde.juspre AS juspre,
			Case
				When prde.Tiptrp = 1 Then 'Km Inicial:'
				When prde.tiptrp = 2 Then 'Qtd. Passagem:'
				Else '-'
			End as 'Coluna1',
			Case
				When prde.Tiptrp = 1 Then 'Km Final:'
				When prde.tiptrp = 2 Then 'Vlr. Passagem:'
				Else '-'
			End as 'Coluna2'
     FROM tPROSprde prde
     INNER JOIN tPROStptr tptr ON prde.tiptrp=tptr.tiptrp
     INNER JOIN tPROStpev evt  ON evt.numevt=prde.numevt
     WHERE   seqpre = $id order by prde.datpre");

//select que traz o valor total da planejamento.
$stringPlan = mssql_query("SELECT vlrpla FROM tPROSabpl WHERE numseq = '$idpla'");
$arrayPlan  = mssql_fetch_array($stringPlan);
$vlr_solict = number_format($arrayPlan['vlrpla'], 2, '.', '');

//select que traz o saldo(diferença entre a prestação e o planejamento).
//$stringSaldo = mssql_query("SELECT sum(vlrpre) - (select sum(vlrpla) from tPROSabpl where matfun=$mat) AS saldo FROM tPROSabpr WHERE matfun='$mat'");
$stringSaldo=mssql_query("Select vlrsld as saldo from tPROSsldo where datref='$mesref' and  matfun=$mat");

$arraySaldo  = mssql_fetch_array($stringSaldo);

$saldo = $arraySaldo['saldo'];

$html = '<html>' .
                '<head>' .
                '<meta charset="UTF-8">' .
                '<title></title>' .
                '<link href="assets/bootstrap.css" rel="stylesheet">'.
                '</head>' .
                '<body>' .
                '<center></center>' .
                '<table border="1" rules="groups" style="font-size: 12px;font-family:Arial;">' .

                '<tr><td colspan="9">'.
                '<table border="0" rules="groups" style="font-weight:bold;font-family:Arial;" class="table">' .
                '<tbody>' .
                '<tr><td width="170" height="50"><img style="margin-left:10;width:200;" src="assets/img/inec.jpg"></img></td><td width="90"></td><td width="100"></td><td width="490" valign=bottom align="center" style="font-weight:bold;font-family:Arial;font-size: 22px;">RELAT&Oacute;RIO DE PRESTA&Ccedil;&Atilde;O DE CONTAS</td><td width="125"></td><td width="300"><img style="margin-left:300;height:70;width:170" src="assets/img/prossiga.jpg"></img></td></tr>'.
                //'<tr><td width="200" height="50"><img style="margin-left:300;height:70;" src="assets/img/logsis.jpg"></img></td><td width="200"></td><td width="100"></td><td width="490" valign=bottom align="center" style="font-weight:bold;font-family:Arial;font-size: 22px;">RELAT&Oacute;RIO DE PRESTA&Ccedil;&Atilde;O DE CONTAS</td><td width="100"></td><td width="432"><img style="margin-left:10;" src="assets/img/logo.jpg"></img></td></tr>'.
                '</table>' .
                '</td></tr>' .

                '<tr><td colspan="9">' .
                '<table border="0" rules="groups" style="font-size:12px;font-weight:bold;">' .
                '<thead>' .
                '<tr><td WIDTH="250">Matricula: ' . $mat . '</td><td WIDTH="400">Nome:' . $nom . '</td><td WIDTH="250">Programa: ' . $programa . '</td></tr>' .
                '<tr><td WIDTH="300">Unidade: ' . $unidade . '</td><td WIDTH="300">Ger&ecirc;ncia: ' . iconv('UTF-8', 'ISO-8859-1', $gerencia) . '</td></tr>' .

                '</thead>' .
                '</table>' .
                '</td></tr>' .
                '<tr><td></td></tr>'.
                '<tr><td colspan="9">' .
                '<table border="1" style="font-size:12px;font-weight:bold;" class="table table-bordered">' .
                '<thead>' .
                '<tr  style="color:#000000;background-color: #63B8FF;"><td WIDTH="100">Data</td><td WIDTH="100">Transporte</td>' .
                '<td WIDTH="130"></td><td WIDTH="80"></td><td WIDTH="130"></td><td WIDTH="80"></td>'.
                '<td WIDTH="100">Quilometragem</td><td WIDTH="100">Valor Total</td><td WIDTH="690">Trajeto Percorrido</td>' .
                '</tr>' .
                '</thead>'.
                '<tbody>';
           while ($array = mssql_fetch_array($sql_hist_pres)) {


            $html.="<tr>";
            $html.="<td height='15'>".$array['datpre']."</td>";
            $html.="<td>".$array['destrp']."</td>";
            $html.="<td>".$array['Coluna1']."</td>";
            $html.="<td>".$array['odoini']."</td>";
            $html.="<td>".$array['Coluna2']."</td>";
            $html.="<td>".$array['odofim']."</td>";
            $html.="<td>".$array['quilometro']."</td>";
            $html.="<td>".$array['vlrdes']."</td>";
            $html.="<td>".utf8_decode($array['juspre'])."</td>";
            $html.="</tr>";
        }

        $html.='</tbody>' .
                '</table>' .
                '</td></tr>' .

                '<tr><td colspan="9">' .
                '<table border="0" rules="groups" style="font-size:11px;font-weight:bold;">' .
                '<thead>' .
                '<tr><td colspan="9">Justificativa: ' .$justificativa.'</td></tr>'.
                '<tr><td WIDTH="200">Valor Planejado:'.$vlr_solict.'</td><td WIDTH="200">Total de KM:'.$qtdkm.'</td><td WIDTH="200">Valor Utilizado:'.$totpre.'</td><td WIDTH="230">Saldo Atual:'.number_format($saldo, 2, ".", "").'</td></tr>'.
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td colspan="9">Responsabilizo-me pela veracidade das informa&ccedil;&otilde;es constantes neste documento, referentes aos deslocamentos realizados por mim, em servi&ccedil;o, neste m&ecirc;s.</td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td><td><hr></hr></td><td></td><td><hr></hr></td></tr>' .
                '<tr><td></td><td>'.$colLog.'</td><td></td><td>'.$nom.'</td></tr>' .
                '<tr><td></td><td>'.$cargoLog.'</td><td></td><td>'.$titred.'</td></tr>' .
                '</thead>' .
                '</table>' .
                '</td></tr>' .

                '<tr><td colspan="9">'.
                '<table border="1" rules="groups" style="font-size:11px;font-weight:bold;">'.
                '<thead>'.
                '<tr><td width="1522">'.$data.'-'.$colLog.'</td></tr>'.
                '</thead>'.
                '</table>'.
                '</td></tr>'.

                '</table>' .
                '</body>' .
                '</html>';

$html=utf8_encode($html);
$saida="Prestação de contas -".$nom."-".$mesref.".pdf" ;
//$diretorio = "https://novoprossiga.inec.org.br/pdfteste.pdf";

$mpdf = new mPDF();

$mpdf->WriteHTML($html);
$mpdf->Output("$saida", "D");//I-Abrir em outra aba, D-Força o download
//$mpdf->Output('$diretorio','F');

exit;
