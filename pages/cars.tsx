import { makeStyles, Typography, IconButton } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { ChevronLeft } from '@material-ui/icons';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CarListClient from '../components/cars';
import CarForm from '../components/forms/car-form';
import { getCarList } from '../store/slices/car';
import { carsListSelector } from '../store/selectors/car';

const useStyles = makeStyles({
  page: {
    padding: '1.9rem 3.2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  titleText: {
    margin: 0,
    marginLeft: '1.2rem',
  },
  clientList: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Cars: NextPage = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const carsList = useSelector(carsListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (query?.client) {
      console.log(query.client);
      dispatch(getCarList(query.client as string));
    }
  }, [query]);

  return (
    <div className={classes.page}>
      <div className={classes.title}>
        <Link href="/clients">
          <IconButton aria-label="goBack">
            <ChevronLeft fontSize="large" />
          </IconButton>
        </Link>
        <Typography className={classes.titleText} variant="h3" gutterBottom>
          Lista de Autos
        </Typography>
        <CarForm />
      </div>

      <div className={classes.clientList}>
        <CarListClient cars={carsList} />
      </div>
    </div>
  );
};

export default Cars;
