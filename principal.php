<?php
session_start();
require("php/session.php");

#echo "<br>";
$mat      = $_SESSION['matricula'];
$col      = $_SESSION['colaborador'];
$cargo    = $_SESSION['cargo'];
$local    = $_SESSION['nomund'];
$niv      = $_SESSION['codniv'];
$descniv  = $_SESSION['descniv'];
$extAplan = $_SESSION['extAplan'];
$codund   = $_SESSION['codund'];
$codreg   = $_SESSION['codreg'];
$codcargo = $_SESSION['codcargo'];
$codprg   = $_SESSION['usu_codprg'];
#=============================================
$reg   = $_SESSION['nomreg'];
$unid  = $_SESSION['nomund'];
$email = $_SESSION['emacom'];
$sald  = $_SESSION['saldo'];

$programa     = $_SESSION['programa'];
$descprograma = $_SESSION['descprograma'];

if($codcargo==7500 || $codcargo==6600 || $niv==1){

   $situacao = "Não cadastra planejamento";
}else{

   $situacao = $_SESSION['descsit'];
}

$mes = date('m');
$ano = date('Y');
$dia = date('d');

if($sald =="" || $sald=="null" ){

   $sald = 'R$ 0.00';
}else{

   $sald = $_SESSION['saldo'];
   $sald = "R$ ".$sald;
}

//Tratamento para competência

switch ($mes) {
  case 01:
      $competencia = 'Janeiro';
    break;
  case 02:
      $competencia = 'Fevereiro';
    break;
  case 03:
      $competencia = 'Março';
    break;
  case 04:
      $competencia = 'Abril';
    break;
  case 05:
      $competencia = 'Maio';
    break;
  case 06:
      $competencia = 'Junho';
    break;
  case 07:
      $competencia = 'Julho';
    break;
  case 08:
      $competencia = 'Agosto';
    break;
  case 09:
      $competencia = 'Setembro';
    break;
  case 10:
      $competencia = 'Outubro';
    break;
  case 11:
      $competencia = 'Novembro';
    break;
  case 12:
      $competencia = 'Dezembro';
    break;


  default:
    # code...
    break;
}

$competencia = $competencia.'/'.$ano;

?>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Refresh" content="3002;url=principal.php">
    <meta charset="UTF-8">
    <title>Prossiga - Sistema de Deslocamento</title>
    <link rel="shortcut icon" type="image/ico" href="resources/images/icone.ico" />
    <link rel="stylesheet" href="resources/default/app.css">
    <link rel="stylesheet" href="resources/css/app.css">
    <style>
      .x-grid-row-summary{
          background-color:#CDCDCD;
          font-weight:bold;
          font-size:11;
       }


    </style>
    <!-- <x-compile> -->
        <!-- <x-bootstrap>-->
            <!--<script src="bootstrap.js"></script>-->
            <script src="ext/ext-all.js"></script>
            <script type="text/javascript" src="resources/js/jquery-2.2.3.min.js"></script>
            <script type="text/javascript" src="resources/js/jquery-masked.min.js"></script>

        <!-- </x-bootstrap> -->
        <link rel="stylesheet" type="text/css" href="resources/css/app.css">
        <script src="app.js"></script>

<script type="text/javascript">

   var mat = "<?php  echo $mat; ?>";
   var col = "<?php  echo $col ;?>";
   var nomcargo = "<?php  echo $cargo ;?>";
   var codcargo = "<?php  echo $codcargo ;?>";
   var local = "<?php  echo $local ;?>";
   var niv = "<?php  echo $niv ;?>";
   var reg = "<?php  echo $reg ;?>";
   var unid = "<?php  echo $unid ;?>";
   var descniv ="<?php echo $descniv ;?>";
   var extAplan ="<?php echo $extAplan ;?>";
   var codund ="<?php echo $codund ;?>";
   var codreg ="<?php echo $codreg ;?>";
   var emacom ="<?php echo $email ;?>";
   var sald  ="<?php echo $sald; ?>";
   var situ  ="<?php echo $situacao ;?>";
   var competencia  ="<?php echo $competencia ;?>";
   var mes  ="<?php echo $mes ;?>";
   var ano  ="<?php echo $ano ;?>";
   var dia  ="<?php echo $dia ;?>";
   var codprg ="<?php echo $codprg ;?>";
   var programa ="<?php echo $programa ;?>"; 
   var descprograma ="<?php echo $descprograma ;?>"; 

</script>

    <!-- </x-compile> -->
</head>
<body></body>
</html>
