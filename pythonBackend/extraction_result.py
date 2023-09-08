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
        {"role": "user", "content": f"Give a very brief overview of the following video transcript in two or three sentences.: {video_text}"}
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
