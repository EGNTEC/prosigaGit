<?php
session_start(); 
include("php/conn.php");

$numcad     = $_POST['username'];
$password   = $_POST["password"];

#Autenticção Via LDAP

$dominio = '@cidadania.intra.ong';
$user = $numcad.$dominio;#inecteste
$pass = $_POST["password"];

$ldap_serv = 'ldaps://192.168.10.4';
$ldap_port = '636';//'389';
$lc = ldap_connect($ldap_serv, $ldap_port);
ldap_set_option($lc, LDAP_OPT_REFERRALS, 0);
ldap_set_option($lc, LDAP_OPT_PROTOCOL_VERSION, 3);
$ldapbind = @ldap_bind($lc,$user,$pass);

//echo "ldap_error: " . ldap_error($ldapbind);

if ($ldapbind == false) {
    header("location:https://novoprossiga.inec.org.br/index.php?ret=1");
}

//Select para saber se o colaborador é sede

$stringSede = "SELECT numcad,numloc From tVTRHfunc Where numcad = $numcad ";
$querySede  = mssql_query($stringSede);
$arraySede  = mssql_fetch_array($querySede);

$numloc = $arraySede['numloc'];
$numcad = $arraySede['numcad'];

//====================================================================================

//Select local adicional
$stringLocAd = "SELECT prad.* 
                    From    tPROSprad prad
                                Inner Join tVTRHfunc func On
                                    func.numcad = prad.numcad
                                And func.sitafa = 1
                    Where   prad.numcad = $numcad";   

$queryLocAd  = mssql_query($stringLocAd);

$countLocAd  = mssql_num_rows($queryLocAd);
$arrayLocAd  = mssql_fetch_array($queryLocAd);

//====================================================================================

$stringSelect1 = "SELECT prad.numloc As numloc, hior.nomloc As nomloc
                    From    tPROSprad prad
                            Inner Join tVTRHhior hior On hior.numloc = prad.numloc
                Where   prad.numcad = $numcad";

$stringQuery1 = mssql_query($stringSelect1);                
$locad1 = mssql_fetch_array($stringQuery1);

$numloc1 = $locad1['numloc'];
$nomloc1 = $locad1['nomloc']; 

//====================================================================================

$stringSelect2 = "SELECT  func.numloc As numloc, func.nomloc As nomloc
                From    tVTRHfunc func
                Where   func.numcad = $numcad";

$stringQuery2 = mssql_query($stringSelect2);                
$locad2 = mssql_fetch_array($stringQuery2);

$numloc2 = $locad2['numloc'];
$nomloc2 = $locad2['nomloc']; 

//=====================================================================================

if($numloc == 1){

    $_SESSION['matricula'] = $arraySede['numcad'];
    $_SESSION['password']  = $password;
?>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta http-equiv="Refresh" content="30;url=index.php"> -->
    <meta charset="UTF-8">
    <title>Prossiga - Sistema de Deslocamento</title>
    <link rel="shortcut icon" type="image/ico" href="resources/images/icone.ico" />
    <link rel="stylesheet" href="resources/default/app.css">
    <link rel="stylesheet" href="resources/css/app.css">
    <!-- <x-compile> -->
        <!-- <x-bootstrap> -->
          <script src="ext/ext-all.js"></script>
            <!--<script src="bootstrap.js"></script>-->
        <!-- </x-bootstrap> -->
        <link rel="stylesheet" type="text/css" href="resources/css/app.css">
        <script src="escolherPrograma.js"></script>

        <script type="text/javascript">

          var numcad  = "<?php  echo $arraySede['numcad']; ?>";             

        </script>

    <!-- </x-compile> -->
</head>
<body></body>
</html>

<?php
}else
if($countLocAd > 0){ //Local adicional

    $_SESSION['matricula'] = $arrayLocAd['numcad'];
    $_SESSION['password']  = $password;   

?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta http-equiv="Refresh" content="30;url=index.php"> -->
    <meta charset="UTF-8">
    <title>Prossiga - Sistema de Deslocamento</title>
    <link rel="shortcut icon" type="image/ico" href="resources/images/icone.ico" />
    <link rel="stylesheet" href="resources/default/app.css">
    <link rel="stylesheet" href="resources/css/app.css">
    <!-- <x-compile> -->
        <!-- <x-bootstrap> -->
          <script src="ext/ext-all.js"></script>
            <!--<script src="bootstrap.js"></script>-->
        <!-- </x-bootstrap> -->
        <link rel="stylesheet" type="text/css" href="resources/css/app.css">
        <script src="escolherUnidade.js"></script>

        <script type="text/javascript">

          var numloc1 = "<?php  echo $numloc1; ?>";
          var nomloc1 = "<?php  echo $nomloc1; ?>";
          var numloc2 = "<?php  echo $numloc2; ?>";    
          var nomloc2 = "<?php  echo $nomloc2; ?>";
          var numcad  = "<?php  echo $arrayLocAd['numcad']; ?>";             

        </script>

    <!-- </x-compile> -->
</head>
<body></body>
</html>

<?php }else{ header("location:/php/autent.php?username=".$numcad); }?>
