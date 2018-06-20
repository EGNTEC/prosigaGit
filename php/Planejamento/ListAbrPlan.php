<?php
session_start();
require("../session.php");
include("../conn.php");

$nomecol = $_SESSION['colaborador'];
$niv     = $_SESSION['codniv'];
$col     = $_SESSION['matricula'];
$codreg  = $_SESSION['codreg'];
$codund  = $_SESSION['codund'];
$programa= $_SESSION['programa'];

$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];
$mes    = $_GET['mes'];
$ano    = $_GET['ano'];
$btn    = $_GET['btn']; //para nível 3
$bt     = $_GET['botao'];


#Tratamento para nivel 3
#btn == 0 - cadastrar planejamento
#btn == 1 - gerênciar planejamento


	 $queryString = "SELECT distinct top 500 Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS datpla,
			func.nomloc AS nomloc,
			func.numcad AS numcad,
			func.nomfun AS nomfun,
			func.titred AS cargo,
			abpl.qtdcli AS qtdcli,
			abpl.qtdkm  AS qtdkm,
			abpl.vlrpla AS vlrpla,
			tptr.destrp AS destrp,
			abpl.stspla AS stspla,
			stts.dessts AS dessts,
			abpl.numseq AS numseq,
			abpl.tiptrp AS tiptrp,
	   (select vlrtrp from tPROSprtr prtr
			where prtr.tiptrp = abpl.tiptrp
			and		prtr.datvig = (select max(datvig) from tPROSprtr prtr2
									where prtr2.tiptrp = prtr.tiptrp
									and	  prtr2.datvig <= abpl.datpla)) as vlrtrp,
		Convert (Varchar(10),abpl.datpla, 103) AS data

	FROM tPROSabpl abpl

				INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
				INNER JOIN tPROSstts stts ON abpl.stspla = stts.numsts
				INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
				INNER JOIN tPROSprtr prtr ON prtr.tiptrp = abpl.tiptrp ";

switch ($niv) {
	case 4:
		$queryCond = "  WHERE abpl.matfun = '$col'";
		break;
	case 3:
	    $queryCond = "  WHERE func.numloc = '$codund'";

        if($btn!="" || $btn!=null){

        if($btn==0){ //condição para botão cadastrar planejamento ao abrir tela.

           $queryCond = $queryCond."  AND abpl.matfun='$col' AND abpl.stspla = 0";

        }else{

          if($mat!="" && is_numeric($mat) && $mat!=$col){
	    	 $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
	    	  if($sts==""){
                $queryCond =  $queryCond." AND abpl.stspla = 0";
	          }
	        }else//Tratamento para trazer todas as situações exeto concluído.
			if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){

                $queryCond = $queryCond."  AND abpl.stspla not in(4)";
			}
	      }
        }else{ //condição para botão gerênciar planejamento ao abrir tela.

         if($bt==1){ //condição para botão cadastrar planejamento ao filtrar colaborador.

             if($mat!="" && is_numeric($mat) && $mat!=$col){
	    	    $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
	    	     if($sts==""){
                     $queryCond =  $queryCond." AND abpl.stspla = 0";
	               }
                 /*if($mat===99999){

                 	$queryCond =  $queryCond;
                 }*/
	          }else{

	          	if($mat==""){

                    //$queryCond = $queryCond."  AND abpl.matfun='$col'";
	          	}else{
	          		$queryCond = $queryCond."  AND abpl.matfun='$col'";
					//$queryCond = $queryCond."  AND abpl.nomfun='$col'";
	          	}
	            if($sts=="" || $mat==$col){

                   $queryCond =  $queryCond." AND abpl.stspla = 0";
	             }
	          }
           }else{ //condição para botão gerênciar planejamento ao filtrar colaborador.

            //$queryCond = "  WHERE func.numloc = '$codund' ";
	        if($mat!=""){
			   	if($mat==$nomecol){
					   $mat=$col;
					 $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";

				   }else{

                     $queryCond = $queryCond."  AND abpl.matfun = '$mat' ";
				   }
	          }else //Tratamento para trazer todos as situações menos concluído.
			  if($sts=="" && $mat=="" && $und=="" && $mes=="" && $ano==""){

                $queryCond = $queryCond."  AND abpl.stspla not in(4)";
		      }
           }
        }

	    break;
    case 2:
		$queryCond = "  WHERE func.numreg = '$codreg'";

		if($btn==0 && ($bt=="" || $bt==null || $bt==1)){

          if($mat!=""){
             $queryCond = $queryCond."  AND abpl.matfun = '$mat'";
		  }else
		  if($und!=""){
	       	 $queryCond = $queryCond."  AND func.numloc = '$und'";
	       }
	       if($sts==""){

              $queryCond = $queryCond." AND abpl.stspla = 0";
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
             $queryCond = $queryCond."  AND abpl.stspla not in(4)";
	       }

        }

	  	break;
	case 1:
      if($btn==0 && ($bt=="" || $bt==null || $bt==1)){ //cadastro

      	 #$queryCond = " WHERE abpl.stspla = 0 ";
      	 if($sts == ""){
            $queryCond = " WHERE abpl.stspla = 0 ";
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
             $queryCond = $queryCond."  AND abpl.stspla not in(4)";
	      }

      }

       //Adicionar filtro por programa
       $queryPrograma = " And func.codprg = $programa ";

	   break;
}

if($sts!="" && $sts!=99){
    $queryCond = $queryCond."  AND abpl.stspla = '$sts'";
}
if($mes!=""){

    $queryCond =  $queryCond." AND DATEPART(MONTH,datpla) ='$mes' ";
}
if($ano!=""){

	$queryCond =  $queryCond." AND DATEPART(YEAR,datpla) ='$ano'";
}

#$queryOrder = "  ORDER by abpl.datpla desc";

$querySelect = $queryString.$queryCond.$queryPrograma;
//var_dump($querySelect);

//consulta sql

$query = mssql_query($querySelect) or die('Erro ao filtrar aberturas');

//faz um looping e cria um array com os campos da consulta
/**/$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
  echo json_encode($rows);
//echo $sts;
