import vertexai
from vertexai.language_models import CodeChatModel

def chat_with_code(credentials,history,messege):
    vertexai.init(project="vertex-ai-learn-406510", location="us-central1",credentials=credentials)
    chat_model = CodeChatModel.from_pretrained("codechat-bison")
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 2048,
        "temperature": 0.4
    }
    chat = chat_model.start_chat(message_history=history)
    response = chat.send_message(messege, **parameters)
    return response.text