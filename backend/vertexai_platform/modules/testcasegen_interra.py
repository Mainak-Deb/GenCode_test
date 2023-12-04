import vertexai
from vertexai.language_models import CodeGenerationModel

def generate_table(credentials,functionbody:str,description:str):
    vertexai.init(project="vertex-ai-learn-406510", location="us-central1",credentials=credentials)
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.2
    }
    # print(functionbody)
    # print(description)
    model = CodeGenerationModel.from_pretrained("code-bison")
    prompt=f"""{functionbody}\nwrite me unit text cases for this function ,
    containing both negative and positive testcases, 
    one row will contain serial number, 
    another rows will contain input field of the function 
    and other rows will contain expected output,
    in excel sheet table format with as max as row you can generate"""
    
    if(len(description.strip())!=0):
        prompt=prompt+"\nConsider following points: {description}"

    
    
    response = model.predict(
        prefix = prompt,
        **parameters
    )
    #print(f"Response from Model: {response.text}")


    parsed_table=parse_input(str(response.text))
    #print(parsed_table)
    return parsed_table;


def generate_test_code(credentials,functionbody:str,table:dict,language:str):
    vertexai.init(project="vertex-ai-learn-406510", location="us-central1",credentials=credentials)
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.2
    }
    print(table)

    columns=','.join(table["header"])
    model = CodeGenerationModel.from_pretrained("code-bison")
    prompt=f"""{functionbody}\ngenerate a code in {language} language  which can unit
    test this function after taking  data 
    from a excel sheet named test_[FUNCTION_NAME].xlxs , 
    containg following columns with name {columns}
    code can use any external libray or modules , or can generate from scrach"""

    response = model.predict(
        prefix = prompt,
        **parameters
    )
    
    return response.text
    


def parse_input(input_text):
    print(input_text)
    lines = input_text.strip().split('\n')
    #reconstructing header
    header = lines[0].strip()[1:-1].split('|')
    header=[i.strip() for i in header]
    #reconstructing body
    data = [line.strip()[1:-1].split('|') for line in lines[2:]]
    #init body
    body=[]
    for i in range(len(data)):
        if(len(header)==len(data[i])):
          d=dict()
          for j in range(len(header)):
            d[header[j]]=data[i][j].strip()
          body.append(d)

    return {
        "header":header,
        "body":body
    }
