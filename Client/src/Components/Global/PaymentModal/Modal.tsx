import React from "react";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  onKhaltiCheckout: (amount?: number) => void;
}

const Modal = (props: Props) => {
  return (
    <div
      onClick={props.onCancel}
      id="walletModal"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-screen flex justify-center items-center min-w-[250px]"
    >
      <div className="bg-black opacity-70 h-full w-full fixed"></div>
      <div className="relative p-4 w-full max-w-md h-auto scale-y-100 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center py-4 px-6 rounded-t border-b dark:border-gray-600 ">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Payment Method
            </h3>
            <button
              onClick={props.onCancel}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="walletModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <ul className="my-4 space-y-3">
              <li onClick={() => props.onKhaltiCheckout()}>
                <p className="flex items-center p-3 text-base font-bold cursor-pointer text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ml-3 whitespace-nowrap">Khalti</span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    Popular
                  </span>
                </p>
              </li>

              <li onClick={props.onConfirm}>
                <p className="flex items-center p-3 text-base font-bold cursor-pointer text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Cash on Delivery
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
