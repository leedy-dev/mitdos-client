export const hasText = (text: string) => {
    return (text && text === '');
}

//시,분 형태 정규화
export function timePattern(time) {
    let changeTime = time.replaceAll('_', '0'); //check 공백
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/; //입력시간 체크정규식

    if (!pattern.test(changeTime)) {
        changeTime = '00:00'; //정규식 조건에 맞지않으면 00:00 으로변경
    }
    return changeTime;
}

/*
  data Type 에 따른 값 변환
  isMan //필수여부
  mxLen //최대길이
  dataType //데이터타입
  mask //데이터포맷(시간, 달력, 소수점)

  dataType "S" // 모든입력(한글,영문대소문자,숫자,공백,일반특수기호)
  dataType "A" // 영문대문자
  dataType "a" // 영문대소문자
  dataType "N" // 숫자
  dataType "H" // 한글
  dataType "h" // 하이픈( - )
  dataType "M" // 특수기호
  dataType "B" // 공백(스페이스)

  조합
  dataType "AB" // 영문대문자&공백
  dataType "aB" // 영문대소문자&공백
  dataType "ABh" // 영문대문자&공백&하이픈
  dataType "aBh" // 영문대소문자&공백&하이픈
  dataType "AN" // 영문대문자&숫자
  dataType "aN" // 영문대소문자&숫자
  dataType "ANB" // 영문대문자&숫자&공백
  dataType "aNB" // 영문대소문자&숫자&공백
  dataType "HB" // 한글&공백
  dataType "HN" // 한글&숫자
  dataType "HNB" // 한글&숫자&공백

  특수
  dataType "domain" // 도메인 주소 형식
*/
export function changeDataWithType(value, dataType) {
    let temp = value;

    switch (dataType) {
        case 'S':
            temp = value.replace(/[^0-9ㄱ-ㅎㅏ-ㅣa-zA-Z\s!@#$%^&*]/g, '');
            break;
        case 'A':
            temp = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
            break;
        case 'a':
            temp = value.replace(/[^a-zA-Z]/g, '');
            break;
        case 'N':
            temp = value.replace(/[^0-9]/g, '');
            break;
        case 'H':
            temp = value.replace(/[^ㄱ-ㅎ가-힣]/g, '');
            break;
        case 'M':
            temp = value.replace(/[^!@#$%^&*]/g, '');
            break;
        // 조합
        case 'AB':
            temp = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
            break;
        case 'aB':
            temp = value.replace(/[^a-zA-Z\s]/g, '');
            break;
        case 'ABh':
            temp = value.replace(/[^-a-zA-Z\s]/g, '').toUpperCase();
            break;
        case 'aBh':
            temp = value.replace(/[^-a-zA-Z\s]/g, '');
            break;
        case 'AN':
            temp = value.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
            break;
        case 'aN':
            temp = value.replace(/[^0-9a-zA-Z]/g, '');
            break;
        case 'ANM':
            temp = value.replace(/[^0-9a-zA-Z!@#$%^&*]/g, '').toUpperCase();
            break;
        case 'aNM':
            temp = value.replace(/[^0-9a-zA-Z!@#$%^&*]/g, '');
            break;
        case 'ANB':
            temp = value.replace(/[^0-9a-zA-Z\s]/g, '').toUpperCase();
            break;
        case 'aNB':
            temp = value.replace(/[^0-9a-zA-Z\s]/g, '');
            break;
        case 'HB':
            temp = value.replace(/[^ㄱ-ㅎ가-힣\s]/g, '');
            break;
        case 'HN':
            temp = value.replace(/[^0-9ㄱ-ㅎ가-힣]/g, '');
            break;
        case 'HNB':
            temp = value.replace(/[^0-9ㄱ-ㅎ가-힣\s]/g, '');
            break;
        // 특수
        case 'id':
            temp = value.replace(/[^0-9a-zA-Z-_.]/g, '');
            break;
        case 'domain':
            temp = value.replace(/[^0-9a-zA-Z-_.]/g, '');
            break;
    }
    return temp;
}
