import styles from './Material.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialItemValidationSchema } from './materialItemValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/add.json';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from './Input';
import { useState, useEffect } from 'react';
import { Dimensions } from './Dimensions';

export const Material = ({ open, onClose, density, type }) => {
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      x: '',
      y: '',
      z: '',
      quantity: '',
      min_quantity: '',
      price: '',
      diameter: '',
      thickeness: '',
      length: ''
    },
    resolver: yupResolver(materialItemValidationSchema)
  });

  useEffect(() => {
    const x = watch('x'); //width
    const y = watch('y'); //height
    const z = watch('z'); //thickness

    const diameter = watch('diameter');
    const thickeness = watch('thickeness');
    const length = watch('length');
    const quantity = watch('quantity');
    const pricePerKg = watch('price'); //price per kg

    const weight = calculateWeight(x, y, z, density);
    const price = calculatePrice(weight, pricePerKg);
    const totalPrice = calcualteTotalPrice(price, quantity);

    setWeight(weight);
    setPrice(price);
    setTotalPrice(totalPrice);
  }, [watch()]);

  const queryClient = useQueryClient();

  const handleForm = (data) => {
    console.log(data);
    onClose();
    reset();
  };

  const calculateVolume = (x, y, z) => {
    if (type === 'Plate') {
      const volume = x * y * z;
      return volume;
    } else if (type === 'Tube') {
      const volume = Math.PI * Math.pow(x, 2) * z;
      return volume;
    } else if (type === 'Bar') {
      const volume = x * y * z;
      return volume;
    }
  };

  const calculateWeight = (volume, density) => {
    const weight = (volume * density) / 1000000;
    return weight.toFixed(2);
  };

  const calculatePrice = (weight, pricePerKg) => {
    const price = pricePerKg * weight;
    return price.toFixed(2);
  };

  const calcualteTotalPrice = (price, quantity) => {
    const totalPrice = price * quantity;
    return totalPrice.toFixed(2);
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        <div className={styles.modal_header}>
          <h2>New position</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Dimensions control={control} type={type} />
          <Stack spacing={1} mt={2} className={styles.login_content} direction="row">
            <Controller
              name="quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="min_quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Min. quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="42.5"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Price"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN/kg</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={5} mt={5} className={styles.login_content} direction="row">
            <Input
              value={price}
              label="Price"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
            <Input
              value={weight}
              label="Weight"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
            />
            <Input
              value={totalPrice}
              label="Total"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Stack>
          <Button type="submit" variant="contained" size="large">
            Create
          </Button>
          <Button variant="text" size="large" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
