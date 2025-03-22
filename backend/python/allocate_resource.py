from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["resource_optimization"]
q_table_collection = db["q_table"]
resources_collection = db["resources"]
clubs_collection = db["clubs"]


ACTIONS = {
    "0": "Allocate",
    "1": "Deny",
    "2": "Alternative Allocate",
    "3": "Waitlist"
}


def allocate_resource(club_name, resource_name):
    q_data = q_table_collection.find_one({"club_name": club_name, "resource": resource_name})

    if not q_data:
        return f"❌ No Q-values found for {club_name} requesting {resource_name}."

    q_values = q_data["q_values"]
    best_action = max(q_values, key=q_values.get)

    resource = resources_collection.find_one({"_id": f"resource_{resource_name.lower().replace(' ', '_')}"})
    club = clubs_collection.find_one({"club_name": club_name})

    if not resource:
        return f"❌ Resource {resource_name} not found."

    allocation_cap = 3
    if best_action == "0" and club.get("total_requests", 0) >= allocation_cap:
        return f"❌ {club_name} has exceeded allocation limits. Action: Denied."

    if best_action == "0" and resource["available_units"] > 0:
        resources_collection.update_one(
            {"_id": resource["_id"]},
            {"$inc": {"available_units": -1}} 
        )
        clubs_collection.update_one(
            {"club_name": club_name},
            {"$inc": {"total_requests": 1}}, 
            upsert=True
        )
        return f"✅ Resource '{resource_name}' allocated to {club_name}!"
    
    return f"🔹 Recommended Action: {ACTIONS[best_action]} for {club_name} requesting {resource_name}."


if __name__ == "__main__":
    club_name = "IEEE"
    resource_name = "Venue"
    result = allocate_resource(club_name, resource_name)
    print(result)
