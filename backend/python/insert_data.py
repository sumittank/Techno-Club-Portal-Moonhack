from pymongo import MongoClient

# 🔗 Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
# db = client["resource_optimization"]

# # ✅ Collections
# clubs_collection = db["clubs"]
# resources_collection = db["resources"]
# requests_collection = db["requests"]
# q_table_collection = db["q_table"]

# # 📌 Data for Clubs
# clubs_data = [
#     {"_id": "IEEE_001", "club_name": "IEEE", "priority_score": 0.9, "past_utilization_score": 0.85, "total_requests": 15, "successful_allocations": 12},
#     {"_id": "ACM_002", "club_name": "ACM", "priority_score": 0.75, "past_utilization_score": 0.60, "total_requests": 12, "successful_allocations": 8},
#     {"_id": "GDG_003", "club_name": "GDG", "priority_score": 0.80, "past_utilization_score": 0.70, "total_requests": 14, "successful_allocations": 11},
#     {"_id": "STIC_004", "club_name": "STIC", "priority_score": 0.68, "past_utilization_score": 0.55, "total_requests": 10, "successful_allocations": 6},
#     {"_id": "CSI_005", "club_name": "CSI", "priority_score": 0.85, "past_utilization_score": 0.80, "total_requests": 18, "successful_allocations": 15}
# ]

# # 📌 Data for Resources
# resources_data = [
#     {"_id": "resource_venue", "resource_name": "Venue", "total_units": 5, "available_units": 3},
#     {"_id": "resource_funding", "resource_name": "Project Funding", "total_units": 10, "available_units": 5},
#     {"_id": "resource_lab", "resource_name": "Lab Equipment", "total_units": 7, "available_units": 4},
#     {"_id": "resource_kits", "resource_name": "Robotics Kits", "total_units": 6, "available_units": 2},
#     {"_id": "resource_servers", "resource_name": "Cloud Servers", "total_units": 8, "available_units": 5}
# ]

# # 📌 Data for Requests
# requests_data = [
#     {"_id": "req_101", "club_name": "IEEE", "requested_resource": "Venue", "action_taken": 0, "allocation_status": "Approved"},
#     {"_id": "req_102", "club_name": "ACM", "requested_resource": "Project Funding", "action_taken": 1, "allocation_status": "Denied"},
#     {"_id": "req_103", "club_name": "GDG", "requested_resource": "Lab Equipment", "action_taken": 0, "allocation_status": "Approved"},
#     {"_id": "req_104", "club_name": "STIC", "requested_resource": "Robotics Kits", "action_taken": 2, "allocation_status": "Alternative Allocated"},
#     {"_id": "req_105", "club_name": "CSI", "requested_resource": "Cloud Servers", "action_taken": 3, "allocation_status": "Denied"}
# ]

# # 📌 Data for Q-Table (RL Learning)
# q_table_data = [
#     {
#         "_id": "q_venue_ieee",
#         "club_name": "IEEE",
#         "resource": "Venue",
#         "q_values": {"0": 0.75, "1": 0.62, "2": 0.45, "3": -0.10}  # Ensure float values
#     },
#     {
#         "_id": "q_funding_acm",
#         "club_name": "ACM",
#         "resource": "Project Funding",
#         "q_values": {"0": 0.55, "1": 0.30, "2": 0.20, "3": -0.15}
#     },
#     {
#         "_id": "q_lab_gdg",
#         "club_name": "GDG",
#         "resource": "Lab Equipment",
#         "q_values": {"0": 0.65, "1": 0.50, "2": 0.40, "3": -0.05}
#     }
# ]

# # 🔄 Insert Data into Collections
# clubs_collection.insert_many(clubs_data)
# resources_collection.insert_many(resources_data)
# requests_collection.insert_many(requests_data)
# q_table_collection.insert_many(q_table_data)

# print("✅ Dummy data inserted into MongoDB successfully!")



db = client["resource_optimization"]
collection = db["students"]

# Dummy student data
students = [
    {
        "name": "Alice Johnson",
        "total_events_attended": 12,
        "total_events_hosted": 5,
        "years_since_joining": 3,
        "events_organized": 1
    },
    {
        "name": "Bob Smith",
        "total_events_attended": 8,
        "total_events_hosted": 2,
        "years_since_joining": 2,
        "events_organized": 0
    },
    {
        "name": "Charlie Brown",
        "total_events_attended": 15,
        "total_events_hosted": 8,
        "years_since_joining": 4,
        "events_organized": 1
    },
    {
        "name": "David White",
        "total_events_attended": 6,
        "total_events_hosted": 3,
        "years_since_joining": 1,
        "events_organized": 0
    },
    {
        "name": "Emma Davis",
        "total_events_attended": 10,
        "total_events_hosted": 4,
        "years_since_joining": 3,
        "events_organized": 1
    },
    {
        "name": "Frank Miller",
        "total_events_attended": 9,
        "total_events_hosted": 5,
        "years_since_joining": 2,
        "events_organized": 1
    },
    {
        "name": "Grace Wilson",
        "total_events_attended": 4,
        "total_events_hosted": 1,
        "years_since_joining": 1,
        "events_organized": 0
    },
    {
        "name": "Henry Adams",
        "total_events_attended": 11,
        "total_events_hosted": 6,
        "years_since_joining": 3,
        "events_organized": 1
    },
    {
        "name": "Isabella Carter",
        "total_events_attended": 7,
        "total_events_hosted": 3,
        "years_since_joining": 2,
        "events_organized": 0
    },
    {
        "name": "Jack Brown",
        "total_events_attended": 5,
        "total_events_hosted": 2,
        "years_since_joining": 1,
        "events_organized": 1
    }
]

# Insert data into MongoDB
collection.insert_many(students)

print("✅ Dummy student data inserted successfully!")