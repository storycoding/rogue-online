# Deployment: AWS-Fargate
### Pre-Requisites:
- a AWS account
- the AWS CLI installed on your computer
- you need to be logged in with your AWS account on your computer

### Instructions:
Just follow this [damn guide](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)

### Known errors:
If you fail to push the docker image to AWS ECR because of "no basic auth credentials"
- run this command on your terminal:
```eval $(aws ecr get-login --no-include-email | sed 's|https://||')```
