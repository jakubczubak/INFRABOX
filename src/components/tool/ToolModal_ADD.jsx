import styles from './css/Tool.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/add.json';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useState, useEffect } from 'react';
import { Dimensions } from './Dimensions';

import { useDispatch } from 'react-redux';

export const ToolModal_ADD = ({ open, onClose, item }) => {
  const { handleSubmit, control, reset } = useForm({
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
    }
    // resolver: yupResolver(validationSchema())
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    // data.id = item.materialList.length + 1;
    // item.materialList.push(data);
    // materialManager.createMaterial(item, queryClient, dispatch);
    // onClose();
    // reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        <div className={styles.modal_header}>
          <h2>New tool</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Dimensions control={control} />
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
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                />
              )}
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
