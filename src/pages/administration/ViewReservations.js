import React from "react";
import "./ViewReservations.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const reservationsData = [
  {
    bookedBy: "Johann Coetzee",
    property: "Property 1",
    checkIn: "19/06/2024",
    checkOut: "24/06/2024"
  },
  {
    bookedBy: "Asif Hassam",
    property: "Property 2",
    checkIn: "19/06/2024",
    checkOut: "19/06/2024"
  },
  {
    bookedBy: "Kago Kola",
    property: "Property 1",
    checkIn: "25/06/2024",
    checkOut: "30/06/2024"
  }
];

const ViewReservations = () => {
  return (
    <div>
      {/* Header */}
      <div className="header-admin">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo.png"
          alt="logo"
          className="header-logo"
        />
        <div className="profile-container">
          <div className="profile-div">
            <MenuRoundedIcon />
            <AccountCircleIcon />
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button variant="outlined" component={Link} to="/view-reservations">
          View Reservation
        </Button>
        <Button variant="outlined" component={Link} to="/view-listings">
          View Listing
        </Button>
        <Button variant="outlined" component={Link} to="/create-listing">
          Create Listing
        </Button>
      </div>
      <hr />

      {/* Reservations Table */}
      <div className="reservations-container">
        <h2>My Reservations</h2>
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Booked by</th>
              <th>Property</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationsData.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.bookedBy}</td>
                <td>{reservation.property}</td>
                <td>{reservation.checkIn}</td>
                <td>{reservation.checkOut}</td>
                <td>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ViewReservations;



// // src/components/ViewReservations.js
// import React, { useEffect, useState } from "react";

// const ViewReservations = () => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     // Fetch reservations from your backend when the component mounts
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     try {
//       const response = await fetch("https://your-backend-api-url.com/api/reservations");
//       const data = await response.json();
//       setReservations(data);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };

//   const handleDelete = async (reservationId) => {
//     if (window.confirm("Are you sure you want to delete this reservation?")) {
//       try {
//         await fetch(`https://your-backend-api-url.com/api/reservations/${reservationId}`, {
//           method: "DELETE",
//         });
//         // Remove the deleted reservation from state
//         setReservations(reservations.filter(reservation => reservation.id !== reservationId));
//         alert("Reservation deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting reservation:", error);
//         alert("Error deleting reservation.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>My Reservations</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Listing Name</th>
//             <th>Check-in Date</th>
//             <th>Check-out Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservations.map((reservation) => (
//             <tr key={reservation.id}>
//               <td>{reservation.listingName}</td>
//               <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
//               <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
//               <td>
//                 <button onClick={() => handleDelete(reservation.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewReservations;
