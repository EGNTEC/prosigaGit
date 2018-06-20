<?php
session_start();
require("session.php");
include("conn.php");

$niv = $_SESSION['codniv'];

$data = date('Y-m-d');
$mes  = date('m');
$ano  = date('Y');

if($niv == 4){

   $col = $_SESSION['matricula'];

}else{

   $col = $_GET['mat'];
}

//Tratamento coordenador cadastrando o seu planejamento.
$ResgMat = "SELECT numcad From tVTRHfunc Where nomfun='$col'";
#var_dump($ResgMat);
$qryResgMat = mssql_query($ResgMat);
$rowResgMat = mssql_num_rows($qryResgMat);
$arrResgMat = mssql_fetch_array($qryResgMat);
$mat = $arrResgMat['numcad'];

if($rowResgMat > 0){

    $col = $mat;

}
#Fim do tratamento

$strSel = "Select Case Count(1)
                    When 0 Then Substring (Convert(Varchar(10), Getdate(), 103), 4,7)
                    Else (Select  Case When
                                                      Substring (Convert(Varchar(10), abpl.datpla, 103), 4,7) <> Substring (Convert(Varchar(10), Getdate(), 103), 4,7) Then Substring (Convert(Varchar(10), Getdate(), 103), 4,7)
                                               End As datpla
                                  From    tPROSabpl abpl
                                  Where   abpl.datpla = (Select Max(datpla) From tPROSabpl abpl2
                                                                          Where    abpl2.matfun = abpl.matfun)
                                  And          Not Exists (Select 1 From tPROSparm parm Where parm.numprm = 6 And Substring (Convert(Varchar(10), parm.datvig, 103), 4,7) = Substring (Convert(Varchar(10), Getdate(), 103), 4,7))
                                  And          abpl.matfun = $col) End as datpla
From    tPROSabpl abpl
Where  abpl.matfun = $col
Union
Select Substring (Convert(Varchar(10), Dateadd (Month, 1, Getdate()), 103), 4,7) As datpla";
//var_dump($strSel);
$querySel = mssql_query($strSel);

//faz um looping e cria um array com os campos da consulta
  $rows = array('data' => array());
  while($sel = mssql_fetch_assoc($querySel)) {
      $rows['data'][] = $sel;
  }

  //encoda para formato JSON
  echo json_encode($rows);
