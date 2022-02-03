import React from 'react';
import roundPrice from '../../utils/roundPrice';
import { useMutation } from '@apollo/client';
import { ADD_LIKES, ADD_NONLIKE } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { withRouter } from 'react-router-dom';

function Nft({ nft, otherNftId, history }) {
  const [addLikes, { error }] = useMutation(ADD_LIKES);
  const [addNonLike, { errorNon }] = useMutation(ADD_NONLIKE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(otherNftId);

    if (!Auth.getToken()) {
      history.push('/login');
    }

    try {
      await addLikes({
        variables: { id: nft._id }
      });

      await addNonLike({
        variables: { id: otherNftId }
      });

    } catch (e) {
      console.error(e);
    }

    window.location.reload(false);
  };

  return (
    <div className='nft'>
      <img onClick={handleFormSubmit} src={nft.imageUrl} height={300}></img>
      <p><i className='fab fa-ethereum'></i>{roundPrice(nft.price)} </p>
      <h2>{nft.nftName}</h2>
      <h3>created by {nft.creator}</h3>
    </div>
  )
}

export default withRouter(Nft);