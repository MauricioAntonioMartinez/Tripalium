
class Util:

    coin_symbols = ["$"]

    @classmethod
    def get_att(cls, item, attr):
        try:
            item = getattr(item, attr)

        except AttributeError:
            return None  # or whatever on error
        # if item is str:
        #     return item.replace("\n", "")
        return item.replace("\n", "")

    @classmethod
    def get_salaries(cls, slr):
        if slr:
            return [float(s.replace("$", "").replace("\n", "").replace(",", "")) for s in slr.split(" ") if "$" in s]
        else:
            return None

    @classmethod
    def safe_find():
        pass
