<?php
session_start();
ob_start();
include('conn.php');

$dia= date('m');
$ano= date('Y');

#$usuario = $_POST["username"];
$username = $_GET["username"];
$numloc   = $_GET["numloc"];
$nomloc   = $_GET["nomloc"];
$programa = $_GET["programa"];

#Autenticção Via LDAP
$dominio = '@cidadania.intra.ong';
$user = $username.$dominio;#inecteste
$pass = $_SESSION['password'];
//$pass = str_replace("#","@",$pass);

$ldap_serv = 'ldaps://192.168.10.4';
$ldap_port = '636';//'389';
$lc = ldap_connect($ldap_serv, $ldap_port);
ldap_set_option($lc, LDAP_OPT_REFERRALS, 0);
ldap_set_option($lc, LDAP_OPT_PROTOCOL_VERSION, 3);
$ldapbind = @ldap_bind($lc,$user,$pass);

if ($ldapbind == false) {
    header("location:https://novoprossiga.inec.org.br/index.php?ret=1");
}
else
{
  
  $query = mssql_query("
    	  SELECT func.numcad,
    		func.nomfun,
    		func.numcpf,
    		func.numloc,
    		func.nomloc as unidade,
    		func.numreg,
    		hior.nomloc as regional,
    		func.emacom,
    		func.codcar,
            func.codprg As codprg,
    		func.titred,
    		func.codniv,
            hior.usu_codprg,
    		tppe.desper as desper
    from	tVTRHfunc func

    			inner join tVTRHhior hior on
    					hior.numloc = func.numreg

    			inner join tPROStppe tppe on
    					tppe.codper = func.codniv

    where func.numcad ='$username' AND func.sitafa=1") or die('Erro ao setar as configurações do colaborador!');

    //consulta sql
    $row =  mssql_num_rows($query);
    $dados = mssql_fetch_array($query);

    $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $username");
     $stringSaldo = mssql_query("select dbo.fn_buscar_saldo ($username) as saldo");
     $arraySaldo  = mssql_fetch_array($stringSaldo);

     $saldo = $arraySaldo['saldo'];
    //fim

    //Pegar a situação da prestação e planejamento do periodo.
     $stringSitpla = mssql_query("Select dbo.fn_Consultar_Situacao ($username) as situacao");

     $arraySitpla = mssql_fetch_array($stringSitpla);
     $sit = $arraySitpla['situacao'];

    //=======================================================================================

    $stringSitpre = mssql_query("SELECT stspre FROM tPROSabpr WHERE seqpla='$idsit'");
    $rowSitpre = mssql_num_rows($stringSitpre);
    $arraySitpre = mssql_fetch_array($stringSitpre);
    $stspre = $arraySitpre['stspre'];
    //========================================================================================

    //variaveis de sessão

    $_SESSION['matricula'] = $dados['numcad'];
    $_SESSION['colaborador'] = $dados['nomfun'];
    $_SESSION['codcargo']   = $dados['codcar'];
    $_SESSION['cargo']   = $dados['titred'];
    $_SESSION['nomund']  = $dados['nomloc'];
    $_SESSION['codreg']  = $dados['numreg'];
    $_SESSION['codniv']  = $dados['codniv'];
    $_SESSION['nomreg']  = $dados['regional'];
    $_SESSION['descniv'] = $dados['desper'];
    $_SESSION['emacom']  = $dados['emacom'];
    $_SESSION['saldo']   = $saldo;
    $_SESSION['descsit'] = $sit;
    $_SESSION['usu_codprg'] = $dados['usu_codprg'];


    //Modificar valor da sessão senha.
      $_SESSION['password'] = 'xxxxxxxxxxxxx';  


    //tratamento local adicional

     if($numloc != ""){

       $_SESSION['codund'] = $numloc;
       $_SESSION['nomund'] = $nomloc;   

     }else{
        $_SESSION['codund'] = $dados['numloc'];
        $_SESSION['nomund'] = $dados['unidade'];
     }


     //tratamento programa
     if($dados['codniv'] == 1){

        if($programa == 4002){

            $descprograma = 'Crediamigo';
        }else{
            $descprograma = 'Agroamigo';
        }

        $_SESSION['programa']       = $programa; 
        $_SESSION['descprograma']   = $descprograma;

     }else{

        if($dados['codprg'] == 4002){

            $descprograma = 'Crediamigo';
        }else{
            $descprograma = 'Agroamigo';
        }

        $_SESSION['descprograma']   = $descprograma;    
     }

    #variaveis para limite de tempo
    $_SESSION['limite'] = 3000; //equivale a 5 min 300 || 1800 = 30min || 3600 = 60min || 3000=50min
    $_SESSION['registro'] = time();
    #=========================================================================================================
    if($row <= 0){

       //echo "{success:0}"; //falha
     header("location:https://novoprossiga.inec.org.br/index.php?ret=1");

    }else{

       //echo "{success:1}"; //sucesso
     header("location:https://novoprossiga.inec.org.br/principal.php");
    }
}
