<?php
session_start();
ob_start();

 $ret = $_GET['ret'];

?>
<!DOCTYPE html>
<html lang="pt-br">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Prossiga - Sistema de deslocamentos</title>

        <!-- CSS -->
        <!--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">-->
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="assets/css/form-elements.css">
        <link rel="stylesheet" href="assets/css/style.css">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <!-- Favicon and touch icons -->
        <link rel="shortcut icon" href="assets/ico/icone.ico">
        <!--<link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">-->

    </head>

    <body>

        <!-- Top content -->
        <div class="top-content">

            <div class="inner-bg">
                <div class="container">
                    <!--<div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text">
                            <h1><strong>Bootstrap</strong> Login Form</h1>
                            <div class="description">
                            	<p>
	                            	This is a free responsive login form made with Bootstrap.
	                            	Download it on <a href="http://azmind.com"><strong>AZMIND</strong></a>, customize and use it as you like!
                            	</p>
                            </div>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>Bem-vindo ao sistema</h3>
                            		<p>Informe o usuário e senha de acesso</p>
                        		</div>
                        		<div class="form-top-right"><!--Imagem da logo -->
                        			<!--<i class="fa fa-lock"></i>-->
                                    <!--<img src="assets/img/novologo.png" class="imglogo">-->
                                    <img src="assets/img/log9.png" class="imglogo">
                        		</div>
                            </div>
                            <div class="form-bottom">
			                    <!--<form role="form" action="/php/autent.php" method="post" class="login-form">-->
                                <form role="form" action="escolherUnidade.php" method="post" class="login-form">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">Matrícula</label>
			                        	<input type="text" name="username" placeholder="Matrícula" class="form-username form-control" id="form-username" >
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">Senha</label>
			                        	<input type="password" name="password" placeholder="Senha" class="form-password form-control" id="form-password">
			                        </div>
			                        <button type="submit" class="btn btn-primary">Entrar</button>
			                        <a href="https://intranet.inec.org.br/novasenhainec" target="_blank">Recuperação de senha INEC!</a>
			                    </form>
                             <!--Mensagem de erro-->
                             <?php

                                 if($ret==1){

                                     echo '<div class="alert alert-danger alert-dismissible fade in " role="alert" >';
                                     echo '<button class="close" type="button" data-dismiss="alert" aria-label="Close">';
                                     echo '<span aria-hidden="true">×</span></button>';
                                     echo '<p>Erro ao logar, usuário ou senha incorretos.</p></div>';
                                     //echo '<script type="text/javascript">alert("teste");</script>';
                                     //echo $ret;
                                 }else{
                                     //echo $ret;
                                 }
                               ?>
                           <!--Fim mensagem-->
		                    </div>
                        </div>
                    </div>
                    <!--<div class="row">
                        <div class="col-sm-6 col-sm-offset-3 social-login">
                        	<h3>...or login with:</h3>
                        	<div class="social-login-buttons">
	                        	<a class="btn btn-link-2" href="#">
	                        		<i class="fa fa-facebook"></i> Facebook
	                        	</a>
	                        	<a class="btn btn-link-2" href="#">
	                        		<i class="fa fa-twitter"></i> Twitter
	                        	</a>
	                        	<a class="btn btn-link-2" href="#">
	                        		<i class="fa fa-google-plus"></i> Google Plus
	                        	</a>
                        	</div>
                        </div>
                    </div>-->
                </div>

            </div>

        </div>

        <!-- Javascript -->
        <script src="assets/js/jquery-1.11.1.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/jquery.backstretch.min.js"></script>
        <script src="assets/js/scripts.js"></script>

        <!--[if lt IE 10]>
            <script src="assets/js/placeholder.js"></script>
        <![endif]-->

    </body>

</html>
