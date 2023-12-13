from flask import Flask, request, jsonify
from middleware.validation_middleware import validate_function_snippet
from utils.openai import generate_test_cases

app = Flask(__name__)

@app.route('/', methods=['POST'])
@validate_function_snippet
def test_case_generation():
    try:
        function_snippet = request.json.get('functionSnippet')

        # Call the OpenAI API for generating test cases with the provided prompt
        processed_test_cases = generate_test_cases(function_snippet)

        # Send the processed test cases as the response
        return jsonify({'processedTestCases': processed_test_cases})
    except Exception as error:
        print('Error:', str(error))
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
