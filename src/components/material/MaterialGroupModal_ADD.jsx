import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/MaterialModal.module.css';
import {
  Stack,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialGroupValidationSchema } from './validationSchema/materialGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { materialManager } from './service/materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import { materialList } from './service/materialList';

export const MaterialGroupModal_ADD = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      materialGroupName: '',
      type: '',
      image: '',
      material: null
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    //data is the form data
    data.materialList = []; //create empty array
    onClose(); //close modal
    reset(); //reset form
    materialManager.createMaterialGroup(data, queryClient, dispatch); //post material
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <img
            className={styles.modal_img}
            src={require('../../assets/Metale kolorowe.png')}
            alt="Tool diameter"
          />
          <div className={styles.modal_header}>
            <h2>Create material group</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="materialGroupName"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Aluminium plates PA4"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Material group name"
                  />
                )}
              />
              <Controller
                name="material"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    value={value}
                    options={materialList}
                    getOptionLabel={(option) => option.name + ' - ' + option.density + ' g/cm3'}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(error)}
                        helperText={error ? error.message : ''}
                        label="Material"
                        variant="outlined"
                        onBlur={onBlur}
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue);
                        }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="image"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="https://www.example.com/images/example-image.jpg"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Image URL (optional)"
                    variant={'filled'}
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <ToggleButtonGroup
                      className={error ? styles.error_border : ''}
                      color="primary"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="Plate">Plate</ToggleButton>
                      <ToggleButton value="Tube">Tube</ToggleButton>
                      <ToggleButton value="Rod">Rod</ToggleButton>
                    </ToggleButtonGroup>
                    <p className={styles.error_message}>{error ? error.message : ''}</p>
                  </div>
                )}
              />
              <Button type="submit" variant="contained" size="large">
                Create
              </Button>
              <Button variant="text" size="large" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};
