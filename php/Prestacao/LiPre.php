<?php
session_start();
require("../session.php");
	//chama o arquivo de conexão com o bd
include("../conn.php");
    $niv   =   $_SESSION['codniv'];
    $codloc= $_SESSION['codund'];
    $codreg= $_SESSION['codreg'];
    $programa= $_SESSION['programa'];

//Adicionar filtro por programa
$queryPrograma = " And func.codprg = $programa ";

 $queryString="SELECT  FUNC.numcad AS numcad,
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

     switch ($niv) {
     	case 3:
     		$condicao = "   AND func.numloc='$codloc'";
     		break;

     	case 2:
     		$condicao = "   AND func.numreg='$codreg'";
     		break;
     }

    $String = $queryString.$condicao.$queryPrograma;

    //print_r($String);

	$query = mssql_query($String) or die('Erro ao filtrar registros');

	$rows = array('data' => array());
	while($lib = mssql_fetch_array($query)) {
	    $rows['data'][] = $lib;
	}

	//encoda para formato JSON
	echo json_encode($rows);
