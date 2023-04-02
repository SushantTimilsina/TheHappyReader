import React, { useEffect, useState } from "react";
import Message from "Components/UI/Message";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Button from "Components/UI/Button/Button";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface ContactusInterface {
  email: string;
  fName: string;
  lName: string;
  phone: string;
  message: string;
}

interface MessageInterface {
  message: string;
  type: "error" | "success";
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

// Main Component Starts
const Contactus = () => {
  const [message, setMessage] = React.useState<MessageInterface | null>(null);
  const [loading, setLoading] = useState(false);
  // Extracting Value from React Hook Form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactusInterface>({});

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessage(null);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [message]);

  // On Form Submit Handler Function
  const formSubmitHandler = (data: ContactusInterface) => {
    setLoading(true);
    // Sending Email
    emailjs
      .send(
        "service_oje07os",
        "template_ocbie59",
        {
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        "user_Nx1CU504JmnLwXRUtw605"
      )
      .then((result) => {
        setMessage({ message: "Message Sent Successfully", type: "success" });
        reset();
        setLoading(false);
      })
      .catch((error) => {
        setMessage({ message: "Message Sending Failed", type: "error" });
        setLoading(false);
      });
  };

  return (
    <section className="pl-2 py-8 pr-1 w-full box-border sm:w-3/4 mx-auto my-0 md:w-3/5 lg:w-1/2">
      <div>
        {/* Header Starts  */}
        <div>
          <h1 className="text-3xl mb-4">Contact us</h1>
          <p className="text-gray-500">
            We care dedicated to providing you superior service. Please let us
            know how we can help you.
          </p>
          <p className="py-4 text-gray-500">We answer email around the clock</p>
        </div>
        {/* Header Ends  */}

        {/* Form Starts  */}
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {message && <Message message={message.message} type={message.type} />}
          {/* Email start */}
          <div className="my-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email*
            </label>
            <input
              {...register("email", {
                required: "Cannot Leave this Field Empty",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
              placeholder="Enter your email"
            />
            <Message
              message={errors.email?.message ? errors.email.message : ""}
            />
          </div>
          {/* Email End */}
          <div className="flex my-6 gap-4">
            {/* First Name start */}
            <div className="w-[50%]">
              <label
                htmlFor="fName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name*
              </label>
              <input
                {...register("fName", {
                  required: "Cannot Leave this Field Empty",
                })}
                type="text"
                id="fName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
                placeholder="Enter your First Name"
              />
              <Message message={errors.fName?.message || ""} />
            </div>
            {/* First Name End */}

            {/* Last Name start */}
            <div className="w-[50%]">
              <label
                htmlFor="lName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name*
              </label>
              <input
                {...register("lName", {
                  required: "Cannot Leave this Field Empty",
                })}
                type="text"
                id="lName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
                placeholder="Enter your Last Name"
              />
              <Message message={errors.lName?.message || ""} />
            </div>
            {/* Last Name Ends */}
          </div>
          {/* Phone Starts */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone*
            </label>
            <input
              id="phone"
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^(|-)(?:[0-9]{10})$/i,
                  message: "Invalid Phone Number Type",
                },
              })}
            />
            <Message message={errors.phone?.message || ""} />
          </div>
          {/* Phone Ends */}
          {/* Message Starts  */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Message*
            </label>
            <textarea
              id="message"
              {...register("message", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Message cannot be less than 10 characters",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
              rows={5}
              cols={50}
              placeholder="Input your message here"
            />
            <Message message={errors.message?.message || ""} />
          </div>
          {/* Message Ends  */}
          <Button type="submit" disabled={loading}>
            Submit
          </Button>{" "}
          {/*Button here*/}
        </form>
        {/* Form Ends  */}
      </div>
    </section>
  );
};

export default React.memo(Contactus);
