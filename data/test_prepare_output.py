import prepare_output, os

markovian_sentences = []
output = ""

def assert_equals(a,b):
    assert a == b

class TestFilterPrintable:
    def test_doesnt_filter_printable(self):
        assert_equals(prepare_output.filter_printable("hello"), "hello")
        assert_equals(prepare_output.filter_printable("hello_world hello "), "hello_world hello ")
        assert_equals(prepare_output.filter_printable("42-dimensional hypercube *"), "42-dimensional hypercube *")

    def test_does_filter_unprintable(self):
        assert_equals(prepare_output.filter_printable("hello ňĉ world"), "hello  world")
        assert_equals(prepare_output.filter_printable("ňĉhellňĉo ňĉňĉworlňd"), "hello world")

class TestCreatesLogfile:
    def test_file_created(self):
        prepare_output.create_log_if_reqd("dummylog.mlog")
        assert os.path.exists("dummylog.mlog")
    def test_file_starts_at_zero(self):
        with open("dummylog.mlog", "r+") as logfile:
            assert_equals(logfile.read()[0], "0")

"""class TestEditLogfile:
    prepare_output.edit_logfile("dummylog.mlog")
    def test_edit_advances(self):
        with open("dummylog.mlog", "r+") as infile:
            assert_equals(infile.read()[0], "1")"""

class TestCleanUp:
    def test_cleaned_up(self):
        os.remove("dummylog.mlog")
        assert(os.path.exists("dummylog.mlog") == False)

