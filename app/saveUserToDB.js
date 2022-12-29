import { toast } from "react-toastify";

export const saveUser = (name, email, image) => {
  const user = { name, email, image };
  fetch("https://do-task-server.vercel.app/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.acknowledged) {
        toast.success("Registration Successful");
      }
    });
};
