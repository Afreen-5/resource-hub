import { useNavigate } from "react-router-dom";
import { User } from "../interface/User";

interface UserCardProps {
    user: User;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/users/${user.id}`);
    };

  return (
    <div onClick={handleClick} className="cursor-pointer w-64 h-80 rounded overflow-hidden shadow-lg bg-white p-4 m-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt={user.name}
        />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-blue-500">{user.website}</p>
      </div>
    </div>
  );
};

export default UserCard;

