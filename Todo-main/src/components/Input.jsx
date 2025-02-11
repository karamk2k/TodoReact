export default function Input({type, placeholder, data,onchange,name }) {
    return (
      <input type={type} 
      placeholder={placeholder} 
      value={data} 
      name={name} 
      onChange={onchange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

      />
    );
}