import { useState } from "react";
import Button from "../components/ui/Button";
import usequeryhook from "../hooks/useAuthenticatedQuery";
import { IEmployee } from "../interfaces";
import Modal from "../components/Modal";
import { handleLogout } from "../Pages/LoginPage";
const Home = () => {
  const [selectedUser, setSelectedUser] = useState<IEmployee>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = usequeryhook({
    queryKey: ["employeesList"],
    url: "/users",
  });
  const openModal = (user: IEmployee) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading </div>;

  return (
    <>
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <Button onClick={handleLogout} className="-translate-x-40 mb-4 mt-4">
          Logout
        </Button>
      </div>

      {data?.users?.length > 0 ? (
        <div className="space-y-4">
          {data.users.map((user: IEmployee) => (
            <div
              key={user.id}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100 flex-wrap"
            >
              <div className="flex space-x-2 ">
                {" "}
                <span className="w-full sm:w-auto font-semibold">
                  {user.id}-
                </span>
                <p className="w-full sm:w-auto font-semibold">
                  {user.firstName}
                </p>
                <p className="w-full sm:w-auto font-semibold">
                  {user.lastName}
                </p>
              </div>
              <div className="flex items-center justify-end w-full sm:w-auto space-x-3 mt-2 sm:mt-0">
                <Button
                  variant={"default"}
                  size={"sm"}
                  onClick={() => openModal(user)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No data available</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          selectedUser && (
            <form className="space-y-3">
              <h3>Name:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent "
                type="text"
                placeholder="Name"
                value={selectedUser.firstName}
              />
              <h3>Email:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Email"
                value={selectedUser.email}
              />
              <h3>Age:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Birth Date"
                value={selectedUser.age}
              />
             
              <h3>Gender:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Birth Date"
                value={selectedUser.gender}
              />
              <div className="flex flex-wrap space-x-3">
                <Button
                  className="mt-2"
                  variant={"danger"}
                  size={"sm"}
                  onClick={closeModal}
                >
                  Close
                </Button>
              </div>
            </form>
          )
        }
      />
    </>
  );
};

export default Home;
