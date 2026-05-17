from pydantic import BaseModel

class CancellationInput(BaseModel):
    lead_time: int
    price: float
    hotel_id: int


class OccupancyInput(BaseModel):
    hotel_id: int
    date: str