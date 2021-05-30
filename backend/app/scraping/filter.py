

class Filter():

    def __init__(self, keywords):
        self.keywords = keywords

    def filter(self, data):
        return  sorted(data,key= lambda x:
        sum([self.count_keyword(x,"content",k)*0.5 +self.count_keyword(x,"title",k)*2 +self.count_keyword(x,"summary",k)
             for k in self.keywords])
        ,reverse=True)


    def count_keyword(self,v,att,kw):
        try:
            return v[att].lower().count(kw.lower()) 
        except:
            return 0
