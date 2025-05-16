from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserAccount
from .models import Staff
from .serializer import MyModelSerializer
from datetime import datetime, timedelta
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.



@api_view(["POST"])
@permission_classes([AllowAny]) 
def userlogin(request):
    print("heelo")
    data=request.data
    username=data.get("username")
    password=data.get("password")
    print(username)
    print(password)

    try:
        user=UserAccount.objects.get(username=username)
        print(user.password)
        hashedpass=check_password(password,user.password)
        print(hashedpass)
        if(hashedpass):
         return JsonResponse ({"message":"recieved successfull"})
        else:
            return JsonResponse({"no-user":"no-userFound"})   
    except ObjectDoesNotExist:
        print("jabar")
        return JsonResponse({"no-user":"no-userFound"})
        

@api_view(["POST"])
@permission_classes([AllowAny]) 
def createaccount(request):
    print("jiiii")
    try:
        data=request.data
        username=data.get("username")
        password=data.get("password")
        email=data.get("email")
        phonenumber=data.get("phonenumber")
        hashedpass=make_password(password)
        print(hashedpass)
        if UserAccount.objects.filter(email=email).exists():
            return JsonResponse({"email":'alreadyexists'})
        if UserAccount.objects.filter(phone=phonenumber).exists():
            return JsonResponse({"phonenumber":"alreadyexists"})
        UserAccount.objects.create(username=username,is_admin=True,email=email,phone=phonenumber,password=hashedpass)
        return JsonResponse({"message":"usercraeted"})
    except Exception as e:
        print(e)
        return JsonResponse({"wrong":"error"})
    
    
@csrf_exempt
@api_view(["POST"])
@authentication_classes([])  # Disable authentication
@permission_classes([AllowAny])
def savefile(request):
    datas = request.data.get("data")
    try:
       for items in datas:        
            Staff.objects.create(
                Name=items.get("Name (Alphabets Only)"),
                
                UAN=items.get("UAN"),
                dob=items.get("Date of Birth (DD/MM/YYYY) Eg : 01/01/1970"),
                DateOfAppointment=items.get("Date of Appointment (DD/MM/YYYY)Eg : 01/01/1970"),    
                aadhar=items.get("Aadhar"),
                inputnumber=items.get("IP Number (10 Digits Only)"),
                gender=items.get("Gender (M/F/TG)"),
                
            )
       return JsonResponse({"message": "good"})
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)})
    
    
@api_view(["GET"])
@authentication_classes([])  # Disable authentication
@permission_classes([AllowAny])
def getdata(request):
    try:
        staff=Staff.objects.all()
        if staff:
            serializer=MyModelSerializer(staff,many=True)
            print(serializer)
            print(serializer.data)
            return JsonResponse({"data":serializer.data},safe=False)
        else:
            return JsonResponse({"error":'wrong'})
    except Exception as e:
        print(e)
        return JsonResponse({"wrong":"very bad"})
   
   
@api_view(["POST"])
@authentication_classes([])  # Disable authentication
@permission_classes([AllowAny])
def addstaff(request):
    try:
        data=request.data
        name=data.get("name",None)
        aadhar=data.get("aadhar",None)
      
        ipno=data.get("ipno",None)
        gender=data.get("gender",None)
        uan=data.get("uan",None)
        doa=data.get("doa",None)
        dob=data.get("dob",None) 
        Staff.objects.create(
        Name=name,
        dob=dob,
        DateOfAppointment=doa,
        inputnumber=ipno,
        gender=gender,
        UAN=uan,
       
        aadhar=aadhar,     
        )      
        return JsonResponse({"message":"good"})
    except Exception as e:
        return JsonResponse({"worng":"something went wrong"})
    
@api_view(["POST"])    
@authentication_classes([])      
@permission_classes([AllowAny])
def getthedataforupdate(request):
    try:
        print("hello")
        data=request.data
        id=data.get("id")
        print(id)
        print("........................................")
        Staff.objects.filter(id=id)
        
        
        return JsonResponse({"data":"good"})
    except Exception as e:
        return JsonResponse({"bad":"agly"})         
     
  
    
    
         
        
    