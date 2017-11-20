import pymongo
import collections

# Get Mongo db connection
client = pymongo.MongoClient('localhost', 27017)
# Get dbName.collectionName
db = client.adviseMe.classes	

print(db)

# Create 
data = collections.OrderedDict()
data['_id'] = 'CSCE200'
data['class'] = {'prefix' : "CSCE", 'courseNo' : 145, 'title' : 'Algorithmic Design I'}
data['prerequisites'] = ["MATH111", "MATH115"]
data['requiredFor'] = ["CSCE146", "CSCE190", "CSCE215", "CSCE212"]
data['department'] = 'cs'
data['curriculum'] = ['cs', 'ce']

# Insert data
db.insert_one(data)