from pymongo import MongoClient

 

 # Establece la conexión con la base de datos MongoDB
client = MongoClient("mongodb+srv://simon:XhlUSILsriC0H3bO@micluster.mayzd.mongodb.net/")
db = client["users"]