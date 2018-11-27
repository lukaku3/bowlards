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
    def post(self, request, *args, **kwargs):
        json_post = request.POST
        score = json.loads(json_post['score'])
        pprint.pprint(score)
#        for i in json_post['score']:
#            pprint.pprint(i)
        return render(request, 'api/game/add.html', {'save': 'OK'})
        return JsonResponse(json_post)

add = AddView.as_view()

