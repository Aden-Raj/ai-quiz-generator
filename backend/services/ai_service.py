import os
import json
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

from models import QuizRequest, QuizResponse


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ============================================================
# OPENROUTER CLIENT
# ============================================================

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise RuntimeError(
        "OPENROUTER_API_KEY is not set in the .env file."
    )


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)


# ============================================================
# GENERATE QUIZ
# ============================================================

def generate_quiz(request: QuizRequest) -> QuizResponse:

    # --------------------------------------------------------
    # SEND REQUEST TO OPENROUTER
    # --------------------------------------------------------

    response = client.chat.completions.create(

        model="openrouter/free",

        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert educational quiz generator. "
                    "Generate accurate and useful multiple-choice questions. "
                    "Always follow the requested JSON structure."
                )
            },

            {
                "role": "user",
                "content": f"""
Generate a quiz using the following requirements.

Topic:
{request.topic}

Difficulty:
{request.difficulty}

Number of questions:
{request.question_count}

Question type:
{request.question_type}


Requirements:

1. Generate exactly {request.question_count} questions.

2. Every question must have exactly 4 options.

3. There must be exactly one correct answer.

4. The correct answer must exactly match one of the options.

5. Every question must include a clear explanation.

6. Do not include any additional fields.

7. Return the result using the requested JSON structure.
"""
            }
        ],

        # ----------------------------------------------------
        # STRUCTURED JSON OUTPUT
        # ----------------------------------------------------

        response_format={
            "type": "json_schema",

            "json_schema": {

                "name": "quiz_response",

                "strict": True,

                "schema": {

                    "type": "object",

                    "properties": {

                        "topic": {
                            "type": "string"
                        },

                        "difficulty": {
                            "type": "string"
                        },

                        "questions": {

                            "type": "array",

                            "items": {

                                "type": "object",

                                "properties": {

                                    "question": {
                                        "type": "string"
                                    },

                                    "options": {

                                        "type": "array",

                                        "items": {
                                            "type": "string"
                                        },

                                        "minItems": 4,
                                        "maxItems": 4
                                    },

                                    "correct_answer": {
                                        "type": "string"
                                    },

                                    "explanation": {
                                        "type": "string"
                                    }
                                },

                                "required": [
                                    "question",
                                    "options",
                                    "correct_answer",
                                    "explanation"
                                ],

                                "additionalProperties": False
                            }
                        }
                    },

                    "required": [
                        "topic",
                        "difficulty",
                        "questions"
                    ],

                    "additionalProperties": False
                }
            }
        }
    )

    # ========================================================
    # GET AI RESPONSE
    # ========================================================

    content = response.choices[0].message.content

    # ========================================================
    # CHECK FOR EMPTY RESPONSE
    # ========================================================

    if not content:
        raise RuntimeError(
            "AI returned an empty response."
        )

    # ========================================================
    # PARSE JSON
    # ========================================================

    try:

        quiz_data = json.loads(content)

    except json.JSONDecodeError as e:

        raise RuntimeError(
            f"AI returned invalid JSON: {e}"
        )

    # ========================================================
    # HANDLE LIST RESPONSE
    # ========================================================

    if isinstance(quiz_data, list):

        quiz_data = {
            "topic": request.topic,
            "difficulty": request.difficulty,
            "questions": quiz_data
        }

    # ========================================================
    # MAKE SURE RESPONSE IS A DICTIONARY
    # ========================================================

    if not isinstance(quiz_data, dict):

        raise RuntimeError(
            "AI response must be a JSON object or a list of questions."
        )

    # ========================================================
    # VALIDATE WITH PYDANTIC
    # ========================================================

    try:

        quiz = QuizResponse(**quiz_data)

        return quiz

    except Exception as e:

        raise RuntimeError(
            f"AI response does not match QuizResponse structure: {e}"
        )