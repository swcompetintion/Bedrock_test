from fastapi import APIRouter
from datetime import datetime, timedelta

from src.models.plans import Plan, CreatePlan

plans_router = APIRouter(prefix="/api/plans", tags=["plans"])
plans: list[Plan] = [
    Plan(
        id=1,
        title="네트워크관리사 필기",
        body="네트워크 관리사 필기 시험.",
        date=datetime(2025, 5, 25),
        dDay=-1,  # 테스트를 위해 임의로 지정한 dDay (이하 동일)
        importance=8,
        category="자격증시험"
    ),
    Plan(
        id=2,
        title="SQLD 시험",
        body="SQLD 개념 및 기출 풀기",
        date=datetime(2025, 5, 31),
        dDay=4,
        importance=8,
        category="자격증시험"
    ),
    Plan(
        id=3,
        title="고급웹프로그래밍 강의 시청",
        body="고급웹프로그래밍 강의 시청 및 지금까지 내용 복습",
        date=datetime(2025, 5, 29),
        dDay=15,
        importance=6,
        category="학교"
    ),
    Plan(
        id=4,
        title="react turorial 마무리",
        body="planner 만들기",
        date=datetime(2025, 5, 4),
        dDay=3,
        importance=8,
        category="sw 경진대회"
    ),
    Plan(
        id=5,
        title="친구 만나기",
        body="친구 만나서 카페에서 공부하기",
        date=datetime(2025, 5, 7),
        dDay=5,
        importance=2,
        category="친구"
    ),
    Plan(
        id=6,
        title="sw 경진대회 회의",
        body="코드 공유, QnA, 메인 선택",
        date=datetime(2025, 5, 4),
        importance=7,
        dDay=5,
        category="sw 경진대회"
    ),
    Plan(
        id=7,
        title="캡스톤 프로젝트 회의록 작성",
        body="캡스톤 회의록 작성하기기",
        date=datetime(2025, 5, 17),
        dDay=13,
        importance=5,
        category="학교"
    ),
    Plan(
        id=8,
        title="인성과사회 발표",
        body="",
        date=datetime(2025, 5, 3),
        dDay=-1,
        importance=-1,
        category="학교"
    )
]

next_id = len(plans) + 1


@plans_router.get("/")
async def get_all_plans() -> list[Plan]:
    return plans


@plans_router.get("/{id}")
async def get_plan(id: int) -> Plan:
    for plan in plans:
        if plan.id == id:
            return plan
    return {"err": "The id dose not matched"}


@plans_router.post("/")
async def create_plan(newplan: CreatePlan):
    global next_id

    now = datetime.now()

    plan = Plan(
        id=next_id,
        dDay=(newplan.date - now).days,
        **newplan.model_dump()
    )

    next_id += 1
    plans.append(plan)
    return {"msg": "The plan was added successfully"}


@plans_router.put("/{id}")
async def update_plan(id: int, plan: Plan):
    for i, p in enumerate(plans):
        if p.id == id:
            updated_date = (
                plans[i].date
                - timedelta(days=plans[i].dDay)
                + timedelta(days=plan.dDay)
            )  # x 좌표가 수정되면 dDay가 바뀌므로 date 속성 수정

            plan.date = updated_date
            print(updated_date)
            plans[i] = plan
            return {"msg": "The Plan was updated successfully"}
    return {"err": "The id dose not matched"}


@plans_router.delete("/{id}")
async def delete_plan(id: int):
    for i, plan in enumerate(plans):
        if plan.id == id:
            plans.pop(i)
            return {"msg": "The plan was deleted successfully"}
