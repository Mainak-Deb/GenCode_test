import vertexai
from vertexai.language_models import CodeGenerationModel

def query_code(credentials,code, query):
    vertexai.init(project="vertex-ai-learn-406510", location="us-central1",credentials=credentials)
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.2
    }
    model = CodeGenerationModel.from_pretrained("code-bison")
    prompt=f"this is the code:\n {code}\n Answer this question based on this code : {query}"
    response = model.predict(
        prefix = prompt,
        **parameters
    )
    print(f"Response from Model: {response.text}")
    return response.text;