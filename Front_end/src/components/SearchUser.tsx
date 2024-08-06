import React, { useState } from "react";
import axios from "axios";

interface SearchUserProps {
  onUserSelect: (user: any) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ onUserSelect }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users?search=${search}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 h-40 overflow-auto">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-40 p-2 border rounded-2xl bg-white text-black border-yellow-500 border-3xl "
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-700 font-semibold text-white rounded-2xl hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
      <div className="user-list w-40 mt-4 mt-3 ">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className="pt-3 mt-1 pl-2 bg-white text-black font-semibold italic rounded-2xl border border-yellow-500  "
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
