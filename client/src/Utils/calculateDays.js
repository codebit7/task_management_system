export const calculateDaysAgo = (date) => {
    const taskDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - taskDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference === -1) {
      return 'Tomorrow';
    } else if (daysDifference > 1) {
      return `${daysDifference} days ago`;
    }
     else {
      return `${Math.abs(daysDifference)} days remaining`;
    }
  }


