import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def transcribe_audio(file_path):
    with open(file_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript['text']

# Example usage
# if __name__ == "__main__":
#     file_path = "extracted_audio.mp3"  # Replace with the path to your audio file
#     text = transcribe_audio(file_path)
#     print(f"Transcribed Text: {text}")
