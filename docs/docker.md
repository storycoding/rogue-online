# Docker
The deployment of this app relies on a docker container image

### To build the docker image:
- if you don't have docker installed on your machine, download and install [docker](https://www.docker.com/get-started)
- Make sure the docker app is running
- open the terminal
- navigate to the root of this repository
- run the following command:
```docker build -t rogue-online .```
- when the build finishes, run :
```docker run -d --name rogue-online -p 3000:3000 rogue-online```
- open your browser
- type in "http://localhost:3000/"

After following these steps you should see the game running from the docker container on your local machine

To stop all running instances of docker, run:
```docker stop $(docker ps -aq)```
To run it again, repeat this command:
``````docker run -d --name rogue-online -p 3000:3000 rogue-online``````
