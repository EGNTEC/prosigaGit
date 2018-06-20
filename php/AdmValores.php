<?php
session_start();
require("session.php");
include("conn.php");

$niv =   $_SESSION['codniv'];
$mat =   $_SESSION['matricula'];

$codreg = $_SESSION['codreg'];

$mat    = $_GET['mat'];
$und    = $_GET['und'];
$reg    = $_GET['reg'];
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
                     INNER JOIN tVTRHfunc func ON sldo.matfun = func.numcad ";

                     if($reg !="" && $und=="" && $mat==""){

                        $queryCond =" Where func.numreg=$regional";                        

                     }else
                     if($und!="" && $mat==""){

                        $queryCond =" Where func.numreg=$regional And func.numloc=$und";
                     }else
                     if($und!="" && $mat!=""){

                        $queryCond =" Where func.numreg=$regional And func.numloc=$und AND sldo.matfun=$mat";
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

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    //recalcular saldo
    $col = $state['matfun'];
    $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $col");

    $rows['data'][] = $state;
}

//encoda para formato JSON
echo json_encode($rows);
