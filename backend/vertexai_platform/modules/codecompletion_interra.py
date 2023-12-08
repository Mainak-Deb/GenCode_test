from vertexai.language_models import CodeGenerationModel


def complete_code_function(prefix,suffix) -> object:
    """Example of using Codey for Code Completion to complete a function."""

    # TODO developer - override these parameters as needed:
    parameters = {
        "temperature": 0.2,  # Temperature controls the degree of randomness in token selection.
        "max_output_tokens": 64,  # Token limit determines the maximum amount of text output.
    }

    code_completion_model = CodeGenerationModel.from_pretrained("code-gecko@001")
    response = code_completion_model.predict(
        prefix=prefix,
        suffix=suffix,
         **parameters
    )

    print(f"Response from Model: {response.text}")

    return response.text
