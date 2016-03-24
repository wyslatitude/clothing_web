from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request,'index.html')
	
def contact(request):
	return render(request,'contact.html')
	
def column(request,column_name):
	return render(request,'column.html',{column:column_name})