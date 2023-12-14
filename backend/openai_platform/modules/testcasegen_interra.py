from openai_platform.modules.CallOpenAi import getResult

def generate_table(OPENAI_CLIENT,functionbody:str,description:str):

    prompt=f"""{functionbody}\nwrite me unit text cases for this function ,
    containing both negative and positive testcases, 
    one row will contain serial number, 
    another rows will contain input field of the function 
    and other rows will contain expected output,
    in excel sheet table format """
    
    if(len(description.strip())!=0):
        prompt=prompt+"\nConsider following points: {description}"

    
    response=getResult(OPENAI_CLIENT,prompt)
    print(response)
    parsed_table=parse_input(str(response))
    #print(parsed_table)
    return parsed_table;


def generate_test_code(OPENAI_CLIENT,functionbody:str,table:dict,language:str):
    columns=','.join(table["header"])
    prompt=f"""{functionbody}\ngenerate a code in {language} language  which can unit
    test this function after taking  data 
    from a csv file named testcases.csv , 
    containg following columns with name {columns}
    code can use any external libray or modules , or can generate from scrach"""

    response = getResult(OPENAI_CLIENT,prompt)
    return response
    


def parse_input(input_text):
    first_index = input_text.index('|')
    last_index = input_text.rindex('|')

    print("\n\n\n\n\nPARSED TEXT:",input_text[first_index:last_index+1])

    input_text=input_text[first_index:last_index+1]
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
