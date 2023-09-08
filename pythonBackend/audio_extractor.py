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
