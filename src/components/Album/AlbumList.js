import React from 'react';
import { Row, Col } from 'react-bootstrap';

import AlbumCard from './AlbumCard';

const AlbumList = (props) => {
    return (
        <Row>
            {props.albums.filter(album => album.cover_photo).map((singleAlbum) => (            
                <Col key={singleAlbum.id} md={3}>
                    <AlbumCard 
                        key={singleAlbum.id} 
                        album={singleAlbum} 
                        viewAlbum={props.viewAlbum} 
                    />
                </Col>
                )
            ) }  
        </Row>     
    );
}

export default AlbumList;