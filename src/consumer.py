from kafka import KafkaConsumer
consumer = KafkaConsumer('test_topic')
for msg in consumer:
    print(msg)
