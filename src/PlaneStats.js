import { connect } from "react-redux";

const PlaneStats = (props) => {
  return (
    <div>
      <p>Altitude: {props.altitude}</p>
      <p>Air Speed: {props.airspeed}</p>
      <p>
        Position: {props.position.latitude} | {props.position.longitude}
      </p>
      <div>
        Planned Route:{" "}
        {props.plannedRoute.map((route, index) => (
          <span className="spacing" key={index}>
            {route}
          </span>
        ))}
      </div>
      <div>
        Seats:{" "}
        {Object.values(props.seats).map((seat, index) => (
          <span className="spacing" key={index}>
            {index} {seat ? seat.name : "Empty"}
          </span>
        ))}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  altitude: state.altitude,
  airspeed: state.airspeed,
  position: state.position,
  plannedRoute: state.plannedRoute,
  seats: state.seats,
});

export default connect(mapState)(PlaneStats);
