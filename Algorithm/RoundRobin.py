
def SJcheck(pro):
    minPro = 0
    minVal = 10000000
    for p in pro:
        if int(p[2]) < minVal:
            minVal = int(p[2])
            minPro = p
    return pro.pop(pro.index(minPro))

n = int(raw_input("Enter the number of processes:- "))
processes = []
dash =[]
for i in range(0,n):
    line = raw_input().split(' ')
    if len(line) != 3:
        print("error")
        break
    processes.append(line)
pro = processes[::]
pro1 = processes[::]
for j in range(n+2):
    dash = SJcheck(pro)
    print dash
print processes

