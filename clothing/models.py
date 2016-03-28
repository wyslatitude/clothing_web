from django.db import models

# Create your models here.
from django.db import models
class Video(models.Model):
    Video_name = models.CharField(max_length=50)
    Video_path = models.CharField(max_length=200)
    Video_description = models.CharField(max_length=300)
    picture_path = models.CharField(max_length=100)
    pub_date = models.DateTimeField('date published')
class Person(models.Model):
    Video_id = models.ForeignKey(Video)
    Person_path = models.CharField(max_length=200)
class Pose(models.Model):
    Person_id = models.ForeignKey(Person)
    Pose_path = models.CharField(max_length=200)
class Face(models.Model):
    Person_id = models.ForeignKey(Person)
    Face_path = models.CharField(max_length=200)
class Clothing(models.Model):
    Clothing_id =models.ForeignKey(Pose)
    Clothing_path = models.CharField(max_length=200)
class Recommend(models.Model):
    Clothing_name = models.CharField(max_length=200)
    Clothing_type = models.CharField(max_length=50)
    Clothing_description = models.CharField(max_length=300)
    Clothing_path = models.CharField(max_length=200)
