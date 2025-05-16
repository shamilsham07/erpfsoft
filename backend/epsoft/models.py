from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin,Permission
# Create your models here.


class UserAccountManager(BaseUserManager):
    def create_superuser(self, username, email, phone, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        if not phone:
            raise ValueError('Users must have a phone number')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            phone=phone,
        )
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser,PermissionsMixin):
    username=models.CharField(null=True,blank=True,max_length=100,unique=True)
    is_active=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=True)
    is_manager=models.BooleanField(default=False)
    email=models.EmailField(unique=True,null=True,blank=True)
    phone = PhoneNumberField(unique=True, null=True, blank=True)
    image = models.ImageField(upload_to='images/',null=True, blank=True)
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name= 'user_accounts',
        blank=True,
        help_text='Specific permission for this user.',
    )
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','phone']
    
    
    
class Staff(models.Model):
    Name=models.CharField(max_length=100,blank=True,null=True)
    dob=models.TextField(blank=True,null=True)
    UAN=models.TextField(blank=True,null=True)
    aadhar=models.TextField(blank=True,null=True)
    gender=models.TextField(blank=True,null=True)
    DateOfAppointment=models.TextField(blank=True,null=True)
    inputnumber=models.TextField(blank=True,null=True)  
    accountnumber=models.TextField(blank=True,null=True)
    ifsccode=models.TextField(blank=True,null=True)  

    
    
  