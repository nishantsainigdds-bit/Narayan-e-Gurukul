/**
 * AI Guru Ji - Intelligent Learning Assistant
 * Narayan e-Gurukul
 */

(function() {
    // 1. Create and inject Styles
    const styles = `
        .ai-guru-widget {
            position: fixed;
            bottom: 30px;
            left: 30px;
            z-index: 10001;
            font-family: 'Outfit', sans-serif;
        }

        .ai-guru-trigger {
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, #0e2f69, #1746a2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            box-shadow: 0 10px 25px rgba(14, 47, 105, 0.3);
            cursor: pointer;
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .ai-guru-trigger:hover {
            transform: scale(1.1) rotate(10deg);
        }

        .ai-guru-chat {
            position: absolute;
            bottom: 80px;
            left: 0;
            width: 360px;
            height: 500px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            animation: slideIn 0.4s ease;
        }

        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .ai-guru-header {
            background: linear-gradient(135deg, #0e2f69, #1746a2);
            padding: 20px;
            color: white;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .ai-guru-header img {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            padding: 5px;
        }

        .ai-guru-header h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
        }

        .ai-guru-header p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }

        .ai-guru-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .msg {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 15px;
            font-size: 14px;
            line-height: 1.5;
        }

        .msg.bot {
            background: white;
            color: #1e293b;
            align-self: flex-start;
            border-bottom-left-radius: 2px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .msg.user {
            background: #0e2f69;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }

        .ai-guru-footer {
            padding: 15px;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 10px;
        }

        .ai-guru-input {
            flex: 1;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 15px;
            outline: none;
            font-family: inherit;
        }

        .ai-guru-send {
            background: #0e2f69;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 5px;
        }

        .qr-btn {
            background: #eff6ff;
            color: #1e40af;
            border: 1px solid #dbeafe;
            padding: 6px 12px;
            border-radius: 50px;
            font-size: 12px;
            cursor: pointer;
            transition: 0.2s;
        }

        .qr-btn:hover {
            background: #dbeafe;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Create HTML structure
    const widget = document.createElement('div');
    widget.className = 'ai-guru-widget';
    widget.id = 'aiGuruWidget';
    widget.innerHTML = `
        <div class="ai-guru-chat" id="aiChatWindow">
            <div class="ai-guru-header">
                <i class="ri-robot-2-line" style="font-size: 30px; color: #facc15;"></i>
                <div>
                    <h4>AI Guru Ji</h4>
                    <p>Online | Learning Assistant</p>
                </div>
                <i class="ri-close-line" style="margin-left: auto; cursor: pointer;" onclick="toggleAiChat()"></i>
            </div>
            <div class="ai-guru-body" id="chatBody">
                <div class="msg bot">
                    Namaste! I am <b>AI Guru Ji</b>. How can I assist your learning journey today?
                    <div class="quick-replies">
                        <button class="qr-btn" onclick="sendAiMessage('JEE Syllabus')">JEE Syllabus</button>
                        <button class="qr-btn" onclick="sendAiMessage('Mock Tests')">Mock Tests</button>
                        <button class="qr-btn" onclick="sendAiMessage('Admission')">Admission</button>
                    </div>
                </div>
            </div>
            <div class="ai-guru-footer">
                <input type="text" class="ai-guru-input" id="aiInput" placeholder="Ask Guru Ji Anything...">
                <button class="ai-guru-send" onclick="handleAiSend()">
                    <i class="ri-send-plane-2-fill"></i>
                </button>
            </div>
        </div>
        <div class="ai-guru-trigger" onclick="toggleAiChat()" id="aiTrigger">
            <i class="ri-chat-smile-2-fill"></i>
        </div>
    `;
    document.body.appendChild(widget);

    // 3. Logic
    window.toggleAiChat = function() {
        const chat = document.getElementById('aiChatWindow');
        chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    };

    window.sendAiMessage = function(text) {
        addMessage(text, 'user');
        
        // Bot Logic
        setTimeout(() => {
            let reply = "That's a great question! Let me check that for you.";
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('jee')) {
                reply = "The JEE Main syllabus covers Physics, Chemistry, and Mathematics. Focus on high-weightage topics like Mechanics and Calculus! You can find the full list in the Syllabus section.";
            } else if (lowerText.includes('neet')) {
                reply = "NEET aspirants should focus heavily on Biology (NCERT is key!). Physics and Chemistry are also crucial. Check our NEET section for chapter-wise weightage.";
            } else if (lowerText.includes('test') || lowerText.includes('mock')) {
                reply = "Regular mock tests are the secret to success! We conduct them every Sunday. Check your Schedule to enroll.";
            } else if (lowerText.includes('admission')) {
                reply = "Admissions for the 2026 batch are open! You can call our helpline at +91 9468974044 for direct guidance.";
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                reply = "Namaste! Ready to study today?";
            }

            addMessage(reply, 'bot');
        }, 800);
    };

    window.handleAiSend = function() {
        const input = document.getElementById('aiInput');
        const text = input.value.trim();
        if (text) {
            sendAiMessage(text);
            input.value = '';
        }
    };

    function addMessage(text, sender) {
        const body = document.getElementById('chatBody');
        const m = document.createElement('div');
        m.className = `msg ${sender}`;
        m.innerHTML = text;
        body.appendChild(m);
        body.scrollTop = body.scrollHeight;
    }

    // Allow Enter key
    document.getElementById('aiInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleAiSend();
    });
})();
