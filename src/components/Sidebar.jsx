import Chats from "./Chats";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

export default function Sidebar(){
    return(
    <div className="sidebar">
        <Navbar/>
        <SearchBar/>
        <Chats/>
    </div>
)}