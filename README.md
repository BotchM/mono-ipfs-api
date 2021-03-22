# Fleek Demo
This is the demo for the assignment, I will include a short video with a walk through. Let me know if something comes up.
## Tech

- [React] - Used React to build the frontend
- [Express.js] - for serverside and proxy
- [ipfs] - local daemon for testing
- [mongoDB] - I am using Atlas as the mongoDb provider you can change in .env, this will store access tokens and their logs

## Installation

Start IPFS daemon locally
```sh
ipfs daemon 
```


This project requires [Node.js](https://nodejs.org/) v13+ to run.

Install the dependencies and devDependencies and start the server. `PORT:8001`

```sh
cd mono-ipfs-api/server
yarn install
yarn dev
```

Then install and start the client. `PORT:3000`

```sh
cd client
yarn install
yarn start
```
## Proposed walk-through
- Navigate to `http://localhost:3000/`
- Signup with email, username, password => remember the password
- The page will redirect to `http://localhost:3000/login`
- Procced to login with credentials you created above
- After your Login a JWT token will be stored in your session storage which will allow you to make subsequent calls
- Now on the homepage
    - Click `Create Token`
    - Use postman or curl to test the token for the ipfs proxy
    - ex:
        ```sh
        curl --request POST \
        --url http://localhost:8001/api/v0/config/show \
        --header 'Authorization: Bearer <TOKEN YOU CREATED ABOVE>'
        ```
- Reload page to check the logs of each API key
- Make the request again and then reload the page to verify the logs work
- Copy API key generated and paste in the `Remove Token` text field and remove it
- Attempt to use the curl request above you should be deniedddddd
- All the logs are visible on the server side using `morgan`

## More curl requests

**Create New User**
```sh
curl --request POST \
  --url http://localhost:8001/api/auth/signup \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "temp",
    "email": "temp@hotmail.com",
    "password": "temp"
}'
```

**Login with username and password**
```sh
curl --request POST \
  --url http://localhost:8001/api/auth/signin \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "temp",
    "password": "temp"
}'
```

**Create New API Key**
```sh
curl --request POST \
  --url http://localhost:8001/api/create/apiKey \
  --header 'Authorization: Bearer <JWT TOKEN HERE>'
```

**Remove API key**
```sh
curl --request POST \
  --url http://localhost:8001/api/delete/apiKey \
  --header 'Authorization: Bearer <JWT TOKEN HERE>' \
  --data '{
	"tokenId": "fdd8a28c-f40f-4057-a331-a5d0a34ee478"
}'
```

**Get All API keys and logs**
```sh
curl --request GET \
  --url http://localhost:8001/api/apiKey/all \
  --header 'Authorization: Bearer <JWT TOKEN HERE>'
```

## Docker

I started Dockerizing but thought it was overkill, the `DOCKERFILE` are still in the repo.

## Questions

**How would you improve this assignment for a production ready solution (e.g., security,
deployment)?**
- Deployment
I would finish tokenization — this allows me to run the pieces anywhere without having to worry about dependencies. Hence, Helping with deployments. I have chosen to go for a mono repo in this case, for demo purposes. I would explore decoupling the different services. To protect our whole deployment, as well as env variables, we can use AWS KMS and put our entire deployment behind a VPS and expose it to a decoupled, static client build on S3. Right now, the token secret that signs the JWT token is in a `.env`. I have committed that file for demo purposes only. As for the storage, I have chosen MongoDB, which I would take to production. 

- Security
I have tried to be acceptable with how I handle authentication and authorization. For the login, I have opted to use JWT tokens, which are really helpful. On the other hand, how I store them is questionable and I have been reading this [article](https://blog.codinghorror.com/protecting-your-cookies-httponly/) on using HttpOnly cookies. Another easier approach is to decrease the `expiry_date` on the JWT token and implement a refresh token — this prevents an attacker from using the key for a long time. In terms of backend security, "the proxy" server I would explore the public key cryptography on the extreme side. Otherwise, I would switch my current implementation to keep using the JWT token and sign the token with different roles for each resource in IPFS.

- Code TODOs
    - Introduce ESlint
    - Initally I wanted to use redux or even Context API so I would probably do that in production. 
    - Decouple more of the service being used like I did with Auth service

**Describe IPFS and compare it to other protocols e.g., HTTP?**
IPFS is a completely new internet protocol that relies on resources and not IP like HTTP. IPFS is built on the blockchain so it is more distributed than decentralized in nature. This allows the resources on the IPFS to be permanent or semi-permanent depending on the interest of other nodes for that resource (pinning). IPFS becomes extremely beneficial from the fact that it does not rely on a central entity to provide a resource. Firstly, data is replicated on multiple nodes, then accessible by anyone at any time, meaning "the server is down" is not a thing. Bringing us to the last point, security, consequently from the design of IPFS being decentralized. A lot of security concerns such as DDoS, this is incredible when you think about it. Right now to take a website down, you need to launch a DDoS on one server or one endpoint. In IPFS, there isn't that central server where you can attack it is all based on content addressing, and the data exists everywhere so even though one server can go down, your data is replicated and available.

Let's start by giving appreciation to what HTTPS has done and continues to — it is newly-built, unlike IPFS, which is relatively new. But now we get into, why not HTTPS. Unlike IFPS, a server can be shut down where users are not able to make requests due to the centralization of the protocol. When you ask for data, you have to request a location and not the hash of the data. Now, let's talk about the process of requesting resources in HTTPS. Latency, Offline, Security, Permanence, Sovereignty, and Bandwidth. I have divided them into these sections and will briefly talk about each below:

- Latency

  HTTPS clients in most applications are hitting one server, causing delays in Turnaround Time

- Offline

  HTTPS if a server goes down, you can't access it

- Security

  We spoke about the single point of failure above

- Permanence

  If a database goes down or a malicious attack happens, the data is lost forever

- Sovereignty

  Control  "Not your keys not your money" type of situation

- Bandwidth —Censorship

     IPFS is an open network governed by only the system itself! HTTPS and the current internet can be controlled by the hosting country. An example of that always comes up in Egypt during the revolution, when the government took down the internet and censored all the protestors. To their demise, underground heroes launched mesh networks to communicate with one another. 

This new paradiagm gives us back our soverignty, a decentralized autonmous, end-to-end trusted network that we can and anyone can verify because its public. 
