<?php
/**
 * SCRIPTEEZE Contact Form Handler
 * Optimized for Hostinger hosting
 */

// Prevent any output before headers
ob_start();

// Error handling - don't show errors in production
error_reporting(0);
ini_set('display_errors', 0);

// Set JSON response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_flush();
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    ob_end_flush();
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check JSON parsing
if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    ob_end_flush();
    exit();
}

// Get form fields
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : 'Not provided';
$service = isset($data['service']) ? trim(strip_tags($data['service'])) : 'Not specified';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    ob_end_flush();
    exit();
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email']);
    ob_end_flush();
    exit();
}

// Email settings
$to = 'info@scripteeze.in';
$subject = 'New Enquiry: ' . $service;

// Simple HTML email body
$body = "
<html>
<head>
<title>New Website Enquiry</title>
</head>
<body style='font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;'>
<div style='max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;'>
<h2 style='color: #f5a623; margin-top: 0;'>New Website Enquiry</h2>
<hr style='border: none; border-top: 2px solid #f5a623; margin: 20px 0;'>
<p><strong>Name:</strong> {$name}</p>
<p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
<p><strong>Phone:</strong> {$phone}</p>
<p><strong>Service:</strong> {$service}</p>
<hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
<p><strong>Message:</strong></p>
<p style='background: #f9f9f9; padding: 15px; border-radius: 5px;'>" . nl2br(htmlspecialchars($message)) . "</p>
<hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
<p style='color: #888; font-size: 12px;'>Sent from SCRIPTEEZE website on " . date('F j, Y \a\t g:i A') . "</p>
</div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: SCRIPTEEZE <noreply@scripteeze.in>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";

// Send email
$sent = mail($to, $subject, $body, $headers);

// Clear any buffered output
ob_end_clean();

// Send response
header('Content-Type: application/json');

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please email us directly at info@scripteeze.in']);
}
?>