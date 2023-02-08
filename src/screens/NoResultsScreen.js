import React from "react";
import { Container, Image } from 'react-bootstrap';
import notfound from '../notFound.jpg';
import heads from '../Styles/Heads.module.css';
import styles from '../Styles/Notfound.module.css'

function NotFound() {
    return (
      <Container>
        <div>
            <h3 className={heads.Heads}>Page not found</h3>
          <Image src={notfound} alt="404 Error. Page not found." className={styles.image} />
        </div>
      </Container>
    );
  }

export default NotFound