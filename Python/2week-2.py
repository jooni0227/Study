for i in range(0,4,1):
    print("*"*i)
print("");
for i in range(0,4,1):
    print(" "*(4-i)+"*"*i)
print("");
for i in range(3):
    for j in range(2-i):
        print(" ",end="")
    for j in range(2*(i+1)-1):
        print("*",end="")
    print()
