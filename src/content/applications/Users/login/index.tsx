import { Container, Grid, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import LoginForm from "./LoginForm";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";

const LoginDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`
const LoginItemDiv = styled('div')`
  position: absolute;
  top: 5%;
  min-width: 300px;
  width: 30%;
`

function LoginPage() {
  return (
      <LoginDiv>
        <Helmet>
          <title>로그인</title>
        </Helmet>
        <LoginItemDiv>
          <PageTitleWrapper>
            <PageHeader/>
          </PageTitleWrapper>
          <Container maxWidth="lg">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
              <Grid item xs={12}>
                <LoginForm/>
              </Grid>
            </Grid>
          </Container>
          <Footer/>
        </LoginItemDiv>
      </LoginDiv>
  )
}

export default LoginPage;