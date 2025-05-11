import { IonInput, InputCustomEvent } from '@ionic/react';
import { InputChangeEventDetail, TextFieldTypes } from '@ionic/core';
import React from 'react';

interface TextInputProps {
  label: string;
  placeholder?: string;
  type: TextFieldTypes;
  required?: boolean;
  name: string;
  value: string | number | null;
  onChange: (event: { target: { name: string; value: any } }) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type,
  required,
  name,
  value,
  onChange,
}) => {
  return (
    <IonInput
      label={label}
      placeholder={placeholder}
      type={type}
      labelPlacement="floating"
      fill="outline"
      className="input"
      required={required}
      name={name}
      value={value}
      onIonInput={(e: InputCustomEvent<InputChangeEventDetail>) =>
        onChange({
          target: {
            name,
            value: e.detail.value,
          },
        })
      }
    />
  );
};