import os, logging, string

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

markovian_sentences = []
output = ""

def filter_printable(str):
    return "".join([word for word in str if word in string.printable])

if __name__ == "__main__":
    with open("output_02015-12-16_.txt", "r+", encoding="latin-1") as markovian_text:
        #generate markovian text array
        #this is O(n) and could be O(1) if we felt like being more OCD
        for line in markovian_text:
            markovian_sentences.append(line)

    if not os.path.exists("current.mlog"):
        with open("current.mlog", "w+", encoding="utf-8") as new_file:
            new_file.write("0")

    with open("current.mlog", "r+", encoding="utf-8") as current:
        #get position from current.txt file
        current_text = filter_printable(str(current.read()))
        logger.info("current position in sentences list = " + current_text)
        current_position = int(current_text.split()[0])
        next_position = (current_position + 1)
        current.truncate(0)
        output = filter_printable(markovian_sentences[current_position])
        written_to_file = str(next_position) + "\n" + markovian_sentences[current_position]
        logger.info("writing to file: " + written_to_file)
        current.write(written_to_file)


