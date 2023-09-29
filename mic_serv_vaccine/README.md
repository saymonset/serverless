
pip install -r requirements.txt
sls plugin install -n serverless-wsgi

 
#Para des[plegar local
serverless wsgi serve --port 5001
 

#Para desplegar en amazon
sls deploy --stage qa