import React from 'react';
import { Card, Button } from 'react-bootstrap';

import './AlbumCard.css';

const AlbumCard = (props) => {
    return (
        <Card key={props.album.id}>
            <Card.Img variant="top" src={props.album.cover_photo.picture} className="card-image" />
            <Card.Body>
                <Card.Title>{props.album.name}</Card.Title>
                <Button variant="primary" type="submit" onClick={() => props.viewAlbum(props.album.id)}>View Album</Button>
            </Card.Body>
        </Card>
    );
}

export default AlbumCard;