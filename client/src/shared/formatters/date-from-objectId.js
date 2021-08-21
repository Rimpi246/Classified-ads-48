/**
 * Get ISO date from MongoDB objectId
 * @param {event} event
 */
export const dateFromObjectId = function(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toISOString().slice(0,10);
};
  