async function sendQuery() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return; // Prevent sending empty queries

    // Append user's query to the chatbox
    const messages = document.getElementById('messages');
    messages.innerHTML += `
        <div class="message user">
            <img src="user-avatar.jpeg" alt="User Avatar">
            <div class="text">${userInput}</div>
        </div>
    `;

    // Send the query to the Flask server
    try {
        const response = await fetch('http://127.0.0.1:3000/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Process the response
        const data = await response.json();
        messages.innerHTML += `
            <div class="message bot">
                <img src="bot-avatar.png" alt="Bot Avatar">
                <div class="text">${data.response}</div>
            </div>
        `;

        // Scroll to the bottom of the chatbox
        messages.scrollTop = messages.scrollHeight;

        // Clear the input field
        document.getElementById('userInput').value = '';
    } catch (error) {
        console.error('Error:', error);
    }
}
