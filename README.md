# OpenAI API 를 이용한 AI 채팅

###### Open AI에서 제공하는 API를 이용한 AI 채팅 입니다.
<img width="1000" src="https://user-images.githubusercontent.com/82563539/223348379-82e6525c-509b-4ffb-b87f-e844d9f6c221.gif"/>

###### 친절한 AI봇, 4가지 없는 AI봇, 이모티콘 AI봇이 있습니다.

### Node 종속성 설치
###### backend 

```Bash
cd backend
npm install
```

###### frontend

```Bash
cd frontend
npm install
```


### Open AI API KEY
backend > .env 파일을 생성하여 API KEY를 넣어줘야 합니다.

링크 : https://platform.openai.com/docs/quickstart/add-your-api-key

위의 링크에서 API KEY 를 발급받은 후 .env 파일에 아래와 같이 추가해주세요.

```OPENAI_API_KEY="YOUR API KEY"```


### Test

##### 1. backend와 frontend 서버를 동시에 켜서 진행하는 방법입니다.

```Bash
cd backend
npm start
```

```Bash
cd frontend
npm run dev
```





##### 2. backend 서버만 켜서 진행하는 방법

먼저, frontend 파일들을 빌드합니다.

```Bash
cd frontend
npm run build
```

빌드 위치는 frontend > vite.config.ts 에서 확인 가능합니다.

```Typescript
 build: {
    outDir: path.resolve("../backend/public"),
  },
```

build가 끝난 뒤, 해당 폴더 위치로 가면 배포 파일들을 확인할 수 있습니다.

해당 위치에 정상적으로 배포 파일들이 저장되었다면 frontend 서버를 실행시키지 않고 backend 서버만 실행시켜도 정상적으로 접속가능합니다.
