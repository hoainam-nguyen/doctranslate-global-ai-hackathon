from enum import Enum

from pydantic import BaseModel, Field


class VoiceEnum(Enum):
    MAN = 'MAN'
    WOMAN = 'WOMAN'


class DestLangEnum(Enum):
    English = 'en'
    Vietnamese = 'vi'
    Japanese = 'ja'
    Chinese_Simplified = 'zh-cn'
    Chinese_Traditional = 'zh-tw'
    Korean = 'ko'
    Spanish = 'es'
    Portuguese = 'pt'
    Russian = 'ru'
    French = 'fr'
    German = 'de'
    Italian = 'it'
    Hindi = 'hi'
    ThaiLand = 'th'
    Turkish = 'tr'
    Greek = 'el'
    Arabic = 'ar'
    Dutch = 'nl'
    Polish = 'pl'
    Ukrainian = 'uk'
    Swedish = 'sv'
    Danish = 'da'
    Norwegian = 'no'
    Finnish = 'fi'
    Hungarian = 'hu'
    Indonesian = 'in'
    Malaysian = 'ms-MY'
    Tagalog_Filipino = 'fil'
    Bengali = 'bn'
