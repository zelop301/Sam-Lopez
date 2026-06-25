<?php
/**
 * Zelo Gaming Official Hub - Custom PHP AI Brand Assistant Proxy
 * -------------------------------------------------------------
 * Since InfinityFree/free hosting does not support running continuous background node.js index files,
 * this PHP backend provides a lightweight, enterprise-grade cURL bridge directly to the Google Gemini API.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open this file on your InfinityFree "File Manager" (htdocs/api/chat.php).
 * 2. Get a free API Key from Google AI Studio (https://aistudio.google.com).
 * 3. Replace 'YOUR_GEMINI_API_KEY_HERE' with your actual key below, or set it via environment variables.
 * 4. Save and close. Your AI Brand Assistant is now fully live and autonomous!
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle CORS preflight options
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed. Use POST."]);
    exit();
}

// 1. Read input payload
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

$userMessage = isset($input['message']) ? trim($input['message']) : '';
if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(["reply" => "Greetings! Please state your campaign proposal, sponsorship inquiry, or build questions, and I will parse it for Zelo."]);
    exit();
}

// 2. Set your Google Gemini API Key here
$apiKey = getenv('GEMINI_API_KEY') ?: "YOUR_GEMINI_API_KEY_HERE";

if ($apiKey === "YOUR_GEMINI_API_KEY_HERE" || empty($apiKey)) {
    echo json_encode([
        "reply" => "👋 Hello! Aura is here and ready, but your Gemini API key is not configured in this PHP file yet! \n\n🤖 To activate me:\n1. Open your File Manager on InfinityFree.\n2. Navigate to 'htdocs/api/chat.php'.\n3. Set your Google Gemini API Key where it says 'YOUR_GEMINI_API_KEY_HERE'.\n\nI will initialize immediately!"
    ]);
    exit();
}

// 3. Define the AI context and system rules
$systemInstructions = "You are 'Aura', the elegant, highly professional AI Business & Brand Manager representation for Sammium Tech Industries, a prominent premium tech setup, gaming hardware, and content brand. "
    . "Your job is to interact with prospective brands, sponsors, agencies, and partners who want to collaborate with Sammium Tech Industries.\n\n"
    . "Official Creator Profile details:\n"
    . "- Name: Sammium Tech Industries\n"
    . "- Niche: High-tactical FPS gaming, custom PC builds, and premium desk setups\n"
    . "- Contact Email: zelop301@gmail.com\n"
    . "- Social Channels:\n"
    . "  * TikTok: @sammium_tech (245K followers, 8.2M total likes, 12% engagement)\n"
    . "  * Twitch: sammium_live (42K followers)\n"
    . "  * YouTube: Sammium Tech Industries (68K subscribers)\n"
    . "  * Instagram: @sammium.tech (35K followers)\n"
    . "- Sponsorship Rates:\n"
    . "  * Dedicated Sponsor TikTok (60s): $1,200 USD (Includes review & product Bio link for 30 days)\n"
    . "  * Integrated Gaming Clip (15-20s): $550 USD (Inside a viral gameplay moments display)\n"
    . "  * Desk Setup Feature: $850 USD (Peripheral showcase in desk transformation videos)\n"
    . "  * Monthly Brand Ambassadorship: $3,000 USD (4 dedicated assets, Twitch placement, bio links)\n"
    . "- Current Hardware Setup:\n"
    . "  * PC: AMD Ryzen 9 7900X, ROG RTX 4080 Super, 64GB RAM\n"
    . "  * Keyboard: Custom Wobkey Rainy75 & Wooting 60HE\n"
    . "  * Audio: Shure SM7B, DT 990 Pro headphones\n\n"
    . "Guidelines:\n"
    . "1. Be highly professional, clean, structured, and strategic. Act as Sammium Tech's agent.\n"
    . "2. Guide users to submit their proposal via the Inquiry Pitch form on the main webpage if they want a official response.\n"
    . "3. Always keep responses sleek, modern, concise, and structured with clean markdown bullets.";

// 4. Construct Request for Gemini 1.5-flash API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . rawurlencode($apiKey);

$payload = [
    "contents" => [
        [
            "parts" => [
                ["text" => $systemInstructions . "\n\nUser Message: " . $userMessage]
            ]
        ]
    ],
    "generationConfig" => [
        "temperature" => 0.7,
        "maxOutputTokens" => 1000
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

// Execute cURL request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    echo json_encode([
        "reply" => "Connection to the Google AI models timed out. Please try again! Error: " . $curlError
    ]);
    exit();
}

$decoded = json_decode($response, true);

if ($httpCode === 200 && isset($decoded['candidates'][0]['content']['parts'][0]['text'])) {
    $aiReply = $decoded['candidates'][0]['content']['parts'][0]['text'];
    echo json_encode(["reply" => $aiReply]);
} else {
    // Graceful error display or JSON fallback
    $errorMsg = isset($decoded['error']['message']) ? $decoded['error']['message'] : "Invalid API response context";
    echo json_encode([
        "reply" => "Unable to generate message response. Please verify your API Key and billing status at Google AI Studio. Server code: " . $httpCode . " Details: " . $errorMsg
    ]);
}
?>
