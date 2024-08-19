import base64
from fastapi import UploadFile, HTTPException
import requests
import json
import datetime
import time
from openai import OpenAI
def encode_dict(input_dict):
    # Chuyển dictionary thành chuỗi JSON
    json_string = json.dumps(input_dict)
    # Chuyển chuỗi JSON thành bytes
    json_bytes = json_string.encode('utf-8')
    # Mã hóa bằng Base64
    encoded_bytes = base64.b64encode(json_bytes)
    # Chuyển bytes mã hóa về string
    encoded_string = encoded_bytes.decode('utf-8')
    return encoded_string


def decode_dict(encoded_string):
    # Chuyển chuỗi đã mã hóa thành bytes
    encoded_bytes = encoded_string.encode('utf-8')
    # Giải mã bằng Base64
    decoded_bytes = base64.b64decode(encoded_bytes)
    # Chuyển bytes đã giải mã về chuỗi JSON
    json_string = decoded_bytes.decode('utf-8')
    # Chuyển chuỗi JSON thành dictionary
    output_dict = json.loads(json_string)
    return output_dict


def encode_string(input_string):
    # Chuyển chuỗi string thành bytes
    input_bytes = input_string.encode('utf-8')
    # Mã hóa bằng Base64
    encoded_bytes = base64.b64encode(input_bytes)
    # Chuyển bytes mã hóa về string
    encoded_string = encoded_bytes.decode('utf-8')
    return encoded_string


def decode_string(encoded_string):
    # Chuyển chuỗi đã mã hóa thành bytes
    encoded_bytes = encoded_string.encode('utf-8')
    # Giải mã bằng Base64
    decoded_bytes = base64.b64decode(encoded_bytes)
    # Chuyển bytes đã giải mã về string
    decoded_string = decoded_bytes.decode('utf-8')
    return decoded_string


def upload_file(input_file: UploadFile, task_type: str, headers: dict):
    form_data = {'task_type': task_type}
    filename = input_file.filename
    file = input_file.file
    content_type = input_file.content_type
    size = len(file.read()) / (1024 * 1024)  # Get size of the file in bytes
    file.seek(0)  # Reset file pointer to the beginning
    files = [('files', (filename, file, content_type))]
    try:
        response = requests.post(decode_string("aHR0cHM6Ly9kb2N0cmFuc2xhdGUtYXBpLmRvY3RyYW5zbGF0ZS5pby92MS91cGxvYWQ=d"),
                                 data=form_data, files=files, headers=headers)
        response.raise_for_status()
        response_data = response.json()
        meta_files = response_data.get('data', {})
        if meta_files:
            return meta_files, size

        raise HTTPException(status_code=400, detail="Failed to get the task ID from the response.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_result(parent_task_id: str, is_get_url: bool = False, headers: dict = None, timeout: int = 600):
    start_time = datetime.datetime.now()
    url_download = ''
    is_success = False
    while True:
        if (datetime.datetime.now() - start_time).seconds >= timeout:
            raise HTTPException(status_code=500, detail="Processing timed out.")

        try:
            response = requests.get(
                decode_string("aHR0cHM6Ly9kb2N0cmFuc2xhdGUtYXBpLmRvY3RyYW5zbGF0ZS5pby92MS9yZXN1bHQv") + parent_task_id,
                headers=headers)
            response_data = response.json()
            if not is_get_url:
                if response_data.get('status') == 'success' and response_data.get('data', {}).get('transcripts', {}):
                    results = response_data['data']
                    transcript = results['transcripts']
                    script = []
                    total = transcript['total']
                    for key, result in results.items():
                        if isinstance(result, dict) and key == 'transcripts':
                            for index, transcript in result['data'].items():
                                script.append(f'slide {index}th: {transcript}')
                    if len(script) == total:
                        return script
            else:
                if response_data.get('status') == 'success' and response_data.get('data', {}).get('url_download', {}):
                    url_download = response_data['data']['url_download']
                    return {
                        "url_download": url_download,
                        "filename": response_data['data'].get('filename')
                    }
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"An error occurred while checking task status: {e}")

        time.sleep(5)
def get_system_prompt():
    system_prompt = f"""
    Task:
    The above data is the presentation content of a slide, please edit the above content and translate it into 

    GOALS AND REQUIREMENTS:
    Please follow the below instructions EXACTLY and CONSISTENTLY:
    - The first sentence of each slide MUST be revised into a hook to attract the viewer's attention. This hook will introduce the upcoming content by providing related information and issues. This hook MUST be coherently linked to the previous slides and the hook structure of each slide MUST not be the same
    - The hook leading into the slide MUST be interesting and MUST make the listener pay attention. For example a hook that lead to a slide about a social network : The generation gap cannot stop the advancement of technology. For young people today, we need a new social network to meet their needs and that is how Twitter was born.
    - The content of the slides MUST be coherently and closely linked together with sentences at the beginning of each slide
    - With specialized terms that are difficult for everyone to understand, you can reinterpret them so that anyone can understand.
    - To avoid repetition, often replace proper nouns that appear in the text with pronouns such as: this tool, this company, this platform, this product,... when that proper noun has been mentioned in the previous sentence but not always do this
    - MUST not present ramblingly, making the lecture long without conveying the necessary knowledge well.
    - Absolutely MUST not invent or speculate on the content of the following slides.
    """
    return system_prompt

def llm_response(api_key: str, content: list):
    try:
        num_batch = len(content)//3
        client = OpenAI(
        api_key=api_key,
        base_url="https://api.upstage.ai/v1/solar"
        )
        result = []
        for i in range(num_batch):
            try:
                response = ""
                stream = client.chat.completions.create(
                model="solar-1-mini-chat",
                messages=[
                    {
                    "role": "system",
                    "content": get_system_prompt()
                    },
                    {
                    "role": "user",
                    "content": content[i]
                    }
                ],
                stream=True,
                timeout=5.0
                )
                for chunk in stream:
                    if chunk.choices[0].delta.content is not None:
                        response += chunk.choices[0].delta.content
                result.append(response)
            except:
                continue
    except Exception as e:
        return None
    return result
