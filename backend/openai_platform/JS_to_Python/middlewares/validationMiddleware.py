from flask import request, jsonify
from validator import validate, ValidationError

# Define validation middleware for the code snippet
def validate_code_snippet():
    try:
        validate(request.json, {'codeSnippet': {'type': 'string', 'empty': False}})
    except ValidationError as e:
        return jsonify({'errors': [{'msg': str(e)}]}), 400

    return None

# Validation middleware for Code Generation
def validate_user_input():
    try:
        validate(request.json, {'userInput': {'type': 'string', 'empty': False}})
    except ValidationError as e:
        return jsonify({'errors': [{'msg': str(e)}]}), 400

    return None

# Validation middleware for Test Case Generation
def validate_function_snippet():
    try:
        validate(request.json, {'functionSnippet': {'type': 'string', 'empty': False}})
    except ValidationError as e:
        return jsonify({'errors': [{'msg': str(e)}]}), 400

    return None
