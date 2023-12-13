from flask import Flask, request, jsonify
from middleware.validation_middleware import validate_user_input
from utils.openai import generate_code

app = Flask(__name__)

@app.route('/', methods=['POST'])
@validate_user_input
def code_generation():
    try:
        user_input = request.json.get('userInput')

        # Call the OpenAI API for code generation
        generated_code = generate_code(user_input)

        # Send the generated code as the response
        return jsonify({'generatedCode': generated_code})
    except Exception as error:
        print('Error:', str(error))
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
