<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Add headers
    $headers = "From: hello@miketsak.gr" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Send email
    $result = mail($to, $subject, $message, $headers);

    if ($result) {
        echo "Email sent successfully.";
    } else {
        echo "Email sending failed.";
    }
}
?>
