#from django.shortcuts import render

# Create your views here.

#def just_aline(request):
#	return render(request, 'hello_world/just_aline.html', {})

from django.http import HttpResponse
from django.shortcuts import render_to_response

AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"

def just_aline(request):
	if request.GET.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
		# worker hasn't accepted the HIT (task) yet
		pass
	else:
		# worked accepted the task
		pass
	worker_id = request.GET.get("workerId", "")
	#if worker_id in get_worker_ids_past_tasks():
		# you might want to guard against this case somehow
	#	pass
	render_data = {
		"worker_id": request.GET.get("workerId", ""),
		"assignment_id": request.GET.get("assignmentId", ""),
		"amazon_host": AMAZON_HOST,
		"hit_id": request.GET.get("hitId", ""),
	}
	response = render_to_response("just_aline.html", render_data)
	# without this header, your iFrame will not render in Amazon
	response['x-frame-options'] = 'this_can_be_anything'
	return response
