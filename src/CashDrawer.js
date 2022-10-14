import { connect } from "react-redux";

const CashDrawer = (props) => {
  const { transactions } = props;
  return (
    <ul>
      {transactions.map((trans) => (
        <li key={trans.id}>
          <span className="spacing">{trans.type}</span>
          <span>{trans.value}</span>
        </li>
      ))}
    </ul>
  );
};

const mapState = (state) => ({
  transactions: state,
});

export default connect(mapState)(CashDrawer);
