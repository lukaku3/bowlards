from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader

def index(request):
    tmpl = loader.get_template("game/index.html")
    return HttpResponse(tmpl.render())
