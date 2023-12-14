import { Notes } from "./Notes";

export const Home = (props) => {
  const { showAlert } = props; // destructuring show alert ko prop mein sey nikal raha

  return (
    <div>
      <Notes showAlert={showAlert}></Notes>
    </div>
  );
};
