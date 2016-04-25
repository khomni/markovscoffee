import os#, sys

#reload(sys)
#sys.setdefaultencoding('utf8')

markovian_sentences = []
output = ""

with open("output_02015-12-16_.txt", "r+", encoding="latin-1") as markovian_text:
    #generate markovian text array
    for line in markovian_text:
        markovian_sentences.append(line)

with open("current.txt", "r+") as current:
    #get position from current.txt file
    current_text = current.read()
    print(current_text)
    current_position = int(current_text.split()[0])
    next_position = (current_position + 1)
    output = markovian_sentences[current_position]
    current.write(str(next_position) + "\n" + markovian_sentences[current_position])
