# Deployment: AWS-Fargate
### Pre-Requisites:
- a AWS account
- the AWS CLI installed on your computer
- you need to be logged in with your AWS account on your computer

### Docker image update
To view your ECR images, visit the [AWS ECR dashboard](https://eu-west-1.console.aws.amazon.com/ecr/repositories/rogue-online/?region=eu-west-1#)
- get credentials to login with docker to aws
```
aws ecr get-login --no-include-email --region eu-west-1
```
- paste the login credentials provided by the previous command
```
docker login -u AWS -p [credentials-hash]
```
- update the docker image
```
docker build -t rogue-online .
```
- tag the created image
```
docker tag rogue-online:latest [address-of-aws-ecr-container]
```
- then push the image to the cloud
```
docker push [address-of-aws-ecr-container]
```

### Detailed instructions
Just follow this [AWS documentation](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html#docker-basics-create-image) to create and deploy a docker image to AmazonECR

### Known errors:
If you fail to push the docker image to AWS ECR because of "no basic auth credentials"
- run this command on your terminal:
```eval $(aws ecr get-login --no-include-email | sed 's|https://||')```
