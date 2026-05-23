<?php
// Thông tin kết nối Database của XAMPP
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "aristino_db"; // Tên database của bạn

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $request_type = $_POST['request_type'];
    $content = $_POST['content'];

    // Câu lệnh đẩy vào bảng support_tickets
    $stmt = $conn->prepare("INSERT INTO support_tickets (fullname, phone, email, request_type, content) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fullname, $phone, $email, $request_type, $content);

    if ($stmt->execute()) {
        header("Location: cskh.html?status=success");
        exit();
    } else {
        echo "Lỗi: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>