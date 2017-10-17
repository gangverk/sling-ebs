#!/bin/bash
$(aws ecr get-login --region us-east-2)

gitCommit=$(git rev-parse HEAD)

docker build -t slingebs .
docker tag slingebs:latest 031871567027.dkr.ecr.us-east-2.amazonaws.com/slingebs:latest
docker push 031871567027.dkr.ecr.us-east-2.amazonaws.com/slingebs:latest
