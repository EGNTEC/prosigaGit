<?php
// Inicia sessoes, para assim poder destrui-las
session_start();
session_destroy();

header("Location: /index.php");