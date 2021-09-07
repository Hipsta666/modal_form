<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception';
require 'phpmailer/src/PHPMailer';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('andrewhipsta@gmail.com', 'UserName');
$mail->addAddress('andrewhipsta@gmail.com');
$mail->Subject = 'Test';

$body = '<h1>ТЕСТ</h1>';

if (trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>'; 
}
if (trim(!empty($_POST['firstName']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['firstName'].'</p>'; 
}
if (trim(!empty($_POST['lastName']))){
    $body.='<p><strong>Фамилия:</strong> '.$_POST['lastName'].'</p>'; 
}
if (trim(!empty($_POST['select']))){
    $body.='<p><strong>Тип продукта:</strong> '.$_POST['select'].'</p>'; 
}
if (trim(!empty($_POST['checkbox1']) and $_POST['checkbox1'] != null)){
    $body.='<p><strong>Дополнительно $100</strong></p>'; 
}
if (trim(!empty($_POST['checkbox2']) and $_POST['checkbox2'] != null)){
    $body.='<p><strong>Дополнительно $200</strong></p>'; 
}
if (trim(!empty($_POST['price']))){
    $body.='<p><strong>Итоговая цена:</strong> '.$_POST['price'].'</p>'; 
}
if (trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>'; 
}

$mail->Body = $body;

if (!$mail->send()){
    $message = 'Error.';
} else {
    $message = 'Data sent.';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
