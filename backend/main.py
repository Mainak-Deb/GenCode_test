from flask import Flask, jsonify, request 
import os
from dotenv import load_dotenv
import googleapiclient.discovery
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from flask_cors import CORS
import vertexai_platform 

# Load environment variables from .env file
load_dotenv()

#initializing flask app
app = Flask(__name__)
CORS(app)


#loading credentials
GCLOUD_SERVICE_CREDENTIAL=Credentials.from_service_account_file('credentials.json')
PALM2_API_KEY=os.getenv('PALM2_API_KEY')
OPENAI_API_KEY=os.getenv('OPENAI_API_KEY')

print(GCLOUD_SERVICE_CREDENTIAL,OPENAI_API_KEY,PALM2_API_KEY)



@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/codegen', methods=['POST'])
def codegen():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        language=data['language']
        functionname=data['functionName']
        description=data['description']

        print(data)

        code=vertexai_platform.generate_code(GCLOUD_SERVICE_CREDENTIAL,language,functionname,description)
        
        return jsonify({
            "status":200,
            "content":code
        })
    



@app.route('/codequery', methods=['POST'])
def codequery():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        code=data['code']
        query=data['query']

        print(data)

        content=vertexai_platform.query_code(GCLOUD_SERVICE_CREDENTIAL,code,query)
        
        return jsonify({
            "status":200,
            "content":content
        })

@app.route('/testcasegen', methods=['POST'])
def testcase_gen():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        language=data['language']
        functionBody=data['functionBody']
        description=data['description']

        table=vertexai_platform.generate_table(GCLOUD_SERVICE_CREDENTIAL,functionBody,description)
        testing_code=vertexai_platform.generate_test_code(GCLOUD_SERVICE_CREDENTIAL,functionBody,table,language)

        print(table)
        print(testing_code)
        
        return jsonify({
            "status":200,
            "table":table,
            "testing_code":testing_code
        })

@app.route('/codecompletion', methods=['POST'])
def code_completion():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        print(data,type(data),dir(data))
        prefix=str(data['prefix'])
        suffix=str(data['suffix'])

        content=vertexai_platform.complete_code_function(prefix,suffix)
        
        return jsonify({
            "status":200,
            "content":content,
        })

if __name__ == '__main__':
    app.run(port=8080,debug=True)
