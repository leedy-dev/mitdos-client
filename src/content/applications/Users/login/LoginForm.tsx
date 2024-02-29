import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  styled,
  TextField,
  Typography
} from "@mui/material";
import React, {useState} from "react";

/* style (s) */
const LoginTextField = styled(TextField)`
  width: 100%;
`

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
/* style (e) */

/* type(s) */
interface UserInfoTypes {
  userId: string;
  userPwd: string;
}
/* type(e) */

function LoginForm() {
  const [idSaveYn, setIdSaveYn] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    userId: "",
    userPwd: ""
  });

  // input box control
  const handleInputBlur = e => {
    const { name, value } = e.target;
    if(name === 'id') {
      setUserInfo({...userInfo, userId: value});
    } else if (name === 'pwd') {
      setUserInfo({...userInfo, userPwd: value});
    }
  }

  // 로그인 버튼 클릭
  const handleLoginButton = () => {
    alert("id: " + userInfo.userId + "\npwd: " + userInfo.userPwd);
  }
  
  // 회원가입 버튼 클릭
  const handleSignUpButton = () => {
    alert("모달 띄우기");
  }
  
  return (
      <Card>
        <Grid spacing={0} container>
          <Grid item md={12}>
            <Box p={3}>
              <Typography sx={{ pb: 3 }} variant="h3">
                로그인
              </Typography>
              <Box p={1}>
                <Typography variant="h4">아이디</Typography>
                <LoginTextField type="text" name="id" onBlur={handleInputBlur} />
              </Box>
              <Box p={1}>
                <Typography variant="h4">비밀번호</Typography>
                <LoginTextField type="password" name="pwd" onBlur={handleInputBlur} />
              </Box>
              <Box p={1}>
                <FormControlLabel
                    key='Y'
                    name="Y"
                    checked={idSaveYn}
                    control={
                      <Checkbox
                          id='Y'
                          name='Y'
                          value={idSaveYn}
                          onChange={() => setIdSaveYn(!idSaveYn)}
                      />
                    }
                    label='아이디 저장'
                    labelPlacement='end'
                />
              </Box>
              <Box p={1}>
                <Button variant="contained" fullWidth={true} onClick={handleLoginButton}>로그인</Button>
              </Box>
              <Box p={1}>
                <ButtonBox>
                  <Button onClick={handleSignUpButton}>회원가입</Button>
                  <Box>
                    <Button>아이디 찾기</Button>
                    |
                    <Button>비밀번호 찾기</Button>
                  </Box>
                </ButtonBox>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
  )
}

export default LoginForm;