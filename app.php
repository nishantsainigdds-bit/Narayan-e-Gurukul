<?php
// ── app.php – Single file router for e-Gurukul ────────────────────────────────
session_start();

define('API_URL', 'http://localhost:3001');

function apiPost(string $ep, array $data): array {
    $ch = curl_init(API_URL . $ep);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_POST=>true,
        CURLOPT_HTTPHEADER=>['Content-Type: application/json'],
        CURLOPT_POSTFIELDS=>json_encode($data), CURLOPT_TIMEOUT=>5]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $r = json_decode($body, true) ?? [];
    $r['__status'] = $code;
    return $r;
}
function user(): ?array { return $_SESSION['user'] ?? null; }
function requireLogin(): void { if (!user()) { header('Location: app.php?page=login'); exit; } }
function initials(string $n): string {
    $p = array_filter(explode(' ', trim($n)));
    return count($p)>=2 ? strtoupper($p[0][0].end($p)[0]) : strtoupper($p[0][0]??'U');
}
function greet(): string {
    $h=(int)date('H'); if($h<12) return 'Good Morning'; if($h<17) return 'Good Afternoon'; return 'Good Evening';
}

$page  = $_GET['page'] ?? 'login';
$error = '';

// ── LOGOUT ────────────────────────────────────────────────────────────────────
if ($page === 'logout') { session_destroy(); header('Location: app.php?page=login'); exit; }

// ── REGISTER POST ─────────────────────────────────────────────────────────────
if ($page === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name=$_POST['name']??''; $email=$_POST['email']??'';
    $phone=$_POST['phone']??''; $class=$_POST['class']??''; $pw=$_POST['password']??'';
    if (!$name||!$email||!$pw) { $error='Name, email and password are required.'; }
    elseif (!filter_var($email,FILTER_VALIDATE_EMAIL)) { $error='Invalid email address.'; }
    elseif (strlen($pw)<8) { $error='Password must be at least 8 characters.'; }
    else {
        $res = apiPost('/api/auth/register',['role'=>'student','name'=>$name,'email'=>$email,'password'=>$pw]);
        if ($res['__status']===201) {
            $_SESSION['user']=['id'=>$res['id'],'name'=>$name,'email'=>$email,'phone'=>$phone,'class'=>$class];
            header('Location: app.php?page=dashboard'); exit;
        }
        $error = $res['error'] ?? 'Registration failed.';
    }
}

// ── LOGIN POST ────────────────────────────────────────────────────────────────
if ($page === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['google_credential'])) {
        $res = apiPost('/api/auth/google',['credential'=>trim($_POST['google_credential'])]);
        if ($res['__status']===200 && isset($res['token'])) {
            $_SESSION['user']=$res['user']; $_SESSION['token']=$res['token'];
            header('Location: app.php?page=dashboard'); exit;
        }
        $error = $res['error'] ?? 'Google login failed.';
    } elseif (!empty($_POST['email']) && !empty($_POST['password'])) {
        $res = apiPost('/api/auth/login',['role'=>'student','email'=>$_POST['email'],'password'=>$_POST['password']]);
        if ($res['__status']===200 && isset($res['id'])) {
            $_SESSION['user']=$res; header('Location: app.php?page=dashboard'); exit;
        }
        $error = $res['error'] ?? 'Invalid email or password.';
    } else { $error='Please fill in all fields.'; }
}
