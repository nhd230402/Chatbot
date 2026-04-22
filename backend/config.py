import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    database_url: str = os.getenv("DATABASE_URL", "")
    jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    jwt_expire_minutes: int = int(os.getenv("JWT_EXPIRE_MINUTES", "120"))
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

    @property
    def frontend_origins(self) -> list[str]:
        # Supports comma-separated origins in FRONTEND_ORIGIN for demo flexibility.
        origins = [origin.strip() for origin in self.frontend_origin.split(",") if origin.strip()]
        if not origins:
            origins = ["http://localhost:3000"]
        return origins


settings = Settings()
