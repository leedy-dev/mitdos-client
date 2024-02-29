import { Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

const LogoImage = styled('img')`
        width: 60px;
        height: 60px;
        border-radius: 30px;
`

function Logo() {

  return (
    <Tooltip title="Tokyo Free White React Admin Dashboard" arrow>
      <LogoWrapper to="/overview">
        <LogoSignWrapper>
            <LogoImage src={`${process.env.PUBLIC_URL}/static/images/logo/mitd-logo.jpg`} alt="MITD" />
        </LogoSignWrapper>
      </LogoWrapper>
    </Tooltip>
  );
}

export default Logo;
