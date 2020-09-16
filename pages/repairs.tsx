import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RepairForm from '../components/forms/repair-form';
import RepairsTable from '../components/table/repairs-table';
import api from '../api';
import { Repair } from '../interfaces';
import { repairsListSelector } from '../store/selectors/repair';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: '1.9rem 3.2rem',
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
      width: '100%',
    },
    modal: {
      display: 'flex',
      padding: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    createButton: {
      marginLeft: 'auto',
    },
  }),
);

interface RepairsProps {
  repairs: Repair[];
  car: string | null;
}

export const Repairs: NextPage<RepairsProps> = ({ repairs, car }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const localRepairs = useSelector(repairsListSelector);

  return (
    <div className={classes.page}>
      <div className={classes.title}>
        <Link href="/">
          <IconButton aria-label="goBack">
            <ChevronLeft fontSize="large" />
          </IconButton>
        </Link>
        <Typography className={classes.titleText} variant="h3" gutterBottom>
          Lista de Reparaciones
        </Typography>
        {!!car && (
          <Button
            className={classes.createButton}
            variant="outlined"
            color="primary"
            onClick={openModal}
          >
            CREAR NUEVO
          </Button>
        )}
      </div>
      <div className={classes.clientList} ref={rootRef}>
        <RepairsTable repairs={repairs.length > localRepairs.length ? repairs : localRepairs} />
      </div>
      {!!car && <RepairForm isModalOpen={isModalOpen} closeModal={closeModal} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  let repairs: Repair[];

  if (query?.car) {
    const response = await api.repair.getForCar(query.car as string);
    repairs = response.data;
  } else {
    const response = await api.repair.getAll();
    repairs = response.data;
  }

  const props: RepairsProps = {
    repairs,
    car: query?.car ? (query.car as string) : null,
  };

  return {
    props,
  };
};

export default Repairs;
