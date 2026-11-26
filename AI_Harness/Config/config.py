# This module contains configuration settings for the application.
import os
from pathlib import Path


model_name = "smollm2:135m"  # Default model name, can be overridden by environment variable

class Settings:
    # Where Ollama lives. "localhost" when running Ollama directly on your PC,
    # "ollama" later when it is a Docker Compose service next door.
    Ollama_Host: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
   
    # The default model to use for the application. This can be overridden by setting the DEFAULT_MODEL environment variable.
    Default_Model: str = os.getenv("DEFAULT_MODEL", model_name)
    
    # The directory where data files are stored. This can be overridden by setting the DATA_DIR environment variable.
    Data_Dir: Path = Path(os.getenv("DATA_DIR", "./data"))
    
    # The port on which the backend service will run. This can be overridden by setting the BACKEND_PORT environment variable.
    Backend_Port: int = int(os.getenv("BACKEND_PORT", 8000))

def get_settings() -> Settings:
    # This function retrieves the application settings.
    # It creates an instance of the Settings class and returns it.
    return Settings()

