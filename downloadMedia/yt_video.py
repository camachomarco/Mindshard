from pytube import YouTube

def download_youtube_video(url, output_path='.'):
    try:
        yt = YouTube(url)
        video = yt.streams.filter(file_extension='mp4').first()
        video.download(output_path)
        return f"{output_path}/{video.default_filename}"
    except Exception as e:
        return str(e)

# Example usage
# if __name__ == "__main__":
#     output_path = '../'
#     url = 'https://www.youtube.com/watch?v=nRvtdER_DgU&ab_channel=DanPe%C3%B1a'
#     download_youtube_video(url, output_path)
