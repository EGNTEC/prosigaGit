<?php
session_start();
require("../session.php");
include("../conn.php");

//variavel global
$col = $_SESSION['matricula'];

$info   = $_POST['data'];
$btnRbr = $_POST['btnRbr'];

$data = json_decode($info);

foreach ($data as $key) {

   $sit=$key->stspre;
   $id=$key->numseq;
   $tiptrp=$key->tiptrp;
   $vlrpre=$key->vlrpre;
   $just=$key->juspre;
   $mat=$key->numcad;

//Tratamento para o valor teto

$queryString = "SELECT p.vlrprm,p.datvig as termino
             FROM tPROSparm p
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q
                              where p.numprm=q.numprm
                              and q.datvig > getdate()
                              and q.numprm =";

if($tiptrp==1){

   $queryString = $queryString."2)";

}else{

   $queryString = $queryString."4)";
}

$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];
$dtTermino = $arrayValTeto['termino'];

   switch ($sit) {
   	case 0:
   		$sit = 1;
   		break;

   	case 1:
   		$sit = 2;
   		break;

   	case 2:
   		$sit = 4;
   		break;

   }

    $result = 1;

   if($btnRbr==3){

     //Verifica se existe algum processo pendente para o Colaborador
     /*$queryAbpr = mssql_query("Select Count(1) As result
     From   tPROSabpl abpl
     Where  abpl.matfun = $mat
     And          (
                      (abpl.stspla <> 4)
                  Or  (Exists (Select 1 From tPROSabpr abpr
                                      Where  abpr.matfun = abpl.matfun
                                      And    abpr.stspre <> 4))
                  )") or die('erro na consulta planejamento');*/
      $queryAbpr = mssql_query("Select Count(1) As result
     From   tPROSabpl abpl
     Where  abpl.matfun = $mat
     And          (
                      (abpl.stspla <> 4)
                  Or  (Exists (Select 1 From tPROSabpr abpr
                                      Where  abpr.matfun = abpl.matfun
									  And    abpr.stspre <> 4
									  And   abpr.datpre > (Select min(abpr1.datpre) From tPROSabpr abpr1 Where abpr1.matfun = $mat)
									  And   abpr.datpre < (Select max(abpr2.datpre) From tPROSabpr abpr2 Where abpr2.matfun = $mat)
									  )))") or die('erro na consulta planejamento');


      $rowAbpr = mssql_fetch_array($queryAbpr);
      $exist  = $rowAbpr['result'];

      if($exist != 0){
          $result = 0;
          //echo "passou aqui!";
      }else{
          $queryUpdt = "UPDATE tPROSabpr SET stspre=0 WHERE numseq = '$id' ";
          //var_dump($queryUpdt);
      }

   }else
     if($btnRbr==10){

      $queryUpdt = "UPDATE tPROSabpr SET stspre='$sit' WHERE numseq = '$id' ";

    }else//adicionado no final.
    if($btnRbr==5){

      $queryUpdt = "UPDATE tPROSabpr SET stspre=4 WHERE numseq = '$id'";

    }
    else{

      $queryUpdt = "UPDATE tPROSabpr SET stspre='$sit' WHERE numseq = '$id' AND juspre is null";# AND juspre is null
    }

  //var_dump($queryUpdt);
  $query = mssql_query($queryUpdt) or die('Erro ao alterar registro.');
}


if($result == 1){

    //echo json_encode(1);
    echo "{success:true}";
    //var_dump($queryUpdt);

 }else{
     //echo json_encode(0);
    echo "{success:false}";
    //var_dump($queryUpdt);

 }
