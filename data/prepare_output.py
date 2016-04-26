import os, logging, string

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

markovian_sentences = []
output = ""

def filter_printable(str):
    return "".join([word for word in str if word in string.printable])

def generate_markovian_array(input_file, encoding_="latin-1"):
    with open(input_file, "r+", encoding=encoding_) as markovian_text:
        #generate markovian text array
        #this is O(n) and could be O(1) if we felt like being more OCD
        for line in markovian_text:
            markovian_sentences.append(line)

def create_log_if_reqd(logfile_path="current.mlog"):
    if not os.path.exists(logfile_path):
        with open(logfile_path, "w+", encoding="utf-8") as new_file:
            new_file.write("0")

def edit_logfile(logfile="current.mlog"):
    with open(logfile, "r+", encoding="utf-8") as current:
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

if __name__ == "__main__":
    generate_markovian_array("output_02015-12-16_.txt")

    create_log_if_reqd()

    edit_logfile()


