export const Input = ({ label, placeholder, onChange }) => {
  return (
    <div className=" flex flex-col items-start px-5 pt-4  bg-slate-100">
      <label className=" pb-5 text-2xlxl font-bold">{label}</label>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 rounded-sm shadow-2xl bg-white border-gray-200 "
      ></input>
    </div>
  );
};
