<?php
session_start();
require("../session.php");
include("../conn.php");

$nomcol = $_SESSION['colaborador'];
$niv   = $_SESSION['codniv'];
$col   = $_SESSION['matricula'];
$codreg=$_SESSION['codreg'];
$codund=$_SESSION['codund'];
$codcargo = $_SESSION['codcargo'];
$programa= $_SESSION['programa'];
//echo $niv;
$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];

$mes    = $_GET['mes'];
$ano    = $_GET['ano'];
$btn    = $_GET['btn']; //para nível 3
$bt     = $_GET['botao'];
$btconf = $_GET['btconf'];

$queryString = "SELECT top 500 Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS mesref,

	   (Select Coalesce ((Select	max(Convert(Varchar(10), datlim, 103))
	   From		tPROSlipr lipr
	   Where	lipr.numseq = abpr.numseq),
	   Convert(Varchar(10), abpr.datlim, 103) )) as dtfim,

	   func.nomloc AS nomloc,
	   func.numcad AS numcad,
	   func.nomfun AS nomfun,
	   func.titred AS titred,
	   abpr.qtdkm  AS qtdkm,
	   abpr.juspre AS juspre,
	   abpr.vlrpre AS vlrpre,
	   tptr.destrp AS destrp,
	   abpr.stspre AS stspre,
	   stts.dessts AS dessts,
	   abpr.numseq AS numseq,
	   abpr.seqpla AS seqpla,
	   abpl.tiptrp AS tiptrp,
	   (select vlrtrp from tPROSprtr prtr
			where prtr.tiptrp = abpl.tiptrp
			and		prtr.datvig = (select max(datvig) from tPROSprtr prtr2
									where prtr2.tiptrp = prtr.tiptrp
									and	  prtr2.datvig <= abpl.datpla)) as vlrtrp

	FROM tPROSabpr abpr
			INNER JOIN tPROSabpl abpl ON abpr.seqpla = abpl.numseq
			INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
			INNER JOIN tPROSstts stts ON abpr.stspre = stts.numsts
			INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
";

 switch ($niv) {
	case 4:
		$queryCond = "  WHERE abpl.matfun = '$col'";
		break;
	case 3:
	    $queryCond = "  WHERE func.numloc = '$codund'";
	    /*if($mat!=""){
	    	$queryCond = $queryCond."  AND abpl.matfun = '$mat'";
	    }
	    if($sts==""){
            $queryCond =  $queryCond."  AND abpr.stspre = 1";
	    }*/
        if($btn!="" || $btn!=null){

        if($btn==0){ //condição para botão cadastrar planejamento ao abrir tela.

		  if($codcargo==6600){

			if($mat!=""){
              $queryCond = $queryCond." AND abpl.matfun='$mat' AND abpr.stspre = 0";
			}else{
              $queryCond = $queryCond." AND abpr.stspre = 0";
			}

		  }else{
			if($mat==$nomcol){

                $queryCond = $queryCond." AND abpl.matfun='$col' AND abpr.stspre = 0";
			}else
			if($sts=="" && $mat==""){
              $queryCond = $queryCond." AND abpr.stspre = 0";
			} else{
              $queryCond = $queryCond." AND abpl.matfun='$mat' AND abpr.stspre = 0";
			}

		  }

        }else{

          if($mat!="" && is_numeric($mat) && $mat!=$col){
	    	 $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
	    	  if($sts==""){
                  $queryCond =  $queryCond." AND abpr.stspre = 0";
	           }
	         }else//Tratamento para trazer todas as situações exeto concluído.
                if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){
                 $queryCond = $queryCond."  AND abpr.stspre not in(4)";
			 }
	       }
        }else{ //condição para botão gerênciar prestação ao abrir tela.

         if($bt==1){ //condição para botão cadastrar prestação ao filtrar colaborador.

             if($mat!="" && is_numeric($mat) && $mat!=$col){
	    	    $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
	    	     if($sts==""){
                     $queryCond =  $queryCond." AND abpr.stspre = 0";
	               }
                 /*if($mat===99999){

                 	$queryCond =  $queryCond;
                 }*/
	          }else{

	          	if($mat==""){

                    //$queryCond = $queryCond."  AND abpl.matfun='$col'";
	          	}else{
	          		$queryCond = $queryCond."  AND abpl.matfun='$col'";
	          	}
	            if($sts=="" || $mat==$col){

                   $queryCond =  $queryCond." AND abpr.stspre = 0";
	             }
	          }
           }else{ //condição para botão gerênciar planejamento ao filtrar colaborador.

            //$queryCond = "  WHERE func.numloc = '$codund' ";
	        if($mat!=""){
	         	$queryCond = $queryCond."  AND abpl.matfun = '$mat'";// AND abpr.stspre = 0
	         }else
			 if($sts=="" && $mat==""){

				 if($codcargo==6700){
                     $queryCond = "  WHERE func.numloc = '$codund' AND abpr.stspre not in(4)";//alterarado
				 }else{
                    $queryCond = $queryCond." AND abpr.stspre = 0";
				 }
				 //$queryCond =""; retorno
			 }

           }
        }
	    break;
    case 2:

		$queryCond = "  WHERE func.numreg = '$codreg'";

        if($btn==0 && ($bt=="" || $bt==null || $bt==1)){

          if($mat!=""){
            $queryCond = $queryCond."  AND abpl.matfun = '$mat'";#alterado em :01/11/2017
		  }else
		  if($und!=""){
	       	 $queryCond = $queryCond."  AND func.numloc = '$und'";
	       }
	       if($sts==""){

              $queryCond = $queryCond." AND abpr.stspre = 0";
	       }

        }else
        if($btn==1 || $bt==0){

           if($mat!=""){
			 $queryCond = $queryCond."  AND abpl.matfun = '$mat'";

		   }else
	       if($und!=""){
	       	 $queryCond = $queryCond."  AND func.numloc = '$und'";

	       }
	       if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){
              $queryCond = $queryCond."  AND abpr.stspre not in(4)";
	       }

        }else
		if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){

             $queryCond = $queryCond."  AND abpr.stspre not in(4)";
		}

	  	break;
	case 1:
	   $queryCond ="";

	    if($btn==0 && ($bt=="" || $bt==null || $bt==1)){ //cadastro

      	 if($sts == ""){
            $queryCond = " WHERE abpr.stspre = 0 ";
			//$queryCond ="";
      	 }

         if($mat!="" && $reg!="" && $und!=""){
			$queryCond = $queryCond." AND func.numreg = $reg AND abpl.matfun = '$mat'";

		}else
		if($und!="" && $reg!=""){
	    	$queryCond = $queryCond." AND func.numreg = $reg AND func.numloc = '$und'";

	    }else
	    if($reg!=""){
	        $queryCond = $queryCond." AND func.numreg = $reg";

	     }

       }else
         if($btn==1 || $bt==0){ //Gerência

          $queryCond ="";

        if($mat!="" && $reg!="" && $und!=""){
			$queryCond = " WHERE func.numreg = $reg AND abpl.matfun = '$mat'";
		}else
		if($und!="" && $reg!=""){
	    	$queryCond = " WHERE func.numreg = $reg AND func.numloc = '$und'";
	    }else
	    if($reg!=""){
	        $queryCond = " WHERE func.numreg = $reg";
	    }
	    if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){
             $queryCond = $queryCond."  AND abpr.stspre not in(4)";
	      }

      }

      //Adicionar filtro por programa
	  $queryPrograma = " And func.codprg = $programa ";

	  break;
}

if($sts!="" && $sts!=99){
   $queryCond = $queryCond."  AND abpr.stspre = '$sts'";

}
if($mes!=""){

    $queryCond =  $queryCond." AND DATEPART(MONTH,datpla) ='$mes' ";
}
if($ano!=""){

	$queryCond =  $queryCond." AND DATEPART(YEAR,datpla) ='$ano'";
}

if($btconf==99){

    $queryCond =  $queryCond." And abpr.stspre = 2 AND abpr.vlrpre >
 						(Select	parm.vlrprm
						From	vPROSparm parm
						where	numprm = Case abpl.tiptrp When 1 Then 2 When 2 Then 4 Else 0 End)";
}

$queryOrder = "  ORDER by abpl.datpla desc";

$querySelect = $queryString.$queryPrograma.$queryCond.$queryOrder;

//var_dump($querySelect);

$query = mssql_query($querySelect) or die('Erro ao filtrar aberturas');

//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
echo json_encode($rows);
