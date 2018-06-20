<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
require("../session.php");
ini_set('default_charset','utf-8');
include("../conn.php");
require("../../phpmailer/class.phpmailer.php");

$numseq = $_POST['id'];
$sit    = $_POST['sts'];
$btn    = $_POST['btn'];
$just   = $_POST['just'];
$niv 	  = $_POST['niv'];
$emacom = $_SESSION['emacom'];
$mat    = $_SESSION['matricula'];    //matricula logado
$col    = $_SESSION['colaborador']; //colaborador logado
$codprg = $_SESSION['usu_codprg'];
$tiptrp = $_POST['tiptrp'];
$vlrpre = $_POST['vlrpre'];
$numcad = $_POST['numcad'];  //matricula selecionado
$nomfun = $_POST['nomfun']; //colaborador selecionado
$destrp = $_POST['destrp'];
$dtHoje = date('d/m/Y');

$assunto = "Prossiga - Valor acima do limite permitido.";
$novSit  = $sit;

if($codprg = 1) {
  $email="anacarla.silva@inec.org.br"; //quem vai receber
}else{
  $email="amanda.gomes@inec.org.br";
}
//$email="emerson.gomes@inec.org.br";

//Tratamento para pegar valor teto

 $queryString = "SELECT p.vlrprm,p.datvig as termino
             FROM tPROSparm p
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q
                              where p.numprm=q.numprm
                              and q.datvig < getdate()
                              and q.numprm =";
if($tiptrp==1){

   $queryString = $queryString."2)";

}else{

   $queryString = $queryString."4)";
}

$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];

//################################

$arquivo ="Existe prestação de contas pendente de liberação."."\r\n"."Data: ".$dtHoje.";"."\r\n"."Contato: ".$emacom.";"."\r\n"."Valor Teto: "."R$ ".$vlrprm.";"."\r\n"."Valor Final: "."R$ ".$vlrpre.";"."\r\n"."Transporte: ".$destrp.";"."\r\n"."Agente: ".$nomfun." - ".$numcad.";"."\r\n"."Colaborador Regional: ".$col." - ".$mat.";"."\r\n"."Justificativa: ".$just."\r\n";

switch($sit) {
   	case 1:
   		$sit = 2;
   		break;

   	case 2:
   		$sit = 3;
   		break;
 }

//Tratamento para envio de e-mail de alerta para a sede.
if($novSit==2 && $niv==2 && $btn==0){

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->IsSMTP(); // Define que a mensagem será SMTP
    $mail->Host = "smtp.office365.com"; // Endereço do servidor SMTP
    $mail->Port=587;
    $mail->SMTPSecure="tls";
    //$mail->SMTPDebug = 2;
    $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
    $mail->Username = 'prossiga@inec.org.br'; // Usuário do servidor SMTP
    $mail->Password = '4E5qD1&^Ct'; // Senha do servidor SMTP
    $mail->From = "prossiga@inec.org.br"; // Seu e-mail, quem envia
    $mail->FromName = "Prossiga"; // Seu nome
    $mail->AddAddress($email);
    #$mail->AddAddress('ciclano@site.net');
    $mail->Subject =$assunto; // Assunto da mensagem
    $mail->Body = $arquivo ;

    $enviado = $mail->Send();

    // Limpa os destinatários e os anexos
    $mail->ClearAllRecipients();
    $mail->ClearAttachments();

    $queryUpdt = "UPDATE tPROSabpr SET stspre='$sit' WHERE numseq = '$numseq'";
    //var_dump($queryUpdt);
    $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');

  if($query){

    echo "{success:true}"; //sucesso
    #var_dump($queryUpdt);
   }else{

    echo "{success:false}"; //falha
    #var_dump($queryUpdt);
  }

}
else{

if($btn==0){

  $queryUpdt = "UPDATE tPROSabpr SET stspre='$sit' WHERE numseq = '$numseq'";

}else{

  $queryUpdt = "UPDATE tPROSabpr SET stspre=0,juspre=null WHERE numseq = '$numseq'";

}


$query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');

if($query){

    echo "{success:true}"; //sucesso
    //var_dump($queryUpdt);
 }else{

    echo "{success:false}"; //falha
    //var_dump($queryUpdt);
 }

}
