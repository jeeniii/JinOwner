const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');
const apiKey = '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';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

// ChatGPT API 요청
async function fetchAIResponse(prompt) {
    // API 요청에 사용할 옵션을 정의
    const openAIRequestOptions  = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json', // 요청의 본문이 JSON 형식임을 설정
            'Authorization': `Bearer ${apiKey}` // API 키를 헤더에 추가
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user", //User로 설정
                content: prompt         // 사용자의 메시지를 설정
            }, ],
            temperature: 1, // 생성된 텍스트의 다양성을 설정
            max_tokens: 1024, // 생성할 최대 토큰의 개수를 설정
            top_p: 1,
            frequency_penalty: 0.5, // 동일한 단어가 반복되는 것을 억제하는 정도
            presence_penalty: 0.5, // 특정 단어가 생성되는 것을 억제하는 정도
            stop: ["stop"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };
    // API 요청 후 응답 및 에러 처리
    try {
        const response = await fetch(apiEndpoint, openAIRequestOptions );
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
		console.error('Error occurred while calling OpenAI API', error);
        return 'Error occurred while calling OpenAI API';
    }
}
// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', async () => {
    // 사용자가 입력한 메시지를 가져옴
    const message = userInput.value.trim();
    // 메시지가 빈 경우 그대로 리턴
    if (message.length === 0) return;
    // 사용자 메시지 화면에 추가
    addMessage('나', message);
    userInput.value = '';
    //ChatGPT API 요청후 답변을 화면에 추가
    const aiResponse = await fetchAIResponse(message);
    addMessage('챗봇', aiResponse);
});

// 엔터키 입력 이벤트 처리
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

for (const i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random()*window.innerWidth + 'px';
    star.style.top = Math.random()*window.innerWidth + 'px';
    document.body.appendChild(star);
}

// 메시지를 화면에 추가
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === '나' ? 'right' : 'left');
    let i = 0;
    const intervalId = setInterval(() => {
        if (i < message.length) {
            messageElement.textContent += message[i];
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, 100); // 100ms delay
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}