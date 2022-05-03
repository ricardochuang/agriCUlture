from kafka import KafkaConsumer
import json
import time


consumer = KafkaConsumer('agri_stream',
                         bootstrap_servers='localhost:9092',
                         auto_offset_reset='earliest',
                         group_id='consumer-group-A')
print('starting consumer...')
time.sleep(3)


def push_to_front():
    rl = record_list[-6:]
    print(rl)
    # [date, corn_price, wheat_price, milk_price, cattle_price, precipitation, temperature]
    res_dict = {
        'time': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'corn_real': [rl[0][2], rl[1][2], rl[2][2], rl[3][2], rl[4][2], rl[5][2], "-", "-", "-", "-", "-", "-"],
        'corn_pred': ["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
        'wheat_real':[40, 64, 191, 324, 290, 330, 310,"-", "-", "-", "-", "-"],
        'wheat_pred':["-", "-", "-", "-", "-", "-", 310, 213, 180, 200, 180, 79],
        'rice_real':[12, 17, 34, 28, 16, 11, 6, "-", "-", "-", "-", "-"],
        'rice_pred':["-", "-", "-", "-", "-", "-", 6, 19, 15, 23, 19, 40],
        'temp_real':[24, 40, 101, 134, 90, 230, 210, "-", "-", "-", "-", "-"],
        'temp_pred':["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
        'atmospheric_real':[26, 18, 81, 74, 97, 60, 100, "-", "-", "-", "-", "-"],
        'atmospheric_pred':["-", "-", "-", "-", "-", "-", 100, 201, 210, 170, 140, 160],
        'airQuality_real':[45, 84, 91, 74, 160, 250, 140, "-", "-", "-", "-", "-"],
        'airQuality_pred':["-", "-", "-", "-", "-", "-", 140, 231, 278, 322, 160, 94],
        'moisture_real':[10, 15, 32, 34, 38, 42, 46, "-", "-", "-", "-", "-"],
        'moisture_pred':["-", "-", "-", "-", "-", "-", 46, 21, 14, 13, 17, 20],
        'precipitation_real':[12, 17, 34, 28, 16, 11, 6, "-", "-", "-", "-", "-"],
        'precipitation_pred':["-", "-", "-", "-", "-", "-", 6, 19, 15, 23, 19, 40],
    }
    return res_dict


record_list = []
if __name__ == '__main__':
    for msg in consumer:
        record = json.loads(msg.value)
        # print(record)
        record_list.append(record)
        print(len(record_list))
        if len(record_list) % 12 == 6:
            push_to_front()

# stream every few seconds to frontend

'''
ConsumerRecord(
    topic='registered_user',
    partition=0,
    offset=15,
    timestamp=1651018002643,
    timestamp_type=0,
    key=None,
    value=b'{"name": "Amber Robbins",
    "address": "180 Morgan Common\\nSonyashire,
    TN 43350",
    "year": "1973"}',
    headers=[],
    checksum=None,
    serialized_key_size=-1,
    serialized_value_size=95,
    serialized_header_size=-1
)
'''