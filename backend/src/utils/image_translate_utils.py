import datetime
import requests
from time import sleep

# Endpoints
BASE_URL = "https://doctranslate-api.doctranslate.io"
# BASE_URL = "http://localhost:9090"
TRANSLATE_IMAGES_ENDPOINT = f"{BASE_URL}/v1/translate/images"
GET_RESULT_ENDPOINT = f"{BASE_URL}/v1/result/"

def upload_file_for_translation(file_path, token, original_lang=None, dest_lang='vi', process_mode='replace', translate_type='Professional'):
    form_data = {
        'original_lang': original_lang,
        'dest_lang': dest_lang,
        'process_mode': process_mode,
        'translate_type': translate_type
    }
    
    with open(file_path, 'rb') as file:
        files = {'files': file}
        headers = {'Authorization': f'Bearer {token}'}
        try:
            response = requests.post(TRANSLATE_IMAGES_ENDPOINT, data=form_data, files=files, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f'An error occurred during file upload: {e}')
            return None

def check_translation_status(task_id, token, timeout=600):
    start_time = datetime.datetime.now()
    while True:
        elapsed_time = datetime.datetime.now() - start_time
        if elapsed_time.seconds >= timeout:
            print('Error: Process timed out')
            return None

        headers = {'Authorization': f'Bearer {token}'}
        try:
            response = requests.get(f"{GET_RESULT_ENDPOINT}{task_id}", headers=headers)
            response.raise_for_status()
            response_data = response.json()
            
            if response_data.get('status') == 'success' and response_data.get('data', {}).get('status') == 'done':
                return response_data['data']['url_download']
        except requests.exceptions.RequestException as e:
            print(f'An error occurred while checking task status: {e}')
            return None

        sleep(5)

def download_file(url_download, output_folder):
    try:
        response = requests.get(url_download)
        response.raise_for_status()
        filename = url_download.split('/')[-1].split('?')[0]
        output_file_path = f"{output_folder}{filename}"
        with open(output_file_path, 'wb') as file:
            file.write(response.content)
        return output_file_path
    except requests.exceptions.RequestException as e:
        print(f'An error occurred during file download: {e}')
        return None
