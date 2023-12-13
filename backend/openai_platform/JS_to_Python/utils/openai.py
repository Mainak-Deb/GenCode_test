import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_code_completion(code_snippet):
    try:
        # Ensure code_snippet is a non-null string
        if not isinstance(code_snippet, str) or not code_snippet.strip():
            raise ValueError("Invalid code snippet")

        chat_completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": code_snippet},
            ],
        )

        completion = chat_completion["choices"][0]["message"]["content"]
        print(completion)

        return completion
    except Exception as error:
        print("OpenAI API error:", error)
        raise ValueError("Failed to generate code completion")

def generate_code(user_input):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ],
        )

        generated_code = response["choices"][0]["message"]["content"]
        print(generated_code)

        return generated_code
    except Exception as error:
        print("OpenAI API error:", error)
        raise ValueError("Failed to generate code")

def generate_test_cases(function_snippet):
    try:
        test_cases = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": function_snippet},
            ],
        )

        generated_test_cases = test_cases["choices"][0]["message"]["content"]
        print(generated_test_cases)
        return generated_test_cases  # Processed test cases
    except Exception as error:
        print("OpenAI API error:", error)
        raise ValueError("Failed to generate test cases")

def handle_chat_response(user_input):
    try:
        chat_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ],
        )

        completion = chat_response["choices"][0]["message"]["content"]

        # You can further process the completion if needed

        return completion
    except Exception as error:
        print("OpenAI API error:", error)
        raise ValueError("Failed to handle chat response")

def generate_unit_test_code(test_function):
    try:
        unit_test = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": test_function},
            ],
        )

        generated_unit_test_code = unit_test["choices"][0]["message"]["content"]
        print(generated_unit_test_code)
        return generated_unit_test_code
    except Exception as error:
        print("OpenAI API error:", error)
        raise ValueError("Failed to generate unit test code")

