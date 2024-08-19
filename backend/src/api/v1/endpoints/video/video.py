from loguru import logger
from fastapi import APIRouter, Form, UploadFile
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
import requests

from src.api.v1.endpoints.schemas.video_request import VoiceEnum, DestLangEnum
from src.settings.event import service_config as config
from src.utils.functions import upload_file, get_result, llm_response

router = APIRouter()


def create_transcripts(meta_files, destination_language: str, voice: str):
    try:
        response = requests.post(
            config.get("transcripts"),
            json={
                'task_type': 'create_video',
                'dest_lang': destination_language,
                'translate_type': 'Professional',
                'meta_files': meta_files,
                'voice': voice
            },
            headers=config.get("headers")
        )
        response.raise_for_status()
        response_data = response.json()
        return response_data.get('data', {})
    except requests.exceptions.RequestException as e:
        return None


@router.get("/languages", summary="")
async def view_get_lang():
    try:
        return JSONResponse(
            content={
                "message": "Get languages successfully",
                "data": [{dest.name: dest.value} for dest in DestLangEnum],
                "status": "success",
                "error": None
            }
        )
    except Exception as ex:
        return JSONResponse(
            content=
            {
                "message": 'Failed to call API',
                "status": "failed",
                "error": "Internal server error"
            },
            status_code=HTTP_400_BAD_REQUEST
        )


@router.post("/presentation-video", summary="Create an presentation video from document")
async def view_create_video(
        file: UploadFile = Form(..., description="file to create video"),
        voice: VoiceEnum = Form(VoiceEnum.MAN, description="Voice"),
        dest_lang: DestLangEnum = Form(..., description="""The target language for translation.

<details> <summary>Click to show detail</summary>

| Language      | Value   |
|---------------|---------|
| English       | `en`    |
| Vietnamese    | `vi`    |
| Japanese      | `ja`    |
| Chinese Simplified   | `zh-cn`   |
| Chinese Traditional  | `zh-tw`   |
| Korean        | `ko`    |
| Spanish       | `es`    |
| Portuguese    | `pt`    |
| Russian       | `ru`    |
| French        | `fr`    |
| German        | `de`    |
| Italian       | `it`    |
| Hindi         | `hi`    |
| Thai          | `th`    |
| Turkish       | `tr`    |
| Greek         | `el`    |
| Arabic        | `ar`    |
| Dutch         | `nl`    |
| Polish        | `pl`    |
| Ukrainian     | `uk`    |
| Swedish       | `sv`    |
| Danish        | `da`    |
| Norwegian     | `no`    |
| Finnish       | `fi`    |
| Hungarian     | `hu`    |
| Bengali       | `bn`    |
| Indonesian    | `in`    |
| Malay         | `ms-MY` |
| Filipino      | `fil`   |
| Bengali       | `bn`    |

</details>
            """
                                       )
):
    try:
        headers = config.get("headers")
        video = config.get("video")
        # Upload file
        meta_files, size = upload_file(file, task_type='create_video', headers=headers)
        timeout = int(size / 10 + 60 * 10)

        # Create transcripts
        voice = "john" if voice.value.lower() == "man" else "emily"
        parent_task_id = create_transcripts(meta_files, dest_lang.value, voice)

        if not parent_task_id:
            return JSONResponse(
                content=
                {
                    "message": 'Failed to create video',
                    "status": "failed",
                    "error": "Internal server error"
                },
                status_code=HTTP_400_BAD_REQUEST
            )

        # Get result for transcripts
        script = get_result(parent_task_id=parent_task_id, headers=headers, timeout=timeout)      
        # Create video
        json_data = {"task_ids": [parent_task_id]}
        try:
            response = requests.post(video, json=json_data, headers=headers)
            response.raise_for_status()
            response_data = response.json()
            video_task_id = response_data.get('data', {}).get('task_id', {})
            if not video_task_id:
                return JSONResponse(
                    content=
                    {
                        "message": 'Failed to create video',
                        "status": "failed",
                        "error": "Internal server error"
                    },
                    status_code=HTTP_400_BAD_REQUEST
                )
        except requests.exceptions.RequestException as e:
            return JSONResponse(
                content=
                {
                    "message": 'Failed to create video',
                    "status": "failed",
                    "error": "Internal server error"
                },
                status_code=HTTP_400_BAD_REQUEST
            )
        llm_response(api_key=config.get("llm_key"), content=script)
        # Get download URL
        download_info = get_result(video_task_id, is_get_url=True, headers=headers, timeout=timeout)
        return JSONResponse(
            content={
                "message": "Create video successfully",
                "data": download_info,
                "status": "success",
                "error": None
            }, status_code=HTTP_200_OK)

    except Exception as ex:
        logger.error(f"Error when create video: {str(ex)}")
        return JSONResponse(
            content={
                "message": "Error when create video",
                "status": "failed",
                "error": "Internal server error"
            },
            status_code=HTTP_400_BAD_REQUEST
        )
