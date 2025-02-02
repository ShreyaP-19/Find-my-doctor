import React,{useState} from 'react'

function Appointments() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to generate a week's dates starting from today
  const generateWeek = (startDate) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      week.push(date);
    }
    return week;
  };

  // Generate the dates for the week starting from today
  const weekDates = generateWeek(today);

  // Function to format the date for display
  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>Book an Appointment</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {weekDates.map((date) => (
          <button
            key={date.toDateString()}
            onClick={() => handleDateClick(date)}
            style={{
              padding: "10px 15px",
              border: "1px solid #007bff",
              backgroundColor:
                selectedDate?.toDateString() === date.toDateString()
                  ? "#007bff"
                  : "white",
              color:
                selectedDate?.toDateString() === date.toDateString()
                  ? "white"
                  : "#007bff",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Date</h3>
          <p>{selectedDate.toDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default Appointments
