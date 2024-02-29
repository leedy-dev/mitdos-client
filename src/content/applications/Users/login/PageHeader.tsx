import { Typography } from '@mui/material';

function PageHeader() {
  const title = {
    title: "MOON IN THE DARK OPERATING SYSTEM"
  }

  return (
    <>
      <Typography variant="h2" component="h3" gutterBottom>
        {title.title}
      </Typography>
    </>
  );
}

export default PageHeader;
