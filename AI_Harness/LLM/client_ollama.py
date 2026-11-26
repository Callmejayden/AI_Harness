import ollama
from Config.config import get_settings

_settings = get_settings()
_client = ollama.Client(host=_settings.Ollama_Host)



def start_model(model_name):
    # Pull a local model
    model = ollama.pull(model_name)

    print("Model loaded successfully:", model)


def chat_model(model_name, prompt):
    # Test the model with a given prompt
    response = _client.generate(model_name, prompt)
    return response


if __name__ == "__main__":
    start_model(_settings.Default_Model)
    test_prompt = "Hello, how are you?"
    response = chat_model(_settings.Default_Model, test_prompt)
    print("Model response:", response)


