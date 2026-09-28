console.log(require.resolve('fs')) // npm i fs로 동일한 이름의 패키지를 설치해도 내장모듈을 불러옴.
console.log(require.resolve('express')) // npm 패키지로 설치된 모듈은 전체 경로를 출력.
console.log(require.resolve('node:fs')) // 명시적으로 내장모듈을 불러올때 node:module_name 으로 불러오면 됨.