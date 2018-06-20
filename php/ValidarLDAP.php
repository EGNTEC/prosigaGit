<?php
// Set the ldap server
$ldapurl = "ldaps://192.168.10.4";
$ldapuser = "10794@cidadania.intra.ong";
$ldappass = '2Fx5u3q!#z';
// Set the debug flag
$debug = true;
// Set debugging
if ($debug) {
  ldap_set_option(NULL, LDAP_OPT_DEBUG_LEVEL, 7);
}
// connect to ldap server
$ldapconn = ldap_connect($ldapurl) or die ("Não pode conectar.");
// binding to ldap server
echo "Tentando Acessar com $ldapuser - $ldappass\n";
$ldapbind = @ldap_bind($ldapconn, $ldapuser, $ldappass);
if (!$ldapbind) {
echo "Não é possível acessar o servidor $ldapurl\n";
echo "Mensagem de erro OpenLdap: ".ldap_error($ldapconn)."\n";
exit;
}else{

  echo "Conectado com sucesso!\n";  
}

echo "Retorno Debug: ".$debug;
// Rest of code goes here
?>