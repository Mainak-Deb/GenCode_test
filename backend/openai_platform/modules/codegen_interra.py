from openai_platform.modules.CallOpenAi import getResult

def generate_code(OPENAI_CLIENT,language:str,functionname:str,description:str):
    if(len(description.strip())==0):
        description="None"
    if(len(language.strip())==0):
        language="any"
    if(len(functionname.strip())==0):
        prompt=f"""Write a code in {language} language with following description description:{description}
            just give us the raw text,don't write the name of the language in first"""
    else:    
        prompt=f"""Write a function named={functionname} in {language} language with  following description:{description}
               just give us the raw text,don't write the name of the language in first"""
        
    print(prompt)

    response=getResult(OPENAI_CLIENT,prompt)
    return response;