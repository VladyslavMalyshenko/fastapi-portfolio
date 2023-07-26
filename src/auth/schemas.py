import re

from pydantic import BaseModel, EmailStr, field_validator
from fastapi.exceptions import HTTPException

from src.settings.phrase import check_phrase_is_valid

from .validators import validate_password

EN_LOWER_LETTERS_NUMBERS_PATTERN = re.compile(r"^(?=.*\d)[a-z\d]+$")


class MainSchema(BaseModel):
    class Config:
        orm_mode = True


class UserShow(MainSchema):
    pass


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    password_confirmation: str

    @field_validator('username')
    def validate_username(cls, value: str):
        if not EN_LOWER_LETTERS_NUMBERS_PATTERN.match(value):
            raise HTTPException(
                detail='The username must be in LOWER case and contain letter',
                status_code=400
            )

    @field_validator('password')
    def validate_password(cls, value):
        error, success = validate_password(value)
        if not success and error:
            raise HTTPException(
                detail=error,
                status_code=400
            )
        return value


class OwnerCreate(UserCreate):
    secret_phrase: str

    @field_validator('secret_phrase')
    def validate_secret_phrase(cls, value: str):
        if not check_phrase_is_valid(value):
            raise HTTPException(
                detail='The secret phrase is wrong! Please, try again.',
                status_code=400
            )
        return value
