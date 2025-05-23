from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserAccount
from .models import Staff
from.models import staffwage
from.models import epfcalculation
import math
from .serializer import MyModelSerializer
from datetime import datetime, timedelta
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.pagination import PageNumberPagination
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
        search=request.GET.get("search",'')
        staff=Staff.objects.all().order_by("id")
        staffcount=staff.count()   
        
        if search:
            print("ff",search)
            staff=staff.filter(Name__icontains=search)or None
            print("value",staff)
        else:
            staff=Staff.objects.all().order_by("id")
          
        print(staff)
        if staff:
            paginator=PageNumberPagination()
            paginator.page_size=10
            page=paginator.paginate_queryset(staff,request)
            if page is not None:
                serializer=MyModelSerializer(page,many=True)
                print("jabar")
                pageSize=paginator.page_size
                print(serializer.data)
                totalpages=math.ceil(staffcount/pageSize)
                
                page_number = request.GET.get('page', 1)   
                print(page_number)
                return paginator.get_paginated_response({"data":serializer.data,"number":page_number,"totalpages":totalpages})
            serializer=MyModelSerializer(staff,many=True)
            print("hussain")
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
        ifsc=data.get("ifsccode",None)
        accno=data.get("accno",None)
        print(accno)
        print(ifsc)
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
        staff=Staff.objects.get(id=id)
        staffdata={
            "Name":staff.Name,
            "dob":staff.dob,
            "UAN":staff.UAN,
            "aadhar":staff.aadhar,
            "gender":staff.gender,
            "doa":staff.DateOfAppointment,
            "inputnumber":staff.inputnumber   
              
        }
        return JsonResponse({"data":staffdata},status=200)
    except Exception as e:
        return JsonResponse({"bad":"agly"})         
     
  
  
    
@api_view(["POST"])    
@authentication_classes([])      
@permission_classes([AllowAny])
def updtaingthestaff(request):
    try:
        data=request.data
        name=data.get("name")
        ipno=data.get("")
        
        print("hi iika")
        
        return JsonResponse({"datta":"good"},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"good"})
    
@api_view(["POST"])    
@authentication_classes([])      
@permission_classes([AllowAny])
def updateBank(request):
    try:
        data=request.data.get("data")     
        print("jaber")
        print("hello",data)
        

        for items in data:
            name=items.get("NAME")
            print(name)   
            accno=items.get("accnumber")
            print(accno)
            ifsc=items.get("IFS CODE")
            if Staff.objects.filter(Name=name).exists():
                print("")
                staff = Staff.objects.get(Name=name)
                print(staff)
                print(staff.UAN)
                print(staff)
                print(staff.accountnumber)
                print(staff.ifsccode)
                staff.accountnumber=accno
                staff.ifsccode=ifsc
                staff.save()      
                

        return JsonResponse({"message":"good"})
    except Exception as e:
        print(e)
        return JsonResponse({"bad":"badsss"})
    
    
@api_view(["POST"])
@authentication_classes([])  # Disable authentication
@permission_classes([AllowAny])
def deletethestaff(request):
    try:
        data=request.data
        deleteid=data.get("deleteid")
        print("//",deleteid)
        if deleteid:
            Staff.objects.delete(id=deleteid)
            staff=Staff.objects.all()
            serializer=MyModelSerializer(staff,many=True)
            
            return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something fishy"})
         
        

@api_view(["POST"])
@authentication_classes([]) 
@permission_classes([AllowAny])
def gettotaldetails(request):
    try:
        data=request.data
        date=data.get("date")
        print(date)
        wageData = []
        if date:
            staffs=staffwage.objects.filter(date=date)
            
            for staff in staffs:
                staff_wage = epfcalculation.objects.get(wage=staff)
                wageData.append({
                    'id':staff.id,
                    'epf':staff_wage.epf,
                    "er":staff_wage.er,
                    "eps":staff_wage.eps,
                    "edli":staff_wage.edli,
                    "ee":staff_wage.ee,
                    'name':staffs.name,
                    
                    
                })
        print("ikka")
        return JsonResponse({"data":wageData})
    except Exception as e:
        return JsonResponse({"error":"something fishy"})     
    

@api_view(["POST"])
@authentication_classes([]) 
@permission_classes([AllowAny])  
def SaveTheWage(request):
    try:
        print("suluikka")
        data=request.data
        date=data.get("date")
        print("data",data)
        print(date)
        return JsonResponse({"message":"good"})
    except Exception as e:
        return JsonResponse({"error":"wrong"})

@api_view(["POST"])
@authentication_classes([]) 
@permission_classes([AllowAny])  
def savingorupdatewage(request):
    try:
        print("hhhr8wi")
        data=request.data
        datas=data.get("details")
        print(datas)
        getdate=data.get("date")
        print("    ",getdate)
        date=staffwage.objects.filter(date=getdate).exists()
        if date:
           for items in datas:
               id=items.get("id")
               wage=items.get("gross")or 0
               epf=items.get("epf")or 0
               eps=items.get("eps")or 0
               edli=items.get("edli")or 0
               ee=items.get("ee")or 0
               eps_employer=items.get("eps_employer")or 0
               er=items.get("er")or 0
               
               if wage:
                   wage=int(wage)
               itemisset=staffwage.objects.filter(staffid_id=id,date=getdate).exists()
               
               if itemisset:
                   gettheitem=staffwage.objects.get(staffid_id=id,date=getdate)
                   if wage:
                       gettheitem.wage=wage
                       gettheitem.save()
                   getwageid=gettheitem.id
                   updatingepf=epfcalculation.objects.get(wage_id=getwageid)
                   print(updatingepf)
                   print(epf)
                   if epf:
                       updatingepf.epf=epf
                   if eps:
                       updatingepf.eps=eps
                   if edli:
                       updatingepf.edli=edli
                   if ee:
                       updatingepf.ee=ee
                   if eps_employer:
                       updatingepf.eps_employer=eps_employer
                   if er:
                       updatingepf.er=er
                   updatingepf.save()
                    
           return JsonResponse({"good":"baddddddddddddddddddddd"})
               
               
        else:
            for items in datas:
                id=items.get("id") or 0
                epf=items.get("epf")or 0
                eps=items.get("eps")or 0
                edli=items.get("edli")or 0
                ee=items.get("ee")or 0
                eps_employer=items.get("eps_employer")or 0
                er=items.get("er")or 0


                
                
                name=items.get("Name",None) 
                wage = items.get("gross",0)
                if wage:
                    wage = int(wage) 
                else:
                    wage = 0
                if id:
                    staffwage.objects.create(staffid_id=id,wage=wage,date=getdate)
                    wages=staffwage.objects.get(staffid_id=id,date=getdate)
                    theid=wages.id
                    print("ererer",theid)
                    epfcalculation.objects.create(staffid_id=id,wage_id=theid,date=getdate,epf=epf,eps=eps,edli=edli,ee=ee,eps_employer=eps_employer,er=er)
                    
                    
        return  JsonResponse({"data":"mesage recieved succesfuuly"})
    except Exception as e:
        print(e)
        return JsonResponse({"eroor":"errrororororo"})
    