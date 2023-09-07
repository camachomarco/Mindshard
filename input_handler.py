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
