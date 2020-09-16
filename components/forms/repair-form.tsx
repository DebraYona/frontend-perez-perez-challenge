import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { BaseKeyboardPickerProps } from '@material-ui/pickers/_shared/hooks/useKeyboardPickerState';
import { getUnixTime } from 'date-fns';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { costSelector, dateSelector, typeSelector } from '../../store/selectors/repair';
import { createCar } from '../../store/slices/car';
import { changeCost, changeDate, changeType, createRepair } from '../../store/slices/repair';

interface RepairFormProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const useStyles = makeStyles({
  modalBody: {
    paddingTop: '0.5rem',
    paddingBottom: '1.5rem',
  },
});

const RepairForm: FC<RepairFormProps> = ({ isModalOpen, closeModal }) => {
  const classes = useStyles();

  const cost = useSelector(costSelector);
  const date = useSelector(dateSelector);
  const type = useSelector(typeSelector);

  const dispatch = useDispatch();
  const { query } = useRouter();

  const handleOnClick = () => {
    dispatch(createRepair(query.car as string));

    closeModal();
  };

  const handleChangeCost = (e: any) => {
    const newValue = e.target.value;
    dispatch(changeCost(newValue));
  };
  const handleChangeDate: BaseKeyboardPickerProps['onChange'] = (newDate) => {
    console.log(getUnixTime(newDate as Date));
    dispatch(changeDate(getUnixTime(newDate as Date)));
  };
  const handleChangeType = (e: any) => {
    const newValue = e.target.value;
    dispatch(changeType(newValue));
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Registrar nueva reparacion</DialogTitle>
      <DialogContent className={classes.modalBody}>
        <DialogContentText>Registre en la aplicacion una nueva reparacion</DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="type"
              name="type"
              label="Tipo de Reparacion"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={handleChangeType}
              value={type}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Precio"
              type="number"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={handleChangeCost}
              value={cost}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              label="With keyboard"
              value={date}
              onChange={handleChangeDate}
              onError={console.log}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOnClick} color="primary">
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RepairForm;
