import vertexai
from vertexai.language_models import CodeGenerationModel

def generate_code(credentials,language:str,functionname:str,description:str):
    vertexai.init(project="vertex-ai-learn-406510", location="us-central1",credentials=credentials)
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.2
    }
    model = CodeGenerationModel.from_pretrained("code-bison")
    if(len(language.strip())==0):
        language="any"
    if(len(functionname.strip())==0):
        prompt=f"Write a code in {language} language with following description description:{description}"
    else:    
        prompt=f"Write a function named={functionname} in {language} language with  following description:{description}"
    response = model.predict(
        prefix = prompt,
        **parameters
    )
    print(f"Response from Model: {response.text}")
    return response.text;