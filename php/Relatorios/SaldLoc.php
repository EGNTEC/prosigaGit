<?php
session_start();
require("../session.php");
include("../conn.php"); 
include("../../mpdf/mpdf.php");

$numreg = $_GET['codreg'];
$numloc = $_GET['codund'];
$local  = $_GET['local'];
$niv    = $_GET['niv'];
$data   = date('d/m/Y');

$QueryString = "SELECT func.numcad,
                 func.nomfun,
                 func.titred,
                 IsNull (sldo.vlrsld,0) as vlrsld From 
                tVTRHfunc func Left Join
         (Select  abpl.matfun, Sum (abpl.vlrpla) - Sum (abpr.vlrpre) as vlrsld
         From tPROSabpl abpl, tPROSabpr abpr Where abpl.matfun = abpr.matfun Group by abpl.matfun) as sldo
         on sldo.matfun = func.numcad Where func.codcar = 7700 ";

switch ($niv) {
    case 2:
        $condicao = "  And  func.numreg = $numreg"; 
        break;

    case 3:
        $condicao = "  And func.numloc = $numloc";
        break;
    
}

$String = $QueryString.$condicao;
$Query  = mssql_query($String);
//print_r($String);

$html = '<html>' .
                '<head>' .
                '<meta charset="UTF-8">' .
                '<title></title>' .
                '<link href="css/bootstrap.css" rel="stylesheet">'.
                '</head>' .
                '<body>' .
                '<center></center>' .
                '<table border="1" rules="groups" style="font-size: 12px;font-family:Arial;">' .
                  
                '<tr><td colspan="5">' .
                '<table border="0" rules="groups" style="font-weight:bold;font-family:Arial;" class="table">' .
                '<tbody>' .
                '<tr><td WIDTH="500"><img src="http://192.168.0.186/ext/resources/images/logo.png"></img></td><td WIDTH="200"></td><td WIDTH="200"></td WIDTH="300"><td WIDTH="100">Data:' . $data . '</td></tr>' .
                '<tr><td colspan="5" height="60" align="center" cellpadding="75" style="font-size: 20px;font-family:Arial;">RELAT&Oacute;RIO DE SALDOS POR LOCAL</td></tr>' .
                '</table>' .
                '</td></tr>'.
                
                '<tr><td colspan="5">' .
                '<table border="0" rules="groups" style="font-size:12px;font-weight:bold;">' .
                '<thead>' .
                '<tr><td WIDTH="300">Local: '.iconv('UTF-8', 'ISO-8859-1', $local).'</td></tr>' .
                '</thead>' .
                '</table>' .
                '</td></tr>' .
                //'<tr><td></td></tr>'.
                '<tr><td colspan="5">' .
                '<table border="1" style="font-size:12px;font-weight:bold;" class="table table-bordered">'.
                '<thead>' .
                '<tr style="color:#000000;background-color: #FFFF99;"><td WIDTH="100">Matricula</td><td WIDTH="100">Nome</td>' .
                '<td WIDTH="100">Cargo</td><td WIDTH="100">Saldo</td>' .
                '</tr>' .
                '</thead>'.
                '<tbody>';

           while ($array = mssql_fetch_array($Query)) {
            
            $html.="<tr>";
            $html.="<td>".$array['numcad']."</td>";
            $html.="<td>".$array['nomfun']."</td>";
            $html.="<td>".$array['titred']."</td>";
            $html.="<td>".$array['vlrsld']."</td>";
            $html.="</tr>";
        }

        $html.='</tbody>' .
                '</table>' .
                '</td></tr>'.
                '</table>' .
                '</body>' .
                '</html>';
        
$html=utf8_encode($html); 
$saida="Saldos por local.pdf" ;

$mpdf = new mPDF();

$mpdf->WriteHTML($html);
$mpdf->Output("$saida", "I");
    

exit;

