import pandas as pd
import numpy as np

# -----------------------------
# MAPS (COINCIDEN CON MODELO)
# -----------------------------

MEAL_MAP = {
    "breakfast_only": "SC",
    "half_board": "HB",
    "full_board": "FB",
    "no_meals": "SC",
    "undefined": "SC"
}

ROOM_MAP = {
    "standard": "A",
    "double": "B",
    "superior": "C",
    "deluxe": "D",
    "executive": "E",
    "family": "F",
    "suite": "G",
    "premium_suite": "H",
    "special": "L"
}

TOP_COUNTRIES = ["BRA", "DEU", "ESP", "FRA", "GBR", "IRL", "ITA", "NLD", "PRT"]

AGENTS = [1.0, 3.0, 6.0, 7.0, 8.0, 9.0, 14.0, 19.0, 21.0,
          28.0, 37.0, 40.0, 83.0, 229.0, 240.0, 241.0, 242.0, 250.0, 314.0]


# -----------------------------
# FEATURE ENGINEERING
# -----------------------------

def build_features(df: pd.DataFrame):

    df = df.copy()

    # =========================================================
    # PERSONAS (INPUT → FEATURE)
    # =========================================================
    for col in ["adults", "children", "babies"]:
        if col not in df:
            df[col] = 0

    df["adults"] = df["adults"].fillna(0)
    df["children"] = df["children"].fillna(0)
    df["babies"] = df["babies"].fillna(0)

    df["total_guests"] = df["adults"] + df["children"] + df["babies"]
    df["has_children"] = ((df["children"] + df["babies"]) > 0).astype(int)

    # ❗ NO SE ELIMINAN AQUÍ (se usan solo para cálculo)

    # =========================================================
    # BASE NUMERICAS (DEBEN EXISTIR EN INPUT)
    # =========================================================
    for col in [
        "lead_time",
        "stays_in_weekend_nights",
        "stays_in_week_nights",
        "adr",
        "is_repeated_guest",
        "previous_cancellations",
        "previous_bookings_not_canceled"
    ]:
        if col not in df:
            df[col] = 0

    # =========================================================
    # HOTEL
    # =========================================================
    df["hotel_Resort Hotel"] = (df["hotel"] == "Resort Hotel").astype(int)

    # =========================================================
    # MEAL
    # =========================================================
    meal = df["meal_plan"].map(MEAL_MAP).fillna("SC")

    df["meal_FB"] = (meal == "FB").astype(int)
    df["meal_HB"] = (meal == "HB").astype(int)
    df["meal_SC"] = (meal == "SC").astype(int)
    df["meal_Undefined"] = df["meal_plan"].isna().astype(int)

    # =========================================================
    # ROOM (IMPORTANTE: SIN errors ni defaults raros)
    # =========================================================
    room = df["room_type"].map(ROOM_MAP).fillna("A")

    for r in list("BCDEFGHL"):
        df[f"reserved_room_type_{r}"] = (room == r).astype(int)

    # =========================================================
    # DEPOSIT
    # =========================================================
    df["deposit_type_Non Refund"] = (df["deposit_type"] == "Non Refund").astype(int)
    df["deposit_type_Refundable"] = (df["deposit_type"] == "Refundable").astype(int)

    # =========================================================
    # CUSTOMER
    # =========================================================
    df["customer_type_Group"] = (df["customer_type"] == "Group").astype(int)
    df["customer_type_Transient"] = (df["customer_type"] == "Transient").astype(int)
    df["customer_type_Transient-Party"] = (df["customer_type"] == "Transient-Party").astype(int)

    # =========================================================
    # MARKET SEGMENT (EXACT MATCH MODELO)
    # =========================================================
    df["market_segment_Complementary"] = (df["market_segment"] == "Complementary").astype(int)
    df["market_segment_Corporate"] = (df["market_segment"] == "Corporate").astype(int)
    df["market_segment_Direct"] = (df["market_segment"] == "Direct").astype(int)
    df["market_segment_Groups"] = (df["market_segment"] == "Groups").astype(int)
    df["market_segment_Offline TA/TO"] = (df["market_segment"] == "Offline TA/TO").astype(int)
    df["market_segment_Online TA"] = (df["market_segment"] == "Online TA").astype(int)
    df["market_segment_Undefined"] = (df["market_segment"] == "Undefined").astype(int)

    # =========================================================
    # DISTRIBUTION
    # =========================================================
    df["distribution_channel_Direct"] = (df["distribution_channel"] == "Direct").astype(int)
    df["distribution_channel_GDS"] = (df["distribution_channel"] == "GDS").astype(int)
    df["distribution_channel_TA/TO"] = (df["distribution_channel"] == "TA/TO").astype(int)
    df["distribution_channel_Undefined"] = (df["distribution_channel"] == "Undefined").astype(int)

    # =========================================================
    # COUNTRY
    # =========================================================
    for c in TOP_COUNTRIES:
        df[f"country_reduced_{c}"] = (df["country"] == c).astype(int)

    df["country_reduced_otros"] = (~df["country"].isin(TOP_COUNTRIES)).astype(int)

    # =========================================================
    # DATE FEATURES
    # =========================================================
    df["arrival_date"] = pd.to_datetime(df["arrival_date"])

    df["month_sin"] = np.sin(2 * np.pi * df["arrival_date"].dt.month / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["arrival_date"].dt.month / 12)

    df["weekday_sin"] = np.sin(2 * np.pi * df["arrival_date"].dt.weekday / 7)
    df["weekday_cos"] = np.cos(2 * np.pi * df["arrival_date"].dt.weekday / 7)

    # =========================================================
    # AGENT (CLAVE: EXACT MATCH CON .0)
    # =========================================================
    df["agent"] = df["agent"].astype(float)

    df["agent_reduced_otros"] = (~df["agent"].isin(AGENTS)).astype(int)

    for a in AGENTS:
        df[f"agent_reduced_{a}"] = (df["agent"] == a).astype(int)

    # =========================================================
    # DROP INPUTS
    # =========================================================
    df = df.drop(columns=[
        "hotel", "meal_plan", "room_type",
        "deposit_type", "customer_type",
        "market_segment", "distribution_channel",
        "country", "agent", "arrival_date",
        "adults", "children", "babies"
    ], errors="ignore")

    # =========================================================
    # REORDER COLUMNS TO MATCH MODEL
    # =========================================================
    FEATURE_ORDER = [
        'lead_time', 'stays_in_weekend_nights', 'stays_in_week_nights', 'adr',
        'hotel_Resort Hotel', 'meal_FB', 'meal_HB', 'meal_SC', 'meal_Undefined',
        'reserved_room_type_B', 'reserved_room_type_C', 'reserved_room_type_D',
        'reserved_room_type_E', 'reserved_room_type_F', 'reserved_room_type_G',
        'reserved_room_type_H', 'reserved_room_type_L',
        'deposit_type_Non Refund', 'deposit_type_Refundable',
        'customer_type_Group', 'customer_type_Transient', 'customer_type_Transient-Party',
        'is_repeated_guest', 'previous_cancellations', 'previous_bookings_not_canceled',
        'total_guests', 'has_children',
        'market_segment_Complementary', 'market_segment_Corporate', 'market_segment_Direct',
        'market_segment_Groups', 'market_segment_Offline TA/TO', 'market_segment_Online TA',
        'market_segment_Undefined',
        'distribution_channel_Direct', 'distribution_channel_GDS',
        'distribution_channel_TA/TO', 'distribution_channel_Undefined',
        'month_sin', 'month_cos', 'weekday_sin', 'weekday_cos',
        'agent_reduced_1.0', 'agent_reduced_3.0', 'agent_reduced_6.0', 'agent_reduced_7.0',
        'agent_reduced_8.0', 'agent_reduced_9.0', 'agent_reduced_14.0', 'agent_reduced_19.0',
        'agent_reduced_21.0', 'agent_reduced_28.0', 'agent_reduced_37.0', 'agent_reduced_40.0',
        'agent_reduced_83.0', 'agent_reduced_229.0', 'agent_reduced_240.0', 'agent_reduced_241.0',
        'agent_reduced_242.0', 'agent_reduced_250.0', 'agent_reduced_314.0', 'agent_reduced_otros',
        'country_reduced_BRA', 'country_reduced_DEU', 'country_reduced_ESP', 'country_reduced_FRA',
        'country_reduced_GBR', 'country_reduced_IRL', 'country_reduced_ITA', 'country_reduced_NLD',
        'country_reduced_PRT', 'country_reduced_otros',
    ]

    df = df[FEATURE_ORDER]

    return df