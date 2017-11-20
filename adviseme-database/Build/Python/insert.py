# connection.js
# @author Diego Valdes
# Nov. 20, 2016

import pymongo, collections, os, sys, csv

# Get Mongo db connection
client = pymongo.MongoClient('localhost', 27017)
# Get dbName.collectionName
db = client.adviseMe.classes

path = '/home/valdeslab/SeniorYear/AdviseMe/AdviseMe/adviseme-database/Data/SemiStructured'

# Walk directory path for .csv files containing class data
for root, subdirs, files in os.walk(path):

	for classFiles in os.listdir(root):
		
		# Create path of file
		filePath = os.path.join(root, classFiles)

		# Check if path is to directory, pass to next path (This should never happen)
		if os.path.isdir(filePath):
			pass

		# Process file
		else:
			print(filePath)

			with open(filePath, 'r') as file:

				spamreader = csv.reader(file)

				for row in spamreader:
					print(row)




print(db)

'''
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
'''