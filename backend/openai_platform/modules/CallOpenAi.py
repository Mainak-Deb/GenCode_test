from openai import OpenAI

def getResult(OPENAI_CLIENT,prompt, history=None):
    print(history)
    if(history==None):
        completion = OPENAI_CLIENT.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-3.5-turbo",
            temperature=0.2
        )
    else:
        history.append({
                    "role": "user",
                    "content": prompt,
                })

        completion = OPENAI_CLIENT.chat.completions.create(
            messages=history,
            model="gpt-3.5-turbo",
            temperature=0.2
        )
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content;