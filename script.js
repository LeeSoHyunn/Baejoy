//수정본
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const getChatbotResponse = (userMessage) => {
    // Define predefined questions and answers here
    const predefinedResponses = {
        "안녕": "안녕하세요, 궁금한 점을 물어보세요.",
        "배화여대 위치": "서울특별시 종로구 필운대로 1길 34에 위치해 있어요.",
        "배화여대 전화번호": "02-399-0700 입니다.",
        "배화여대 홈페이지": "https://www.baewha.ac.kr/main.do",
        "근처 카페 추천": "정문 앞 EDIYA를 추천드려요.",
        "배화여대 학과": "2/3년제 학과들로 이루어져 있어요.",
        "배화여대 놀거리": "학교 주변 경복궁과 안국, 서촌에서 놀기 좋아요."
        // Add more question-answer pairs as needed
    };

    // Check if the user's message matches any predefined question
    const response = predefinedResponses[userMessage.toLowerCase()];
    return response ? response : "죄송합니다.잘 이해하지 못했어요.";
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while processing the response
        const response = getChatbotResponse(userMessage);
        const incomingChatLi = createChatLi(response, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
