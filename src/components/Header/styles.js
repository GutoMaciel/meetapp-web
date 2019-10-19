import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #222;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #444;
    }

    a {
      font-weight: bold;
      color: #d44059;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
  button {
    height: 40px;
    width: 70px;
    background: #f94d6a;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 15px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.2, '#f94d6a')};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 30px;
  padding-left: 20px;
  border-left: 1px solid #444;

  div {
    text-align: right;
    margin-right: 20px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #999;
    }
  }
`;
