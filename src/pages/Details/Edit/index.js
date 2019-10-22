import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DateTimePicker from '~/components/DateTimePicker';
import BannerInput from '../BannerInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.mixed(),
  title: Yup.string().required('Title required'),
  description: Yup.string().required('Description required'),
  date: Yup.date()
    .min(new Date(), 'Cannot select past dates')
    .required('A date is required')
    .typeError('Invalid date.'),
  location: Yup.string().required('Location required'),
});

export default function Edit({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`meetups/${id}`);

      setMeetup(response.data);
    }

    getMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`meetups/${id}`, data);
      toast.success('Success!');
      history.push('/dashboard');
    } catch (error) {
      toast.error('Error. Verifie your data');
    }
  }

  return (
    <Container>
      <Form
        initialData={meetup}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <BannerInput name="file_id" />
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

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
