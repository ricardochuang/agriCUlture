from kafka import KafkaProducer
import time
import json
import csv
from data import get_registered_user


def json_serializer(data):
    return json.dumps(data).encode('utf-8')


def get_partition(key, all, available):
    return 0


producer = KafkaProducer(bootstrap_servers='localhost:9092',
                         value_serializer=json_serializer)
FILE_NAME = '../data/sum.csv'
TOPIC_NAME = 'agri_stream'

if __name__ == '__main__':
    with open(FILE_NAME, encoding='utf-8-sig') as fh:
        reader = csv.reader(fh)
        for row in reader:
            print(row)
            # send(topic_name, data)
            # [date, corn_price, wheat_price, milk_price, cattle_price, precipitation, temperature]
            producer.send(TOPIC_NAME, row)
            time.sleep(2)
