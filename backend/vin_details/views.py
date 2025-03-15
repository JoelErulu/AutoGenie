import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_vin_details(request):
    vin = request.GET.get('vin', None)
    
    if not vin:
        return JsonResponse({'error': 'VIN is required'}, status=400)

    vin_api_url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json"
    
    response = requests.get(vin_api_url)

    if response.status_code == 200:
        vin_data = response.json()
        
        if vin_data and 'Results' in vin_data:
            filtered_data = {}
            for item in vin_data['Results']:
                if item['Variable'] in ['Make', 'Model', 'Model Year', 'Manufacturer Name', 'Vehicle Type', 'Series', 'Plant City', 'Base Price ($)', 'Body Class']:
                    filtered_data[item['Variable']] = item['Value']
            
            return JsonResponse(filtered_data)
        else:
            return JsonResponse({'error': 'VIN not found or is invalid'}, status=404)
    else:
        return JsonResponse({'error': 'Failed to fetch data from NHTSA API'}, status=500)
