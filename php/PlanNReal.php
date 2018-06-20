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

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    $rows['data'][] = $state;
}

//encoda para formato JSON
echo json_encode($rows);
