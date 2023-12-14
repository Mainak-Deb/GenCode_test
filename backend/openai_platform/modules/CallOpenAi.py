from openai import OpenAI

def getResult(OPENAI_CLIENT,prompt):
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

    print(completion.choices[0].message.content)
    return completion.choices[0].message.content;