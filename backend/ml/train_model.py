import pandas as pd

from sklearn.linear_model import LinearRegression

import joblib


data = pd.read_csv(
    "ml/orders.csv"
)

X = data[['day']]

y = data['total_orders']

model = LinearRegression()

model.fit(X, y)

joblib.dump(
    model,
    "ml/demand_model.pkl"
)

print(
    "Model Trained Successfully"
)