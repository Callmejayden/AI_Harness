import json
with open("Store/history.json", "r") as f:
    history = json.load(f)



def read_history():

    output = []
    for entry in history:
        print(entry)
        output.append(entry)

    # This function reads the conversation history from a database or file
    # For now, it just returns a placeholder list of conversations
    return output


def write_history(key, conversation):
    # This function writes a new conversation to the database or file
    history[key] = conversation

    print("Writing conversation:", conversation)

def save_history():
    with open("Store/history.json", "w") as f:
        json.dump(history, f, indent=4)

def clear_history():
    # This function clears the conversation history
    history.clear()
    save_history()

if __name__ == "__main__":

    conversations = read_history()
    print("Conversations:", conversations)

    new_conversation = {"user": "Hello", "bot": "Hi there!"}
    write_history("Test", new_conversation)
    save_history()

    clear_history()