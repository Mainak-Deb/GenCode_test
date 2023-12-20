from flask import Flask, jsonify, request 
import os
from dotenv import load_dotenv
import googleapiclient.discovery
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from flask_cors import CORS
import vertexai_platform 
import openai_platform
from openai import OpenAI
import json

# Load environment variables from .env file
load_dotenv()

#initializing flask app
app = Flask(__name__)
CORS(app)


class CustomObjectForGoogle:
    def __init__(self, dictionary):
        for key, value in dictionary.items():
            setattr(self, key, value)


def CustomObjectForOpenAi(dictionary):
    d=dict()
    d["role"]=dictionary["author"]
    d["content"]=dictionary["content"]
    return d



#loading credentials
GCLOUD_SERVICE_CREDENTIAL=Credentials.from_service_account_file('credentials.json')
PALM2_API_KEY=os.getenv('PALM2_API_KEY')
OPENAI_API_KEY=os.getenv('OPENAI_API_KEY')

# print(GCLOUD_SERVICE_CREDENTIAL,OPENAI_API_KEY,PALM2_API_KEY)

OPENAI_CLIENT = OpenAI(
    api_key=OPENAI_API_KEY
)


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
        platformname=data['platformname']

        print(data)

        if(platformname=="Google"):
            code=vertexai_platform.generate_code(GCLOUD_SERVICE_CREDENTIAL,language,functionname,description)    
            return jsonify({
                "status":200,
                "content":code
            })
        elif(platformname=="OpenAi"):
            code=openai_platform.generate_code(OPENAI_CLIENT,language,functionname,description)    
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
        platformname=data['platformname']

        print(data)

        if(platformname=="Google"):
            content=vertexai_platform.query_code(GCLOUD_SERVICE_CREDENTIAL,code,query)
            
            return jsonify({
                "status":200,
                "content":content
            })
        elif(platformname=="OpenAi"):
            content=openai_platform.query_code(OPENAI_CLIENT,code,query)
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
        platformname=data['platformname']

        if(platformname=="Google"):
            table=vertexai_platform.generate_table(GCLOUD_SERVICE_CREDENTIAL,functionBody,description)
            testing_code=vertexai_platform.generate_test_code(GCLOUD_SERVICE_CREDENTIAL,functionBody,table,language)

            print(table)
            print(testing_code)
            
            return jsonify({
                "status":200,
                "table":table,
                "testing_code":testing_code
            })
        elif(platformname=="OpenAi"):
            table=openai_platform.generate_table(OPENAI_CLIENT,functionBody,description)
            testing_code=openai_platform.generate_test_code(OPENAI_CLIENT,functionBody,table,language)

            print(table)
            print(testing_code)

            return jsonify({
                "status":200,
                "table":table,
                "testing_code":testing_code
            })
            # return jsonify({
            #     "status":200,
            #     "table":[
            #         {"header":[],
            #             "body":[]
            #             }
            #             ],
            #     "testing_code":"null"
            # })

@app.route('/codecompletion', methods=['POST'])
def code_completion():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        print(data,type(data),dir(data))
        prefix=str(data['prefix'])
        suffix=str(data['suffix'])
        platformname=str(data['platformname'])

        if(platformname=="Google"):
            content=vertexai_platform.complete_code_function(GCLOUD_SERVICE_CREDENTIAL,prefix,suffix)
            
            return jsonify({
                "status":200,
                "content":content,
            })
        elif(platformname=="OpenAi"):
            content=openai_platform.complete_code_function(OPENAI_CLIENT,prefix,suffix)
            
            return jsonify({
                "status":200,
                "content":content,
            })



@app.route('/codechat', methods=['POST'])
def codechat():
    if request.method == 'POST':
        # Get POST parameters from the request
        data = request.get_json()
        history=data['history']
        messege=data['messege']
        platformname=data['platformname']
        print(platformname)

        if(platformname=="Google"):
            history_array=[]
            for i in history:
                history_array.append(CustomObjectForGoogle(i))
            content=vertexai_platform.chat_with_code(GCLOUD_SERVICE_CREDENTIAL,history=history_array, messege=messege)        
            return jsonify({
                "status":200,
                "content":content
            })

        if(platformname=="OpenAi"):
            history_array=[]
            for i in history:
                history_array.append(CustomObjectForOpenAi(i))
            content=openai_platform.chat_with_code(OPENAI_CLIENT,history=history_array, messege=messege)        
            return jsonify({
                "status":200,
                "content":content
            })



if __name__ == '__main__':
    app.run(port=8080,debug=True)
