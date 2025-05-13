import { useState } from 'react';

/**
 * Custom hook to manage the updating state of cart items.
 * @returns {Object} - A state object and a setter function for managing updates.
 */
export const useUpdatingItems = () => {
  const [updatingItems, setUpdatingItems] = useState({});

  /**
   * Set an item as being updated.
   * @param {string} itemId - The ID of the cart item.
   */
  const startUpdating = (itemId) => {
    setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));
  };

  /**
   * Remove an item from the updating state.
   * @param {string} itemId - The ID of the cart item.
   */
  const stopUpdating = (itemId) => {
    setUpdatingItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  /**
   * Check if an item is currently being updated.
   * @param {string} itemId - The ID of the cart item.
   * @returns {boolean} - True if the item is being updated, otherwise false.
   */
  const isUpdating = (itemId) => !!updatingItems[itemId];

  return {
    isUpdating,
    startUpdating,
    stopUpdating,
  };
};
