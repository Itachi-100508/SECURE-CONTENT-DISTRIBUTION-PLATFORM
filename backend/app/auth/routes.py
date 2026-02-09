from fastapi import APIRouter, HTTPException, Request

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(data: dict, request: Request):
    email = data.get("email")
    password = data.get("password")

    # 🔐 Replace with DB check
    if email != "test@gmail.com" or password != "1234":
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ Store login state in session
    request.session["user"] = {
        "email": email,
        "verified": True
    }

    return { "message": "Login successful" }


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return { "message": "Logged out" }
