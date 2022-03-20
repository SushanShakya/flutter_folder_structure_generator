import os
 
dirpath = os.getcwd()
foldername = os.path.basename(dirpath)

fullPath = dirpath+ "\\" + "src\\templates\\code"

class DirStructure:
    def __init__(self, map):
        self.parent = map['parent']
        self.name = map['name']
    
    def __str__(self):
        return f"{self.parent}/{self.name}"


def getListOfFiles(dirName, parent):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath, f"{parent}/{entry}")
        else:
            allFiles.append(DirStructure({
                'parent' : parent,
                'name' : entry
            }))
                
    return allFiles

