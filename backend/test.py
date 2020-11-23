import time
import concurrent.futures
import random

start = time.perf_counter()


def foo(seconds):
    print(f"SLEEPING {seconds} second(s) ...")
    time.sleep(seconds)
    return f"DONE {seconds}"


with concurrent.futures.ThreadPoolExecutor() as executor:
    secs = [1, 2, 3, 4, 5]
    results = executor.map(foo, secs)
    for r in results:
        print(r)

# therads = []

# for _ in range(10):
#     t = threading.Thread(target=foo, args=[1.5])
#     t.start()
#     therads.append(t)

# for t in therads:
#     t.join()


finish = time.perf_counter()


print(f"Finished in {round(finish-start,2)} seconds(s)")
