from openai_platform.modules.CallOpenAi import getResult

def chat_with_code(OPENAI_CLIENT,history,messege):
    """fore chat with openai"""
    print(history)
    response=getResult(OPENAI_CLIENT,prompt=messege,history=history)
    return response;