from .import views
from django.urls import path

from django.urls import path,include


urlpatterns = [
    path("userlogin",views.userlogin),
    path("createaccount",views.createaccount),
    path("savefile",views.savefile),
    path("getdata",views.getdata),
    path("addstaff",views.addstaff),
    path("getthedataforupdate",views.getthedataforupdate),
    path("updtaingthestaff",views.updtaingthestaff),
    path("updateBank",views.updateBank)
]