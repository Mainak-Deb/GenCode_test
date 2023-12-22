from openai_platform.modules.CallOpenAi import getResult

def complete_code_function(OPENAI_CLIENT,prefix,suffix) -> object:
    """Example of using Codey for Code Completion to complete a function."""

    prompt=f"""{prefix}[COMPLETE THE CODE]{suffix}
           Complete above code , give the full code needed to replace [COMPLETE THE CODE]. ALong with the starting code.
            """
    
    response=getResult(OPENAI_CLIENT,prompt)
    return response;
