const formatDate = (date) => {
    if (!date) return null;

    // Ensure we are working with a Date object
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if the created date is valid
    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date provided to formatDate:", date);
        return null;
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  export default formatDate;