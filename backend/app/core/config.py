class Settings:
    SECRET_KEY = "super-secret-key-change-this"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    DATABASE_URL = "sqlite:///./test.db"


settings = Settings()
