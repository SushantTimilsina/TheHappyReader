import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuthor, getAuthorData } from "store/author/author-actions";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import DashboardLayout from "../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Spinner from "Components/UI/Spinner/Spinner";
import Message from "Components/UI/Message";
import Button from "Components/UI/Button/Button";
import Card from "Components/UI/Card";
import DeleteModal from "Components/UI/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";

interface AuthorInterface {
  aboutAuthor: string;
  name: string;
  _id: string;
}

const Author = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  // getting data from redux store
  const { error, loading, author, prev, next } = useSelector(
    (state: any) => state.author
  );

  // fetching author data
  useEffect(() => {
    dispatch(getAuthorData(page, 5));
  }, [dispatch, page]);

  // canceling delete author
  const cancelDeleteHandler = useCallback(() => {
    setIsDeleting(false);
  }, []);

  // on clicking bin icon
  const setDeletingHandler = useCallback((id: string) => {
    setIsDeleting(true);
    sessionStorage.setItem("authorId", id);
  }, []);

  // deteting author
  const confirmDeleteHandler = useCallback(() => {
    dispatch(deleteAuthor(page));
    setIsDeleting(false);
  }, [dispatch, page]);

  // clicking next
  const nextPageHandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // clicking prev
  const prevPageHandler = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  // if data is fetching
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen w-full flex flex-col justify-center align-middle">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  // if error is present
  if (error) {
    return (
      <DashboardLayout>
        <Message message={error} type="error" />
      </DashboardLayout>
    );
  }

  // main return
  return (
    <>
      {/* model starts here */}
      {isDeleting && (
        <DeleteModal
          onCancel={cancelDeleteHandler}
          message="Are you sure you want to delete this Author?"
          onConfirm={confirmDeleteHandler}
        />
      )}
      {/* model ends here */}
      <DashboardLayout>
        {/* header and button starts  */}
        <div className="flex flex-col md:flex-row justify-between my-8 md:mx-12 lg:mx-24 lg:max-w-[1100px]">
          <h1 className="text-xl mb-4 font-bold ">Author List</h1>
          <Button className="max-w-fit rounded-md">
            <Link to="/admin-dashboard/author/add">Add</Link>
          </Button>
        </div>
        {/* header and button ends */}

        {/* author listing starts */}
        <Card className="mx-4 p-0 md:mx-12 lg:mx-24 lg:max-w-[1100px] rounded-md my-8 pb-14 relative">
          {author?.length === 0 ? (
            <p>No Authors Found</p>
          ) : (
            <>
              {author?.map((data: AuthorInterface, index: number) => {
                const { name, _id } = data;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-6 border-b-[1px] mx-4"
                  >
                    {/* author name starts */}
                    <p className="text-lg">{name}</p>
                    {/* author name ends */}

                    {/* edit delete button starts */}
                    <div className="flex gap-4 text-xl">
                      <Link
                        className="text-gray-400 cursor-pointer"
                        to={`/admin-dashboard/author/edit?authorId=${_id}`}
                      >
                        <AiFillEdit />
                      </Link>
                      <span
                        className="text-red-600 cursor-pointer"
                        onClick={() => setDeletingHandler(_id)}
                      >
                        <MdDeleteForever />
                      </span>
                    </div>
                    {/* edit delete button ends */}
                  </div>
                );
              })}
              <div className="flex gap-2 absolute right-4 bottom-2">
                <Button
                  className="rounded-md"
                  type="button"
                  onClick={prevPageHandler}
                  disabled={!prev}
                >
                  Prev
                </Button>{" "}
                <Button
                  className="rounded-md"
                  onClick={nextPageHandler}
                  disabled={!next}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </Card>
        {/* author listing ends */}
      </DashboardLayout>
    </>
  );
};

export default React.memo(Author);
