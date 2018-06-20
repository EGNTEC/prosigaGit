<?php
session_start();
require("../../session.php");
include("../../conn.php"); 
include("../../../mpdf/mpdf.php");

$numreg = $_GET['codreg'];
$numloc = $_GET['codund'];
$local  = $_GET['local'];
$niv    = $_SESSION['codniv'];
$data   = date('d/m/Y');

$QueryString = "SELECT  func.numcad,
                              func.nomfun, 
                              func.titred, 
                              IsNull (abpl.qtdkm,0) as qtdkm, 
                              IsNull (abpl.vlrpla,0) as vlrpla,
                              IsNull (stts.dessts,'Nao Aberto') as Status
        
                            From  tVTRHfunc func  Left Join tPROSabpl abpl on 
                            abpl.numloc = func.numloc
                            And abpl.matfun = func.numcad            
                            And  datepart (Year, abpl.datpla) = datepart (Year, Getdate()) 
                            And  datepart (Month, abpl.datpla) = datepart (Month, Getdate())
                            Left Join tPROSstts stts on stts.numsts = abpl.stspla 
                            Where func.codcar = 7700 ";
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
                '<tr><td WIDTH="500"><img src="https://novoprossiga.inec.org.br/resources/images/logo.png"></img></td><td WIDTH="200"></td><td WIDTH="200"></td WIDTH="300"><td WIDTH="100">Data:' . $data . '</td></tr>' .
                '<tr><td colspan="5" height="60" align="center" cellpadding="75" style="font-size: 20px;font-family:Arial;">RELAT&Oacute;RIO DE PLANEJAMENTOS N&Atilde;O REALIZADOS</td></tr>' .
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
                '<td WIDTH="100">Cargo</td><td WIDTH="100">KM</td><td WIDTH="150">Valor do Planejamento</td><td WIDTH="100">Situa&ccedil;&atilde;o</td>' .
                '</tr>' .
                '</thead>'.
                '<tbody>';

           while ($array = mssql_fetch_array($Query)) {
            
            $html.="<tr>";
            $html.="<td>".$array['numcad']."</td>";
            $html.="<td>".$array['nomfun']."</td>";
            $html.="<td>".$array['titred']."</td>";
            $html.="<td>".$array['qtdkm']."</td>";
            $html.="<td>".$array['vlrpla']."</td>";
            $html.="<td>".$array['Status']."</td>";
            $html.="</tr>";
        }

        $html.='</tbody>' .
                '</table>' .
                '</td></tr>' .
                
                /*'<tr><td colspan="5">' .
                '<table border="0" rules="groups" style="font-size:11px;font-weight:bold;">' .
                '<thead>' .
                '<tr><td WIDTH="200">Valor Planejado:'.$vlr_solict.'</td><td WIDTH="200">Total de KM:'.$qtdkm.'</td><td WIDTH="200">Valor Utilizado:'.$totpre.'</td><td WIDTH="230">Saldo Atual:'.number_format($saldo, 2, ".", "").'</td></tr>'.
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td colspan="5">Responsabilizo-me pela veracidade das informa&ccedil;&otilde;es constantes neste documento, referentes aos deslocamentos realizados por mim, em servi&ccedil;o, neste m&ecirc;s.</td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td></td></tr>' .
                '<tr><td><hr></hr></td><td></td><td><hr></hr></td></tr>' .
                '<tr><td>'.$colLog.'</td><td></td><td>'.$nom.'</td></tr>' .
                '<tr><td>'.$cargoLog.'</td><td></td><td>'.$titred.'</td></tr>' .
                '</thead>' .
                '</table>' .
                '</td></tr>' .*/
                '</table>' .
                '</body>' .
                '</html>';
        
$html=utf8_encode($html); 
$saida="Planejamentos Não Realizados.pdf" ;

$mpdf = new mPDF();

$mpdf->WriteHTML($html);
$mpdf->Output("$saida", "I");
    

exit;

