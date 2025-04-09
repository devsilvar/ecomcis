import axios from "axios";
import * as React from "react";
import { toast } from "react-hot-toast";

export const useSubscribeMutation = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubscribe = async (email) => {
    setIsLoading(true);
    try {
      await axios.post(
        "https://api.brevo.com/v3/contacts",
        {
          email,
          // attributes: {
          //   FIRSTNAME: firstName || '',
          //   LASTNAME: lastName || '',
          // },
          listIds: [6], // Your list ID
          updateEnabled: true,
        },
        {
          headers: {
            "api-key": process.env.REACT_APP_BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Subscription successful!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubscribe,
    isLoading,
  };
};
