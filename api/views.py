from django.shortcuts import render
from django.http.response import JsonResponse
from django.views import View
import logging
import pprint
import json

# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        #return self.render_json_response({'save': 'OK'})
        json_dict = {}
        json_dict["message"] = "Done"

        #return render(request, 'api/index.html', json_dict)
        return render(request, 'api/game/index.html', {'save': 'OK'})

index = IndexView.as_view()

class AddView(View):
    def get(self, request, *args, **kwargs):
        json_dta = json.loads(request.POST['f10_0'])
        return render(request, 'api/game/add.html', {'save': 'OK'})

add = AddView.as_view()

