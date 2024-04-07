import pandas as pd
from pymongo import MongoClient
import re

# MongoDB connection parameters
mongo_uri = "mongodb+srv://rajibparbat55:5Bkfei54Gh29aXGe@mongodbcluster.pq6t9ky.mongodb.net/?retryWrites=true&w=majority&appName=MongoDbCluster"  # Update with your MongoDB URI
db_name = "dummydata"            # Update with your database name

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[db_name]
collection_names = db.list_collection_names()

print('mongo sucess')

# Iterate over each collection and export data to CSV
for collection_name in collection_names:
    # Retrieve documents from the collection
    collection = db[collection_name]
    cursor = collection.find()

    # Create a list to store document data
    document_data = []

    # Loop through the cursor and collect document data
    for document in cursor:
        processed_document = {key: str(value) for key, value in document.items()}
        document_data.append(processed_document)

    # Create a DataFrame from the collected document data
    df = pd.DataFrame(document_data)

    # Specify the CSV file name for this collection
    csv_filename = f"{collection_name}.csv"

    # Save DataFrame to CSV file
    df.to_csv("staged/"+csv_filename, index=False)

    print(f"CSV file '{csv_filename}' has been created with data from '{collection_name}' collection.")

print("All CSV files have been created successfully.")




df = pd.read_csv('staged/registers.csv')

def get_aray_fixed(str):
    object_id_pattern = r"ObjectId\('([0-9a-f]+)'\)"
    return re.findall(object_id_pattern, str)

df['modules'] = df['modules'].apply(get_aray_fixed)

df.explode('modules').to_csv('staged/registers.csv',index=None)


df = pd.read_csv('staged/modules.csv')

def get_aray_fixed(str):
    object_id_pattern = r"ObjectId\('([0-9a-f]+)'\)"
    return re.findall(object_id_pattern, str)

df['trainer'] = df['trainer'].apply(get_aray_fixed)

df.explode('trainer').to_csv('staged/modules.csv',index=None)



import snowflake.connector
import csv
import pandas as pd

snowflake_connection = snowflake.connector.connect(
            user='RAJIB5',
            password='Rajib@123',
            account='uw04501.central-india.azure',
            warehouse='COMPUTE_WH',
            database='FINALPROJECT',
            schema='Public',
            role='ACCOUNTADMIN'
        )
snowflake_cursor = snowflake_connection.cursor()
 
 
# Check Snowflake connection
try:
    snowflake_connection
    print("Connection to Snowflake successful!")
   
except Exception as e:
    print(f"Error connecting to Snowflake: {str(e)}")


import os
staging_folder = 'staged/'  # Change this to your actual staging folder path
 
# Get a list of all CSV files in the staging folder
csv_files = [file for file in os.listdir(staging_folder) if file.endswith('.csv')]

for csv_file in csv_files:
    table_name = os.path.splitext(csv_file)[0]  # Use CSV file name as table name
   
    # Read CSV file into DataFrame
    df = pd.read_csv(os.path.join(staging_folder, csv_file))
    df.fillna('',inplace=True)
   
    # Create table in Snowflake
    create_table_query = f"CREATE TABLE {table_name} ("
    for column in df.columns:
        create_table_query += f"{column} VARCHAR,"
    create_table_query = create_table_query[:-1]  # Remove trailing comma
    create_table_query += ")"
    # print(create_table_query)
    # break
    snowflake_cursor.execute(create_table_query)
    print(f"Table '{table_name}' created in Snowflake.")
   
    # Insert data into Snowflake table
    snowflake_cursor.executemany(f"INSERT INTO {table_name} VALUES ({','.join(['%s']*len(df.columns))})", df.values.tolist())
    print(f"Data inserted into table '{table_name}' in Snowflake.")
   
# Commit changes
snowflake_connection.commit()
# Close cursor and connection
snowflake_connection.close()
