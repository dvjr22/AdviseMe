# insert.py
# @author Diego Valdes
# Nov. 20, 2017
# Reads csv files and converts to JSON format for db insertion

import collections, os, sys, csv, linecache, json
import pymongo

'''
Path of data files
All files are .csv and contain class data organized:
1	class id
2	prefix, course number, class title
3	list of prerequisites in class id format
4	department
5	currciculum - under what major and order the class is associated, ordered: major, term, ...
'''
path = '/home/valdeslab/SeniorYear/AdviseMe/AdviseMe/adviseme-database/Data/SemiStructured' # Lab pc path
# path = '/home/diego/Capstone/AdviseMe/AdviseMe/adviseme-database/Data/SemiStructured' # Laptop path

# Get Mongo db connection
client = pymongo.MongoClient('localhost', 27017)

# Follows format client.dbName.collectionName
db = client.adviseMe.classes

print("Inserting data to: %s" %(db))

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

				data = collections.OrderedDict() # store data in json format in the insertion order
				spamreader = csv.reader(file)

				for i, row in enumerate(spamreader):

					if i == 0:
						data['_id'] = row[0].strip() # class id
					elif i == 1:
						# class info
						data['class'] = {'prefix' : row[0].strip(), 'courseNo' : row[1], 'title' : row[2].strip()}
					elif i == 2:
						# list of prerequisites as class ids
						prerequisites = list(filter(lambda x : x != '', row))
						# Check if class has prerequisites before inserting
						if len(prerequisites)  != 0:
							data['prerequisites'] = prerequisites
					elif i == 3:
						data['department'] = row[0].strip() # department
					elif i == 4:
						# The curriculum class can fall under
						curriculum = list(filter(lambda x : x != '', row))
						insert = [] # track curriculum in major -> recommended order
						curriculumHolder = [] # array to insert into json

						for i, sequence in enumerate(curriculum):

							insert.append(sequence)
							# ensure each instance of insert only has 2 values
							if i % 2 == 1:
								curriculumHolder.append(insert) # add pair to array
								insert = [] # reset insert

						data['curriculum'] = curriculumHolder

					elif i == 5:
						data['hrs'] = row[0].strip()


					elif i == 6:
						data['description'] = row[0].strip()

					else:
						break

				print(data)
				print(json.dumps(data))

				# Insert data
				db.insert_one(data)

				# Insert data

				if db.insert_one(data):
					print("Class: %s inserted" %(data['_id']))
					# print(json.dumps(data)+'\n')
				else:
					print("ERROR: Class: %s wasn't inserted" %(data['_id']))

