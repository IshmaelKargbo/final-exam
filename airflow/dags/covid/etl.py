import pandas as pd
import pyodbc
from sqlalchemy.orm.exc import NoResultFound
from covid.db import session
from covid.models import Region, CovidRecord

def extract():
    spreadsheet_name = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcZa48jnRtCJQjEuXpqPhuq1Y3yKUA3Jm0NNtpHSJeh7QCNSNmVin5PNwRkt1-0w/pub?gid=1783758317&single=true&output=csv'
    df = pd.read_csv(spreadsheet_name)
    df.loc[df["REGION"] == "Non spécifié", "REGION"] = 'Not Specify'
    df['DATE']= pd.to_datetime(df['DATE'])
    print(df)
    # load(df)

def load(df):
    for index, record in df.iterrows():
        try:
            # check if region exist
            region = session.query(Region).where(Region.name == record.REGION).one()

            covid_record = CovidRecord(
                date = record.DATE,
                contamines = record.CONTAMINES,
                deces = record.DECES,
                gueris = record.GUERIS,
                contamines_femme = record.CONTAMINES_FEMME,
                contamines_homme = record.CONTAMINES_HOMME,
                contamines_genre_non_specifie = record.CONTAMINES_GENRE_NON_SPECIFIE,
                source = record.SOURCE,
                lien_source = record['LIEN SOURCE'],
                region_id = region.id
            )

            session.add(covid_record)
            session.commit()
        except NoResultFound as e:
            region = Region(
                region_id = record.ID_REGION,
                name = record.REGION
            )
            
            session.add(region)
            session.commit()

            covid_record = CovidRecord(
                date = record.DATE,
                contamines = record.CONTAMINES,
                deces = record.DECES,
                gueris = record.GUERIS,
                contamines_femme = record.CONTAMINES_FEMME,
                contamines_homme = record.CONTAMINES_HOMME,
                contamines_genre_non_specifie = record.CONTAMINES_GENRE_NON_SPECIFIE,
                source = record.SOURCE,
                lien_source = record['LIEN SOURCE'],
                region_id = region.id
            )

            session.add(covid_record)
            session.commit()