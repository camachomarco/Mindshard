# 'MindShard' App Recap

## Project Overview

The goal of this project is to build an application that takes a YouTube URL or an .mp4 file as input and provides a summary of the video's content. The backend processes include fetching video metadata, extracting audio, converting audio to text, and then summarizing this text.

## Python Backend

### Components

1. **input_handler.py**: Validates the input to check if it's a YouTube URL or an .mp4 file.
2. **yt.py**: Fetches YouTube video metadata.
3. **audio_extractor.py**: Extracts audio from the video.
4. **audio_to_text.py**: Converts audio to text using Whisper AI.
5. **extraction_result.py**: Generates an overview and summary using GPT-4.
6. **main.py**: Orchestrates all the above components.

### Libraries

- OpenAI for GPT-4 and Whisper ASR
- FFmpeg for audio extraction

## Frontend

### Tech Stack

- **Next.js 13**: For the frontend framework.
- **Node.js**: Runtime environment.
- **Redux Toolkit**: For state management.
- **MongoDB**: Planned for future use for user accounts and saving summaries.

#### Notable Features

- **App Router in Next.js 13**: (To be clarified with provided documentation)

### Structure

1. Input field for YouTube URL or .mp4 file upload.
2. Button to trigger the summarization process.
3. Sections to display metadata, summary, and overview.

## Next step

Connect the python backend to the Next.JS 13 frontend

## Steps after that

1. Test out the app to see if it works.
2. Expand the capabilities of the python backend (longer videos, more file/url types, switch out whisper AI with an alt, find cheaper alt for GPT-4,etc. (see Notion))

## How to Get Back On Track

1. Review this .mdx file for a quick recap.
2. If any, ask for clarifications.
3. Continue with the next planned steps
