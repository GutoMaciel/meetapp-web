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

// const schema = Yup.object().shape({
//   file_id: Yup.number(),
//   title: Yup.string().required('O Título do Meetup é obrigatório'),
//   description: Yup.string().required('A Descrição Completa é obrigatória'),
//   date: Yup.date()
//     .min(new Date(), 'Não é possível selecionar datas passadas')
//     .required('A Data do Meetup é obrigatória')
//     .typeError('Informe uma Data válida'),
//   location: Yup.string().required('A Localização é obrigatória'),
// });
const schema = Yup.object().shape({
  file_id: Yup.mixed().required('A Imagem do Banner é obrigatória'),
  title: Yup.string().required('O Título do Meetup é obrigatório'),
  description: Yup.string().required('A Descrição Completa é obrigatória'),
  date: Yup.date()
    .min(new Date(), 'Não é possível selecionar datas passadas')
    .required('A Data do Meetup é obrigatória')
    .typeError('Informe uma Data válida'),
  location: Yup.string().required('A Localização é obrigatória'),
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
