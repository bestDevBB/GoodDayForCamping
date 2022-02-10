"use strict";

// const winston = require("winston");
const { createLogger, transports, format } = require("winston");
// 쓰고싶은 것들만 가져옴. 이렇게 하면 앞에 winston이라는 키워드 없이도 접근 가능

const { combine, timestamp, label, printf, simple, colorize } = format;
// format에서 쓰고싶은 것들 가져옴

const printFormat = printf(({ timestamp, label, level, message }) => { // printf함수에는 콜백함수가 들어감. 콜백함수에서 사용하고싶은 변수들을 object로 담아줄 수 있음
  return `${timestamp} [${label}] ${level} : ${message}`
})

const printLogFormat = {
  file: combine(
    label({
    // format.label({
      label: "J&B Proj"
    }),
    // format: format.combine(
    // winston.format.colorize(), // 출력하고 싶은 fotmat. combine은 format을 결합
    // colorize(), // 출력하고 싶은 fotmat. combine은 format을 결합
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd"
    }),
    printFormat // 마지막 파라미터
  ),
  console: combine(
    colorize(), //
    simple()
  )
}; // combine 안에 마지막으로 던져준 파라미터가 출력 포맷을 결정

const opts = {
  file: new transports.File({ // 파일
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    // format: printLogFormat
    format: printLogFormat.file
  }),
  console: new transports.Console({ // 개발용
    level: "info",
    format: printLogFormat.console
  })
}

const logger = createLogger({
  transports: [ opts.file
    // transports라는 키값에 배열 넣어줬음
    // new transports.Console({ // 배열 안에는 stranposrts의 인스턴스들을 넣어줌
    // new transports.File({ // 파일
    //   // new winston.transports.Console({
    //   // filename: "./logs/access.log",
    //   filename: "access.log",
    //   dirname: "./logs",
    //   level: "info", // level이 error수준. error수준보다 낮은건 출력이 안됨.
    //   format: printLogFormat
    //   // format: combine(
    //   // // format: format.combine(
    //   //   // winston.format.colorize(), // 출력하고 싶은 fotmat. combine은 format을 결합
    //   //   timestamp({
    //   //     format: "YYYY-MM-DD HH:mm:dd"
    //   //   }),
    //   //   json())
    // })
  ]
});


// 서비스중인 서버인지, 개발중인 서버인지에 따라 자체적으로 콘솔로 찍어줄 수 있게
if(process.env.NODE_ENV !== 'production'){ // 실제 서비스중인 서버가 아니면
  logger.add(opts.console)
  // logger.add(new transports.Console({ // 개발용
  //   // new winston.transports.Console({
  //     level: "info", // level이 error수준. error수준보다 낮은건 출력이 안됨.
  //     format: printLogFormat
  //     // format: combine(
  //     // // format: format.combine(
  //     //   // winston.format.colorize(), // 출력하고 싶은 fotmat. combine은 format을 결합
  //     //   timestamp({
  //     //     format: "YYYY-MM-DD HH:mm:dd"
  //     //   }),
  //     //   json())
  //   }))
}

logger.stream = { // logger.stream이라는 키를 만들어서 프로퍼티를 만들고 그 안에 오브젝트를 만듦
  write: (message) => logger.info(message) // write는 키, logger의 info메소드의 message로 출력할 수 있게
} // logger.stream을 이용해서 morgan이랑 연결

module.exports = logger;