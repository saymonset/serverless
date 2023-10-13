
pip install -r requirements.txt
sls plugin install -n serverless-wsgi

#Baja report
# https://fthfr5gtoi.execute-api.us-east-1.amazonaws.com/$default/scheme/
 
#Para des[plegar local
serverless wsgi serve --port 5001
sls wsgi serve --port 5001

#Para desplegar en amazon
sls remove --stage qa
sls deploy --stage qa


virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt 