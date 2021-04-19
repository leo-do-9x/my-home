export default function SwitchToggle(props) {
    function handleClick(event) {
        props.onClick(event.target.value);
    }

    return (
        <div className="flex justify-center items-center">
            <div className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${props.toggle ? "bg-green-400" : "bg-gray-300"}`}>
                <label htmlFor="toggle" className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${props.toggle ? "translate-x-full border-green-400" : "translate-x-0 border-gray-300"}`}></label>
                <input type="checkbox" id="toggle" name="toggle" className="appearance-none w-full h-full active:outline-none focus:outline-none" onClick={handleClick}/>
            </div>
        </div>
    );
}