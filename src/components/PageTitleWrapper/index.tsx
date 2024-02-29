import {ReactNode} from 'react';
import {Box, Container} from '@mui/material';
import {styled} from '@mui/material/styles';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4, 0)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper = ({ children }: PageTitleWrapperProps) => {
  return (
    <>
      <PageTitle>
        <Container maxWidth="lg">
          {children}
        </Container>
      </PageTitle>
    </>
  );
};


export default PageTitleWrapper;
