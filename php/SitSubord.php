<?php
session_start();
require("session.php");
include("conn.php");

$niv     = $_SESSION['codniv'];    
$codloc  = $_SESSION['codund'];
$codreg  = $_SESSION['codreg'];


$queryString="Select
             Substring (Convert (Varchar(10), Getdate(), 103),4,7) As ref,
             func.nomfun As Colaborador,
             'Planejamento - Aguardando Abertura' As situacao
From    tVTRHfunc func
Where   func.codcar in (7700, 7600)
And          Not Exists (Select  1
                                  From   tPROSabpl abpl
                                  Where  abpl.matfun = func.numcad
                                  And    Substring (Convert (Varchar(10), abpl.datpla,111),1,7) = Substring (Convert (Varchar(10), Getdate(), 111),1,7))";
if($niv==3){
   
   $queryString = $queryString." and func.numloc = $codloc ";	
}else{
   $queryString = $queryString." And func.numreg = $codreg ";  	
}

$queryString= $queryString." Union
Select  Substring (Convert (Varchar(10), abpr.datpre, 103),4,7) As ref, 
             func.nomfun ,
        Case abpr.stspre
            When 0 Then 'Prestacao - Aguardando Finalizacao'
            When 1 Then 'Prestacao - Aguardando Autorizacao'
            When 2 Then 'Prestacao - Aguardando Validacao'
            When 3 Then 'Prestacao - Aguardando Liberacao'
            When 4 Then 'Planejamento - Aguardando Abertura'
        End As situacao
       
From    tPROSabpr abpr
            Inner Join tPROSabpl abpl On
                abpl.numseq = abpr.seqpla
            Inner Join tVTRHfunc func On
                func.numcad = abpr.matfun
Where    abpl.numseq = (Select Max(numseq) From tPROSabpl abpl2
                        Where    abpl2.numreg = abpl.numreg
                        And      abpl2.numloc = abpl.numloc
                        And      abpl2.matfun = abpl.matfun)
and        Substring (Convert (Varchar(10), abpr.datpre,111),1,7) = Substring (Convert (Varchar(10), Getdate(), 111),1,7)";

if($niv==3){
   
   $queryString = $queryString." and func.numloc = $codloc ";	
}else{
   $queryString = $queryString." and func.numreg = $codreg ";  	
}

$queryString = $queryString." Union
        Select  
             Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) As ref, 
             func.nomfun,
        Case abpl.stspla
            When 0 Then 'Planejamento - Aguardando Finalizacao'
            When 1 Then 'Planejamento - Aguardando Autorizacao'
            When 2 Then 'Planejamento - Aguardando Validacao'
            When 3 Then 'Planejamento - Aguardando Pagamento'
            When 4 Then 'Planejamento - Pagamento Efetuado'
        end As situacao
 
from    tPROSabpl abpl
            Inner Join tVTRHfunc func On
                func.numcad = abpl.matfun
where    abpl.numseq = (select max(numseq) from tPROSabpl abpl2
                        where    abpl2.numreg = abpl.numreg
                        and        abpl2.numloc = abpl.numloc
                        and        abpl2.matfun = abpl.matfun)
and        not exists (select 1 from tPROSabpr abpr
                        where abpr.seqpla = abpl.numseq)
and        Substring (Convert (Varchar(10), abpl.datpla,111),1,7) = Substring (Convert (Varchar(10), Getdate(), 111),1,7)";

if($niv==3){
   
   $queryString = $queryString." and func.numloc = $codloc ";	
}else{
   $queryString = $queryString." and func.numreg = $codreg ";  	
}


//var_dump($queryString);
$query = mssql_query($queryString);
   
//faz um looping e cria um array com os campos da consulta
$rows = array('data' => array());
while($state = mssql_fetch_array($query)) {
    $rows['data'][] = $state;
}
    
//encoda para formato JSON
echo json_encode($rows);
