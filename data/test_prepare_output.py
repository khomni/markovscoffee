import prepare_output, os

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
    def test_run(self):
        prepare_output.create_log_if_reqd("dummylog.mlog")
        assert os.path.exists("dummylog.mlog")
