![image](https://user-images.githubusercontent.com/81923229/135713392-fd0e59f6-ba83-422b-8656-4099ca8c8b90.png)


# node js 개념

- JS 실행할 수 있는 런타임 환경
- 원래 브라우저 안에서만 돌아가는 JS가 브라우저 밖에서도 돌아갈 수 있도록 환경을 제공해줌
- 이게 있기에 JS로 서버 구축 가능

# node js 특징

## 1. Non-blocking I/O

- **blocking I/O** : 어떤 작업이 끝날 때까지 기다렸다가 다음 작업이 진행됨
- **non-blocking I/O** : 거의 동시적으로 작업 가능

## 2. Single Thread

- **프로세스** : 노드 실행하면 운영 체제에서 할당하는 작업의 단위 -> 생성된 프로세스는 여러 개의 쓰레드를 생성하지만 JS를 실행하는 쓰레드는 단 하나
- **쓰레드** : 프로세스 내에서 실행되는 흐름의 단위

- Single Thread인 Js로 서버 구축 가능한 이유는 `Non-blocking I/O` 특징 때문

## 3. Event-Driven

- "`어떤 이벤트 발생`하면 `어떤 동작 수행`"을 지정해두는 방식
- 이벤트가 없으면 바로 실행, 이벤트가 있으면 기다렸다가 실행됨(그 과정이 콜스택->백그라운드->콜백큐--(eventloop가 보냄)-->콜스택 요런 느낌)

1. call stack : 실행 함수들이 여기에 push됨 -> 바로 실행되면 제거되고, 이벤트가 발생하면 background로 pop되어 그곳에서 이벤트가 실행됨
2. 이벤스 실행이 끝나면 해당 콜백함수는 callback queue로 이동됨
3. call stack이 비어있다면 event loop가 callback queue에서 call stack으로 콜백함수를 옮김
4. call stack에서 호출되어 실행됨

- call stack : 실행 함수들이 여기에 push됨
- callback queue : 이벤트 발생하면 거기서 불린 콜백함수들이 기다림 (setTimeout과 같은 함수, 이벤트 기반의 그 내부 콜백함수)
- event loop : callback queue의 콜백함수를 콜스택에 전달. -> 단 콜스택이 비어있을 때만 가져옴
