import os
import sys

def main():
    # Get the current working directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Add the parent directory to sys.path
    parent_dir = os.path.dirname(current_dir)
    sys.path.append(parent_dir)

    # Now you can import modules from the parent directory
    from LLM.client_ollama import start_model, model_name

    start_model(model_name)


    






if __name__ == "__main__":
    main()