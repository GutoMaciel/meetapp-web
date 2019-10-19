import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      const data = response.data.map(meetup => {
        return {
          id: meetup.id,
          title: meetup.title,
          date: format(parseISO(meetup.date), "MMMM', 'dd', 'HH' h'"),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleNew() {
    history.push('/details/new');
  }

  return (
    <Container>
      <header>
        <strong>Meetups</strong>
        <button type="button" onClick={handleNew}>
          <MdAddCircleOutline size={20} color="fff" />
          New Meetup
        </button>
      </header>
      <ul>
        {meetups.map(meetup => (
          <Meetup>
            <strong>{meetup.title}</strong>
            <aside>
              <span>{meetup.date}</span>
              <Link to={`/details/detail/${meetup.id}`}>
                <MdChevronRight size={25} color="fff" />
              </Link>
            </aside>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
