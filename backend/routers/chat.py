from fastapi import APIRouter

from schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(_: ChatRequest):
    # TODO: connect to LLM
    # TODO: save messages to database
    # TODO: implement streaming
    return ChatResponse(message="Chat not implemented yet")
