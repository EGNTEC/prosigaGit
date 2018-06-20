<?php
session_start();
//require("../session.php");
include("conn.php");

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

if($reg!=""){

   $regional =  $reg;
}else{

   $regional = $codreg;
}

if($niv==1){

  $String =" SELECT sldo.matfun as matfun,sldo.datref as datref,sldo.vlrpla as vlrpla,
                          sldo.vlrrec as vlrrec,sldo.vlrpre as vlrpre,sldo.vlrsld as vlrsld,
                      func.nomloc as nomloc,func.numloc as numloc,func.numreg as numreg,func.nomfun as nomfun
                  FROM tprossldo sldo
                     INNER JOIN tVTRHfunc func ON sldo.matfun = func.numcad";


                     if($und!="" && $mat==""){

                        $queryCond =" Where func.numloc=$und";
                     }else
                     if($und!="" && $mat!=""){

                        $queryCond =" Where func.numloc=$und AND sldo.matfun=$mat";
                     }

                     if($mes!=""){

                        $m = " AND DATEPART(MONTH,datpla) = $mes ";
                     }

                     if($ano!=""){

                        $a = " AND DATEPART(YEAR,datpla) = $ano ";
                     }
}else{

  $String =" SELECT sldo.matfun as matfun,sldo.datref as datref,sldo.vlrpla as vlrpla,
                          sldo.vlrrec as vlrrec,sldo.vlrpre as vlrpre,sldo.vlrsld as vlrsld,
                      func.nomloc as nomloc,func.numloc as numloc,func.numreg as numreg,func.nomfun as nomfun
                  FROM tprossldo sldo
                     INNER JOIN tVTRHfunc func ON sldo.matfun = func.numcad
                WHERE func.numreg=$regional";

                #WHERE sldo.matfun=243
                if($und!="" && $mat==""){

                   $queryCond =" AND func.numloc=$und";
                }else
                if($und!="" && $mat!=""){

                   $queryCond =" AND func.numloc=$und AND sldo.matfun=$mat";
                }

                if($mes!=""){

                   $m = " AND DATEPART(MONTH,datpla) = $mes ";
                }

                if($ano!=""){

                   $a = " AND DATEPART(YEAR,datpla) = $ano ";
                }

}

$queryString = $String.$queryCond.$m.$a;

//var_dump($queryString);

$query = mssql_query($queryString);

// Definimos o nome do arquivo que será exportado
$arquivo = 'prossiga-gerencial-valores.xls';
// Criamos uma tabela HTML com o formato da planilha

$html = '';
$html .= '<table>';
$html .= '<tr>';
$html .= '<td colspan="8"><b>Gerenciar Valores</b></tr>';
$html .= '</tr>';
$html .= '<tr>';
$html .= '<td><b>Referencia</b></td>';
$html .= '<td><b>Matricula</b></td>';
$html .= '<td><b>Nome</b></td>';
$html .= '<td><b>Local</b></td>';
$html .= '<td><b>Planejado</b></td>';
$html .= '<td><b>Recebido</b></td>';
$html .= '<td><b>Prestado</b></td>';
$html .= '<td><b>Saldo</b></td>';
$html .= '</tr>';


while ($array = mssql_fetch_array($query)) {

$html.="<tr>";
$html.="<td>".$array['datref']."</td>";
$html.="<td>".$array['matfun']."</td>";
$html.="<td>".$array['nomfun']."</td>";
$html.="<td>".$array['nomloc']."</td>";
$html.="<td>".$array['vlrpla']."</td>";
$html.="<td>".$array['vlrrec']."</td>";
$html.="<td>".$array['vlrpre']."</td>";
$html.="<td>".$array['vlrsld']."</td>";

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
