# create.py
# @author Diego Valdes
# Nov. 16, 2017

# Nuke adviseMe db and recreate

from subprocess import call

call(["node", "DatabaseBuildFiles/drop_db.js"])

call(["node", "DatabaseBuildFiles/create_db.js"])
call(["node", "DatabaseBuildFiles/insert_student.js"])
call(["node", "DatabaseBuildFiles/insert_appointment.js"])
call(["python3", "DatabaseBuildFiles/insert.py"])