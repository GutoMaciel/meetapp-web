import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DateTimePicker from '~/components/DateTimePicker';
// import BannerInput from '../BannerInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.number(),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date()
    .min(new Date(), 'You cannot create meetups in past dates.')
    .required('Date is required')
    .typeError('Invalid date'),
  location: Yup.string().required('Locations is Required'),
});

export default function New() {
  async function handleSubmit(data) {
    try {
      await api.post('meetups', data);
      toast.success('Success!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Error. Verifie your data.');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} autoComplete="off">
        {/* <BannerInput name="file_id" /> */}
        <Input name="title" type="text" placeholder="Meetup title" />
        <Input
          multiline
          name="description"
          rows="10"
          placeholder="Description"
        />
        <DateTimePicker name="date" placeholder="Meetup date" />
        <Input name="location" type="text" placeholder="Location" />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Save
        </button>
      </Form>
    </Container>
  );
}
