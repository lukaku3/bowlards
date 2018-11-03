from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Game(models.Model):	
    user_id = models.ForeignKey( User, on_delete=models.CASCADE)	
    f1_0 = models.SmallIntegerField(default=0)	
    f1_1 = models.SmallIntegerField(default=0)	
    f2_0 = models.SmallIntegerField(default=0)	
    f2_1 = models.SmallIntegerField(default=0)	
    f3_0 = models.SmallIntegerField(default=0)	
    f3_1 = models.SmallIntegerField(default=0)	
    f4_0 = models.SmallIntegerField(default=0)	
    f4_1 = models.SmallIntegerField(default=0)	
    f5_0 = models.SmallIntegerField(default=0)	
    f5_1 = models.SmallIntegerField(default=0)	
    f6_0 = models.SmallIntegerField(default=0)	
    f6_1 = models.SmallIntegerField(default=0)	
    f7_0 = models.SmallIntegerField(default=0)	
    f7_1 = models.SmallIntegerField(default=0)	
    f8_0 = models.SmallIntegerField(default=0)	
    f8_1 = models.SmallIntegerField(default=0)	
    f9_0 = models.SmallIntegerField(default=0)	
    f9_1 = models.SmallIntegerField(default=0)	
    f10_0 = models.SmallIntegerField(default=0)	
    f10_1 = models.SmallIntegerField(default=0)	
    f10_2 = models.SmallIntegerField(default=0)	
#    created = models.DecimalField(null=True)	
#    modified = models.DecimalField(null=True)	
#    delted = models.DecimalField(null=True)	
    class  Meta:	
        db_table = 'game'
