import { useNavigate } from "react-router-dom";

export const BottomDetails = ({ label, link }) => {
  const navigate = useNavigate();

  const newPage = (e) => {
    console.log("button clicked ");
    console.log(`/${link}`);
    e.preventDefault();

    navigate(`/${link}`);
  };

  return (
    <div className="flex justify-center pt-2">
      <div>{label}</div>
      <div className=" hover:underline-offset-4 cursor-pointer font-semibold">
        <span onClick={newPage}>{link}</span>
      </div>
    </div>
  );
  a;
};
