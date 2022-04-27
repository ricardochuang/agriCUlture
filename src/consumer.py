from kafka import KafkaConsumer
import json
import time

if __name__ == '__main__':
    consumer = KafkaConsumer('registered_user',
                             bootstrap_servers='localhost:9092',
                             auto_offset_reset='earliest',
                             group_id='consumer-group-A')
    print('starting consumer...')
    time.sleep(3)
    for msg in consumer:
        print(json.loads(msg.value))
        # time.sleep(1)
ConsumerRecord(topic='registered_user', partition=0, offset=15, timestamp=1651018002643, timestamp_type=0, key=None, value=b'{"name": "Amber Robbins", "address": "180 Morgan Common\\nSonyashire, TN 43350", "year": "1973"}', headers=[], checksum=None, serialized_key_size=-1, serialized_value_size=95, serialized_header_size=-1)