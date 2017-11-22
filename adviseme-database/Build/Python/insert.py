# insert.py
# @author Diego Valdes
# Nov. 20, 2016
# Reads csv files and converts to JSON format for db insertion

# import pymongo
import collections, os, sys, csv, linecache, json


# Get Mongo db connection
# client = pymongo.MongoClient('localhost', 27017)
# Get dbName.collectionName
# db = client.adviseMe.classes

# print(db)

#path = '/home/valdeslab/SeniorYear/AdviseMe/AdviseMe/adviseme-database/Data/SemiStructured'
path = '/home/diego/Capstone/AdviseMe/AdviseMe/adviseme-database/Data/SemiStructured'


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

			with open(filePath, 'r') as file:

				data = collections.OrderedDict()
				spamreader = csv.reader(file)

				for i, row in enumerate(spamreader):

					if i == 0:
						data['_id'] = row[0].strip()

					elif i == 1:
						data['class'] =  {'prefix' : row[0], 'courseNo' : row[1], 'title' : row[2]}
						
					elif i == 2:
						
						data['prerequisites'] = list(filter(lambda x : x != '', row))

					elif i == 3:

						data['requiredFor'] = list(filter(lambda x : x != '', row))
				
					elif i == 4:

						data['department'] = row[0].strip()

					elif i == 5:

						 data['curriculum'] = list(filter(lambda x : x != '', row))

					else:
						break

				print(data)
				print(json.dumps(data))
				'''
				# Insert data
				db.insert_one(data)
				'''

