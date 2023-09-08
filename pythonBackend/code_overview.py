
# input_handler.py

import re

def validate_input(input_str):
    youtube_regex = re.compile(
        r'^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$'
    )
    
    is_youtube = bool(youtube_regex.match(input_str))
    is_mp4 = input_str.lower().endswith('.mp4')
    
    if not (is_youtube or is_mp4):
        return False, None
    
    return True, 'youtube' if is_youtube else 'mp4'

# Test the function
# test_inputs = [
#     "https://www.youtube.com/watch?v=abc123",
#     "https://m.youtube.com/watch?v=abc123",
#     "sample_video.mp4",
#     "invalid_input"
# ]

# for inp in test_inputs:
#     is_valid, inp_type = validate_input(inp)
#     print(f"Input: {inp}, Valid: {is_valid}, Type: {inp_type}")


# audio_extractor.py

import subprocess

def extract_audio(video_path, audio_path):
    command = [
        'C:\\Program Files (x86)\\FFmpeg\\ffmpeg.exe',
        '-i', video_path,  # Input video path
        '-q:a', '0',  # Quality
        '-map', 'a',  # Map to audio stream
        '-vn',  # No video
        audio_path  # Output audio path
    ]
    subprocess.run(command)

# Test the function
# extract_audio('WHY THE DREAM TEAMs EXPERIENCE IS SO IMPORTANT.mp4', 'extracted_audio.mp3')


# audio_to_text.py

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


# extraction_result.py

import openai
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize the GPT-4 API client
openai.api_key = os.getenv("OPENAI_API_KEY")


def generate_content(video_text):
    # Generate overview
    overview_messages = [
        {"role": "system", "content": "You are a helpful assistant specialized in generating overviews."},
        {"role": "user", "content": f"Give a very brief overview of the following video transcript. If applicable and relevant, use a bullet point format to make the brief overview.: {video_text}"}
    ]
    
    overview_response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=overview_messages
    )
    
    overview = overview_response['choices'][0]['message']['content']
    
    # Generate summary
    summary_messages = [
        {"role": "system", "content": "You are a helpful assistant specialized in summarizing video transcripts with little context."},
        {"role": "user", "content": f"Summarize the following video transcript in great detail. You can use bullet point format if, applicable, in order to represent different topics or enumerated elements, chapters, sections or something of such. For each element/topics/section/point give a lot of details, examples, insights but only if it will be relevant to the summary. : {video_text}"}
    ]
    
    summary_response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=summary_messages
    )
    
    summary = summary_response['choices'][0]['message']['content']
    
    return overview, summary

# # Replace with the actual text extracted from the video
# video_text = "There's no such thing as work-life balance. None! Learn to be super successful. Subscribe to my channel, Meathead. Because I've never seen a business plan fail on paper. In 50 years and 7 months, I've never seen a business plan fail on paper. Because by definition, they don't fail on paper. They fail when you're running them. And the challenge with the quality of your earnings, or a business plan, even a legitimate business plan, a good business plan, written and put together by knowledgeable people, is there's no way of factoring in you running the business. Remember, the reason I could do a lot of the stuff I do is because, until today, there is no compressed algorithm or 50 years experience, 3,000 transactions, 10,000 meetings, blah, blah, blah, blah, blah. There isn't any. Now, someday there will be. Hopefully, I'll be long gone by then, but someday there will be. But there is no algorithm for that. And that's why the experience from the Dream Team members is so fucking important. And some of the Dream Team members maybe make one phone call. One of my guys made one phone call. All the years he was on the board, came to all the dinners and the golfing and the Christmas parties, he made one phone call to the CEO of Citibank and got us $135 million when nobody else would give it to us. Nobody. Wait, one phone call. Walt, his name was Walter Wriston, the CEO. Hugh Carey, the governor. Hugh here! How much do we need, Danny? And I said, well, the deal is $85 million and $15 million. We need $135 million. Where did he come up? I have no fucking idea where he got the $135 million. I told him $85 million and $15 million, which were the real numbers. And we got $135 million."
# overview, summary = generate_content(video_text)
# print("Overview:", overview)
# print("Summary:", summary)


# fetchMetadata/yt.py

# import requests

# def fetch_youtube_metadata(url):
#     url_metadata = f"https://www.youtube.com/oembed?url={url}&format=json"
#     try:
#         response = requests.get(url_metadata)
#         response.raise_for_status()  # Raise HTTPError for bad responses
#         return response.json()
#     except requests.RequestException as e:
#         return {"error": str(e)}

# # Test the function
# metadata = fetch_youtube_metadata("https://www.youtube.com/watch?v=_ZqAVck-WeM")
# print(metadata)

import requests
from urllib.parse import urlparse, parse_qs

from dotenv import load_dotenv
import os

load_dotenv()

def extract_video_id(youtube_url):
    parsed_url = urlparse(youtube_url)
    if parsed_url.netloc == "youtu.be":
        return parsed_url.path[1:]
    if parsed_url.netloc in ("www.youtube.com", "youtube.com", "m.youtube.com"):
        if parsed_url.path == "/watch":
            query_params = parse_qs(parsed_url.query)
            return query_params["v"][0]
    return None

def fetch_youtube_metadata(youtube_url, api_key):
    video_id = extract_video_id(youtube_url)
    if not video_id:
        return {'error': 'Invalid YouTube URL'}

    url = f"https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={api_key}&part=snippet,statistics,contentDetails"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        snippet = data['items'][0]['snippet']
        stats = data['items'][0]['statistics']
        content_details = data['items'][0]['contentDetails']
        return {
            'title': snippet['title'],
            'description': snippet['description'],
            'tags': snippet.get('tags', []),
            'view_count': stats['viewCount'],
            'like_count': stats.get('likeCount', 'N/A'),
            'dislike_count': stats.get('dislikeCount', 'N/A'),
            'comment_count': stats.get('commentCount', 'N/A'),
            'duration': content_details['duration']
        }
    else:
        return {'error': 'Could not fetch data'}

# Test
# api_key = os.getenv("YTDATA_API_KEY")
# youtube_url = "https://www.youtube.com/watch?v=t5rDxmpM6tA&list=WL&index=1&pp=gAQBiAQB"
# print(fetch_youtube_metadata(youtube_url, api_key))


# main.py

import os
from audio_extractor import extract_audio
from audio_to_text import transcribe_audio
from extraction_result import generate_content
from fetchMetadata.yt import fetch_youtube_metadata

# Take a YouTube URL or .mp4 file as input
input_str = input('Enter a YouTube URL or path to an .mp4 file: ')

# If the input is a YouTube URL, fetch the metadata of the video
if 'youtube' in input_str:
    api_key = os.getenv('YTDATA_API_KEY')
    metadata = fetch_youtube_metadata(input_str, api_key)
    print('Metadata:', metadata)

# Extract the audio from the video
audio_path = 'extracted_audio.mp3'
extract_audio(input_str, audio_path)

# Transcribe the audio to text
transcribed_text = transcribe_audio(audio_path)

# Generate an overview and summary of the text
overview, summary = generate_content(transcribed_text)

# Print the overview and summary
print('Overview:', overview)
print('Summary:', summary)

