import os
from dotenv import load_dotenv
from input_handler import validate_input
from audio_extractor import extract_audio
from audio_to_text import transcribe_audio
from extraction_result import generate_content
from fetchMetadata.yt import fetch_youtube_metadata
from downloadMedia.yt_video import download_youtube_video  # Import the new function

load_dotenv()

def main():
    # Take a YouTube URL or .mp4 file as input
    input_str = input('Enter a YouTube URL or path to an .mp4 file: ')
    
    # Validate the input and get its type
    is_valid, input_type = validate_input(input_str)
    
    if not is_valid:
        print("Invalid input.")
        return
    
    video_path = None  # Initialize video_path
    
    # If the input is a YouTube URL, fetch metadata and download the video
    if input_type == 'youtube':
        api_key = os.getenv('YTDATA_API_KEY')
        metadata = fetch_youtube_metadata(input_str, api_key)
        print('Metadata:', metadata)
        
        video_path = download_youtube_video(input_str)  # Download the video
        if "Exception" in video_path:
            print(f"Failed to download video: {video_path}")
            return
    else:
        video_path = input_str  # If input is an mp4 file, no need to download
    
    # Extract the audio from the video
    audio_path = 'extracted_audio.mp3'
    extract_audio(video_path, audio_path)
    
    # Transcribe the audio to text
    transcribed_text = transcribe_audio(audio_path)
    
    # Generate an overview and summary of the text
    overview, summary = generate_content(transcribed_text)
    
    # Print the overview and summary
    print('Overview:', overview)
    print('Summary:', summary)

if __name__ == '__main__':
    main()
