import { useState } from "react";
import Button from "../components/ui/Button";
import usequeryhook from "../hooks/useAuthenticatedQuery";
import { IEmployee } from "../interfaces";
import Modal from "../components/Modal";
import axiosInstance from "../config/axios.config";
import { handleLogout } from "../Pages/LoginPage";
const Home = () => {
  const [selectedUser, setSelectedUser] = useState<IEmployee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [ConfirmModal, setConfirmModal] = useState(false);

  const {
    data = { ages: [] },
    isLoading,
    error,
  } = usequeryhook({
    queryKey: ["employeesList"],
    url: "/ages",
  });
 
  const openModal = (age: IEmployee) => {
    setSelectedUser(age);
    setIsModalOpen(true);
  };

  const openAddmodel = () => {
    setIsOpenAddModal(true);
    setAge("");
    setEmail("");
    setName("");
  };

  const openConfirmModel = (age: IEmployee) => {
    setConfirmModal(true);
    setSelectedUser(age);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsOpenAddModal(false);
    setConfirmModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading </div>;

  const onRemove = async () => {
    
    try {
      const { status } = await axiosInstance.delete(
        `/ages/${selectedUser?._id}`
      );
      if (status === 200) {
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async () => {
    if (!selectedUser) return;

    try {
      const { status } = await axiosInstance.patch(
        `/ages/${selectedUser._id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          Age: selectedUser.Age,
        }
      );

      if (status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const onCreate = async () => {
    try {
      const { status } = await axiosInstance.post(`/ages`, {
        name: name,
        email: email,
        Age: age,
      });

      if (status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap">
          <Button
            variant={"default"}
            size={"sm"}
            onClick={() => openAddmodel()}
            className="ml-4 mb-4 mt-4"
          >
            Post new one
          </Button>
          <Button onClick={handleLogout} className="ml-4 mb-4 mt-4">
            Logout
          </Button>
        </div>

        {data?.data?.ages?.length > 0 ? (
          <div className="space-y-4">
            {data.data.ages.map((age: IEmployee) => (
              <div
                key={age._id}
                className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100 flex-wrap"
              >
                <p className="w-full sm:w-auto font-semibold">
                  {age.name}
                </p>
                <div className="flex items-center justify-end w-full sm:w-auto space-x-3 mt-2 sm:mt-0">
                  <Button
                    variant={"default"}
                    size={"sm"}
                    onClick={() => openModal(age)}
                  >
                    View
                  </Button>
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    onClick={() => openConfirmModel(age)}
                  >
                    Remove
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
                  className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                  type="text"
                  placeholder="Name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value,
                    })
                  }
                />
                <h3>Email:</h3>
                <input
                  className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                  type="text"
                  placeholder="Email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
                <h3>Age:</h3>
                <input
                  className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                  type="text"
                  placeholder="Birth Date"
                  value={selectedUser.Age}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, Age: e.target.value })
                  }
                />
                <div className="flex flex-wrap space-x-3">
                  <Button
                    className="mt-2"
                    variant={"default"}
                    size={"sm"}
                    onClick={onUpdate}
                  >
                    Update
                  </Button>
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

       
        <Modal
          isOpen={isOpenAddModal}
          onClose={closeModal}
          content={
            <form className="space-y-3">
              <h3>Name:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h3>Email:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h3>Age:</h3>
              <input
                className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="flex flex-wrap space-x-3">
                <Button
                  className="mt-2"
                  variant={"default"}
                  size={"sm"}
                  onClick={onCreate}
                >
                  Done
                </Button>
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
          }
        />
        <Modal
          isOpen={ConfirmModal}
          onClose={closeModal}
          content={
            <form>
              <div>
                <h2 className="font-bold text-xl">
                  Are you sure you want to remove this employer from your store?
                </h2>
                <p className="mt-2">
                  Deleting this employer will remove it permanently from your
                  inventory. Any associated data, sales history, and other
                  related information will also be deleted. Please make sure
                  this is the intended action.
                </p>
              </div>
              <div className="flex flex-wrap space-x-3">
                <Button
                  className="mt-2"
                  variant={"danger"}
                  size={"sm"}
                  onClick={onRemove}
                >
                  Yes, remove it
                </Button>
                <Button
                  className="mt-2"
                  variant={"default"}
                  size={"sm"}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          }
        />
      </div>
    </>
  );
};

export default Home;
