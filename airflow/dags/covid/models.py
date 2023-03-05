from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import backref, relationship, declarative_base
import uuid

Base = declarative_base()
class CovidRecord(Base):
    __tablename__ = 'covid_record'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(DateTime())
    contamines = Column(String())
    deces = Column(String())
    gueris = Column(String())
    contamines_femme = Column(String())
    contamines_homme = Column(String())
    contamines_genre_non_specifie = Column(String())
    source = Column(String())
    lien_source = Column(String())
    region_id = Column(UUID(as_uuid=True), ForeignKey('region.id'))

    def __repr__(self):
        return "<CovidRecord(id='{}', date='{}', contamines={}, deces={}, gueris={}, contamines_femme={}, contamines_homme={}, contamines_genre_non_specifie={}, source={}, lien_source={})>" \
            .format(self.id, self.date, self.contamines, self.deces, self.gueris, self.contamines_femme, self.contamines_homme, self.contamines_genre_non_specifie, self.source, self.lien_source)

class Region(Base):
    __tablename__ = 'region'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    region_id = Column(Integer())
    name = Column(String(), unique=True)
    records = relationship('CovidRecord', backref='region')

    def __repr__(self):
        return "<Region(id='{}', region_id='{}', name={})>" \
            .format(self.id, self.region_id, self.name)