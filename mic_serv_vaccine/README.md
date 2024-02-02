
#  Preparar el env de python
virtualenv venv
source ./venv/bin/activate

# Instalar para ambiente local
sls plugin install -n serverless-wsgi

#Instalar librerias en requirement.txt

pip install -r requirements.txt 

# Para levantar proyecto en aws
sls deploy --stage qa  


# Para remover proyecto en aws
sls remove --stage qa


# Para levantar proyecto localmente
serverless wsgi serve --port 5001

: 