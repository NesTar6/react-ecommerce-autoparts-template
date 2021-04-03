import React from 'react';
import { useHistory } from 'react-router-dom';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../StateProvider';

const moment = require('moment');

const Subtotal = () => {
  const [{ cart, user }] = useStateValue();
  const history = useHistory();

  const validateCheckOut = () => {
    if (cart.length < 1) return false;
    return true;
  };

  const checkoutButton = (event) => {
    event.preventDefault();
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: moment.now(),
        productId: '0000000000',
        sellerId: '0934977284',
        buyerId: user.id,
      }),
    }).then((res) => {
      if (res.status === 200) history.push('/confirmation');
    })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        value={cart.reduce((acc, curr) => (acc + curr.price), 0)}
        renderText={(value) => (
          <>
            <p>
              Subtotal (
              {`${cart?.length} `}
              items):
              <strong>
                {` ${value}`}
              </strong>
            </p>
          </>
        )}
        decimalValue={2}
        displayType="text"
        thousandSeparator
        prefix="$"
      />
      <button type="button" disabled={!validateCheckOut()} onClick={(e) => checkoutButton(e)}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
