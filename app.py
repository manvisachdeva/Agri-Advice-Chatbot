from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Function to get advice based on user query
def get_advice(query):
    query = query.lower()
    if 'crop' in query:
        return "Rotate your crops regularly to maintain soil fertility."
    elif 'pest' in query:
        return "Use organic pesticides to control pests."
    elif 'market' in query:
        return "Monitor market prices regularly to get the best deal."
    else:
        return "I'm not sure about that. Try asking something else related to crops, pests, or market prices."

@app.route('/api/chatbot', methods=['POST'])
def chatbot_response():
    data = request.json
    user_query = data.get('query')
    response = get_advice(user_query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=3000)  # Change to port 5001
