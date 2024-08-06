import React from "react";

interface UserDetailsProps {
  user: any;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="p-4 flex items-center ">
      <div className="bg-yellow-500 rounded-full text-white font-semibold h-12 w-12 flex items-center justify-center text-xl">
        {user.name[0].toUpperCase()}
      </div>
      <div className="ml-4 ">
        <div className="font-semibold text-4xl text-white ">{user.name}</div>
      </div>
    </div>
  );
};

export default UserDetails;
