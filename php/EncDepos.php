<?php
session_start();
require("session.php");
include("conn.php");

$col  = $_SESSION['matricula'];
$data = date('Y-m-d');
$mes  = date('m');
$ano  = date('Y');

//Alterar a data de encerramento dos depósitos
$strQuery = "UPDATE tPROSparm set vlrprm='$data',numprg=1,datvig='$data',datinc='$data',numcad=$col where numprm=6";
 //var_dump($strQuery);
$query = mssql_query($strQuery) or die('Erro ao gerar data de encerramento');

//-----------------------------------------------------------------------------

//criar um while para criação da prestação
$strSel = " SELECT * FROM tPROSabpl
	           WHERE stspla < 3
	             AND DATEPART(MONTH,datpla)=$mes
	             AND DATEPART(YEAR,datpla)=$ano";

  //var_dump($strSel);
$querySel = mssql_query($strSel);

while ($arraySel = mssql_fetch_array($querySel)){

  $numseq = $arraySel['numseq'];
  $tiptrp = $arraySel['tiptrp'];
     $mat = $arraySel['matfun'];

//Deleta os registros do dia-a-dia do planejamento
$strAbpr   = "UPDATE tPROSplde set qtdcli=0,qtdkm=0,vlrdes=0,destra=0,valpass=0
           WHERE seqpla = $numseq";

 //var_dump($strAbpr);
$queryAbpr = mssql_query($strAbpr) or die('erro ao zerar planejamento');
//-----------------------------------------------------------------------------

//Altera a situação do planejamento zerado para concluído.
$strUpdt   = "UPDATE tPROSabpl set stspla=4 WHERE numseq=$numseq";
 //var_dump($strUpdt);
$queryUpdt = mssql_query($strUpdt);
//-----------------------------------------------------------------------------
//Criar uma prestação
$strString   = "Exec dbo.pr_CadastrarPrestacao $numseq,$mat,$tiptrp,$col";
 //var_dump($strString);
$queryString = mssql_query($strString);

}
//Atualiza registros de saldo
//$prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");

if($query){

   echo json_encode(0);

}else{

   echo json_encode(1);
}
