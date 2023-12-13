from flask import Flask, request, jsonify
from middleware.validation_middleware import validate_code_snippet
from utils.openai import generate_code_completion

app = Flask(__name__)

@app.route('/', methods=['POST'])
@validate_code_snippet
def code_completion():
    try:
        code_snippet = request.json.get('codeSnippet')
        print('Received codeSnippet:', code_snippet)

        completed_code = generate_code_completion(code_snippet)
        return jsonify({'completedCode': completed_code})
    except Exception as error:
        print('Error:', str(error))
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
