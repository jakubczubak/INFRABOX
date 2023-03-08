import React from 'react';
import styles from './css/RecycleItem.module.css';
import {
  Breadcrumbs,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/recycle_v2.json';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../common/Input';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const RecycleItem = () => {
  const { handleSubmit: handleSubmit1, control: control1 } = useForm({
    defaultValues: {
      receiver: '',
      carID: '',
      date: dayjs(new Date()),
      time: dayjs(new Date())
    }
  });

  const { handleSubmit: handleSubmit2, control: control2 } = useForm({
    defaultValues: {
      wasteName: '',
      wasteQuantity: '',
      wasteValue: ''
    }
  });

  const onSubmit1 = (data) => {
    console.log(data);
  };
  const onSubmit2 = (data) => {
    console.log(data);
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>

        <Typography color="text.primary">
          <Link to="/recycling" className={styles.link}>
            Recycling
          </Link>
        </Typography>
        <Typography color="text.primary">WTC</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Waste transfer card
        </Typography>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <Typography color="success" gutterBottom variant="overline" className={styles.waste_list_header}>
        Waste list:
      </Typography>
      <div>
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <div className={styles.waste_form2}>
            <Controller
              name="wasteName"
              control={control2}
              render={({ field: { onChange, value } }) => (
                <TextField label="Waste name" value={value} onChange={onChange} />
              )}
            />
            <Controller
              name="wasteQuantity"
              control={control2}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                  }}
                  style={{ width: '150px' }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="wasteValue"
              control={control2}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Value"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                  style={{ width: '150px' }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <IconButton className={styles.item} type="submit">
              <AddCircleIcon color="info" />
            </IconButton>
          </div>
        </form>
      </div>

      <div>
        <form onSubmit={handleSubmit1(onSubmit1)} className={styles.form}>
          <div className={styles.data_container}>
            <div className={styles.inputs}>
              <Controller
                name="receiver"
                control={control1}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="OneBrand"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Receiver"
                  />
                )}
              />
              <Controller
                name="carID"
                control={control1}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="WWY 21333"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Car ID"
                  />
                )}
              />
              <Controller
                name="time"
                control={control1}
                render={({ field: { onChange, value } }) => (
                  <TimePicker label="Time" value={value} onChange={onChange} width />
                )}
              />
            </div>
            <div className={styles.date}>
              <Controller
                name="date"
                control={control1}
                render={({ field: { onChange, value } }) => (
                  <DateCalendar value={value} onChange={onChange} />
                )}
              />
            </div>
          </div>
          <Button variant="contained" size="large" type="submit" color="success">
            Recycle
          </Button>
        </form>
      </div>
    </>
  );
};
