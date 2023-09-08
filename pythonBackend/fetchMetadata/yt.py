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
