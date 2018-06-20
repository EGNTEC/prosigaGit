<?php
session_start();
require("session.php");
include("conn.php");

$niv   = $_SESSION['codniv'];
$codreg=$_SESSION['codreg'];

$m = $_POST['mes'];
$a = $_POST['ano'];
$unid= $_POST['unid'];


//Tratamento para resgatar o valor da regional
if($niv==1){

  $reg = $_POST['reg'];

}else{

  $reg = $codreg;
}


$queryString = "SELECT count(1) as retorno
From	tPROSabpr abpr

			Inner Join tPROSabpl abpl On
					abpl.numseq = abpr.seqpla

Where	abpr.vlrpre > (Select	parm.vlrprm
						From	vPROSparm parm
						where	numprm = Case abpl.tiptrp When 1 Then 2 When 2 Then 4 Else 0 End)

And     abpr.stspre = 2 ";


if($reg!="" && $unid==""){

    $local = " AND abpl.numreg ='$reg'";
}else
if($reg=="" && $unid!=""){

    $local = " AND abpl.numloc ='$unid'";
}else
if($reg!="" && $unid!=""){

    $local = " AND abpl.numloc ='$unid' AND abpl.numreg ='$reg' ";
}


if($m!=""){

    $mes = " AND DATEPART(MONTH,datpre) ='$m'";
}
if($a!=""){

	  $ano = " AND DATEPART(YEAR,datpre) ='$a'";
}

$queryResult = $queryString.$local.$mes.$ano;

//var_dump($queryResult);
$Query = mssql_query($queryResult);

//or die('Erro ao carregar o valor.');
//var_dump($queryResult);

$array  = mssql_fetch_array($Query);
$result = $array['retorno'];

//encoda para formato JSON
echo json_encode($result);
