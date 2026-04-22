from fastapi import APIRouter

from schemas import ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat():
    # TODO: connect to LLM
    return ChatResponse(message="Chat not implemented yet")
