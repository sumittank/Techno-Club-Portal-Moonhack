import numpy as np
import random
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
db = client["resource_optimization"]
clubs_collection = db["clubs"]
resources_collection = db["resources"]
q_table_collection = db["q_table"]


LEARNING_RATE = 0.1
DISCOUNT_FACTOR = 0.9
EPSILON = 0.2
EPISODES = 1000

ACTIONS = ["0", "1", "2", "3"]

clubs = list(clubs_collection.find({}))
resources = list(resources_collection.find({}))


existing_q_data = list(q_table_collection.find({}))
q_table = {}


for entry in existing_q_data:
    state = (entry["club_name"], entry["resource"])
    q_table[state] = entry["q_values"]


for club in clubs:
    for resource in resources:
        state = (club["club_name"], resource["resource_name"])
        if state not in q_table:
            q_table[state] = {a: round(random.uniform(-1, 1), 4) for a in ACTIONS}

def calculate_reward(action, club, resource):
    club_requests = club.get("total_requests", 0)
    allocation_cap = 3  
    if action == "0": 
        if resource["available_units"] <= 0:
            return -10  
        elif club_requests >= allocation_cap:
            return -5 
        else:
            return 10 

    elif action == "1": 
        return -3 

    elif action == "2":  
        return 7 if resource["available_units"] > 0 else -2 

    elif action == "3": 
        return 4  

    return 0  


for episode in range(EPISODES):
    for club in clubs:
        for resource in resources:
            state = (club["club_name"], resource["resource_name"])

            
            if random.uniform(0, 1) < EPSILON:
                action = random.choice(ACTIONS) 
            else:
                action = max(q_table[state], key=lambda x: q_table[state].get(x, -1))  

      
            reward = calculate_reward(action, club, resource)

            old_value = q_table[state].get(action, 0)
            next_max = max(q_table[state].values(), default=0)

            new_q = old_value + LEARNING_RATE * (reward + DISCOUNT_FACTOR * next_max - old_value)
            q_table[state][action] = round(new_q, 4)

q_table_collection.delete_many({})
q_table_data = [{"club_name": k[0], "resource": k[1], "q_values": v} for k, v in q_table.items()]
q_table_collection.insert_many(q_table_data)

print("✅ RL Training Completed & Q-Table Updated in MongoDB!")
