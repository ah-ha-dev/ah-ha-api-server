# ah-ha-api-server

## ✨The technology used
- Google OAuth2.0  
  사용자 인증 정보를 얻기 위해 사용하였습니다.
- Google Gmail API  
  사용자의 실시간 메일 개수를 얻기 위해 사용하였습니다.
- Google Cloud Platform PUB/SUB  
  사용자의 메일함에 이벤트가 있을 때마다, 비동기적으로 통신하여, 데이터를 수집하기 위해 사용하였습니다.
- Firebase Cloud Messaging  
  사용자에게 푸시 알람을 보내기 위해 사용하였습니다.
- DynamoDB  
  푸시 알람을 받는 사용자를 저장하기 위해 사용하였습니다. RDS만을 사용했을 때보다, 39%의 속도 향상을 얻었습니다. (더미 데이터 50000개 기준)
- Sentry / Slack
  실시간 버그 트래킹을 위해 사용하였습니다.
  

## 🛠️ Dev Server
http://3.35.131.195/api/v1

## 📖 API Documentation
http://3.35.131.195/api/v1/docs/
 
## 🌱 Getting Started
`node: 14.16.0`  
`npm: 6.14.11`

### 1. Cloning
```
$ git clone https://github.com/ah-ha-dev/ah-ha-api-server.git
$ cd ah-ha-api-server
$ npm install
```

### 2. Setting dotenv at Root Directory
```
JWT_SECRET=<YOUR_JWT_SECRET>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
GOOGLE_REDIRECT_URI=<YOUR_GOOGLE_REDIRECT_URI>
FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
FIREBASE_PRIVATE_KEY=<YOUR_FIREBASE_PRIVATE_KEY>
FIREBASE_CLIENT_EMAIL=<YOUR_FIREBASE_CLIENT_EMAIL>
GOOGLE_CREDENTIALS_TYPE=<YOUR_GOOGLE_CREDENTIALS_TYPE>
GOOGLE_CREDENTIALS_PRIVATE_KEY=<YOUR_GOOGLE_CREDENTIALS_PRIVATE_KEY>
GOOGLE_CREDENTIALS_CLIENT_EMAIL=<YOUR_GOOGLE_CREDENTIALS_CLIENT_EMAIL>
GOOGLE_CREDENTIALS_CLIEND_ID=<YOUR_GOOGLE_CREDENTIALS_CLIEND_ID>
GOOGLE_PROJECT_ID=<YOUR_GOOGLE_PROJECT_ID>
GOOGLE_PUBSUB_TOPIC_NAME=<YOUR_GOOGLE_PUBSUB_TOPIC_NAME>
GOOGLE_PUBSUB_SUBSCRIPTION_NAME=<YOUR_GOOGLE_PUBSUB_SUBSCRIPTION_NAME>
AWS_ACCESS_ID=<YOUR_AWS_ACCESS_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
AWS_REGION=<YOUR_AWS_REGION>
SENTRY_DSN=<YOUR_SENTRY_DSN>
SLACK_WEBHOOK=<YOUR_SLACK_WEBHOOK>
```

### 3. Run the MySQL with Docker
```
$ docker-compose -f "docker-compose.yml" up -d --build                                   
```

### 4. Start Local Server
```
$ npm run start                         
```

## 🌸 About Server
### Server Architecture
![image](https://user-images.githubusercontent.com/66551410/152565647-551079d2-7643-4ac0-ba6e-28f02c7d96b9.png)

### CICD Architecture
![image](https://user-images.githubusercontent.com/66551410/152016992-cff6b052-35d7-416e-868c-b2702a3ef692.png)

### ERD
![image](https://user-images.githubusercontent.com/66551410/152563288-231e1ff3-1394-424e-8fe9-0a387324d730.png)

## 💁‍♀️ Additional Repositories

- [Android](https://github.com/CrayonTeamJ/frontend.git)

## 🌈 Contributors

| Sohee Lee | Heewon Kang | Hyuna Kim | Sunwoo Ho | 
| :----: | :----: | :----: |:----: 
| [@heehee.dsgn](https://www.instagram.com/heehee.dsgn/) | [@ymcho24](https://github.com/ymcho24) | [@akimcse](https://github.com/akimcse) | [@hocaron](https://github.com/hocaron) |
|Designer |Android |Android |Backend | 