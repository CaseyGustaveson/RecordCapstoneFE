export const fetchCartItems = async (token) => {
  const response = await fetch('/api/cart', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  const data = await response.json();
  return data; // This will include both cartItems and totalCost
};

export const updateProductQuantity = async (itemId, quantity, token) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity })
  });
  if (!response.ok) {
    throw new Error('Failed to update product quantity');
  }
  return response.json();
};
