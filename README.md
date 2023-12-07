# `AWS Amplify + AWS Cognito + AWS IoT`

## 사용한 라이브러리

```JSON
 "dependencies": {
    "@aws-amplify/pubsub": "^6.0.5",
    "@aws-amplify/ui-react": "^6.0.3",
    "@aws-sdk/client-iot": "^3.465.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "aws-amplify": "^6.0.5",
    "aws-sdk": "^2.1512.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-json-tree": "^0.18.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
```

### 메인으로 사용된 라이브러리

```JSON
 {
    "@aws-amplify/pubsub": "^6.0.5",
    "@aws-amplify/ui-react": "^6.0.3",
    "aws-amplify": "^6.0.5",
    "react-json-tree": "^0.18.0",
  }
```

## 진행 순서

### 기본 세팅

> 1. `AWS IoT` 세팅이 기본적으로 되어 있어야 함
>
> 2. `aws-cli`의 `profile` 설정이 기본적으로 진행되어 있다는 가정 하에 진행
>
>    - 필자의 경우 `aws-cli`를 통해 `profile`의 `default`를 해당 AWS 계정으로 등록
>
> 3. `npm install -g @aws-amplify/cli aws-cli` -> cli 사용을 위함

1. `npx create-react-app .`

   - `Git`과 연동 필요

   - `npm i aws-amplify @aws-amplify/ui-react`

2. `AWS Amplify` 접속 후, 위에서 생성한 `Git`과 연동된 프로젝트를 연결

3. `amplify add auth`

   - `AWS Cognito`를 통해 회원가입/로그인 구현 진행

     - `bash`를 통해 선택하여 진행 (간단한 선택을 통해 자동으로 설정)

4. [AWS Amplify + AWS Cognito 연동 DOCS]('https://docs.aws.amazon.com/ko_kr/prescriptive-guidance/latest/patterns/create-a-react-app-by-using-aws-amplify-and-add-authentication-with-amazon-cognito.html)

5. [AWS Amplify + AWS IoT 연동 DOCS]('https://docs.amplify.aws/javascript/build-a-backend/more-features/pubsub/set-up-pubsub/)

   - ⚠️ 2~3단계가 꼭 진행되어야 함

     - 2단계의 `aws-cli` 입력 단계의 경우 해당 프로젝트의 `console.log`를 통해 스크립트 복사 후 진행 가능

6. `react-json-tree` 라이브러리 사용을 통해 데이터 확인

   - [`react-json-tree` 라이브러리 GitHub]('https://github.com/reduxjs/redux-devtools/tree/main/packages/react-json-tree')
