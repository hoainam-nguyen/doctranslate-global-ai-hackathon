# utils.py
import requests
import datetime
import time

# Constants for URLs and content type
BASE_URL = "https://doctranslate-api.doctranslate.io"
TRANSLATE_DOCUMENT_URL = f"{BASE_URL}/v1/summarization"
GET_RESULT_ENDPOINT = f"{BASE_URL}/v1/result/"

def summarize_file(file_path, output_folder, auth_token, dest_lang='ja', file_type='application/docx', slides_number="10", template_path="system/Template_2.pptx"):
    # Set up form data and headers
    form_data = {
        'file_type': file_type,
        'dest_lang': dest_lang,
        'slides_number': slides_number,
        'template_path': template_path
    }

    headers = {'Authorization': f'Bearer {auth_token}'}

    # Upload the file and request translation
    with open(file_path, 'rb') as file_to_translate:
        try:
            response = requests.post(TRANSLATE_DOCUMENT_URL, data=form_data, files={'file': file_to_translate}, headers=headers)
            response.raise_for_status()

            response_data = response.json()
            task_id = response_data.get('data', {}).get('task_id')

            if task_id:
                print(f'Task ID: {task_id}')
            else:
                print('Failed to get the task ID from the response.')
                return None
        except requests.exceptions.RequestException as e:
            print(f'An error occurred: {e}')
            return None

    # Check for task_id before proceeding
    if not task_id:
        print('Error: missing task_id')
        return None


    # Polling to check the status of the translation task
    start_time = datetime.datetime.now()
    url_download = ''

    while True:
        if (datetime.datetime.now() - start_time).seconds >= 600:  # 10 minutes timeout
            print('Error: Processing timed out.')
            break

        try:
            response = requests.get(GET_RESULT_ENDPOINT + task_id, headers=headers)
            response_data = response.json()
            if response_data.get('status') == 'success' and response_data.get('data', {}).get('url_download'):
                url_download = response_data['data']['url_download']
                return url_download
        except requests.exceptions.RequestException as e:
            print(f'An error occurred while checking task status: {e}')
            break

        time.sleep(5)  # Wait before the next check to avoid flooding the server

    if not url_download:
        print('Error: missing URL for download.')
        return None
