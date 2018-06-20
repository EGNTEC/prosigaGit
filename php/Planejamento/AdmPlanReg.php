<?php
session_start();
require("../session.php");
include("../conn.php");

$und  = $_GET['und'];
$codreg  = $_SESSION['codreg'];
$referencia = date('Y-m-d');

$queryString="Select distinct Substring (Convert (Varchar(10), GETDATE(), 103),4,7) AS datpla,
             func.numcad AS numcad,
             func.nomfun AS nomfun,
             func.codcar AS codcar,
             func.titred AS titred,
             func.numreg AS numreg,
             func.numloc AS numloc,
             func.nomloc AS nomloc,
             'selecione um transporte' AS trpt
From   tVTRHfunc func

Where  Not Exists (Select 1 From tPROSabpl abpl
                                  Where  abpl.matfun = func.numcad
                                  And    abpl.stspla <> 4
                                  And    abpl.datpla = Convert (Datetime, (Convert (Varchar(04), Datepart (Year, Getdate())) + '-' +
                                                                     Convert (Varchar(02), Datepart (Month, Getdate())) + '-1' )))

 And Not Exists  (Select 1 From tPROSabpr abpr
                          Inner Join tPROSabpl abpl2 On
 								           abpr.seqpla = abpl2.numseq
                  Where  abpr.matfun = func.numcad
 								  And    abpr.stspre <> 4
                 )
";

if($und==""){

    $queryString = $queryString." And func.numreg =$codreg";
}else{

	 $queryString = $queryString." And func.numloc =$und";
}

$queryCond=" Order By func.nomfun";

$querySelect = $queryString.$queryCond;
//var_dump($querySelect);

//consulta sql
$query = mssql_query($querySelect) or die('Erro ao filtrar registro');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)){
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
 echo json_encode($rows);
//echo $sts;
