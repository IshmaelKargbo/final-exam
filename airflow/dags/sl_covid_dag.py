import pandas as pd
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from covid.etl import extract

default_args = {
    'owner': 'ishok',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}

with DAG(
    dag_id = 'sl_covid_dag_v1',
    default_args = default_args,
    description = 'Sierra Leone Covid 19 CSV data pipline',
    start_date = datetime(2023, 3, 4, 00),
    schedule_interval='@daily',
) as dag:
    extract_task=PythonOperator(
        task_id = 'extract',
        python_callable = extract
    )

    extract_task