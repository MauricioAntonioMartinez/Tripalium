jobs = [
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": "Director of Engineering",
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs nodejs"
  },
  {
    "summary": "Large company with 100+ year history is looking for someone who not only loves designing and building great software but is also passionate about getting stuff done. You are excited by the challeng...",
    "title": "Lead Back End Software Engineer",
    "link": "https://www.careerbuilder.com/job/J3R1ZW6SB73Z9YZB9LC",
    "enterprise": "Jefferson FrankFull Time",
    "salary": "$140k - $141k/year",
    "content":"nodejs nodejs"
  },
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": "Director of Engineering",
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs"
  },
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": "Director of Engineering",
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs nodejs nodejs nodejs"
  },
  {
    "summary": "Large company with 100+ year history is looking for someone who not only loves designing and building great software but is also passionate about getting stuff done. You are excited by the challeng...",
    "title": "Lead Back End Software Engineer",
    "link": "https://www.careerbuilder.com/job/J3R1ZW6SB73Z9YZB9LC",
    "enterprise": "Jefferson FrankFull Time",
    "salary": "$140k - $141k/year",
    "content":"nodejs "
  },
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": "Director of Engineering",
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs"
  },
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": "Director of Engineering",
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs"
  },
  {
    "summary": "Large company with 100+ year history is looking for someone who not only loves designing and building great software but is also passionate about getting stuff done. You are excited by the challeng...",
    "title": "Lead Back End Software Engineer",
    "link": "https://www.careerbuilder.com/job/J3R1ZW6SB73Z9YZB9LC",
    "enterprise": "Jefferson FrankFull Time",
    "salary": "$140k - $141k/year",
    "content":"nodejs nodejs"
  },
  {
    "summary": "Director of Engineering – Healthline Join the world’s fastest-growing digital health platform, with a global audience of hundreds of millions of monthly readers. Healthline is one of the largest br...",
    "title": None,
    "link": "https://www.careerbuilder.com/job/J2S308719CGSNY1BWFP",
    "enterprise": "My ClientFull Time",
    "salary": "$150k - $300k/year",
    "content":"nodejs nodejs"
  }
]

key_words = ["nodejs","reactjs","aws"]


def sorter():
    js = sorted(jobs,key= lambda x:
     sum([count_keyword(x,"content") +count_keyword(x,"title") + x["summary"].count(k) for k in key_words])
     ,reverse=True)
    print(js)


def count_keyword(string,kw):
    try:
        return string.count(kw)
    except:
        return 0


sorter()
