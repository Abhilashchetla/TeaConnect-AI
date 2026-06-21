import joblib

model = joblib.load(
    "ml/demand_model.pkl"
)


def predict_orders(day):

    prediction = model.predict(
        [[day]]
    )

    return round(
        prediction[0],
        2
    )