import sys
import os

f = open('./5words.txt', 'r')

seen = set()
out = '['
for line in f.readlines():
    line = line.lower()
    if line in seen: continue
    seen.add(line)
    out += "\"" + line[:-1:1] + "\", "

out = out + ']'

fo = open('./5words.json', 'w')

fo.write(out)

print('done!')