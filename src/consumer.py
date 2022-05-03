from kafka import KafkaConsumer
import json
import time
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils

TOPIC_NAME = 'agri_stream'
# spark-submit --jars spark-streaming-kafka-0-8-assembly_2.11-2.3.2.jar consumer.py

sc = SparkContext(appName="agri spark context")
ssc = StreamingContext(sc, 10)

message = KafkaUtils.createDirectStream(ssc, topics=['agri_stream'], kafkaParams={'metadata.broker.list':'localhost:9092'})
print("&***********************************")
print(message)
print("&***********************************")
words = message.map(lambda x: x[1]).flatMap(lambda x: x.split(","))
wordcount = words.map(lambda x: (x, 1)).reduceByKey(lambda a, b: a + b)

wordcount.pprint()
ssc.start()
ssc.awaitTermination()


# consumer = KafkaConsumer('agri_stream',
#                          bootstrap_servers='localhost:9092',
#                          auto_offset_reset='earliest',
#                          group_id='consumer-group-A')

# print('starting consumer...')
# time.sleep(3)

# for msg in consumer:
#     record = json.loads(msg.value)
#     lines = sc.parallelize(record)
#     lines = lines.map(lambda x: (x[0], x[1:]))
#     print(lines.collect())


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