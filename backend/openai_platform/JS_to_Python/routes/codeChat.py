from flask import Flask, request, jsonify
from middleware.validation_middleware import validate_user_input
from utils.openai import handle_chat_response

app = Flask(__name__)

@app.route('/', methods=['POST'])
@validate_user_input
def chat():
    try:
        user_input = request.json.get('userInput')
        chat_response = handle_chat_response(user_input)
        return jsonify({'chatResponse': chat_response})
    except Exception as error:
        print('Error:', str(error))
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
