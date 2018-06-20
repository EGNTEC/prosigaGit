<?php
session_start();
require("../session.php");
include("../conn.php");

$col    = $_SESSION['matricula'];
$niv    = $_SESSION['codniv'];

$mat  = $_GET['mat'];
$und  = $_GET['und'];
$reg  = $_GET['reg'];
$act  = $_GET['act'];
$mes  = $_GET['mes'];
$ano  = $_GET['ano'];
$dtf  = $_GET['dtf'];
$trp  = $_GET['trp'];

$actD = $_POST['actD'];

$data = date('Y/m/d');

$dia = 01;

$montRef = $ano.'/'.$mes.'/'.$dia;

 //echo $actD;

 if($act=="" && $actD==""){

    $result=99;
    //echo "passou1";
 }
 else
 if($act == 0 && $dtf!=0 && $trp!=0){ //Inserir planejamento zerado
 	  //echo "passou2";

  //Verifica se existe algum processo pendente para o Colaborador
  $queryAbpr = mssql_query("Select Count(1) As result
  From   tPROSabpl abpl
  Where  abpl.matfun = $mat
  And          (
                   (abpl.stspla <> 4)
               Or  (Exists (Select 1 From tPROSabpr abpr
                                   Where  abpr.matfun = abpl.matfun
                                   And    abpr.stspre <> 4))
               )") or die('erro na consulta planejamento');

   $rowAbpr = mssql_fetch_array($queryAbpr);
   $exist  = $rowAbpr['result'];

    //Verificar se existe um planejamento no periodo.

    $strEx = mssql_query("SELECT count(*) AS result FROM tPROSabpl WHERE matfun=$mat AND DATEPART(MONTH,datpla)=$mes AND DATEPART(YEAR,datpla)=$ano");

    $arrayRow  = mssql_fetch_array($strEx);
    $res       = $arrayRow['result'];

    //Tratamento para verificar se o mes e ano foram preenchidos.

   	if($ano=="" || $mes==""){

         $result = 0;
         echo json_encode($result);
   	}
    else
    if($exist != 0){

       $result = 99;
       echo json_encode($result);

    }else{

    //Criar abertura de planejamento
    $strIns = "INSERT INTO tPROSabpl(
				numreg,		numloc,		matfun,		datpla,		tiptrp,		stspla,
				qtdcli,		qtdkm,		vlrpla)
			VALUES (
				'$reg',	'$und',	'$mat',		'$montRef',	$trp, 4,
				0,			0,			0)";


    //var_dump($strIns);
    $dados = mssql_query($strIns) or die('Erro ao Inserir Abertura de planejamento');

    //select para resgatar numseq

    $strRetorn    = "SELECT numseq FROM tPROSabpl
                             WHERE matfun=$mat
                      AND DATEPART(MONTH,datpla)=$mes
                      AND DATEPART(YEAR,datpla)=$ano";

    //var_dump($strRetorn);
    $queryRetorno = mssql_query($strRetorn);
    $arrayRetorno = mssql_fetch_array($queryRetorno);
    $numseq = $arrayRetorno['numseq'];


    //Criar planejamentos zerado
    $exec = "Exec Pr_CadastrarPlanejamento $numseq,'$montRef',$mat";
     //var_dump($exec);
    $gerPlan = mssql_query($exec);

    //Criar prestação de contas.
    $strPrest = "Exec pr_CadastrarPrestacao $numseq,$mat,$trp,$col";
     //var_dump($strPrest);
    $prest = mssql_query($strPrest);

    //Resgata o numseq da prestação criada.
    $resgPre  = "SELECT numseq From tPROSabpr Where seqpla = $numseq And matfun = $mat";
    $qryPre   = mssql_query($resgPre);
    $arryPre  = mssql_fetch_array($qryPre);
    $numseqPre= $arryPre['numseq'];

    //Criar registro na tabela liberação(data de finalização)
    $stsFinal = "INSERT INTO tPROSlipr(numseq,mataut,dataut,datlim)
    VALUES($numseq,$col,'$data','$dtf')";
     //var_dump($stsFinal);
    $final=mssql_query($stsFinal);    

    if($res>0){ //verifica se já existe planejamento

       $result = 1;

    }else{

       $result = 2;
    }

    echo json_encode($result);

  }//fim do se não já existe processo.

 }else
 if($actD == 1){ //zerar planejamento
    //echo json_encode(1);
    $info = $_POST['data'];
    $data = json_decode($info);

    foreach ($data as $key){

      $numseq=$key->numseq;
      $mat=$key->numcad;
      $tiptrp=$key->tiptrp;

        //Deleta os registros do dia-a-dia do planejamento
        $queryAbpr = mssql_query("UPDATE tPROSplde set qtdcli=0,qtdkm=0,vlrdes=0,destra=0,valpass=0    WHERE seqpla=$numseq") or die('erro ao zerar planejamento');

        //Altera a situação do planejamento zerado para concluído.
        $queryUpdt = mssql_query("UPDATE tPROSabpl set stspla=4 WHERE numseq=$numseq");

        //Criar uma prestação
        $queryString = mssql_query("pr_CadastrarPrestacao $numseq,$mat,$tiptrp,$col");

        //Atualiza registros de saldo
        $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");

    }

    if($query){
      $result = 2;
      echo json_encode($result);

    }else{
      $result = 3;
      echo json_encode($result);
   }

}else
 if($actD == 2){ //Excluir planejamento
	//echo 'Teste';

    $info = $_POST['data'];
    $data = json_decode($info);

    foreach ($data as $key){

       $sit=$key->stspla;
       $id=$key->numseq;

       $delDia   = mssql_query("DELETE tPROSplde WHERE seqpla = $id");

       if($niv==1){
         $queryDel = "DELETE tPROSabpl WHERE numseq = $id AND stspla >= 0";
       } else{
         $queryDel = "DELETE tPROSabpl WHERE numseq = $id AND stspla = 0";
        }

       $query = mssql_query($queryDel) or die('Erro ao deletar registro.');
   }

    if($query){
      $result = 2;
      echo json_encode($result);
      //echo "{success:true}"; //sucesso
      //var_dump($queryDel);

    }else{
      $result = 3;
      echo json_encode($result);
      //echo "{success:false}"; //falha
      //var_dump($queryDel);
   }

}
if($actD == 3){ //planejamento com valores negativos.
    //echo json_encode(1);
    $info = $_POST['data'];
    $data = json_decode($info);

    foreach ($data as $key){

      $mat=$key->numcad;
      $tiptrp=$key->tiptrp;
      $numreg=$key->numreg;
      $numloc=$key->numloc;

        //cria um planejamento zerado
$query = "INSERT INTO tPROSabpl(
				       numreg,		numloc,		matfun,		datpla,		tiptrp,		stspla,
				       qtdcli,		qtdkm,		vlrpla)
			    VALUES (
				       '$numreg',	'$numloc',	'$mat',		'1900-01-01',	1,4,
				        0,			0,			0)";

  //var_dump($query);
  $dados = mssql_query($query) or die('Erro ao Inserir Abertura de planejamento');

  //--------------------------------------------------------------------------------
  //Tratamento para retornar numseq do planejamento inserido.

  $strReturn    = "SELECT numseq FROM tPROSabpl
                             WHERE matfun=$mat
                      AND DATEPART(MONTH,datpla)=01
                      AND DATEPART(YEAR,datpla)=1900";

 //var_dump($strReturn);
$queryRetorno = mssql_query($strReturn);

$arrayRetorno = mssql_fetch_array($queryRetorno);
$numseqR = $arrayRetorno['numseq'];
//--------------------------------------------------------------------------------
  //criar dia-a-dia planejamento
   //$exec = "Exec dbo.Pr_CadastrarPlanejamento $numseqR,'$montRef',$mat";
      //var_dump($exec);
  //$gerPlan = mssql_query($exec);
//--------------------------------------------------------------------------------
  //Criar uma prestação
  //$strString   ="Exec dbo.pr_CadastrarPrestacao $numseqR,$mat,1,$col";
  //$queryString =mssql_query($strString);
   $strString = "INSERT INTO tPROSabpr(
				            seqpla, numreg,		numloc,		matfun,		datpre,		tiptrp,		stspre,
				            qtdcli,		qtdkm,		vlrpre, juspre)
			           VALUES (
				            $numseqR,'$numreg',	'$numloc',	'$mat',		'1900-01-01',	1,4,
	 			            0,			0,			0, '')";
     //var_dump($strString);
   $queryString =mssql_query($strString);
//--------------------------------------------------------------------------------
  //Atualiza registros de saldo
  $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");
//--------------------------------------------------------------------------------
    }

    if($query){
      $result = 2;
      echo json_encode($result);

    }else{
      $result = 3;
      echo json_encode($result);
   }

}
