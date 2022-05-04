from kafka import KafkaConsumer
import json
import time
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils

TOPIC_NAME = 'agri_stream'
# spark-submit --jars spark-streaming-kafka-0-8-assembly_2.11-2.3.2.jar consumer.py


def send_to_front(rdd):
    # msg = json.loads(msg)
    print(f'\n\n*********************************************************************************** {rdd}\n\n')
    print(rdd.take(100))
    with open("../data/spark_output.txt", "a") as fh:
        for line in rdd.take(100):
            print(str(line))
            fh.write(str(line))
    fh.close()


sc = SparkContext(appName="agri spark context")
ssc = StreamingContext(sc, 10)

# consumer = KafkaConsumer('agri_stream',
#                          bootstrap_servers='localhost:9092',
#                          auto_offset_reset='earliest',
#                          group_id='consumer-group-A')
#
# print('starting consumer...')
# time.sleep(3)

# for msg in consumer:
#     record = json.loads(msg.value)
#     lines = sc.parallelize(record)
#     lines = lines.map(lambda x: (x[0], x[1:]))
#     print(lines.collect())


message = KafkaUtils.createDirectStream(ssc,
                                        topics=['agri_stream'],
                                        kafkaParams={'metadata.broker.list': 'localhost:9092'})

print("&***********************************\n")
print(message)
print("&***********************************\n")

# [(4/1/1972, 1.13, 1.36, 5.86, 32.2, 71.12, 7.18)]

# ['4/1/1971', '1.41', '1.4', '5.73', '29.1', '48.79', '7.32']
# ('1/1/1973', ['1.39', '2.38', '6.56', '37.9', '65.45', '-4.7'])
words = message \
    .map(lambda x: json.loads(x[1])) \
    .map(lambda x: (x[0], x[1:])) \
    .transform(send_to_front)
words.pprint()


# words = message \
#     .map(lambda x: x[1]) \
#     .flatMap(lambda x: x.split(","))
#
# wordcount = words \
#     .map(lambda x: (x, 1)) \
#     .reduceByKey(lambda a, b: a + b)
#
# wordcount = wordcount.transform(send_to_front)

# wordcount.pprint()

ssc.start()
ssc.awaitTermination()

'''
ConsumerRecord(
    topic='registered_user',
    partition=0,
    offset=15,
    timestamp=1651018002643,
    timestamp_type=0,
    key=None,
    value=b'{"name": "Amber Robbins", "address": "180 Morgan Common\\nSonyashire,TN 43350", "year": "1973"}',
    headers=[],
    checksum=None,
    serialized_key_size=-1,
    serialized_value_size=95,
    serialized_header_size=-1
)
'''
