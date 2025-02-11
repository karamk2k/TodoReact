export default function Button({type="", placeholder="",name="",onClick=()=>{} ,st="w-full py-3 bg-blue-500 ml-2 text-white rounded-md hover:bg-blue-600 focus:outline-none"}) {
    return (
        <button 
        type={type} 
        placeholder={placeholder}
        className={st}
        onClick={onClick}
        >
                    {name}
        </button>
    );
}