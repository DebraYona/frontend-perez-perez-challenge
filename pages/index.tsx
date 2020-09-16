import { makeStyles, Button } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles({
  page: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  bgImage: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  clientsButton: {
    position: 'absolute',
    top: '10%',
    right: '5%',
  },
  repairsButton: {
    position: 'absolute',
    top: 'calc(10% + 60px)',
    right: '5%',
  },
});

const IndexPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <img className={classes.bgImage} src="http://cssxyz.com/demo/car/images/14.jpg" alt="" />
      <Link href="/clients">
        <Button className={classes.clientsButton} variant="contained" color="primary">
          VER CLIENTES
        </Button>
      </Link>
      <Link href="/repairs">
        <Button className={classes.repairsButton} variant="contained" color="primary">
          VER REPARACIONES
        </Button>
      </Link>
    </div>
  );
};

export default IndexPage;
