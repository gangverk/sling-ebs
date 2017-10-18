#!/bin/bash
$(aws ecr get-login --region us-east-2)

# Create docker container
# gitCommit=$(git rev-parse HEAD)
# docker build -t slingebs .
# docker tag slingebs:latest 031871567027.dkr.ecr.us-east-2.amazonaws.com/slingebs:latest
# docker push 031871567027.dkr.ecr.us-east-2.amazonaws.com/slingebs:latest

echo REACT_APP_API=$REACT_APP_API >> .env
echo REACR_APP_AUTHORIZATION=$REACT_APP_AUTHORIZATION >> .env
echo REACT_APP_FACEBOOK=$REACT_APP_FACEBOOK >> .env
echo REACT_APP_PW=$REACT_APP_PW >> .env
echo REACT_APP_USERNAME=$REACT_APP_USERNAME >> .env

source ~/.bashrc && yarn build && aws s3 ls

aws s3 sync build s3://slignebs --region us-east-2

# aws s3 sync ./build s3://slignebs --region us-east-2

#aws s3 sync . s3://slignebs --region us-east-2
