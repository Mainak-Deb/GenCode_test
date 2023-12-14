from openai_platform.modules.CallOpenAi import getResult

def query_code(OPENAI_CLIENT,code, query):
    prompt=f"This is the code:\n {code}\n Answer this question based on this code : {query}"
    response =getResult(OPENAI_CLIENT,prompt)
    return response;