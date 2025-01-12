import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiBaseApi = process.env.REACT_APP_BASE_API;

const EventList = ({
  events,
  updateEventList,
  degreeId,
  setDegreeId,
  DegreeList,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Open the modal and set the event to edit
  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  // Update the event details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  // Save the updated event
  const handleSaveEvent = async () => {
    if (
      !currentEvent.title ||
      !currentEvent.startDate ||
      !currentEvent.endDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.put(
        `${apiBaseApi}/api/admin-event/${currentEvent._id}`,
        {
          title: currentEvent.title,
          description: currentEvent.description,
          startDate: currentEvent.startDate,
          endDate: currentEvent.endDate,
        }
      );
      window.location.reload();
      // alert("Event updated successfully!");

      // Update the event list
      if (updateEventList) {
        updateEventList((prevEvents) =>
          prevEvents.map((event) =>
            event._id === currentEvent._id ? response.data : event
          )
        );
      }

      setShowModal(false);
    } catch (error) {
      console.error(
        "Error updating the event:",
        error.response?.data || error.message
      );
      alert("Failed to update the event. Please try again.");
    }
  };

  // Delete the event
  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiBaseApi}/api/admin-event/${eventId}`);
      alert("Event deleted successfully!");

      // Update the event list
      if (updateEventList) {
        updateEventList((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      }
      window.location.reload();
    } catch (error) {
      console.error(
        "Error deleting the event:",
        error.response?.data || error.message
      );
      alert(
        `Failed to delete the event. Error: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="event-list">
      <h3>Event List</h3>
      <div className="">
        <label htmlFor="">Select Degree</label>
        <select
          name=""
          id=""
          className="form-control"
          onChange={(e) => setDegreeId(e.target.value)}
          value={degreeId}>
          <option value="" disabled>
            Select Degree
          </option>
          {DegreeList.map((degree) => (
            <option value={degree._id}>{degree.title}</option>
          ))}
        </select>
      </div>
      <div className="eventlist-container">
        {events && events.length > 0 ? (
          events.map((event) => {
            const formattedStartDate = event.startDate
              ? new Date(event.startDate).toISOString().split("T")[0]
              : "No Start Date";
            const formattedEndDate = event.endDate
              ? new Date(event.endDate).toISOString().split("T")[0]
              : "No End Date";

            return (
              <div className="main-event-card" key={event._id}>
                <div className="main-event-card-body">
                  <h3>{event.title || "Untitled Event"}</h3>
                  <p>{event.description || "No description available"}</p>
                  <div className="main-event-card-date">
                    <p>Start: {formattedStartDate}</p>
                    <p>End: {formattedEndDate}</p>
                  </div>
                </div>
                <div className="main-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(event)}
                    aria-label={`Edit ${event.title || "this event"}`}>
                    <Edit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEvent(event._id)}
                    aria-label={`Delete ${event.title || "this event"}`}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-events">
            <p>No events available at the moment.</p>
          </div>
        )}
      </div>

      {/* Modal for Editing Event */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEvent && (
            <Form>
              <Form.Group>
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentEvent.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentEvent.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={currentEvent.startDate.split("T")[0]}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={currentEvent.endDate.split("T")[0]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventList;
